"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conductor = void 0;
var Conductor = /** @class */ (function () {
    function Conductor(controllers) {
        this.controllers = controllers;
        this.lastTime = Date.now();
        this.mousePos = null;
        window.addEventListener('mousemove', this.handleMouseMove);
    }
    Conductor.prototype.start = function () {
        var _this = this;
        window.requestAnimationFrame(function () { return _this.perFrame(); });
    };
    Conductor.prototype.perFrame = function () {
        var _this = this;
        this.update();
        this.render();
        requestAnimationFrame(function () { return _this.perFrame(); });
    };
    Conductor.prototype.update = function () {
        var _this = this;
        var currTime = Date.now();
        var dt = currTime - this.lastTime;
        this.controllers.forEach(function (c) {
            c.update(dt, _this.mousePos);
        });
        this.lastTime = currTime;
    };
    Conductor.prototype.handleMouseMove = function (evt) {
        this.mousePos = { x: evt.clientX, y: evt.clientY };
    };
    Conductor.prototype.render = function () {
        this.controllers.forEach(function (c) {
            c.render();
        });
    };
    return Conductor;
}());
exports.Conductor = Conductor;
