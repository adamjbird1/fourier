import CanvasController from "./canvas-controller";
import { Point, Complex, FourierCoef } from "./common-types";
import { dft } from "./fourier";

export class EpiController extends CanvasController {

    rawPoints: Array<Point> = [];
    path: Array<Point> = [];
    fourierCoeffs: Array<FourierCoef> = [];
    animProgress: number = 0;
    period: number = 10;
    pathChanged: boolean = false;
    coeffCount = 0;

    constructor(id) {
        super(id);
    }

    setCoeffCount(amount) {
        this.coeffCount = Math.floor(amount * this.fourierCoeffs.length);
        this.pathChanged = true;
    }

    setPath(points: Array<Point>) {
        this.rawPoints = points.slice();
        this.fourierCoeffs = dft(points.map(p => new Complex(p.x, p.y))).filter(c => c.amp > 0.01);
        this.fourierCoeffs.sort((a, b) => b.amp - a.amp);
        this.coeffCount = this.fourierCoeffs.length;
        this.pathChanged = true;
    }

    updatePath() {
        let pathProgress = 0;

        this.path = [];

        for (let i = 0; i < this.rawPoints.length; i++) {
            pathProgress += 1 / (this.rawPoints.length);
            this.addPoint(pathProgress);
        }
        console.log(this.path)
    }

    addPoint(progress) {
        let currentX = 0;
        let currentY = 0;

        for (let i = 0; i < this.fourierCoeffs.length; i++) {
            const amplitude = this.fourierCoeffs[i].amp;
            const angle = 2 * Math.PI * this.fourierCoeffs[i].freq * progress + this.fourierCoeffs[i].phase;

            if (i > this.coeffCount) {
                continue
            }

            currentX += amplitude * Math.cos(angle);
            currentY += amplitude * Math.sin(angle);

            // if (i == 0 || amplitude < 0.5) {
            //     continue;
            // }
        }
        this.path.push({x: currentX, y: currentY});
    }

    drawPath() {
        this.clear();
    
        if (this.path.length < 2) {
            return;
        }
    
        this.ctxt.beginPath();
        this.ctxt.moveTo(this.path[0].x, this.path[0].y);
    
        for (let i = 1; i < this.path.length; i++) {
            this.ctxt.lineTo(this.path[i].x, this.path[i].y);
        }

        // since the drawing must be a loop
        this.ctxt.lineTo(this.path[0].x, this.path[0].y);
    
        this.ctxt.stroke();
    }

    drawCircles() {
        let currentX = 0;
        let currentY = 0;

        for (let i = 0; i < this.fourierCoeffs.length; i++) {
            const amplitude = this.fourierCoeffs[i].amp;
            const angle = 2 * Math.PI * this.fourierCoeffs[i].freq * this.animProgress + this.fourierCoeffs[i].phase;
            currentX += amplitude * Math.cos(angle);
            currentY += amplitude * Math.sin(angle);

            if (i == 0 || i > this.coeffCount || amplitude < 0.5) {
                continue;
            }

            // if (i > 3) {
            //     continue;
            // }

            this.ctxt.beginPath();
            this.ctxt.lineWidth = 1;
            // this.ctxt.strokeStyle = '#4075C9';
            this.ctxt.globalAlpha = 0.7;
            this.ctxt.moveTo(currentX, currentY);
            this.ctxt.arc(currentX, currentY, amplitude, angle - Math.PI, angle + Math.PI);
            this.ctxt.stroke();                
        }
        this.ctxt.globalAlpha = 1;
    }

    update(dt, _) {
        this.animProgress += dt/this.period;
        this.animProgress = this.animProgress % 1.0;

        if (this.pathChanged) {
            this.updatePath();
            this.pathChanged = false;
        }
    }
    
    render() {
        this.drawPath();
        this.drawCircles();
    }
}