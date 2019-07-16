<?php

header("Content-Type: text/html; charset=utf-8");


/**
*
*
*
* Editor usage
* > editor [filename]
*/
class PHPShell
{
    protected $ini, $showeditor, $username, $password, $nounce, 
        $command, $rows, $columns, $post, $jsCommandHist, $levelup, $changedirectory, $filetoedit;

    function __construct()
    {

    }

    public function render()
    {
       // echo "coucou";
        $this->getPost();
        $this->getConfig();
        $this->init();
        $this->api();
        $this->initLogin();
        $this->initShell();
        $this->initHistory();
        $this->displayHeaders();
        $this->displayLogin();
        $this->displayShell();
        $this->displayFooter();
        // var_dump('session', $_SESSION);
    }

    protected function displayHeaders()
    {
        ob_start();
        ?>
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
           "http://www.w3.org/TR/html4/strict.dtd">
        <html>
        <head>
          <title>AODF Shell</title>
          <meta http-equiv="Content-Script-Type" content="text/javascript">
          <meta http-equiv="Content-Style-Type" content="text/css">
          <link rel="stylesheet" href="style.css" type="text/css">
          <script src="phpshell.js"></script>
        </head>
        <body onload="">
            <script type="text/javascript">
                document.body.onload = function() {
                    init(<?=$_SESSION['authenticated'] ? 'true' : 'false'?>, <?=$this->showeditor ? 'true' : 'false' ?>, <?="'".$this->jsCommandHist."'"?>);
                };
            </script>
        <h1>AODF Shell</h1>
        
        <form name="shell" enctype="multipart/form-data" action="<?=$_SERVER['PHP_SELF']?>" method="post">
        <div><input name="levelup" id="levelup" type="hidden"></div>
        <div><input name="changedirectory" id="changedirectory" type="hidden"></div>
        <?php
        $html = ob_get_contents();
        ob_end_clean();
        echo $html;
    }

    protected function initHistory()
    {
        if (empty($_SESSION['history'])) {
            $this->jsCommandHist = '';
        } else {
            $escaped = array_map('addslashes', $_SESSION['history']);
            array_unshift($escaped, '');
            // $this->jsCommandHist = '"' . implode('", "', $escaped) . '"';
            $this->jsCommandHist = implode(',', $escaped);
            // $this->jsCommandHist = json_encode($escaped);
        }
    }

    protected function initLogin()
    {
        if (!isset($_SESSION['authenticated'])) {
           $_SESSION['authenticated'] = false;
        }
    }

    protected function displayFooter()
    {
        echo '</form></body></html>';
    }

    protected function displayLogin()
    {
        if ($_SESSION['authenticated'])
            return;
        $_SESSION['nounce'] = mt_rand();
        if (ini_get('safe_mode') && $this->ini['settings']['safe-mode-warning'] == true) {
            echo '<div class="warning">Warning: Safe-mode is enabled. PHP Shell will probably not work correctly.</div>';
        }

        ob_start();
        ?>

        <div class="login-box">
            <div class="login-title">Authentication</div>
            <?php
            if (!empty($this->username)) {
                echo "<p class=\"error\">Login failed, please try again</p>\n";
            }
            ?>
            <label for="username">Username:</label>
            <input name="username" id="username" type="text" value="<?=$this->username ?>">
            <br><br>
            <label for="password">Password:</label>
            <input name="password" id="password" type="password">
            <br><br>
            <div style="text-align: center;padding: 15px;">
            <input class="submit-button" type="submit" value="Login">
            </div>
            <input name="nounce" type="hidden" value="<?=$_SESSION['nounce']; ?>">
        </div>

        <?php
        $html = ob_get_contents();
        ob_end_clean();
        echo $html;
    }


    protected function displayShell()
    {
        if (!$_SESSION['authenticated'])
            return;
        $this->displayBreadcrumb();
        echo '<div style="margin:20px 0">running on: ' . $_SERVER['SERVER_NAME'] . '</div>';
        if (!$this->showeditor) {
            $this->displayTerminal();
            $this->displayButtons();
        } else {
            $this->displayTerminalEditor();
            $this->displayEditorButtons();
        }
        echo "<input type=\"submit\" name=\"logout\" value=\"Logout\">";
        if ($this->ini['settings']['file-upload'])
            $this->displayUpload();
        $this->displayTips();
    }

