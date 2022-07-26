var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var scoreShow=document.getElementById('score');

// khai báo
var score = 0;
var x = 20, y = 20;
var dx = 5, dy = 2;
var radius = 10;
var bar = {
        width: 100,
        height: 10,
        x: 0,
        y: canvas.height -50,
        speed: 10,
        
        movingLeft: false,
        movingRight: false,
};
var GameOver = false;
var ispause = false;


// keyboard
document.addEventListener('keyup', function(event) {
        console.log('KEY UP');
        console.log(event);

        if(event.keyCode == 37) {
                bar.movingLeft = false;
        }
                else if(event.keyCode == 39) {
                        bar.movingRight = false;
                }
})

document.addEventListener('keydown', function(event) {
        console.log('KEY DOWN');
        console.log(event);

        if(event.keyCode == 37) {
                bar.movingLeft = true;
        }
                else if(event.keyCode == 39) {
                        bar.movingRight = true;
                }
})
 // chơi lại
function start() {
location.reload();
}

     

 // vẽ bóng
function drawBall() { 
 context.beginPath();
 context.fillStyle="#0000ff";
 context.arc(x, y, radius, 0, Math.PI*2);
 context.fill();
 context.closePath();
}

//vẽ thanh chắn
function drawBar() { 
        context.beginPath();
        context.rect(bar.x, bar.y, bar.width, bar.height);
        context.fill();
        context.closePath();
}

 //chuyển động của bóng
function moveBall() {
        
        if(x < radius || x > canvas.width -radius) {
                dx = -dx;
        }
        if(y < radius ) {
              dy = -dy;
        }

        x += dx;
        y += dy;


}

// bóng + thanh đâm nhau
function blockBall() {
        if(x + radius >= bar.x && x + radius <= bar.x + bar.width && y + radius == canvas.height - 50 - bar.height) {
                dy = -dy;
                score += 5;
        }
        scoreShow.innerHTML="Điểm: "+ score;
        
  
        
// cộng điểm    
if(score == 10) { 
        score +=1
}
if(score == 20) { 
        score +=5
}
if(score == 50) { 
        score +=10
}
if(score == 100) { 
        score +=20
}              
}


// hiển thị
function draw() {
        if(!GameOver){
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        moveBall();
        drawBar();
        blockBall();
       
        if(bar.movingLeft) {
                bar.x -= bar.speed;
        }
        else if(bar.movingRight) {
                bar.x += bar.speed;
        };

        if(bar.x <0) {
                bar.x= 0;
        }
        else if(bar.x >canvas.width -bar.width) {
                bar.x =canvas.width- bar.width;
        } 
        if(y > canvas.height- radius) {
        
                GameOver = true;
                alert("GameOver - " + "Điểm của bạn là: " + score);
                location.reload();   
             } 
        requestAnimationFrame(draw);
}
}
draw();