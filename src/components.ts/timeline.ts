export class Timeline implements Component {
    private content: string;
    static id = `timeline`;

    constructor(content: string) {
        this.content = content;
    }

    render(): HTMLElement {
        const style = document.createElement('style');
        style.textContent = `
        .${Timeline.id} {
            grid-column: span 3;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #fff;
            display: flex;
            margin-top: 0.5rem;
            padding: 1rem;
            border-radius: 10px;
        }
        `;
        document.head.appendChild(style);

        const timeline = document.createElement('div');
        timeline.className = Timeline.id;
        timeline.innerHTML = `<p>${this.content}</p>`;
        return timeline;
    }
}