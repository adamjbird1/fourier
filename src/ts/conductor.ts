import Controller from "./controller";

export class Conductor {

    controllers: Array<Controller>
    lastTime: number;
    mousePos;

    constructor(controllers) {
        this.controllers = controllers;
        this.lastTime = Date.now()/1000;
        this.mousePos = null;

        window.addEventListener('mousemove', (evt) => this.handleMouseMove(evt));
    }

    start() {
        window.requestAnimationFrame(() => this.perFrame());
    }

    perFrame() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.perFrame());
    }

    update() {
        const currTime = Date.now()/1000;
        const dt = currTime - this.lastTime;

        this.controllers.forEach(c => {
            c.update(dt, this.mousePos);
        })

        this.lastTime = currTime;
    }

    handleMouseMove(evt) {
        this.mousePos = { x: evt.clientX, y: evt.clientY };
        // console.log('x: %d, y: %d', evt.clientX, evt.clientY);
    }
    

    render() {
        this.controllers.forEach(c => {            
                c.render();           
        });
    }
}