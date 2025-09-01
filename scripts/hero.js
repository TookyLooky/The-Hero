import { TILE_SIZE } from "../main.js";
import { GameObject } from "./gameObject.js";
import { DOWN, LEFT, RIGHT, UP } from "./input.js";


export class Hero extends GameObject {
    constructor({game, sprite, position, scale}){
        super({game, sprite, position, scale});
        this.speed = 150;
        this.maxFrame = 8;
        this.moving = false;
    }
    update(deltaTime){
        let nextX = this.destinationPosition.x;
        let nextY = this.destinationPosition.y;

        const scaledSpeed = this.speed  * (deltaTime / 1000);

        const distance = this.moveTowards(this.destinationPosition, scaledSpeed);

        const arrived = distance <= scaledSpeed;

        if (arrived){
            if (this.game.input.lastKey === UP){
                nextY -= TILE_SIZE;
                this.sprite.y = 38;
            } else if (this.game.input.lastKey === DOWN){
                nextY += TILE_SIZE;
                this.sprite.y = 40;
            } else if (this.game.input.lastKey === RIGHT){
                nextX += TILE_SIZE;
                this.sprite.y = 41;
            } else if (this.game.input.lastKey === LEFT){
                nextX -= TILE_SIZE;
                this.sprite.y = 39;
            }
            const col = nextX / TILE_SIZE;
            const row = nextY / TILE_SIZE;
            if (this.game.world.getTile(this.game.world.level1.collisionLayer, row, col) !== 1){
                
            this.destinationPosition.x = nextX;
            this.destinationPosition.y = nextY;

            }

        }    

        if (this.game.input.keys.length > 0 || !arrived){
            this.moving = true;
        } else {
            this.moving = false;
        }




        if (this.game.eventUpdate && this.moving){
            this.sprite.x < this.maxFrame ? this.sprite.x++ : this.sprite.x = 1;
        } else if (!this.moving) {
            this.sprite.x = 0;
        }
        
    }
}