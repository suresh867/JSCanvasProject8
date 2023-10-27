/**@type {HTMLCanvasElement} */

export class Player{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.vy = 0;
        this.gravity = 1;
        this.image = document.getElementById('playerImg');
        this.speed = 0;
        this.maxSpeed = 10;
    }
    update(input){
        //for horizontal movement;
        this.x += this.speed;
        if(input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if(this.x < 0) this.x = 0;
        if(this.x > this.game.width - this.width) this.x = this.game.width -
        this.width;
        //for vertical movement;
        if(input.includes('ArrowUp') && this.onGround()) this.vy -= 20;
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.gravity;
        else this.vy = 0;
    }
    draw(context){
        context.fillStyle = 'red';
        context.drawImage(this.image, 
            0, 0, this.width, this.height,
            this.x, this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height;
    }
}