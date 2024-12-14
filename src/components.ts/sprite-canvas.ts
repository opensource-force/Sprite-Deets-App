export class SpriteCanvas implements Component {
    private content: string;
    static id = `sprite-canvas`;

    constructor(content: string) {
        this.content = content;
    }

    render(): HTMLElement {
        const style = document.createElement('style');
        style.textContent = `
        .${SpriteCanvas.id} {
            grid-area: canvas;
            height: auto;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1rem;
            border-radius: 10px;
          }
        `;
        document.head.appendChild(style);
        
        const canvas = document.createElement('div');
        canvas.className = SpriteCanvas.id;
        canvas.innerHTML = `<p>${this.content}</p>`;
        return canvas;
    }
}