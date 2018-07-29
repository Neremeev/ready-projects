let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");


// Создаем новые картинку
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();


// Задаем картинкам пути
bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Создаем звуковые файлы
let fly = new Audio();
let score_audio = new Audio();

// Задаем звукам пути
fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

// Расстояние между блоками
let gap = 100;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

//Задаем высоту подпрыгивания птички
function moveUp() {
    // насколько наша птичка подпрыгивает
    yPos -= 30;
    fly.play();
}

// Создаем первый блок
let pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

// переменная для очков
let score = 0;

// Позиция птички
let xPos = 10;
// начальная высота птички
let yPos = 120;
// скорость падения птички
let grav = 1.0;

function draw() {
    ctx.drawImage(bg, 0, 0);

    //рисуем блоки
    for(let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        // блокци к нам приближаются
        pipe[i].x = pipe[i].x - 1;

        //добавление новых блоков
        //pipe[i].x === 100 - расстояние между блоками
        if(pipe[i].x === 100) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        // Если врезались
        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            location.reload(); // Начинаем заново
        }

        if(pipe[i].x === 5) {
            score++;
            score_audio.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    // наша птичка падает
    yPos += grav;

    // счет на экране
    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;