var express = require('express');
var app = express();
var fs = require('fs');
var handlebars = require('express3-handlebars')
  .create({ defaultLayout:'main' });
var gm = require('gm');
var Canvas = require('canvas');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(require('body-parser')());

var input = '/base.jpg';
var output = '/op.jpg';
var t="",s="";

app.get('/', function(req,res){
    res.render('home');
});

app.post('/process', function(req,res){
    t=req.body.name;
    s=req.body.event;
    gm(__dirname + '/public/base.jpg')
      .drawText(118,-291,t,'Center')
      .drawText(0,148,s,'Center')
      .fontSize(90)
      .stream('jpg', function(err, stdout, stderr){
          stdout.pipe(res);
      });
   
});

app.get('/req', function(req,res){
    t= req.query.name;
    s= req.query.event;
    res.set('Content-Type', 'image/jpg');
    gm(__dirname + '/public/base.jpg')
      .drawText(118,-291,t,'Center')
      .drawText(0,148,s,'Center')
      .fontSize(90)
      .stream('jpg', function(err, stdout, stderr){
          stdout.pipe(res);
      });

});

app.get('/image', function(req,res){
 
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});
// 500 error handler (middleware)
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
