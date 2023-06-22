import { Conductor } from "./conductor";
import { DrawController } from "./draw-controller";
import { EpiController } from "./epi-controller";

function init() {
    let sketchController = new DrawController('drawingCanvas');
    let epiController = new EpiController('renderCanvas');

    // register callbacks for when drawing is done

    sketchController.onDrawingStart.push(() => epiController.setPath([]));
    sketchController.onDrawingEnd.push(() => epiController.setPath(sketchController.path));

    let conductor = new Conductor([sketchController, epiController]);
    conductor.start();
}

init();