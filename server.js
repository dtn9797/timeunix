// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var fullDate = month + ' ' + date + ' ' + year;
  return fullDate;
}
var api = {
  "unix":null,
  "natural":null
};

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:num", function (request, response) {
  var number=request.params.num;
  var arr=number.split(/[\s,]+/);
  if(parseInt(number)&&arr.length==1){
    console.log('input is number');
    api.unix=number;
    api.natural=timeConverter(number);
  }
  else {
    console.log('input is not number');
    if(arr.length==3){
      var month;var date;var year;
      var monthArr=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','1','2','3','4','5','6','7','8','9','10','11','12']
      console.log(arr[0].substr(0,1).toUpperCase()+arr[0].substr(1,arr[0].length));
      if(monthArr.indexOf(arr[0].substr(0,1).toUpperCase()+arr[0].substr(1,arr[0].length))!=-1){
        month=monthArr[monthArr.indexOf(arr[0].substr(0,1).toUpperCase()+arr[0].substr(1,arr[0].length))];
        if(parseInt(arr[1])>0 &&parseInt(arr[1])<=30){
          date=arr[1];
          if(parseInt(arr[2])>=1900){
            year=arr[2];
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            if(parseInt(month)){
              month=months[parseInt(month)-1];
            }
            api.natural=month + ' ' + date + ' ' + year;
            api.unix=new Date(month + '.' + date + '.' + year).getTime() / 1000;
          }
        }
      }
    }
    else if(arr.length!=3){
      api.unix=null;
      api.natural=null;
    }
  }
  response.send(api);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
/*app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});*/

// Simple in-memory store for now


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
