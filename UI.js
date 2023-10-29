export class UI {
    constructor(game){
        this.game = game;
    }
    draw(context){
        context.font = '30px Helvetica'
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        context.fillText('Score: ' + this.game.score, 20, 50);
    }
}