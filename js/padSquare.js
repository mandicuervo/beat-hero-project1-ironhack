class PadSquare {
    constructor(ctx, x, y, imgSrc, imgPressedSrc, key) {
        this.key = key;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 107;
        this.height = 107;

        this.imgIsReady = false;
        this.imgPressedIsReady = false;

        this.img = new Image();
        this.img.src = imgSrc;
        this.img.onload = () => {
            this.imgIsReady = true;
        }

        this.imgPressed = new Image();
        this.imgPressed.src = imgPressedSrc;
        this.imgPressed.onload = () => {
            this.imgPressedisReady = true;
        }

    }

    draw(pressed) {
        if (this.imgIsReady &&  this.imgPressedisReady) {
            this.ctx.drawImage(pressed ? this.imgPressed : this.img, this.x, this.y, this.width, this.height); 
        }
    }

}