// interface Complex {
//     re: number,
//     im: number
// }

interface FourierCoef {
    num: Complex,
    freq: number,
    amp: number,
    phase: number
}

class Complex {
    re: number;
    im: number;
    
    constructor(re: number, im: number) {
        this.re = re;
        this.im = im;
    }

    get magnitude(): number {
        return Math.sqrt(this.re * this.re + this.im * this.im); 
    }

    static add(a: Complex, b: Complex): Complex {
        return new Complex(
            a.re + b.re,
            a.im + b.im
        );
    }

    static multiply(a: Complex, b: Complex): Complex {
        let re = a.re * b.re - a.im * b.im;
        let im = a.re * b.im + a.im * b.re;
        return new Complex(re, im);
    }   
    
}

function dft(points: Array<Complex>, n_coeffs: number): Array<FourierCoef> {
    let coeffs: Array<FourierCoef> = [];
    const numPoints = points.length;

    for (let k = 0; k < n_coeffs; k++) {
        let re = 0, im = 0;

        for (let n = 0; n < numPoints; n++) {
            const phi = - (Math.PI * 2 * k * n) / numPoints;
            const c = new Complex(Math.cos(phi), Math.sin(phi));
            const s = Complex.multiply(points[n], c);
            re += s.re;
            im += s.im;
        }

        re = re / numPoints;
        im = im / numPoints;

        let freq = k;
        let amp = Math.sqrt(re * re + im * im);
        let phase = Math.atan2(im, re);
        coeffs[k] = { num: new Complex(re, im), freq, amp, phase };
    }

    return coeffs;
}


function fft(points: Array<Complex>, n_coeffs: number): Array<FourierCoef> {
    return [];
}
