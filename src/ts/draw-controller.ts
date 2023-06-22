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
        const scale = this.canvas.offsetWidth === 0 ? 0 : (this.canvas.width / this.canvas.offsetWidth);
        
        const point = {
            x: scale * (mousePos.x - canvasPos.left),
            y: scale * (mousePos.y - canvasPos.top),
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
        this.clear();
    
        if (this.points.length < 2) {
            return;
        }
    
        this.ctxt.beginPath();
        this.ctxt.moveTo(this.points[0].x, this.points[0].y);
    
        for (let i = 1; i < this.points.length; i++) {
            this.ctxt.lineTo(this.points[i].x, this.points[i].y);
        }

        // since the drawing must be a loop
        this.ctxt.lineTo(this.points[0].x, this.points[0].y);
    
        this.ctxt.stroke();
    }
}