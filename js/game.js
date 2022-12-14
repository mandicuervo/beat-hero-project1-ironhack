class Game {
    constructor(canvasId, songObj) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.pad = new Pad(this.ctx);
        this.background = new Background(this.ctx);
        this.intervalId = null;
        this.obstacles = [];
        this.tick = 0;
        this.possibleObstacles = [
            { key: 'none' },
            { key: 'green', x: 141 },
            { key: 'red', x: 271 },
            { key: 'yellow', x: 400 },
            { key: 'blue', x: 530 },
            { key: 'orange', x: 660 },
        ];
        this.domPads = {
            green: document.querySelector('#green-pad'),
            red: document.querySelector('#red-pad'),
            yellow: document.querySelector('#yellow-pad'),
            blue: document.querySelector('#blue-pad'),
            orange: document.querySelector('#orange-pad')
        }
        this.indexOfBeatThatAppears = 0;
        this.songObj = songObj; 
        this.gameSong = new Audio();
        this.gameSong.src = this.songObj.songFile;
        this.score = 0;
        this.lostPoints = 0;
        this.gameOverSong = new Audio(); //game over song in game over page
        this.gameOverSong.src = "./music/game-over-song.wav";
        this.winSong = new Audio(); //youo win song in congrats page
        this.winSong.src = "./music/win-song.wav"; 
    }

    start () {
        setTimeout(() => {
             this.gameSong.play()
        }, this.songObj.timeToStartSong)
        this.intervalId = setInterval(() => {
            this.addNegativePoints()
            this.clear();
            this.move();
            this.draw();
            this.checkCollisions();
            this.checkWins();
            this.tick++;
            if(this.tick % this.songObj.songTick === 0 && this.tick > this.songObj.timeToStartObstacles) {
                this.addObstacle();
            }
        }, 1000 / 60);
    }


    draw() {
        this.background.draw();
        this.pad.draw();
        this.obstacles.forEach(obstacle => {
            obstacle.draw();
        });
    }


    move() {
        this.obstacles.forEach(obstacle => {
            obstacle.move();
        });
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    addObstacle() {
        if(this.songObj.songArr[this.indexOfBeatThatAppears] > 10) {
            const doubleKeys = this.songObj.songArr[this.indexOfBeatThatAppears].toString().split('')
            doubleKeys.forEach(key => {
                this.obstacles.push(new Obstacle(this.ctx, this.possibleObstacles[key].x, -100, this.possibleObstacles[key].key, this.songObj.obstaclesSpeed))
            })
        } else {
            this.obstacles.push(new Obstacle(this.ctx, this.possibleObstacles[this.songObj.songArr[this.indexOfBeatThatAppears]].x, -100, this.possibleObstacles[this.songObj.songArr[this.indexOfBeatThatAppears]].key, this.songObj.obstaclesSpeed))
        }
      
        this.indexOfBeatThatAppears += 1;
    }

    addNegativePoints() {
        this.obstacles.map(obstacle => {
            if(obstacle.y > this.canvas.height) {
                if(obstacle.key !== 'none') {
                    this.lostPoints += 1
                }
                this.obstacles = this.obstacles.filter(obstacle => obstacle.y < this.canvas.height);
            } 
        })

        if(this.lostPoints >= 10) {
            this.gameOver()
        }
    }

    checkCollisions() {
        this.obstacles.some((obs, i) => {
            return this.pad.squares.some(square => {
                if (obs.collide(square)) {
                    if(this.pad.movements[square.key]) {
                        this.obstacles.splice(i, 1)
                        if(Math.abs(obs.y - square.y) > 30) {
                            this.score += 5;
                        } else if (Math.abs(obs.y - square.y) > 10) {
                            this.score += 15;
                        } else {
                            this.score += 30;
                        } 

                        const pad = this.domPads[square.key];
                        if (square.key === 'green') {
                            pad.style.boxShadow = '0 0 5px 5px rgba(19, 238, 150, 0.7)';
                        } else if (square.key === 'red') {
                            pad.style.boxShadow = '0 0 5px 5px rgba(238, 19, 154, 0.7)';
                        } else if (square.key === 'yellow') {
                            pad.style.boxShadow = '0 0 5px 5px rgba(221, 231, 47, 0.748)';
                        } else if (square.key === 'blue') {
                            pad.style.boxShadow = '0 0 5px 5px rgba(0, 121, 207, 0.7)';
                        } else if (square.key === 'orange') {
                            pad.style.boxShadow = '0 0 5px 5px rgba(231, 86, 8, 0.7)';
                        }

                        setTimeout(() => {
                            pad.style.boxShadow = 'none';
                        }, 300)

                        const scoreHTML = document.getElementById('score');
                        scoreHTML.textContent = this.score;
                    } 
                }
            })
        })
    }

    checkWins(){
        if(this.indexOfBeatThatAppears === this.songObj.songArr.length - 1){
            setTimeout(() => {
                clearInterval(this.intervalId);
                this.intervalId = null;

                const bgVideo = document.getElementById('bg-game');
                bgVideo.src = './images/you-win.mp4';

                const scoreWin = document.getElementById('points-fase')
                scoreWin.textContent = this.score;
                this.gameSong.pause();
                this.winSong.play();

                const congratsPage = document.getElementById('congrats');
                congratsPage.classList.remove("transparent");
                const gameMenu = document.getElementById("display-game");
                gameMenu.classList.add("transparent");
            }, 1000)
        }
    }

    pause(){
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.gameSong.pause();
    }

    gameOver(){
        clearInterval(this.intervalId);
        this.intervalId = null;

        const bgVideo = document.getElementById('bg-game');
        bgVideo.src = './images/game-over2.mp4';

        const scoreGameOver = document.getElementById('score-game-over')
        scoreGameOver.textContent = this.score;
        this.gameSong.pause();
        this.gameOverSong.play();

        const gameOverPage = document.getElementById("game-over");
        gameOverPage.classList.remove("transparent");
        const gameMenu = document.getElementById("display-game");
        gameMenu.classList.add("transparent");

    }
}