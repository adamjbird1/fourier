import { FourierCoef, Point } from "./common-types";
import { DrawController } from "./draw-controller";
import { realDft } from "./fourier";

export class DrawWaveController extends DrawController {

    displacements: Array<number>;
    prevMousePoint: Point = null;

    constructor(id) {
        super(id);

        this.displacements = Array.apply(null, new Array(this.canvas.width)).map(Number.prototype.valueOf, this.canvas.height/2);
    }

    stopDraw() {
        if (this.drawing) {
            this.drawing = false;
            this.onDrawingEnd.forEach(fn => fn());
        }
        console.log(this.displacements);
        console.log(this.prevMousePoint);        
    }

    get fourierCoeffs() {
        return realDft(this.displacements);
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

        if (this.prevMousePoint === null) {
            this.prevMousePoint = point;
        }

        const pointSpacing = this.canvas.width / this.displacements.length;
        const dX = point.x - this.prevMousePoint.x;
        
        // TODO: interpolate between points properly
        for (let i = 0; i < Math.ceil(dX); i++) {
            this.displacements[Math.floor(point.x + i)] = point.y;
        }
        
        this.displacements[point.x] = point.y

        this.prevMousePoint = point;

        // if (this.points.length == 0) {
        //     this.points.push(point);
        // }
        // else {
        //     // check we are far enough away from the previous point
        //     const prevPoint = this.points[this.points.length - 1];
        //     const dx = prevPoint.x - point.x;
        //     const dy = prevPoint.y - point.y;

        //     const dist = dx * dx + dy * dy;

        //     if (dist >= this.minDrawDist) {
        //         this.points.push(point);
        //     }
        // }
    }


    render() {
        this.clear();
    
        // if (this.points.length < 2) {
        //     return;
        // }
    
        this.ctxt.beginPath();
        
        this.ctxt.moveTo(0, this.canvas.height/2);

        for (let i = 0; i < this.canvas.width; i++) {
            this.ctxt.lineTo(i, this.displacements[i]);
        }
        // this.ctxt.moveTo(this.points[0].x, this.points[0].y);
    
        // for (let i = 1; i < this.points.length; i++) {
        //     this.ctxt.lineTo(this.points[i].x, this.points[i].y);
        // }

        // // since the drawing must be a loop
        // this.ctxt.lineTo(this.points[0].x, this.points[0].y);
    
        this.ctxt.stroke();
    }

}