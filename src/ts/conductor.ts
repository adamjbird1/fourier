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
        document.addEventListener('touchmove',  (evt) => this.handleTouchMove(evt));
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

    handleMouseMove(e) {
        this.mousePos = { x: e.clientX, y: e.clientY };
        // console.log('x: %d, y: %d', evt.clientX, evt.clientY);
    }

    handleTouchMove(e) {
        if (e.touches.length > 0) {
            this.mousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
    }
    

    render() {
        this.controllers.forEach(c => {            
                c.render();           
        });
    }
}