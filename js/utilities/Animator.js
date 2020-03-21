
function animatorClass() {
    this.x = 0;
    this.y = 0;
    this.height = 50;
    this.width = 50;
    this.sx = 50;
    this.sy = 0;
    this.animateOnGamePause = false;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 3;

    this.initialize = function (sprite, numberOfFrames = 6) {
        this.myPic = sprite;
        this.numberOfFrames = numberOfFrames;
        animateList.push(this);
    };

    this.draw = function () {
        this.tickCount++;
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex++;
            } else {
                this.frameIndex = 0;
            }
        }
        if (!gamePaused || this.animateOnGamePause) {
            this.sx = this.frameIndex * this.width;
        }
        canvasContext.drawImage(this.myPic, this.sx, this.sy, this.width, this.height, Math.round(this.x), Math.round(this.y), this.width, this.height);
    };

    this.reset = function (resetX, resetY) {
        this.x = resetX;
        this.y = resetY;
    };

}