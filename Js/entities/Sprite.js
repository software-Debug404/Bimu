// Classe base para todos os elementos visuais (Sprite)

import { GAME_CONFIG, SPRITE_PATHS } from '../config/gameConfig.js';

export class Sprite {
    constructor({ position, velocity, source, scale = 1, offset = { x: 0, y: 0 }, sprites }) {
        this.position = position;
        this.velocity = velocity;
        this.scale = scale;
        this.image = new Image();
        this.image.src = source || SPRITE_PATHS.DEFAULT_OBJECT;
        this.width = this.image.width * this.scale;
        this.height = this.image.height * this.scale;

        this.offset = offset;
        this.sprites = sprites || {
            idle: {
                src: this.image.src,
                totalSpriteFrames: 1,
                framesPerSpriteFrame: 1
            }
        };

        this.currentSprite = this.sprites.idle;
        this.currentSpriteFrame = 0;
        this.elapsedTime = 0;
        this.totalSpriteFrames = this.sprites.idle.totalSpriteFrames;
        this.framesPerSpriteFrame = this.sprites.idle.framesPerSpriteFrame;
        this.facing = "right"; // Default facing direction
    }

    setSprite(spriteKey) {
        const newSprite = this.sprites[spriteKey];
        if (newSprite && this.currentSprite !== newSprite) {
            const previousSpriteImage = new Image();
            previousSpriteImage.src = this.currentSprite.src;

            this.currentSprite = newSprite;
            this.image = new Image();
            this.image.src = this.currentSprite.src;
            this.image.onload = () => {
                const oldHeight = previousSpriteImage.height * this.scale;
                this.width = this.image.width * this.scale;
                this.height = this.image.height * this.scale;
                // Adjust position if sprite height changes
                this.position.y += (oldHeight - this.height);
            };
            this.currentSpriteFrame = 0;
            this.elapsedTime = 0;
            this.totalSpriteFrames = this.currentSprite.totalSpriteFrames;
            this.framesPerSpriteFrame = this.currentSprite.framesPerSpriteFrame;
        }
    }

    draw(ctx) {
        ctx.imageSmoothingEnabled = false;
        const xScale = this.facing === "left" ? -1 : 1;

        ctx.save();
        ctx.translate(this.position.x + this.offset.x, this.position.y + this.offset.y);
        ctx.scale(xScale, 1);

        ctx.drawImage(
            this.image,
            this.currentSpriteFrame * (this.image.width / this.totalSpriteFrames),
            0,
            this.image.width / this.totalSpriteFrames,
            this.image.height,
            0,
            0,
            (this.width / this.totalSpriteFrames) * xScale,
            this.height
        );
        ctx.restore();
    }

    animate() {
        this.elapsedTime += 1;
        if (this.elapsedTime >= this.framesPerSpriteFrame) {
            this.currentSpriteFrame = (this.currentSpriteFrame + 1) % this.totalSpriteFrames;
            this.elapsedTime = 0;
        }
    }

    update(ctx) {
        this.draw(ctx);
        this.animate();
    }
}