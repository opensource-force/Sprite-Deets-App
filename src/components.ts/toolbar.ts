export class Toolbar implements Component {
    private position: 'left' | 'right';
    private content: string;
    static id = `toolbar`;

    constructor(position: 'left' | 'right', content: string) {
        this.position = position;
        this.content = content;
    }

    render(): HTMLElement {
        const style = document.createElement('style');
        style.textContent = `
        .${Toolbar.id}-${this.position} {
            grid-area: ${this.position};
            background: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            ${this.position === 'right' ? 'margin-left: 0.5rem;' : 'margin-right: 0.5rem;'}
            padding: 1rem;
            border-radius: 10px;
        }
        `;
        document.head.appendChild(style);

        const toolbar = document.createElement('div');
        toolbar.className = `toolbar-${this.position}`;
        toolbar.innerHTML = `<p>${this.content}</p>`;
        return toolbar;
    }
}