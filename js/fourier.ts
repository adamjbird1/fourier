// interface Complex {
//     re: number,
//     im: number
// }

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

function dft(points: Array<Complex>) {
    
}

