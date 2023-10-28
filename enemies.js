class Enemy{
    constructor(){
        this.frameX = 0;
        this.FrameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
    }
    update(deltaTime){
        //for horizontal movement;
        this.x -= this.speedX;
        this.y += this.speepY;
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime
        }

        //check if off screen
    }
    draw(context){
        context.drawImage(this.image, 
            this.frameX * this.width , 0, this.width, this.height,
            this.x, this.y, this.width, this.height);
    }
}

export class FlyingEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 60;
        this.height = 44;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = 2;
        this.speepY =  0;
        this.maxFrame = 5;
        this.image = document.getElementById('enemyFly');
    }
    update(deltaTime){
        super.update(deltaTime);

    }
}

export class GroundEnemy extends Enemy{

}

export class ClimbingEnemy extends Enemy{

}