// Configurações globais do jogo (gravidade, dimensões, etc.)

export const GAME_CONFIG = {
    CANVAS_WIDTH: 1024,
    CANVAS_HEIGHT: 576,
    GRAVITY: 0.2,
    FLOOR_HEIGHT: 80,
    PLAYER_ATTACK_COOLDOWN: 500,
    ENEMY_HIT_COOLDOWN: 1000,
    PLAYER_DAMAGE: 5,
    ENEMY_DAMAGE: 5,
    DESIRED_FPS: 120,
    // Adicione mais configurações conforme necessário
};

export const SPRITE_PATHS = {
    BACKGROUND_FLORESTA: "../assets/background/Floresta.png",
    DEFAULT_OBJECT: "../assets/objects/square.png",
    PLAYER: {
        IDLE: "../assets/player/Idle.png",
        RUN: "../assets/player/Run.png",
        JUMP: "../assets/player/Jump.png",
        ATTACK: "../assets/player/Attack_1.png",
        // Adicione outros estados do player
    },
    ENEMY: {
        MINOTAUR_IDLE: "../assets/inimigo/Minotaur_1/Idle.png",
        MINOTAUR_WALK: "../assets/inimigo/Minotaur_1/Walk.png",
        MINOTAUR_ATTACK: "../assets/inimigo/Minotaur_1/Attack.png",
        // Adicione outros inimigos e seus sprites
    }
};