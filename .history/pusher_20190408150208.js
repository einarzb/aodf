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
        
        let hash = items[i].match();
        if(hash){
            console.log(hash[1]);
            // replace({
            //     regex: "string to be replaced",
            //     replacement: "replacement string",
            //     paths: ['path/to/your/file'],
            //     recursive: true,
            //     silent: true,
            // });
        }

    }
});
 
fs.readdir('./react-dashboard/build/static/css', function(err, items) {
    console.log(items);
});
