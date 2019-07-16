// import replace from 'replace';
// import cd from 'cd';
// let newCodeDir = cd('./react-dashboard');
// let phpDir = cd('.')

// let phpText = phpDir('index')

fs.readdir('./react-dashboard/build/static/js', function(err, items) {
    console.log(items);
 
    for (var i=0; i<items.length; i++) {
        console.log(items[i]);
    }
});
 

