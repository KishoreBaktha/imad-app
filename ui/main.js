console.log('Loaded!');
var element=document.getElementById("main_text");
element.innerHTML='new value';
var image=document.getElementById("madi");
image.onClick= function ()
{
    image.style.marginLeft='100px';
}