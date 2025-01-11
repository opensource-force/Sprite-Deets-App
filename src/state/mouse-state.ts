export class MousePosition {
  public x: number = 0;
  public y: number = 0;
}

export enum MouseButtonState {
  UP,
  DOWN,
}

export class MouseButton {
  public curState: MouseButtonState = MouseButtonState.UP;
  public prevState: MouseButtonState = MouseButtonState.UP;

  public isDown(): boolean {
    return this.curState === MouseButtonState.DOWN;
  }

  public isUp(): boolean {
    return this.curState === MouseButtonState.UP;
  }

  public isPressed(): boolean {
    return this.curState === MouseButtonState.DOWN && this.prevState === MouseButtonState.UP;
  }

  public isReleased(): boolean {
    return this.curState === MouseButtonState.UP && this.prevState === MouseButtonState.DOWN;
  }

  public isHeld(): boolean {
    return this.curState === MouseButtonState.DOWN && this.prevState === MouseButtonState.DOWN;
  }

  public updateState(newState: MouseButtonState): void {
    this.prevState = this.curState;
    this.curState = newState;
  }
}

export class MouseState {
  public element: HTMLElement | null = null;
  public curMousePosition: MousePosition = new MousePosition();
  public prevMousePosition: MousePosition = new MousePosition();
  public leftButton: MouseButton = new MouseButton();
  public rightButton: MouseButton = new MouseButton();
  public middleButton: MouseButton = new MouseButton();
  public lastMouseEvent: string = '';
  public isInside: boolean = false;

  private listeners: ((mouse: MouseState) => void)[] = [];

  updateState(e: MouseEvent): void {
    this.lastMouseEvent = e.type;
    this.prevMousePosition = this.curMousePosition;
    this.curMousePosition = { x: e.offsetX, y: e.offsetY };
    this.leftButton.updateState(e.buttons & 1 ? MouseButtonState.DOWN : MouseButtonState.UP);
    this.rightButton.updateState(e.buttons & 2 ? MouseButtonState.DOWN : MouseButtonState.UP);
    this.middleButton.updateState(e.buttons & 4 ? MouseButtonState.DOWN : MouseButtonState.UP);
    this.listeners.forEach((fn) => fn(this));
  }

  enter(e: MouseEvent): void {
    this.isInside = true;
    this.updateState(e);
  }

  exit(e: MouseEvent): void {
    this.isInside = false;
    this.updateState(e);
  }

  public registerMouseEvents(element: HTMLElement, fn: (mouse: MouseState) => void) {
    if (!this.element) {
      this.element = element;
      element.addEventListener('mousemove', (e) => this.updateState(e));
      element.addEventListener('mousedown', (e) => this.updateState(e));
      element.addEventListener('mouseup', (e) => this.updateState(e));
      element.addEventListener('mouseenter', (e) => this.enter(e));
      element.addEventListener('mouseleave', (e) => this.exit(e));
      this.addListener(fn);
    }
  }

  public addListener(fn: (mouse: MouseState) => void) {
    this.listeners.push(fn);
  }
}
