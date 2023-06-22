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
var controller_1 = require("./controller");
var CanvasController = /** @class */ (function (_super) {
    __extends(CanvasController, _super);
    function CanvasController(id) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.canvas = document.getElementById(id);
        _this.ctxt = _this.canvas.getContext('2d');
        _this.width = _this.canvas.width;
        _this.height = _this.canvas.height;
        return _this;
    }
    CanvasController.prototype.clear = function () {
        this.ctxt.clearRect(0, 0, this.width, this.height);
    };
    return CanvasController;
}(controller_1.default));
exports.default = CanvasController;
