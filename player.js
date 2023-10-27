/**@type {HTMLCanvasElement} */
import { Sitting, Running, Jumping } from "./playerStates.js";

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
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.states = [new Sitting(this),new Running(this), new Jumping(this)];
        this.currentState = this.states[0];
    }
    update(input){
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
        // if(input.includes('ArrowUp') && this.onGround()) this.vy -= 20;
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.gravity;
        else this.vy = 0;
    }
    draw(context){
        context.fillStyle = 'red';
        context.drawImage(this.image, 
            this.frameX * this.width, this.frameY * this.height, this.width, this.height,
            this.x, this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height;
    }
    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}