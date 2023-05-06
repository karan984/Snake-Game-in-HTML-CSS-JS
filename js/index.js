// Game Constants And Variables

let inputDir = {x:0, y:0};
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");

let speed = 5;
let lastPaintTime =0;
let snakeArr = [
    {x:13, y:15}
];
let food = {x:6, y:7};
let score = 0;
let gameStart = false;


// Game Functions

function main(ctime){
    window.requestAnimationFrame(main);

    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }

    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    
    // if snake collides in itself
    for(let i = 3; i<snake.length; i++)
    {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    // if snake collides with wall

    if(snake[0].x<0 || snake[0].x>17){
        return true;
    }else if(snake[0].y<0 || snake[0].y>17){
        return true;
    }

    return false;
}

function gameEngine(){
    //part1 - updating snake variable (array) & food

    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game Over ! Press any key to play again!");
        snakeArr = [{x:13, y:15}];
        //musicSound.play();
        score = 0;
        document.querySelector("#score").innerHTML="Score: 0";
        gameStart = false;
    }


    // if eaten food, increase score and generate food

    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x, y : snakeArr[0].y + inputDir.y});
        let a =2;
        let b = 16;
        // to make game a little easy we have kept it between 2 to 16, whereas we have total 18 grids
        // below is way to generate random number between a and b
        foodSound.play();
        score++;
        document.querySelector("#score").innerHTML="Score: "+score;
        food = {x : Math.round(a + (b-a)*Math.random()), y : Math.round(a+(b-a)*Math.random())};

    }


    // Moving the snake 

    for(i=snakeArr.length-2; i>=0; i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    //part2 - displaying snake & food
    board.innerHTML = "";
    
    snakeArr.forEach((e, index)=>{
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    })
    

    let foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}



//Main logic starts here

window.requestAnimationFrame(main);

window.addEventListener('keydown', e=>{
    // start the game
    

    //musicSound.play();
    moveSound.play();



    switch(e.key){
        case "ArrowUp":
            if(inputDir.x === 1 || inputDir.x === -1 || gameStart===false){
            gameStart = true;
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            }
            break;

        case "ArrowDown":
            if(inputDir.x === 1 || inputDir.x === -1 || gameStart === false){
                gameStart = true;
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            }
            break;

        case "ArrowLeft":
            if(inputDir.y === 1 || inputDir.y === -1 || gameStart === false){
                gameStart = true;
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            }
            break;
            
        case "ArrowRight":
            if(inputDir.y === 1 || inputDir.y === -1 || gameStart === false){
                gameStart = true;
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            }
            break;

        default:
            break;
    }

})

