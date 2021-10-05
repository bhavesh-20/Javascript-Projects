const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
    res.sendFile(__dirname+"/index.html");
});



app.post('/data', function (req,res){
    const query = req.body.cityname;
    console.log(query);
    const appid = "2b4968ce4905ac02dbc8700e9ad35d69";
    const unit = "metric"; 
    
    url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+unit;

    https.get(url,function(response){
        console.log(response.statusMessage)
        response.on("data",function(data){
            const weatherdata = JSON.parse(data);
            // console.log(JSON.stringify(weatherdata));
            const temp = weatherdata.main.temp;
            const icon = weatherdata.weather[0].icon;
            const img = "http://openweathermap.org/img/wn/"+icon+"@2x.png" 
            console.log(temp);
            res.write("<h1>temperature in "+ query+" is "+temp+" Celcius</h1>");
            const x = "<img src='"  +img+"'>";
            res.write(x);
            res.send();
        });
    });
    // res.send('server runnning');
});

app.post('/', )

app.listen(3000);