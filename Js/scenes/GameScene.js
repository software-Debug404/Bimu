// Orquestra a lógica do jogo (atualização, renderização de entidades)

import { Player } from '../entities/Player.js';
import { Minotaur } from '../entities/EnemyTypes.js'; // Importe outros inimigos aqui
import { Sprite } from '../entities/Sprite.js';
import { InputManager } from '../managers/InputManager.js';
import { CollisionManager } from '../managers/CollisionManager.js';
import { Renderer } from '../rendering/Renderer.js';
import { GAME_CONFIG, SPRITE_PATHS } from '../config/gameConfig.js';

export class GameScene {
    constructor(canvas) {
        this.canvas = canvas;
        this.renderer = new Renderer(canvas);
        this.inputManager = new InputManager();

        this.background = new Sprite({
            position: { x: 0, y: 0 },
            source: SPRITE_PATHS.BACKGROUND_FLORESTA
        });

        this.player = new Player({
            position: { x: 100, y: 0 },
            velocity: { x: 0, y: 0 }
        });

        this.enemies = [
            new Minotaur({
                position: { x: 700, y: 0 },
                velocity: { x: 0, y: 0 }
            })
            // Adicione mais inimigos aqui
        ];

        this.collisionManager = new CollisionManager(this.player, this.enemies);
    }

    update() {
        // Atualiza o player
        this.player.update(this.renderer.ctx, this.inputManager.keys);

        // Atualiza os inimigos
        this.enemies.forEach(enemy => enemy.updateAI(this.player));

        // Verifica colisões
        this.collisionManager.checkAllCollisions();

        // Lógica de fim de jogo (ex: se o player morrer)
        if (this.player.dead) {
            console.log("Game Over!");
            // this.gameStateManager.transitionTo('GAME_OVER'); // Exemplo de uso
        }
    }

    render() {
        this.renderer.clear();
        this.renderer.draw(this.background);
        this.renderer.draw(this.player);
        this.enemies.forEach(enemy => this.renderer.draw(enemy));
        this.renderer.drawHealthBars(this.player, this.enemies[0]); // Assumindo um inimigo principal por enquanto
    }
}