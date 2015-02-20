var express = require('express'),
    path = require('path'),
    app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('*', function(req, res){
  res.render('index.html');
});

var server = app.listen(8080);
console.log('Server running at on port 8080');