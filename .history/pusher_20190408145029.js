var replace = require('replace');
var cd = require('cd');
// let newCodeDir = cd('./react-dashboard');
// let phpDir = cd('.')
var fs = require('fs');
// let phpText = phpDir('index')

fs.readdir('./react-dashboard/build/static/js', function(err, items) {
    console.log(items);
 
    for (var i=0; i<items.length; i++) {
        
        let hash = items[i].match(/(?<=ee1b4088\s+).*?(?=\s+js)/gs)
        console.log(hash);

    }
});
 

