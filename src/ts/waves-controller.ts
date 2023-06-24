import CanvasController from "./canvas-controller";
import { FourierCoef, Point } from "./common-types";

enum WaveKind {
    Sine,
    Square,
    Sawtooth,
    Triangular
}

function waveCoefficients(n: number, ampScale: number, kind: WaveKind): FourierCoef[] {
    const coefficients: FourierCoef[] = [];
  
    for (let k = 1; k <= n; k++) {
      let amp: number;
      let freq: number;
      let phase = 0;
  
      switch (kind) {
        case WaveKind.Sine:
            if (k === 1) {
                coefficients.push({ amp: ampScale, freq: 1, phase })
            }
            break;
        case WaveKind.Square:
            if (k % 2 === 1) {
                amp = ampScale * (4 / (k * Math.PI));
                freq = k;
                coefficients.push({ amp, freq, phase });
            }
            break;
        case WaveKind.Sawtooth:
            amp = ampScale * (1 / (k * Math.PI));
            freq = k;
            coefficients.push({ amp, freq, phase });
            break;

        // TODO: fix triangular wave
        case WaveKind.Triangular:
                if (k % 2 === 1) {
                    const sign = (k % 4 === 1) ? 1 : -1;
                    amp = ampScale * 8 / (k * k * Math.PI * Math.PI);
                    phase = sign === -1 ? Math.PI : 0;
                    freq = k;
                    coefficients.push({ amp, freq, phase });
                }
                break;
        }
    }
  
    return coefficients;
}
  

export class WaveController extends CanvasController {
    
    coeffCount = 20;
    fourierCoeffs: Array<FourierCoef> = [];
    path: Array<Point> = [];
    pathChanged: boolean = false;
    animProgress = 0;
    period = 5;
    trace: Array<Point> = [];
    xOffset = this.canvas.width/2;
    
    canvasObserver;

    constructor(id, selectorId) {
        super(id);

        this.canvasObserver = new ResizeObserver((e) => {
            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;
            this.xOffset = this.canvas.width/2;
            console.log(this.canvas.width)
        })
    
        this.canvasObserver.observe(this.canvas);
        console.log(this.canvasObserver)
    }

    setWave(kindString: String) {
        let kind = WaveKind[kindString as keyof typeof WaveKind];
        const waveCoeffs = waveCoefficients(this.coeffCount, 50, kind)
        
        this.fourierCoeffs = []
        this.fourierCoeffs.push({freq: 0, amp: (this.canvas.height/2) / Math.cos(Math.PI/4), phase: Math.PI/4});
        waveCoeffs.forEach(c => this.fourierCoeffs.push(c))
    }

    updatePath() {

    }
    
    update(dt, _) {
        this.animProgress += dt/this.period;
        this.animProgress = this.animProgress % 1.0;

        if (this.pathChanged) {
            this.updatePath();
            this.pathChanged = false;
        }
    }

    drawPath() {
    
        if (this.trace.length < 2) {
            return;
        }
    
        this.ctxt.beginPath();
        this.ctxt.moveTo(this.trace[0].x, this.trace[0].y);
    
        for (let i = 1; i < this.trace.length; i++) {
            this.ctxt.lineTo(this.xOffset + i, this.trace[i].y);
        }

        // since the drawing must be a loop
        // this.ctxt.lineTo(this.trace[0].x, this.trace[0].y);
    
        this.ctxt.stroke();
    }

    drawCircles() {
        let currentX = 0;
        let currentY = 0;

        for (let i = 0; i < this.fourierCoeffs.length; i++) {
            const amplitude = this.fourierCoeffs[i].amp;
            const angle = 2 * Math.PI * this.fourierCoeffs[i].freq * this.animProgress + this.fourierCoeffs[i].phase;

            let prevX = currentX;
            let prevY = currentY;

            if (i > this.coeffCount) {
                continue;
            }

            currentX += amplitude * Math.cos(angle);
            currentY += amplitude * Math.sin(angle);

            if (i === 0 || amplitude < 0.5) {
                continue;
            }

            
            // if (i > 3) {
            //     continue;
            // }

            this.ctxt.beginPath();
            this.ctxt.lineWidth = 1;
            // this.ctxt.strokeStyle = '#4075C9';
            this.ctxt.globalAlpha = 0.7;
            // this.ctxt.moveTo(prevX, prevY);
            this.ctxt.arc(prevX, prevY, amplitude, angle - Math.PI, angle + Math.PI);
            this.ctxt.stroke();
                            
        }
        this.trace.unshift({x: currentX, y: currentY});
        if (this.trace.length > this.canvas.width) {
            this.trace.pop();
        }
        this.ctxt.globalAlpha = 1;
    }

    render() {
        this.clear();
        this.drawPath();
        this.drawCircles();
    }

    
}