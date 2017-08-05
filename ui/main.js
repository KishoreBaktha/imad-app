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
var counter=0;
var button=document.getElementById("counter");
button.onclick= function()
{
    //make request to counter end point
    
    //capture response and store in variable
    
    //render the variable in the correct span
    counter=counter+1;
    var span=document.getElementById("count");
    span.innerHTML=counter.toString();
};
