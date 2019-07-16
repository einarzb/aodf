var replace = require('replace');
var cd = require('cd');
// let newCodeDir = cd('./react-dashboard');
// let phpDir = cd('.')
var fs = require('fs');
// let phpText = phpDir('index')
const MAIN_FILE_REGEX = /main\.(.*?)\.chunk/;
const SECONDARY_FILE_REGEX = /2\.(.*?)\.chunk/;

fs.readdir('./react-dashboard/build/static/js', function(err, items) {
    console.log(items);
 
    for (var i=0; i<items.length; i++) {
        
        let mainFileHash = items[i].match(MAIN_FILE_REGEX);
        if(mainFileHash){
            console.log(mainFileHash[1]);
            replace({
                regex: /main\.(.*?)\.chunk/,
                replacement: "main."+mainFileHash+".chunk",
                paths: ['/Users/zivtaller/Documents/current-projects/aodf_app/index.php'],
                recursive: true,
                silent: false,
            });
        }

    }
});
 
fs.readdir('./react-dashboard/build/static/css', function(err, cssItems) {
    console.log(cssItems);
});