    protected function displayTerminal()
    {
        ob_start();
        ?>

        <div id="terminal">
            <textarea name="output" readonly="readonly" cols="<?php echo $this->columns ?>" rows="<?php echo $this->rows ?>">
            <?php
                    $lines = substr_count($_SESSION['output'], "\n");
                    $padding = str_repeat("\n", max(0, $this->rows + 1 - $lines));
                    echo rtrim($padding . $_SESSION['output']);
            ?>
            </textarea>
            <p id="prompt">
            <span id="ps1"><?php echo htmlspecialchars($this->ini['settings']['PS1'], ENT_COMPAT, 'UTF-8'); ?></span>
            <input name="command" type="text" onkeyup="key(event)"
                   size="<?php echo $this->columns - strlen($this->ini['settings']['PS1']); ?>" tabindex="1">
            </p>
        </div>

        <?php
        $html = ob_get_contents();
        ob_end_clean();
        echo $html;   
    }

    protected function displayButtons()
    {
        ob_start();
        ?>
            <span style="float: right">
                Size: 
                <input type="text" name="rows" size="2" maxlength="3" value="<?php echo $this->rows ?>">
                &nbsp; &times; &nbsp; 
                <input type="text" name="columns" size="2" maxlength="3" value="<?php echo $this->columns?>">
            </span>
            <br>
            <input type="submit" value="Execute command">
            <input type="submit" name="clear" value="Clear screen">
        <?php
        $html = ob_get_contents();
        ob_end_clean();
        echo $html;   
    }

    protected function displayEditorButtons()
    {
        ob_start();
        ?>
        <input type="hidden" name="filetoedit" id="filetoedit" value="<?=$this->filetoedit ?>">
        <input type="submit" value="Save and Exit">
        <input type="reset" value="Undo all Changes">
        <input type="submit" value="Exit without saving" onclick="javascript:document.getElementById('filetoedit').value='';return true;">
        <?php
        $html = ob_get_contents();
        ob_end_clean();
        echo $html;   
    }

    protected function displayTerminalEditor()
    {
        echo "You are editing this file: " . $this->filetoedit;
        ob_start();
        ?>
        <div id="terminal">
            <textarea name="filecontent" cols="<?php echo $this->columns ?>" rows="<?php echo $this->rows ?>">
            <?php
                if (file_exists($this->filetoedit)) {
                     print(htmlspecialchars(str_replace("%0D%0D%0A", "%0D%0A", file_get_contents($this->filetoedit))));        
                }
            ?>
            </textarea>
        </div>
        <?php
        $html = ob_get_contents();
        ob_end_clean();
        echo $html;  
    }

    protected function displayUpload()
    {
        ob_start();
        ?>
        <br><br>
        <h2>File upload</h2>
        Select file for upload:
        <input type="file" name="uploadfile" size="40"><br>
        <input type="submit" value="Upload file">
        <?php
        $html = ob_get_contents();
        ob_end_clean();
        echo $html;          
    }

    protected function displayTips()
    {
        ob_start();
        ?>
        <br><br>
        <h2>Tips</h2>
        <ul>
            <li>editor [filename] to edit a file</li>
            <li>/pwhash.php to generate a secured password. Then copy / paste in the config.php file under the users section</li>
        </ul>        
        <?php
        $html = ob_get_contents();
        ob_end_clean();
        echo $html;          
    }

