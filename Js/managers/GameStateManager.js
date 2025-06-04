// Gerencia estados do jogo (menu, jogando, pausado, game over)

export class GameStateManager {
    constructor() {
        this.currentState = 'MENU'; // MENU, PLAYING, PAUSED, GAME_OVER
        this.menuContainer = document.getElementById('menu-container');
        this.mainMenu = document.getElementById('main-menu');
        this.controlsMenu = document.getElementById('controls-menu');
        this.canvas = document.querySelector('canvas');

        this.onGameStartCallback = null; // Callback para iniciar o jogo
    }

    setGameStartCallback(callback) {
        this.onGameStartCallback = callback;
    }

    transitionTo(newState) {
        this.currentState = newState;
        this.updateUI();
    }

    updateUI() {
        switch (this.currentState) {
            case 'MENU':
                this.menuContainer.classList.remove('hidden');
                this.mainMenu.classList.remove('hidden');
                this.controlsMenu.classList.add('hidden');
                this.canvas.classList.add('hidden');
                break;
            case 'CONTROLS':
                this.menuContainer.classList.remove('hidden');
                this.mainMenu.classList.add('hidden');
                this.controlsMenu.classList.remove('hidden');
                this.canvas.classList.add('hidden');
                break;
            case 'PLAYING':
                this.menuContainer.classList.add('hidden');
                this.canvas.classList.remove('hidden');
                if (this.onGameStartCallback) {
                    this.onGameStartCallback();
                }
                break;
            case 'PAUSED':
                // Implementar tela de pausa
                break;
            case 'GAME_OVER':
                // Implementar tela de game over
                break;
        }
    }
}