import Controller from "./controller";

export default class CanvasController extends Controller {

    canvas;
    id: string;
    ctxt: CanvasRenderingContext2D;
    width;
    height;

    constructor(id) {
        super();
        this.id = id;
        this.canvas = document.getElementById(id);
        this.ctxt = this.canvas.getContext('2d');
        
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    clear() {
        this.ctxt.clearRect(0, 0, this.width, this.height);
    }
}