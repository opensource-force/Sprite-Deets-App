export class AppComponent implements Component {
    private children: HTMLElement[] = [];
    static id = `app-component`;

    constructor(content: string, children: HTMLElement[] = []) {
        this.content = content;
        this.children = children; 
    }

    render(): HTMLElement {
        const style = document.createElement('style');
        style.textContent = `
        .${AppComponent.id} {
            display: grid;
            grid-template-areas: 
                "left canvas right";
            grid-template-columns: 1fr 3fr 1fr;
            grid-template-rows: 80% auto;
            height: calc(100vh - 1rem);
            width: 100%;
            border-radius: 10px;
        }
        `;
        document.head.appendChild(style);
        
        const app = document.createElement('div');
        app.className = AppComponent.id;

        this.children.forEach(child => {
            app.appendChild(child);
        });

        return app;
    }
}
