var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto=require('crypto');
//DATABASE
var Pool=require('pg').Pool;
var config={
  user:'kishorebaktha',
  database:'kishorebaktha',
  host:'db.imad.hasura-app.io',
  port:'5432',
  //environment variable
  password:process.env.DB_PASSWORD
  };
var app = express();
app.use(morgan('combined'));
var articles={
          'article-one':{
    title:'Article one-Kishore Baktha',
    heading: 'Article one',
    date:'August 4 2017',
    content:`
         <p>
            Content for my first article. Content for my first article. Content for my first article. Content for my first article. Content for my first article Content for my first article
        </p>
         <p>
            Content for my first article. Content for my first article. Content for my first article. Content for my first article. Content for my first article Content for my first article
        </p>
         <p>
            Content for my first article. Content for my first article. Content for my first article. Content for my first article. Content for my first article Content for my first article
        </p>
    `
    },
    'article-two':{
        title:'Article two-Kishore Baktha',
    heading: 'Article two',
    date:'August 4 2017',
    content:`
         <p>
            Content for my second article.
        </p>
         <p>
            Content for my second article
        </p>
         <p>
            Content for my second article.
        </p>`
               },
    'article-three':{
        title:'Article three-Kishore Baktha',
    heading: 'Article three',
    date:'August 4 2017',
    content:`
         <p>
            Content for my third article.
        </p>
         <p>
            Content for my third article
        </p>
         <p>
            Content for my third article.
        </p>`
    }
    };
    function template(data)
    {
        var title=data.title;
        var date=data.date;
        var heading=data.heading;
        var content=data.content;
    var htmlTemplate=
        `<html>
       <head>
    <title>
       ${title}
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link href="/ui/style.css" rel="stylesheet" />
</head>    
<body>
    <div class="container">
    <div>
     <a href="/">Home</a>   
    </div>
    <hr/>
    <h3>
        ${heading}
    </h3>
    <div>
        ${date.toDateString()}
    </div>
    <div>
        ${content}
    </div>
    </div>
 </body>
  </html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/location', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'location.html'));
});

function hash(input,salt)
{
    //how to create hash
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return hashed.toString('hex');
    
}

app.get('/hash/:input', function(req,res)
{
   var hashstring=hash(req.params.input,'this-is-some-random-string');
   res.send(hashstring);
});

//database2
var pool=new Pool(config);
app.get('/test-db',function(req,res)
{
 //make a select request
 pool.query("SELECT * FROM article where title='article-one'",function(err,result)
 {
    if(err)
    {
        res.status(500).send(err.toString());
    }
    else
    {
        res.send(JSON.stringify(result.rows));
    }
 });
 //return response with result
});
/*
//one way to get name
app.get('/submit-name/:name', function (req, res) {
  //get name from the request
  var name=req.params.name;
  names.push(name);
  res.send(JSON.stringify(names));
});
*/
//second way to get name
var names=[];
app.get('/submit-name', function (req, res)//submit-name?name=xxxx
{
  //get name from the request
  var name=req.query.name;
  names.push(name);
  res.send(JSON.stringify(names));
});
var counter=0;
app.get('/counter',function(req,res) {
   counter=counter+1;
   res.send(counter.toString());
});
app.get('/:articleName', function(req,res){
    var articleName=req.params.articleName;
    res.send(template(articles[articleName]));
    //res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));  
//res.send('Article one will be served here');
});
//SELECT * FROM article WHERE title='';DELETE WHERE a='a
app.get('/articles/:articleName', function(req,res){
    pool.query("SELECT * FROM article WHERE title=$1",[req.params.articleName],function(err,result)
    {
         if(err)
    {
        res.status(500).send(err.toString());
    }
    else
    {
        if(result.rows.length===0)
        {
            res.status(404).send('Article not found');
        }
        else
        {
            var articleData=result.rows[0];
             res.send(template(articleData));
        }
    }
        
    });
   
    //res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));  
//res.send('Article one will be served here');
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