    protected function displayBreadcrumb()
    {
        echo '<span class="pwd">';
        if ( $this->showeditor ) {
            echo htmlspecialchars($_SESSION['cwd'], ENT_COMPAT, 'UTF-8') . '</span>';
        } else {
            $parts = explode('/', $_SESSION['cwd']);         
            for ($i = 1; $i < count($parts); $i++) {
                echo '<a class="pwd" title="Change to this directory. Your command will not be executed." 
                    href="javascript:levelup(' . (count($parts)-$i-1) . ')">'. htmlspecialchars($parts[$i], ENT_COMPAT, 'UTF-8') .'</a>/' ;
            }
            echo '</span>';
            if (is_readable($_SESSION['cwd'])) { /* is the current directory readable? */
                /* Now we make a list of the directories. */
                $dir_handle = opendir($_SESSION['cwd']);
                /* We store the output so that we can sort it later: */
                $options = array();
                /* Run through all the files and directories to find the dirs. */
                while ($dir = readdir($dir_handle)) {
                    if (($dir != '.') and ($dir != '..') and is_dir($_SESSION['cwd'] . "/" . $dir)) {
                        $options[$dir] = "<option value=\"/$dir\">$dir</option>";
                    }
                }
                closedir($dir_handle);
                if (count($options) > 0) {
                    ksort($options);
                    echo '<br><br><a href="javascript:changesubdir()">Change to subdirectory</a>: <select name="dirselected">';
                    echo implode("\n", $options);
                    echo '</select>';
                }
            } else {
                echo "[current directory not readable]";
            }  
        }


    }

    protected function api()
    {
        if (isset($this->post['logout'])) {
            $this->logout();
        }

        if (isset($this->post['clear'])) {
            $this->clearScreen();
        }

        if ($this->nounce) {
            $this->login();
        }

    }

    protected function login()
    {
        if (isset($_SESSION['nounce']) 
            && $this->ini['users'][$this->username] 
            && $this->nounce == $_SESSION['nounce']) {

            if (strchr($this->ini['users'][$this->username], ':') === false) {
                // No seperator found, assume this is a password in clear text.
                $_SESSION['authenticated'] = ($this->ini['users'][$this->username] == $this->password);
            } else {
                list($fkt, $salt, $hash) = explode(':', $this->ini['users'][$this->username]);
                $_SESSION['authenticated'] = ($fkt($salt . $this->password) == $hash);
            }
        }
    }

    protected function init()
    {
        $this->showeditor = false;
        session_start();
    }

    protected function initShell()
    {
        if (!$_SESSION['authenticated'])
            return;
        $this->initSession();
        $this->levelup();
        $this->changeDirectory();
        $this->uploadFile();
        $this->editFile();
        $this->execShellCommand();      
    }


    protected function getConfig()
    {
        $this->ini = parse_ini_file('config.php', true);
        if (empty($this->ini['settings'])) {
            $this->ini['settings'] = array();
        }

        $default_settings = array('home-directory' => '.',
                                  'PS1'            => '$ ');
        $this->ini['settings'] = array_merge($default_settings, $this->ini['settings']);
    }

    protected function getPost()
    {
        if ($_POST) {
            $this->post = $this->stripslashes_rec($_POST);
        }

        $this->username = isset($this->post['username']) ? $this->post['username'] : '';
        $this->password = isset($this->post['password']) ? $this->post['password'] : '';
        $this->nounce   = isset($this->post['nounce'])   ? $this->post['nounce']   : '';

        $this->command  = isset($this->post['command'])  ? $this->post['command']  : '';
        $this->rows     = isset($this->post['rows'])     ? $this->post['rows']     : 24;
        $this->columns  = isset($this->post['columns'])  ? $this->post['columns']  : 80;

        if (!preg_match('/^[[:digit:]]+$/', $this->rows)) { 
            $this->rows = 24 ; 
        } 
        if (!preg_match('/^[[:digit:]]+$/', $this->columns)) {
            $this->columns = 80 ;
        }
    }


    protected function logout()
    {
        session_destroy();
        session_start();
        $_SESSION = array('authenticated' => false);
    }

    protected function clearScreen() 
    {
        $_SESSION['output'] = '';
    }

    protected function stripslashes_rec($value)
    {
        if (is_array($value)) {
            return array_map(array($this, 'stripslashes_rec'), $value);
        } else {
            return stripslashes($value);
        }
    }

    protected function initSession()
    {
        if (empty($_SESSION['cwd'])) {
            $_SESSION['cwd'] = realpath($this->ini['settings']['home-directory']);
            $_SESSION['history'] = array();
            $_SESSION['output'] = '';
        }
    }

    protected function levelup()
    {
        if (isset($this->post['levelup'])) {
            $this->levelup = $this->post['levelup'] ;
            while ($this->levelup > 0) {
                $this->command = '' ; /* ignore the command */
                $_SESSION['cwd'] = dirname($_SESSION['cwd']);
                $this->levelup -- ;
            }
        }
    }

