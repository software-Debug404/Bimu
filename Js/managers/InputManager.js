// Gerencia a entrada do teclado

export class InputManager {
    constructor() {
        this.keys = {
            a: { pressed: false },
            d: { pressed: false },
            w: { pressed: false, hold: false },
            space: { pressed: false, hold: false },
        };
        this.lastKeyPressed = '';
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener("keydown", (e) => {
            const key = e.key.toLowerCase();
            switch (key) {
                case "arrowleft":
                case "a":
                    this.keys.a.pressed = true;
                    this.lastKeyPressed = key;
                    break;
                case "arrowright":
                case "d":
                    this.keys.d.pressed = true;
                    this.lastKeyPressed = key;
                    break;
                case "arrowup":
                case "w":
                    this.keys.w.pressed = true;
                    break;
                case "z":
                case " ":
                    this.keys.space.pressed = true;
                    break;
            }
        });

        window.addEventListener("keyup", (e) => {
            const key = e.key.toLowerCase();
            switch (key) {
                case "arrowleft":
                case "a":
                    this.keys.a.pressed = false;
                    break;
                case "arrowright":
                case "d":
                    this.keys.d.pressed = false;
                    break;
                case "arrowup":
                case "w":
                    this.keys.w.pressed = false;
                    this.keys.w.hold = false;
                    break;
                case "z":
                case " ":
                    this.keys.space.pressed = false;
                    this.keys.space.hold = false;
                    break;
            }
        });
    }

    resetKeys() {
        for (const key in this.keys) {
            this.keys[key].pressed = false;
            if (this.keys[key].hold !== undefined) {
                this.keys[key].hold = false;
            }
        }
    }
}