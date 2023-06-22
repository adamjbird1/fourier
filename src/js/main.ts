import { Conductor } from "./conductor";
import { DrawController } from "./draw-controller";

function init() {
    let sketchController = new DrawController('drawingCanvas')
    let conductor = new Conductor([sketchController]);
    conductor.start();
}