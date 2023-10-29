/**@type {HTMLCanvasElement} */
import { Sitting, Running, Jumping, Falling, Rolling, Diving, HIT } from "./playerStates.js";

export class Player{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.gravity = 1;
        this.image = document.getElementById('playerImg');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;
        this.fps = 30;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.states = [new Sitting(this.game),new Running(this.game), new Jumping(this.game), 
        new Falling(this.game), new Rolling(this.game), new Diving(this.game), new HIT(this.game)];
    }
    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        //for horizontal movement;
        this.x += this.speed;
        if(input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if(this.x < 0) this.x = 0;
        if(this.x > this.game.width - this.width) this.x = this.game.width -
        this.width;
        //for vertical movement;
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.gravity;
        else this.vy = 0;

        if(this.y > this.game.height - this.height - this.game.groundMargin) this.y = 
        this.game.height - this.height - this.game.groundMargin;
        //for sprite animation
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
         
    }
    draw(context){
        if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
        context.fillStyle = 'red';
        context.drawImage(this.image, 
            this.frameX * this.width, this.frameY * this.height, this.width, this.height,
            this.x, this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
    checkCollision(){
        this.game.enemies.forEach(enemy => {
            if(
                enemy.x < this.x + this.width && 
                enemy.x + this.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ){
                enemy.markedForDeletion = true;
                if(this.currentState === this.states[4] || 
                    this.currentState === this.states[5]){
                        this.game.score++;
                    } else{
                        this.setState(6, 0);
                    }
            }
        });
    }
}