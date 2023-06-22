var Complex = /** @class */ (function () {
    function Complex(re, im) {
        this.re = re;
        this.im = im;
    }
    Object.defineProperty(Complex.prototype, "magnitude", {
        get: function () {
            return Math.sqrt(this.re * this.re + this.im * this.im);
        },
        enumerable: false,
        configurable: true
    });
    Complex.add = function (a, b) {
        return new Complex(a.re + b.re, a.im + b.im);
    };
    Complex.multiply = function (a, b) {
        var re = a.re * b.re - a.im * b.im;
        var im = a.re * b.im + a.im * b.re;
        return new Complex(re, im);
    };
    return Complex;
}());
function dft(points, n_coeffs) {
    var coeffs = [];
    var numPoints = points.length;
    for (var k = 0; k < n_coeffs; k++) {
        var re = 0, im = 0;
        for (var n = 0; n < numPoints; n++) {
            var phi = -(Math.PI * 2 * k * n) / numPoints;
            var c = new Complex(Math.cos(phi), Math.sin(phi));
            var s = Complex.multiply(points[n], c);
            re += s.re;
            im += s.im;
        }
        re = re / numPoints;
        im = im / numPoints;
        var freq = k;
        var amp = Math.sqrt(re * re + im * im);
        var phase = Math.atan2(im, re);
        coeffs[k] = { num: new Complex(re, im), freq: freq, amp: amp, phase: phase };
    }
    return coeffs;
}
function fft(points, n_coeffs) {
    return [];
}
