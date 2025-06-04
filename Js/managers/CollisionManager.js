// Gerencia detecção e resolução de colisões

import { rectangularCollision } from '../utils/helpers.js';
import { GAME_CONFIG } from '../config/gameConfig.js';

export class CollisionManager {
    constructor(player, enemies) {
        this.player = player;
        this.enemies = enemies;
    }

    checkAllCollisions() {
        this.checkPlayerAttackOnEnemies();
        this.checkEnemyAttackOnPlayer();
        // Adicione outras verificações de colisão (ex: com objetos do cenário)
    }

    checkPlayerAttackOnEnemies() {
        if (this.player.isAttacking) {
            this.enemies.forEach(enemy => {
                if (!enemy.dead && rectangularCollision({
                    rectangle1: this.player.attackBox,
                    rectangle2: enemy
                })) {
                    enemy.takeDamage(GAME_CONFIG.PLAYER_DAMAGE);
                    // Lógica para feedback visual de acerto no inimigo
                }
            });
        }
    }

    checkEnemyAttackOnPlayer() {
        this.enemies.forEach(enemy => {
            if (enemy.isAttacking && !this.player.dead && rectangularCollision({
                rectangle1: enemy.attackBox,
                rectangle2: this.player
            })) {
                this.player.takeDamage(GAME_CONFIG.ENEMY_DAMAGE);
                // Lógica para feedback visual de acerto no player
            }
        });
    }
}