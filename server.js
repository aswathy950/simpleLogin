var express    =    require('express');
var app        =    express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'achu123',
  database : 'gmail'
});

connection.connect();

connection.query('SELECT * from user', function(err, rows, fields) {
  if (!err){
    console.log('The solution is: ', rows);
  }
  else
    console.log('Error while performing Query.');
});



require('./router/main')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.post('/process_post', urlencodedParser, function (req, res) {

   // Prepare output in JSON format
   response = {
     user_name:req.body.user_name,
     password:req.body.password

   };
   connection.query('SELECT * from user where username="'+response.user_name+'" and password="'+response.password+'" ', function(err, rows, fields) {
     if (!err){
       console.log('The solution is: ', rows);

     }
     else
     {
       console.log('Error while performing Query.');
}
 app.session=response.user_name;


   if(rows[0]==null){

   res.redirect('error');
 }
 else {
   res.redirect('about')
 }
   console.log(response);
  // res.end(JSON.stringify(response));
 });

})

app.post('/get', urlencodedParser, function (req, res) {
  response = {
      user_name:req.body.user_name,
      password:req.body.password

  };

  connection.query('insert into user values("'+response.user_name+'","'+response.password+'")', function(err, rows, fields) {
//     if (!err){
//       console.log('The solution is: ', rows);
//
//     }
//     else
//     {
//       console.log('Error while performing Query.');
// }

});

 res.redirect('/index')

})




var server     =    app.listen(3000,function(){
console.log("Express is running on port 3000");
});
