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


// FIXME: gives incorrect coefficients
export function realDft(points: Array<number>): Array<FourierCoef> {
    // const numPoints = points.length;
    const numPoints = 50;
    const coeffs: Array<FourierCoef> = [];
  
    for (let k = 0; k < numPoints; k++) {
      let re = 0;
      let im = 0;
  
      for (let n = 0; n < numPoints; n++) {
        const phi = (2 * Math.PI * k * n) / numPoints;
        const cosPhi = Math.cos(phi);
        const sinPhi = Math.sin(phi);
  
        re += points[n] * cosPhi;
        im -= points[n] * sinPhi; // Note the negative sign here
      }
  
      re /= numPoints;
      im /= numPoints;
  
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
