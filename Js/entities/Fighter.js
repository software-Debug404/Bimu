// Classe base para entidades que lutam (Player, Enemy)

import { Sprite } from './Sprite.js';
import { GAME_CONFIG } from '../config/gameConfig.js';

export class Fighter extends Sprite {
    constructor({ position, velocity, attackBox, sprites, scale }) {
        super({ position, velocity, scale, sprites });

        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.lastHitTime = 0;
        this.hitCooldown = GAME_CONFIG.ENEMY_HIT_COOLDOWN;

        this.attackBox = attackBox || {
            position: { x: this.position.x, y: this.position.y },
            width: 125,
            height: 50
        };
        this.isAttacking = false;
        this.attackCooldown = GAME_CONFIG.PLAYER_ATTACK_COOLDOWN;
        this.onAttackCooldown = false;
        this.onGround = false;
        this.dead = false;
    }

    takeDamage(amount) {
        const now = performance.now();
        if (now - this.lastHitTime < this.hitCooldown || this.dead) return;

        this.health = Math.max(0, this.health - amount);
        this.lastHitTime = now;

        if (this.health <= 0) {
            this.dead = true;
            // Lógica para quando o lutador morre
            console.log(`${this.constructor.name} died!`);
        }
    }

    applyGravity() {
        if (this.position.y + this.height + this.velocity.y >= GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.FLOOR_HEIGHT) {
            this.velocity.y = 0;
            this.position.y = GAME_CONFIG.CANVAS_HEIGHT - this.height - GAME_CONFIG.FLOOR_HEIGHT;
            this.onGround = true;
        } else {
            this.velocity.y += GAME_CONFIG.GRAVITY;
            this.onGround = false;
        }
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Atualiza a posição da caixa de ataque
        if (this.facing === "right") {
            this.attackBox.position.x = this.position.x + this.width / 2;
        } else {
            this.attackBox.position.x = this.position.x - this.attackBox.width + this.width / 2;
        }
        this.attackBox.position.y = this.position.y + this.height / 2 - this.attackBox.height / 2;
    }

    attack() {
        if (this.onAttackCooldown || this.dead) return;

        this.isAttacking = true;
        this.onAttackCooldown = true;
        this.setSprite("attacking");

        setTimeout(() => {
            this.isAttacking = false;
        }, 400); // Duração da animação de ataque

        setTimeout(() => {
            this.onAttackCooldown = false;
        }, this.attackCooldown);
    }

    jump() {
        if (!this.onGround || this.dead) return;
        this.velocity.y = -8;
    }

    update(ctx) {
        this.applyGravity();
        super.update(ctx);
    }
}