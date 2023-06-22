"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conductor_1 = require("./conductor");
var draw_controller_1 = require("./draw-controller");
function init() {
    var sketchController = new draw_controller_1.DrawController('drawingCanvas');
    var conductor = new conductor_1.Conductor([sketchController]);
    conductor.start();
}
