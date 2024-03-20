let oCanvas = document.querySelector('canvas');

let ctx = oCanvas.getContext('2d');

oCanvas.width = 600;
oCanvas.height = 600;

let level;
let flag = 0;
let _score = 0;
let _snake = [];
let _food = {};
let _direction = {
    x : -1,
    y : 0
}

let playerLevel=()=>{
    if(_score>=150)
        level="高玩"
    else if(_score>=100)
        level="海星"
    else
        level="菜狗"
    document.getElementById('appraise').innerHTML="我的评价是:"+level;
}

let newgame=()=>{
    _snake = [];
    for(let i = 0; i < 5; i++){
        _snake.push({
            x : 10,
            y : 10
        });
    }
    
    _food = {
        x : parseInt(Math.random() * 20),
        y : parseInt(Math.random() * 20)
    }
}

let draw=()=>{
    ctx.clearRect(0,0,oCanvas.width,oCanvas.height);
    ctx.fillStyle='rgba(60, 161, 179,0.8)';
    for(let x = 0; x < 20; x++){
        for(let y = 0; y < 20; y++){
            ctx.fillRect(x * 30,y * 30,28,28);
        }
    }
    ctx.fillStyle='green';
    ctx.fillRect(_snake[0].x * 30,_snake[0].y * 30, 28,28);
    ctx.fillStyle='red';
    for(let i = 1; i < _snake.length; i++){
        s_body=_snake[i];
        ctx.fillRect(s_body.x * 30,s_body.y * 30, 28,28);
        if(_snake[0].x == s_body.x && _snake[0].y== s_body.y){
            die();
            break;
        }
    }

    ctx.fillStyle='yellow'
    ctx.fillRect(_food.x * 30, _food.y * 30,28,28 );
};

let move=()=>{   
    let getfood = new Audio("./audio/food.mp4");
    let newSnake = {
        x :_snake[0].x+_direction.x,
        y :_snake[0].y+_direction.y
    }
    
    if(_snake[0].x == -1 || _snake[0].x == 20 ||_snake[0].y == -1 ||_snake[0].y == 20){
        die();
    }
    _snake.splice(0,0,{
        x : newSnake.x,
        y : newSnake.y
    })
    
    _snake.pop();
    if(_snake[0].x == _food.x &&_snake[0].y == _food.y){
        _food = {
            x : parseInt(Math.random() * 20),
            y : parseInt(Math.random() * 20)
        }
        getfood.play();
        _snake.push({
            x :_food.x,
            y :_food.y
        })
        _score+=10; 
        document.getElementById('score').innerHTML=_score;
    }
    
    if(_snake[0].x == -1 || _snake[0].x == 20 ||_snake[0].y == -1 ||_snake[0].y == 20){
        die();
    }
    draw();
};


let die=()=>{
    clearInterval(startgame);
    document.getElementById("died").style.display="";
    oCanvas.style.display = "none";
    playerLevel();
    flag = 1;
};


document.addEventListener('keydown',(ev)=>{
    switch(ev.key){
        case "w":
            if(_direction.y != 1){
                _direction.y = -1;
                _direction.x = 0;
            }
        break;
        case "s":
            if(_direction.y != -1){
                _direction.y = 1;
                _direction.x = 0;
            }
        break;
        case "a":
            if(_direction.x != 1){
                _direction.x = -1;
                _direction.y = 0;
            }
        break;
        case "d":
            if(_direction.x != -1){
                _direction.x = 1;
                _direction.y = 0;
            }     
        break; 
        case "r":
            if(flag)
            start();
        break; 
    }
});
let start=()=>{
    newgame();
    startgame = setInterval(move,200);
    _score = 0;
    document.getElementById('score').innerHTML=_score;
    oCanvas.style.display = '';
    document.getElementById("died").style.display="none";
    document.getElementById("start1").style.display = 'none';
    document.getElementById("home").style.display = "";
    document.getElementById('name').style.display = 'none';
    document.getElementById('scoreBorad').style.display = '';
    flag = 0;
}


let home=()=>{
    _score = 0; 
    document.getElementById('score').innerHTML=_score;
    clearTimeout(startgame);
    oCanvas.style.display = 'none';
    document.getElementById('died').style.display = 'none';
    document.getElementById("start1").style.display = '';
    document.getElementById("home").style.display = "none";
    document.getElementById('name').style.display = '';
    document.getElementById('scoreBorad').style.display = 'none';
}

let flag1 = 1;
        
const opcl=()=>{
    if(flag1){
        document.getElementById('music_p').play();
        flag1 = 0;
    }
    else{
        document.getElementById('music_p').pause();
        flag1 = 1;
    }
};
