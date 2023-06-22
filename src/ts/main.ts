import { Conductor } from "./conductor";
import { DrawController } from "./draw-controller";
import { EpiController } from "./epi-controller";

function init() {
    let sketchController = new DrawController('drawingCanvas');
    let epiController = new EpiController('renderCanvas');

    let pageCoeffCount = document.getElementById('coeffCount');

    let slider = <HTMLInputElement>document.getElementById("slider");

    let sliderChange = () => {
        epiController.setCoeffCount(slider.value);
        pageCoeffCount!.innerHTML = String(epiController.coeffCount);
    }

    // TODO: change from onchange so that it updates as slider is dragged

    if (slider !== null) {
        slider.onchange = sliderChange;
    }

    

    // register callbacks 
    sketchController.onDrawingStart.push(() => epiController.setPath([]));
    sketchController.onDrawingStart.push(() => {
        slider.value = String(1);
        sliderChange();
    })
    sketchController.onDrawingEnd.push(() => epiController.setPath(sketchController.path));

    
    let conductor = new Conductor([sketchController, epiController]);
    conductor.start();
}

init();