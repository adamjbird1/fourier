import CanvasController from "./canvas-controller";

type Point = {
    x: number,
    y: number
}

export class DrawController extends CanvasController {

    points: Array<Point>
    drawing: boolean;
    minDrawDist: number = 3;

    constructor(id: string) {
        super(id);        
        this.points = [];
        this.drawing = false;
        this.canvas.addEventListener("mousedown", () => this.startDraw());
        window.addEventListener("mouseup", () => this.stopDraw());
    }

    startDraw() {
        this.points = [];
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

        const canvasPos = this.canvas.getBoundingClientRect();
        const point: Point = {
            x: mousePos.x - canvasPos.x,
            y: mousePos.y - canvasPos.y
        }

        if (this.points.length == 0) {
            this.points.push(point);
        }
        else {
            // check we are far enough away from the previous point
            const prevPoint = this.points[this.points.length - 1];
            const dx = prevPoint.x - point.x;
            const dy = prevPoint.y - point.y;

            const dist = dx * dx + dy * dy;

            if (dist >= this.minDrawDist) {
                this.points.push(point);
            }
        }
    }

    render() {
        console.log(this.points);
        // console.log(this.drawing);
    }
}