class Game2 {
    constructor(canvasId, style) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.pad = new Pad(this.ctx, style);
        this.background = new Background(this.ctx);
        this.intervalId = null;
        this.domPads = {
            green: document.querySelector('#green-pad'),
            red: document.querySelector('#red-pad'),
            yellow: document.querySelector('#yellow-pad'),
            blue: document.querySelector('#blue-pad'),
            orange: document.querySelector('#orange-pad')
        }
    }

    start () {
        this.intervalId = setInterval(() => {
            this.clear();
            this.draw();
        }, 1000 / 60);
    }

    draw() {
        this.background.draw();
        this.pad.draw();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}