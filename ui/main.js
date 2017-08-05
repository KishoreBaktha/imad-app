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
        if(request.readystate==XMLHttpRequest.DONE)
        {
            //take some action
            if(request.status==200)
            {
                var counter=request.responseText;
                counter=counter+1;
                var span=document.getElementById("count");
                span.innerHTML=counter.toString();
            }
        }
    };
    //make request
    request.open('GET','http://kishorebaktha.imad.hasura-app.io/counter',true);
    request.send(null);
};
