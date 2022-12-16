class Pad {
    constructor(ctx, soundsArr = []) {
        this.ctx = ctx;
        this.clickSound = new Audio()
        this.clickSoundSrc = './music/kick.wav';
        this.clickSound.volume = 0.5;
        this.greenImgSrc = './images/green.png';
        this.redImgSrc = './images/red.png';
        this.yellowImgSrc = './images/yellow.png';
        this.blueImgSrc = './images/blue.png';
        this.orangeImgSrc = './images/orange.png';
        this.greenPressedImgSrc = './images/green_pressed.png';
        this.redPressedImgSrc = './images/red_pressed.png';
        this.yellowPressedImgSrc = './images/yellow_pressed.png';
        this.bluePressedImgSrc = './images/blue_pressed.png';
        this.orangePressedImgSrc = './images/orange_pressed.png';
        this.movements = {  
            green: false,
            red: false,
            yellow: false,
            blue: false,
            orange: false
        }

        this.greenTab = new PadSquare(this.ctx, 141, 444, this.greenImgSrc, this.greenPressedImgSrc, 'green')
        this.redTab = new PadSquare(this.ctx, 271, 444, this.redImgSrc, this.redPressedImgSrc, 'red')
        this.yellowTab = new PadSquare(this.ctx, 400, 444, this.yellowImgSrc, this.yellowPressedImgSrc, 'yellow')
        this.blueTab = new PadSquare(this.ctx, 530, 444, this.blueImgSrc, this.bluePressedImgSrc, 'blue')
        this.orangeTab = new PadSquare(this.ctx, 660, 444, this.orangeImgSrc, this.orangePressedImgSrc, 'orange')

        this.squares = [
            this.greenTab,
            this.redTab,
            this.yellowTab,
            this.blueTab,
            this.orangeTab,
        ]
        
        this.soundsArr = soundsArr;
        if (this.soundsArr.length > 0) {
            this.greenSound = new Audio();
            this.greenSound.src = this.soundsArr[0];
            this.redSound = new Audio();
            this.redSound.src = this.soundsArr[1];
            this.yellowSound = new Audio();
            this.yellowSound.src = this.soundsArr[2]
            this.blueSound = new Audio();
            this.blueSound.src = this.soundsArr[3]
            this.orangeSound = new Audio();
            this.orangeSound.src = this.soundsArr[4]
        }
    }

    draw() {
        this.greenTab.draw(this.movements.green)
        this.redTab.draw(this.movements.red)
        this.yellowTab.draw(this.movements.yellow)
        this.blueTab.draw(this.movements.blue)
        this.orangeTab.draw(this.movements.orange)
    }

    onKeyEvent(event) {
        const status = event.type === "keydown";
        console.log(event.type)

        if (event.type === 'keydown') {
            this.clickSound.play();
        }

        if (event.keyCode === 65) {
            this.movements.green = status;
            if(this.soundsArr.length > 0) {
                this.greenSound.play()
            }
        } else if (event.keyCode === 83) {
            this.movements.red = status;
            if(this.soundsArr.length > 0) {
                this.redSound.play()
            }
        } else if (event.keyCode === 74) {
            this.movements.yellow = status;
            if(this.soundsArr.length > 0) {
                this.yellowSound.play()
            }
        } else if (event.keyCode === 75) {
            this.movements.blue = status;
            if(this.soundsArr.length > 0) {
                this.blueSound.play()
            }
        } else if (event.keyCode === 76) {
            this.movements.orange = status;
            if(this.soundsArr.length > 0) {
                this.orangeSound.play()
            }
        }
    }
}