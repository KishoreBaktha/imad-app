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
               var names=request.responeText;
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


