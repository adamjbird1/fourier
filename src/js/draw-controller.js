"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawController = void 0;
var canvas_controller_1 = require("./canvas-controller");
var DrawController = /** @class */ (function (_super) {
    __extends(DrawController, _super);
    function DrawController(id) {
        var _this = _super.call(this, id) || this;
        _this.drawing = false;
        _this.minDrawDist = 3;
        _this.points = [];
        _this.canvas.addEventListener("mousedown", _this.startDraw);
        _this.canvas.addEventListener("mouseup", _this.stopDraw);
        return _this;
    }
    DrawController.prototype.startDraw = function () {
        this.drawing = true;
        console.log(this.drawing);
    };
    DrawController.prototype.stopDraw = function () {
        this.drawing = false;
        console.log(this.drawing);
    };
    DrawController.prototype.update = function (dt, mousePos) {
        if (!this.drawing) {
            return;
        }
    };
    DrawController.prototype.render = function () {
    };
    return DrawController;
}(canvas_controller_1.default));
exports.DrawController = DrawController;
