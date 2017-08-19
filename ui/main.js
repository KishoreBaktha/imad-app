/*console.log('Loaded!');
//var element=document.getElementById("main_text");
//element.innerHTML='new value';
var image=document.getElementById("madi");
var marginLeft=0;
function moveRight()
{
    marginLeft=marginLeft+1;
    image.style.marginLeft=marginLeft+"px";
}
image.onclick= function ()
{
    var interval=setInterval(moveRight,50);
};
*/
//counter code
var button=document.getElementById("counter");
button.onclick= function()
{
    //create request to counter end point
    var request=new XMLHttpRequest();
    //capture response and store in variable
    request.onreadystatechange=function()
    {
        if(request.readyState==XMLHttpRequest.DONE)
        {
            //take some action
            if(request.status==200)
            {
                var counter=request.responseText;
                var span=document.getElementById("count");
                span.innerHTML=counter.toString();
            }
        }
    };
    //make request
    request.open('GET','http://kishorebaktha.imad.hasura-app.io/counter',true);
    request.send(null);
};

var submitbtn=document.getElementById("submit");
submitbtn.onclick=function()
{
  //make request to server and send the name
   var request=new XMLHttpRequest();
    //capture response and store in variable
    request.onreadystatechange=function()
    {
        if(request.readyState==XMLHttpRequest.DONE)
        {
            //take some action
            if(request.status==200)
            {
               var names=request.responseText;
               console.log(names);
               names=JSON.parse(names);//converting string to object(array)
               var list='';
             for(var i =0;i<names.length;i++)
             {
                 list+='<li>'+names[i]+'</li>';
             }
              var ul=document.getElementById("ul");
                 ul.innerHTML=list;
            }
        }
    };
    //make request
     var nameInput=document.getElementById("name");
    var name=nameInput.value;
    request.open('GET','http://kishorebaktha.imad.hasura-app.io/submit-name?name=' + name, true);
    request.send(null);
    //submit name
  //capture list of names render it as a list
    
};

//submit name,password to login
var submitbtn2=document.getElementById("submit2");
submitbtn2.onclick=function()
{
  //make request to server and send the name
   var request=new XMLHttpRequest();
    //capture response and store in variable
    request.onreadystatechange=function()
    {
        if(request.readyState==XMLHttpRequest.DONE)
        {
            //take some action
            if(request.status==200)
            {
              console.log('user logged in');
              alert('logged in successfully');
            }
            else if(request.status===403)
            {
                alert('wrong username or password');
            }
             else if(request.status===500)
            {
                alert('something went wrong in server');
            }
        }
    };
    //make request
     var username=document.getElementById("username").value;
     var password=document.getElementById("password").value;
    request.open('POST','http://kishorebaktha.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
    //submit name
  //capture list of names render it as a list
    
};


