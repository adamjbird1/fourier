import CanvasController from "./canvas-controller";

interface Point {
    x: number,
    y: number
}

export class DrawController extends CanvasController {

    points: Array<Point>
    drawing: boolean = false;
    minDrawDist: number = 3;

    constructor(id: string) {
        super(id);        
        this.points = [];
        this.canvas.addEventListener("mousedown", this.startDraw);
        this.canvas.addEventListener("mouseup", this.stopDraw);
    }

    startDraw() {
        this.drawing = true;
        console.log(this.drawing);
    }

    stopDraw() {
        this.drawing = false;
        console.log(this.drawing);
    }

    update(dt: number, mousePos) {
        if (!this.drawing) {
            return;
        }


        
    }

    render() {

    }
}