    protected function changeDirectory()
    {
        if (isset($this->post['changedirectory'])) {
            $changedir = $this->post['changedirectory'];
            if (strlen($changedir) > 0) {
                if (@chdir($_SESSION['cwd'] . '/' . $changedir)) {
                    $this->command = '' ; /* ignore the command */
                    $_SESSION['cwd'] = realpath($_SESSION['cwd'] . '/' . $changedir);
                }
            }
        }
    }

    protected function uploadFile()
    {
        if (isset($_FILES['uploadfile']['tmp_name'])) {
            if (is_uploaded_file($_FILES['uploadfile']['tmp_name'])) {
                if (!move_uploaded_file($_FILES['uploadfile']['tmp_name'], $_SESSION['cwd'] . '/' . $_FILES['uploadfile']['name'])) { 
                    echo "CANNOT MOVE {$_FILES['uploadfile']['name']}" ;
                }
            }
        }
    }

    protected function editFile()
    {
        if (isset($this->post["filetoedit"]) && ($this->post["filetoedit"] != "")) {
            $filetoedit_handle = fopen($this->post["filetoedit"], "w");
            fputs($filetoedit_handle, str_replace("%0D%0D%0A", "%0D%0A", $this->post["filecontent"]));
            fclose($filetoedit_handle);
        }
    }

    protected function execShellCommand()
    {
        if (empty($this->command))
            return;
        $this->addToHistory();
        $this->addToOutput();

        if (trim($this->command) == 'cd') {
            $_SESSION['cwd'] = realpath($this->ini['settings']['home-directory']);
        } elseif (preg_match('/^[[:blank:]]*cd[[:blank:]]+([^;]+)$/', $this->command, $regs)) {
            $this->changeDirCmd($regs);
        } elseif (trim($this->command) == 'history') {
            $this->historyCmd();
        } elseif (preg_match('/^[[:blank:]]*history[[:blank:]]*-c[[:blank:]]*$/', $this->command)) {
            // history command (with parameter "-c") - clear the command history
            $_SESSION['history'] = array() ;
        } elseif (trim($this->command) == 'clear') {
            // "clear" command - clear the screen
            clearScreen();
        } elseif (trim($this->command) == 'editor') {
            // if 'editor' is called without a filename
            $_SESSION['output'] .= " Syntax: editor filename\n (you forgot the filename)\n";
        } elseif (preg_match('/^[[:blank:]]*editor[[:blank:]]+([^;]+)$/', $this->command, $regs)) {
            $this->editorCmd($regs);
        } elseif ((trim($this->command) == 'exit') || (trim($this->command) == 'logout')) {
            $this->logout();
        } else {
            // The command is not an internal command, so we execute it after changing the directory
            if (@chdir($_SESSION['cwd'])) {
                $this->execCmd();
            } else { 
                // it was not possible to change to working directory. Do not execute the command
                $_SESSION['output'] .= "PHP Shell could not change to working directory. Your command was not executed.\n";
            }
        }
    }

    protected function addToHistory()
    {
        if (($i = array_search($this->command, $_SESSION['history'])) !== false) {
            unset($_SESSION['history'][$i]);
        }
        array_unshift($_SESSION['history'], $this->command);
    }

    protected function addToOutput()
    {
        $_SESSION['output'] .= htmlspecialchars($this->ini['settings']['PS1'] . $this->command, ENT_COMPAT, 'UTF-8') . "\n";
    }
      
