const replace = require('replace-in-file');

var cd = require('cd');
// let newCodeDir = cd('./react-dashboard');
// let phpDir = cd('.')
var fs = require('fs');
// let phpText = phpDir('index')
const MAIN_FILE_REGEX = /main\.(.*?)\.chunk\.js/;
const CSS_FILE_REGEX = /main\.(.*?)\.chunk\.css/;

const SECONDARY_FILE_REGEX = /2\.(.*?)\.chunk/;
const INDEX_PATH = '/Users/zivtaller/Documents/current-projects/aodf_app/react-dashboard/build/index.html';


replace({
    from: '/"\/static/',
    to: '"./static',
    // files: '/Users/zivtaller/Documents/current-projects/aodf_app/index.php',
    files: INDEX_PATH,
});

// fs.readdir('./react-dashboard/build/static/js', function(err, items) {
//     console.log(items);
 
//     for (var i=0; i<items.length; i++) {
        
//         let mainFileHash = items[i].match(MAIN_FILE_REGEX);
//         if(mainFileHash){
//             console.log(mainFileHash[1]);
//             replace({
//                 from: MAIN_FILE_REGEX,
//                 to: mainFileHash,
//                 // files: '/Users/zivtaller/Documents/current-projects/aodf_app/index.php',
//                 files: INDEX_PATH,
//             });
//             continue;
//         }
//         let secondaryFileHash = items[i].match(SECONDARY_FILE_REGEX);
//         if(secondaryFileHash){
//             console.log(secondaryFileHash[1]);
//             replace({
//                 from: SECONDARY_FILE_REGEX,
//                 to: secondaryFileHash,
//                 files: INDEX_PATH,
//             });
//         }
//     }
// });
 
// fs.readdir('./react-dashboard/build/static/css', function(err, cssItems) {
//     for (var i=0; i<cssItems.length; i++) {
//         let styleFileHash = cssItems[i].match(CSS_FILE_REGEX);
//         if(styleFileHash){
//             console.log(styleFileHash[1]);
//             replace({
//                 from: CSS_FILE_REGEX,
//                 to: styleFileHash,
//                 files:INDEX_PATH,
//             });
//             continue;
//         }
//     }
// });
