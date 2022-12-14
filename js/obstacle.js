class Obstacle {
    constructor(ctx, x, y, key, speed){
        this.key = key;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 107;
        this.height = 107;
        this.img = key !== 'none' ? new Image() : null;
        this.isReady = false;
        if (this.img) {
            this.img.src = `./images/${key}.png`;
            this.img.onload = () => {
                this.isReady = true;
            }
        };
        this.speed = speed;
    }
   
    draw() {
        if (this.isReady && this.img) {
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    move() {
        this.y = this.y + this.speed;
    }
    
    collide(obj) {
        return this.y < obj.y + obj.height
        && this.y + this.height > obj.y
        && this.key === obj.key
    }
}
