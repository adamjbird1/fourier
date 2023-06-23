import { Conductor } from "./conductor";
import { DrawController } from "./draw-controller";
import { EpiController } from "./epi-controller";
import { WaveController } from "./waves-controller";

function init() {
    let sketchController = new DrawController('drawingCanvas');
    let epiController = new EpiController('renderCanvas');
    let wavesController = new WaveController('wavesCanvas', null);

    wavesController.setWave();

    sketchController.onDrawingStart.push(() => epiController.setPath([]));
    sketchController.onDrawingEnd.push(() => epiController.setPath(sketchController.path));

    // create slider

    let pageCoeffCount = document.getElementById('coeffCount');
    let slider = <HTMLInputElement>document.getElementById("slider");

    let sliderChange = () => {
        epiController.setCoeffCount(slider.value);
        console.log(epiController.coeffCount);
        pageCoeffCount!.innerHTML = String(epiController.coeffCount);
    }

    if (slider !== null) {
        slider.oninput = sliderChange;
    }    

    // register callbacks 
    
    sketchController.onDrawingEnd.push(() => {
        slider.value = String(1);
        sliderChange();
    })  
    
    let conductor = new Conductor([sketchController, epiController, wavesController]);
    conductor.start();
}

init();