import {Complex, FourierCoef} from "./common-types";

export function dft(points: Array<Complex>): Array<FourierCoef> {
    let coeffs: Array<FourierCoef> = [];
    const numPoints = points.length;

    for (let k = 0; k < numPoints; k++) {
        let re = 0, im = 0;

        for (let n = 0; n < numPoints; n++) {
            const phi = (Math.PI * 2 * k * n) / numPoints;
            const c = new Complex(Math.cos(phi), -Math.sin(phi));
            const s = Complex.multiply(points[n], c);
            re += s.re;
            im += s.im;
        }

        re = re / numPoints;
        im = im / numPoints;

        // centre around zero
        let freq = ((k + numPoints / 2) % numPoints) - numPoints / 2;

        let amp = Math.sqrt(re * re + im * im);
        let phase = Math.atan2(im, re);
        coeffs[k] = { freq, amp, phase };
    }

    return coeffs;
}


function fft(points: Array<Complex>, n_coeffs: number): Array<FourierCoef> {
    return [];
}
