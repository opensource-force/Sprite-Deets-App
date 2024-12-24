import { Controller } from '../controller.ts';

export class SpriteCanvasData {
    
    private _pixelSizePx : number = 32;
    public get pixelSizePx() : number {
        return this._pixelSizePx;
    }
    public set pixelSizePx(v: number) {
        this._pixelSizePx = v;
    }
    
}

export class SpriteDetailsController extends Controller {
    public static typeName: string = 'SpriteDetailsController';
    spriteCanvasData: SpriteCanvasData = new SpriteCanvasData();

    constructor() {
        super();
    }

    public updatePixelSizePx(newSize: number) {
        this.spriteCanvasData.pixelSizePx = newSize;
    }

    public getPixelSizePx(): number {
        return this.spriteCanvasData.pixelSizePx;
    }

}