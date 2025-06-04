// Definições de inimigos específicos (Minotaur, Knight, etc.)

import { Enemy } from './Enemy.js';
import { SPRITE_PATHS } from '../config/gameConfig.js';

export class Minotaur extends Enemy {
    constructor({ position, velocity }) {
        super({
            position,
            velocity,
            scale: 2,
            sprites: {
                idle: { src: SPRITE_PATHS.ENEMY.MINOTAUR_IDLE, totalSpriteFrames: 10, framesPerSpriteFrame: 10 },
                running: { src: SPRITE_PATHS.ENEMY.MINOTAUR_WALK, totalSpriteFrames: 12, framesPerSpriteFrame: 12 },
                attacking: { src: SPRITE_PATHS.ENEMY.MINOTAUR_ATTACK, totalSpriteFrames: 4, framesPerSpriteFrame: 50 },
                dead: { src: SPRITE_PATHS.ENEMY.MINOTAUR_DEAD || SPRITE_PATHS.ENEMY.MINOTAUR_IDLE, totalSpriteFrames: 1, framesPerSpriteFrame: 1 } // Exemplo de sprite de morte
            }
        });
        this.maxHealth = 150;
        this.health = this.maxHealth;
        this.attackThreshold = 150; // Minotauro ataca de mais longe
        this.attackCooldown = 800; // Ataque mais lento
        this.evadeProbability = 0.05; // Menos evasivo
    }
}

export class Knight extends Enemy {
    constructor({ position, velocity }) {
        super({
            position,
            velocity,
            scale: 2,
            sprites: {
                idle: { src: SPRITE_PATHS.ENEMY.KNIGHT_IDLE, totalSpriteFrames: 6, framesPerSpriteFrame: 60 },
                running: { src: SPRITE_PATHS.ENEMY.KNIGHT_RUN, totalSpriteFrames: 8, framesPerSpriteFrame: 10 },
                attacking: { src: SPRITE_PATHS.ENEMY.KNIGHT_ATTACK_1, totalSpriteFrames: 4, framesPerSpriteFrame: 30 },
                dead: { src: SPRITE_PATHS.ENEMY.KNIGHT_DEAD || SPRITE_PATHS.ENEMY.KNIGHT_IDLE, totalSpriteFrames: 1, framesPerSpriteFrame: 1 }
            }
        });
        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.attackThreshold = 80;
        this.attackCooldown = 600;
        this.evadeProbability = 0.2;
    }
}

// Adicione mais classes de inimigos aqui (SamuraiCommander, SkeletonSpearman, SkeletonWarrior)