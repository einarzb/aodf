var current_line = 0;
var command_hist = 0;

function init(authenticated, showeditor, jsCommandHist) {

console.log('init', authenticated, showeditor, jsCommandHist);

	if (authenticated && !showeditor) {
		current_line = 0;
        command_hist = jsCommandHist.split(',');
		var last = 0;
        document.shell.setAttribute("autocomplete", "off");
        document.shell.output.scrollTop = document.shell.output.scrollHeight;
        document.shell.command.focus()

	} else if (authenticated && showeditor) {
		document.shell.filecontent.focus();
	} else {
        //document.shell.username.focus();		
	}
}

function levelup(d) {
	document.shell.levelup.value = d; 
	document.shell.submit();
}

function changesubdir(d) {
	document.shell.changedirectory.value=document.shell.dirselected.value ; 
	document.shell.submit() ;
}

function key(e) {
    if (!e) var e = window.event;
    if (e.keyCode == 38 && current_line < command_hist.length-1) {
        command_hist[current_line] = document.shell.command.value;
        current_line++;
        document.shell.command.value = command_hist[current_line];
    }

    if (e.keyCode == 40 && current_line > 0) {
        command_hist[current_line] = document.shell.command.value;
        current_line--;
        document.shell.command.value = command_hist[current_line];
    }

}
