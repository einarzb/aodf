<?php
    
 
class packageManager { 

    protected $packageUrl, $packageName;
	protected $output = array();
    protected $rows = 24;
    protected $columns = 80;

	public function start()
	{
        // if (!isset($_POST['package_url']) || !isset($_POST['package_name'])) {
        //     $this->output('no package given');
        //     $this->response('error');
        // }

        // $this->packageUrl = $_POST['package_url'];
        // $this->packageName = $_POST['package_name'];
        // $this->output('Package name : ' . $this->packageName);
        // $this->output('Package url : ' . $this->packageUrl);
        
        // $this->downloadPackage();
        $this->installPackage();

		$this->response('success');
	}

    // protected function downloadPackage()
    // {
    //     $this->output('$shell>cd packages');
    //     if (!@chdir('packages')) {
    //         $this->output('could not move to <packages> directory');
    //         $this->response('error');
    //     }

    //     if (file_exists($this->packageName)) {
    //         $this->output('package already on AODF. Deleting it...');
    //         $this->execCmd('rm ' . $this->packageName);
    //     }
        
    //     $this->execCmd('wget ' . $this->packageUrl);
    //     if (!file_exists($this->packageName)) {
    //         $this->output('could not download the package');
    //         $this->response('error');
    //     }
    // }

    protected function installPackage()
    {
        $this->output('Installing package...');
        // $this->execCmd('/usr/sbin/opkg install ' . $this->packageName);
        $this->execCmd('/scripts/run_root 3');
        $this->execCmd('/scripts/run_root 4');
    }

    protected function execCmd($command)
    {
        $this->output('$shell>' . $command);
        // We canot use putenv() in safe mode.
        if (!ini_get('safe_mode')) {
            putenv('ROWS=' . $this->rows);
            putenv('COLUMNS=' . $this->columns);
        }

        $length = strcspn($command, " \t");
        $token = substr($command, 0, $length);

        //Exec the command
        $io = array();
        $p = proc_open(
            $command,
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
            // $this->output[] = htmlspecialchars($line, ENT_COMPAT, 'UTF-8');
            $this->output($line);
        }
        // Read output sent to stderr
        while (!feof($io[2])) {
            $line=fgets($io[2]);
            if (function_exists('mb_convert_encoding')) {
                // fix "htmlspecialchars(): Invalid multibyte sequence in argument" error
                $line = mb_convert_encoding($line, 'UTF-8', 'UTF-8');
            }
            // $this->output[] = htmlspecialchars($line, ENT_COMPAT, 'UTF-8');
            $this->output($line);
        }
        fclose($io[1]);
        fclose($io[2]);
        proc_close($p);
    }


    protected function output($output)
    {
        if (empty($output))
            return false;
        $output = rtrim($output, PHP_EOL);
        $this->output[] = $output;
    }

	protected function response($result, $data = null, $http_code = null)
	{
		if (!empty($http_code))
			set_status_header($http_code);
        $response = array('result' => $result, 'output' => $this->output);
        if ($data)
            $response = array_merge($response, $data);
		exit(json_encode($response));
	}
}
  
$packageManager = new packageManager();
$packageManager->start();