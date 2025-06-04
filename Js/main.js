// Ponto de entrada principal do jogo

import { GAME_CONFIG } from './config/gameConfig.js';
import { GameStateManager } from './managers/GameStateManager.js';
import { GameScene } from './scenes/GameScene.js';

const canvas = document.querySelector('canvas');
canvas.width = GAME_CONFIG.CANVAS_WIDTH;
canvas.height = GAME_CONFIG.CANVAS_HEIGHT;

let gameScene;
let gameStateManager;

let prevTime = performance.now();
let lag = 0;

function gameLoop() {
    const currentTime = performance.now();
    const elapsed = currentTime - prevTime;
    prevTime = currentTime;
    lag += elapsed;

    if (gameStateManager.currentState === 'PLAYING') {
        while (lag >= GAME_CONFIG.FRAME_TIME) {
            gameScene.update();
            lag -= GAME_CONFIG.FRAME_TIME;
        }
        gameScene.render();
    }

    window.requestAnimationFrame(gameLoop);
}

// Inicialização do jogo
window.addEventListener('DOMContentLoaded', () => {
    gameStateManager = new GameStateManager();
    gameScene = new GameScene(canvas);

    // Define o callback para quando o jogo iniciar a partir do menu
    gameStateManager.setGameStartCallback(() => {
        console.log("Game started from menu!");
        // Qualquer lógica adicional que precisa ser executada quando o jogo realmente começa
    });

    // Sobrescreve a função startGame global para ser chamada pelo menu.js
    window.startGame = () => {
        gameStateManager.transitionTo('PLAYING');
    };

    // Adiciona o listener do Enter para o menu através do GameStateManager
    window.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && gameStateManager.currentState === 'MENU') {
            e.preventDefault();
            gameStateManager.transitionTo('CONTROLS');
        } else if (e.key === "Enter" && gameStateManager.currentState === 'CONTROLS') {
            e.preventDefault();
            gameStateManager.transitionTo('PLAYING');
        }
    });

    // Inicia o loop do jogo
    gameLoop();
});

// Adiciona GAME_CONFIG.FRAME_TIME ao objeto GAME_CONFIG
GAME_CONFIG.FRAME_TIME = 1000 / GAME_CONFIG.DESIRED_FPS;