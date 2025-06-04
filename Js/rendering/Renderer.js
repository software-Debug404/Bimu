// Responsável por desenhar todos os elementos na tela

export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(entity) {
        entity.draw(this.ctx);
    }

    drawHealthBars(player, enemy) {
        // Barra de vida do player
        const playerHealthPercentage = player.health / player.maxHealth;
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(20, 20, 300, 20);
        this.ctx.fillStyle = playerHealthPercentage > 0.6 ? 'green' :
                       playerHealthPercentage > 0.05 ? 'yellow' : 'red';
        this.ctx.fillRect(20, 20, 300 * playerHealthPercentage, 20);
        this.ctx.strokeStyle = 'white';
        this.ctx.strokeRect(20, 20, 300, 20);

        // Barra de vida do inimigo
        const enemyHealthPercentage = enemy.health / enemy.maxHealth;
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.canvas.width - 320, 20, 300, 20);
        this.ctx.fillStyle = enemyHealthPercentage > 0.6 ? 'green' :
                       enemyHealthPercentage > 0.05 ? 'yellow' : 'red';
        this.ctx.fillRect(this.canvas.width - 320, 20, 300 * enemyHealthPercentage, 20);
        this.ctx.strokeStyle = 'white';
        this.ctx.strokeRect(this.canvas.width - 320, 20, 300, 20);
    }
}