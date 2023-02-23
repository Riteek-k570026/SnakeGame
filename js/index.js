let inputdir={x:0, y:0}; // this is javascript object that can hold many value
const foodSound= new Audio("food.mp3");
const gameOverSound=new Audio("gameover.mp3");
const moveSound=new Audio("move.mp3");
const musicSound=new Audio("music.mp3");
let lastPaintTime=0;
let speed=5;
score=0;
// inputdir={x:0,y:0};
let snakeArr=[
    {x:13, y:15}
]
let food= {x:4, y:7}
// Game functionsjs/index.js
function main(ctime){
    window.requestAnimationFrame(main); // this is for repaint snake game
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000< 1/speed){  //this is for control fps of the game
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snake){
    for(let i=1; i< snake.length; i++){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            return true;
        } 
    }
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        console.log("hit into the wall")
        return true;
    }
}
function gameEngine(){
    // Its check where snake is collide or not;
    if(isCollide(snakeArr)){
        moveSound.pause();
        gameOverSound.play();
        inputdir={x:0,y:0};
        alert("Game Over. Press any key to continue ")
        snakeArr = [{x:13, y:15}];
        // musicSound.play();
        score = 0; 
    }
    // if you have eaten the food, increment the score and regenetate the food.
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        score += 1;
        if(score>highScoreVal){
            highScoreVal = score;
            localStorage.setItem("highScoreString", +JSON.stringify(highScoreVal));
            highScoreBox.innerHTML="High Score : " + highScoreVal;
        }
        scorebox.innerHTML = "Score :" + score;
        snakeArr.unshift({x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y});
        let a= 2 ;
        let b = 16;
        // generate food
        food = {x: Math.round(a +(b-a) * Math.random()), y: Math.round(a +(b-a) * Math.random())}
        console.log(food.x,food.y)
    }
    //moving snake
    for(let i = snakeArr.length - 2; i >= 0 ; i--){
        // const element= array[i];
        snakeArr[i+1]={...snakeArr[i]};

    }
    snakeArr[0].x+=inputdir.x;
    snakeArr[0].y+=inputdir.y;
    // updating the snake array and food
    // display the snake and food
    
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement= document.createElement("div");
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index === 0){
            snakeElement.classList.add("head");
        }
        else{
            snakeElement.classList.add("snakeBody");
        }
        board.appendChild(snakeElement);
    })
    foodElement= document.createElement("div");
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}
// Game logic 

let highScoreString = localStorage.getItem("highScoreString");
if(highScoreString === null){
    highScoreVal=0;
    localStorage.setItem("highScoreString", JSON.stringify(highScoreVal));
}
else{
    highScoreVal=JSON.parse(highScoreString);
    highScoreBox.innerHTML="High Score : "+ highScoreString;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", e=>{
    inputdir = {x:0, y:1};
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("arrowUp");
            inputdir.x=0;
            inputdir.y=-1;
            break;
        case "ArrowDown" :
            console.log("arrowDown");
            inputdir.x=0;
            inputdir.y=1;
            break;
        case "ArrowLeft" : 
            console.log("arrowLeft");
            inputdir.x=-1;
            inputdir.y=0;
            break;
        case "ArrowRight" :
            console.log("arrowRight");
            inputdir.x=1;
            inputdir.y=0;
            break;
        default :
            break;
    }
});