const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColors');
const range = document.getElementById("jsRange");
const mode =document.getElementById("jsMode");
const Canvas_size = 700;
const saveBtn = document.getElementById("jsSave");
const Initila_Color = "#2c2c2c";

canvas.width = Canvas_size;
canvas.height = Canvas_size;

ctx.fillStyle ="white";
ctx.fillRect(0,0,Canvas_size,Canvas_size);

ctx.strokeStyle = Initila_Color;
ctx.fillStyle = Initila_Color;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;


function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMousemove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    // painting = false
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } 
    // painting = true
    else{
        ctx.lineTo(x,y);
        ctx.stroke();
        // ctx.fill();
    }
}

function onMouseDown(event){
    painting = true;
}

function onMouseup(event){
    stopPainting();
}

function onMouseLeave(event){
    stopPainting();
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    // 개인코드 시작
    // if(filling === false){
    //     ctx.strokeStyle = color;
    // }
    // else{
    //     canvas.style.backgroundColor = color;
    // }
    // 개인코드 끝
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
        
    }
    else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){        
        ctx.fillRect(0,0,Canvas_size,Canvas_size)
    }
}

function handleCM(event){
    event.preventDefault();
}

function handelSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMousemove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM)
}



Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener('input', handleRangeChange)
}

if(mode){
    mode.addEventListener("click", handleModeClick)
}

if(saveBtn){
    saveBtn.addEventListener("click", handelSaveClick)
}