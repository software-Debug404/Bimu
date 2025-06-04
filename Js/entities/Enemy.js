// Classe base para inimigos (com lógica de IA básica)

import { Fighter } from './Fighter.js';
import { rectangularCollision } from '../utils/helpers.js';
import { GAME_CONFIG } from '../config/gameConfig.js';

export class Enemy extends Fighter {
    constructor(options) {
        super(options);
        this.learningFactor = 0.05;
        this.attackThreshold = 100;
        this.evadeProbability = 0.1; // Ajustado para ser menos evasivo por padrão
        this.hitCount = 0;
        this.attackPattern = [];
        this.lastAttackTime = 0;
        this.adaptiveAggression = 0.6;
    }

    updateAI(player) {
        if (this.dead) return;

        const distance = Math.abs(player.position.x - this.position.x);
        const isToTheRight = player.position.x > this.position.x;
        const currentTime = performance.now();

        // Movimentação
        if (distance > this.attackThreshold) {
            this.velocity.x = isToTheRight ? 2 : -2;
            this.facing = isToTheRight ? "right" : "left";
            this.setSprite("running");
        } else {
            this.velocity.x = 0;
            this.setSprite("idle");

            // Lógica de ataque
            if (Math.random() < this.adaptiveAggression) {
                if (currentTime - this.lastAttackTime > this.attackCooldown) {
                    this.attack();
                    this.lastAttackTime = currentTime;
                    this.attackPattern.push(currentTime);
                    if (this.attackPattern.length > 5) this.attackPattern.shift();
                }
            }
        }

        // Lógica de evasão
        if (Math.random() < this.evadeProbability && this.onGround && distance < 200) {
            this.jump();
        }

        super.update();
    }

    takeDamage(amount) {
        super.takeDamage(amount);
        if (!this.dead) {
            this.hitCount++;
            this.evadeProbability = Math.min(0.3, this.evadeProbability + this.learningFactor);

            if (this.attackPattern.length >= 3) {
                const timeDiff = (this.attackPattern[this.attackPattern.length - 1] - this.attackPattern[0]) / this.attackPattern.length;
                if (timeDiff < 1500) { // Se os ataques são muito rápidos, diminui a agressão
                    this.adaptiveAggression = Math.max(0.4, this.adaptiveAggression - 0.1);
                } else { // Se os ataques são lentos, aumenta a agressão
                    this.adaptiveAggression = Math.min(0.9, this.adaptiveAggression + 0.1);
                }
            }
        }
    }
}