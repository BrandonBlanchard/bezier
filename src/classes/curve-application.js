import Bezier from './bezier';

export default class CurveApplication {
    constructor (canvas2d) {
        if(!canvas2d) { throw new error('CurveApplication missing parameter \'canvas2d\''); }

        this.canvas2d = canvas2d;

        this.points = [];

        for(let i = 0; i < 4; i += 1) {
            this.points.push(this.canvas2d.addPoint(Math.random() * window.innerWidth, Math.random() * window.innerHeight));
        }

        this.canvas2d.addLine(this.points[0], this.points[1]);
        this.canvas2d.addLine(this.points[1], this.points[2]);
        this.canvas2d.addLine(this.points[2], this.points[3]);

        this.isDragging = false;
        // Point id
        this.currentSelection = null;

        this.canvas2d.renderCBs.push(this.onRender.bind(this));

        addEventListener('mousedown', this.handleMouseDown.bind(this));
        addEventListener('mousemove', this.handleMouseMove.bind(this));
        addEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    // Setup
    init () {
        // Create 4 points
        // Make them movable
    }

     // Grab point below mouse if exists and set as current selection
    // set dragging to true
    handleMouseDown (e) {
        let x = e.clientX;
        let y = e.clientY;
        
        this.canvas2d.currentSelection = this.canvas2d.getPointAtPosition(x,y);

        if(this.canvas2d.currentSelection) {
            this.canvas2d.currentSelection = this.canvas2d.currentSelection.id;
            this.canvas2d.isDragging = true;
        }
    }

    // Move point from current location to mouse location
    handleMouseMove (e) {
        if(!this.canvas2d.currentSelection && !this.isDragging) {
            this.canvas2d.currentSelection = null;
            this.canvas2d.isDragging = false;
            return;
        }        

        let point = this.canvas2d.getPoint(this.canvas2d.currentSelection);
        point.x = e.clientX;
        point.y = e.clientY;
    }

    // Drop point, set current selection to null
    // set dragging to false
    handleMouseUp (e) {
        this.canvas2d.currentSelection = null;
        this.canvas2d.isDragging = false;
    }

    onRender () {
        let xVals = [];
        let yVals = [];

        // Takes the array of points and turns them into two arrays of component values
        this.canvas2d.points.forEach( point => {
            xVals.push(point.x);
            yVals.push(point.y);
        });

        const ctx = this.canvas2d.ctx;
        const step = 0.01;

        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(xVals[0], yVals[0]);

        for(let t = 0; t < 1; t += step) {
            let x = Bezier.QuadraticBezier(xVals, t);
            let y = Bezier.QuadraticBezier(yVals, t);

            ctx.lineTo(x,y);
        }

        ctx.lineTo(xVals[xVals.length -1], yVals[yVals.length -1]);

        ctx.stroke();
    }
}