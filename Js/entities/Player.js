// Classe específica do jogador

import { Fighter } from './Fighter.js';
import { SPRITE_PATHS } from '../config/gameConfig.js';

export class Player extends Fighter {
    constructor({ position, velocity }) {
        super({
            position,
            velocity,
            scale: 2,
            sprites: {
                idle: { src: SPRITE_PATHS.PLAYER.IDLE, totalSpriteFrames: 6, framesPerSpriteFrame: 60 },
                running: { src: SPRITE_PATHS.PLAYER.RUN, totalSpriteFrames: 8, framesPerSpriteFrame: 10 },
                jumping: { src: SPRITE_PATHS.PLAYER.JUMP, totalSpriteFrames: 9, framesPerSpriteFrame: 60 },
                attacking: { src: SPRITE_PATHS.PLAYER.ATTACK, totalSpriteFrames: 4, framesPerSpriteFrame: 30 }
                // Adicione outros sprites do player
            }
        });
        this.lastKeyPressed = '';
    }

    handleMovement(keys) {
        this.velocity.x = 0;
        if (this.isAttacking || this.dead) return;

        if (keys.a.pressed && ['a', 'ArrowLeft'].includes(this.lastKeyPressed)) {
            this.velocity.x = -1.2 * 3.4;
            this.facing = "left";
            if (this.onGround) this.setSprite("running");
        } else if (keys.d.pressed && ['d', 'ArrowRight'].includes(this.lastKeyPressed)) {
            this.velocity.x = 1.2 * 3.4;
            this.facing = "right";
            if (this.onGround) this.setSprite("running");
        } else {
            if (this.onGround) this.setSprite("idle");
        }

        if (!this.onGround) this.setSprite("jumping");
        if (this.isAttacking) this.setSprite("attacking");
    }

    handleAttack(keys) {
        if (keys.space.pressed && !keys.space.hold) {
            this.attack();
            keys.space.hold = true;
        }
    }

    handleJump(keys) {
        if (keys.w.pressed && !keys.w.hold) {
            this.jump();
            keys.w.hold = true;
        }
    }

    update(ctx, keys) {
        this.handleMovement(keys);
        this.handleAttack(keys);
        this.handleJump(keys);
        super.update(ctx);
    }
}