    protected function changeDirCmd($regs)
    {
        // remove quotes 
        if ((substr($regs[1], 0, 1) == '"') && (substr($regs[1], -1) =='"') ) {
            $regs[1] = substr($regs[1], 1);
            $regs[1] = substr($regs[1], 0, -1);
        }

        if ($regs[1]{0} == '/') {
            $new_dir = $regs[1];
        } else {
            $new_dir = $_SESSION['cwd'] . '/' . $regs[1];
        }

        // Transform '/./' into '/'
        while (strpos($new_dir, '/./') !== false) {
            $new_dir = str_replace('/./', '/', $new_dir);
        }

        // Transform '//' into '/'
        while (strpos($new_dir, '//') !== false) {
            $new_dir = str_replace('//', '/', $new_dir);
        }

        // Transform 'x/..' into ''
        while (preg_match('|/\.\.(?!\.)|', $new_dir)) {
            $new_dir = preg_replace('|/?[^/]+/\.\.(?!\.)|', '', $new_dir);
        }

        if ($new_dir == '') {
            $new_dir = '/';
        }

        if (@chdir($new_dir)) {
            $_SESSION['cwd'] = $new_dir;
        } else {
            $_SESSION['output'] .= "cd: could not change to: $new_dir\n";
        }
    }

    protected function historyCmd()
    {
        $i = 1 ; 
        foreach ($_SESSION['history'] as $histline) {
            $_SESSION['output'] .= htmlspecialchars(sprintf("%5d  %s\n", $i, $histline), ENT_COMPAT, 'UTF-8');
            $i++;
        }
    }

    protected function editorCmd($regs)
    {
        $this->filetoedit = $regs[1];
        if ($regs[1]{0} != '/') {
            $this->filetoedit = $_SESSION['cwd'].'/'.$regs[1];
        }
        if (is_file(realpath($this->filetoedit)) || ! file_exists($this->filetoedit)) {
            $this->showeditor = true;
            if (file_exists(realpath($this->filetoedit))) {
                $this->filetoedit = realpath($this->filetoedit);
            }
        } else {
            $_SESSION['output'] .= " Syntax: editor filename\n (just regular or not existing files)\n";
        }
    }


    protected function execCmd()
    {
        // We canot use putenv() in safe mode.
        if (!ini_get('safe_mode')) {
            // Set the terminal size.
            putenv('ROWS=' . $this->rows);
            putenv('COLUMNS=' . $this->columns);
        }

        // Alias
        $length = strcspn($this->command, " \t");
        $token = substr($this->command, 0, $length);
        if (isset($this->ini['aliases'][$token])) {
            $this->command = $this->ini['aliases'][$token] . substr($this->command, $length);
        }

        //Exec the command
        $io = array();
        $p = proc_open(
            $this->command,
            array(1 => array('pipe', 'w'),
                  2 => array('pipe', 'w')),
            $io
        );

        // Read output sent to stdout
        while (!feof($io[1])) {
            $line=fgets($io[1]);
            if (function_exists('mb_convert_encoding')) {
                // fix "htmlspecialchars(): Invalid multibyte sequence in argument" error
                $line = mb_convert_encoding($line, 'UTF-8', 'UTF-8');
            }
            $_SESSION['output'] .= htmlspecialchars($line, ENT_COMPAT, 'UTF-8');
        }
        // Read output sent to stderr
        while (!feof($io[2])) {
            $line=fgets($io[2]);
            if (function_exists('mb_convert_encoding')) {
                // fix "htmlspecialchars(): Invalid multibyte sequence in argument" error
                $line = mb_convert_encoding($line, 'UTF-8', 'UTF-8');
            }
            $_SESSION['output'] .= htmlspecialchars($line, ENT_COMPAT, 'UTF-8');
        }
        fclose($io[1]);
        fclose($io[2]);
        proc_close($p);
    }


    public function error_handler($errno, $errstr, $errfile, $errline, $errcontext)
    {
        if (error_reporting() == 0) {
            $_SESSION['output'] .= $errstr . "\n";
        } else {
            ob_start();
            ?>
            <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
            <html>
            <head>
                <title>AODF Shell</title>
                <meta http-equiv="Content-Script-Type" content="text/javascript">
                <meta http-equiv="Content-Style-Type" content="text/css">
                <link rel="stylesheet" href="style.css" type="text/css">
            </head>
            <body>
                <h1>Fatal Error !</h1>
                <p><b><?=$errstr ?></b></p>
                <p>in <b><?=$errfile ?></b>, line <b><?=$errline ?></b>.</p>
            </body>
            </html>            
            <?php
            $html = ob_get_contents();
            ob_end_clean();
            die($html);
        }
    }


}

$PHPShell = new PHPShell();
set_error_handler(array($PHPShell, 'error_handler'));
$PHPShell->render();