import IdGenerator from './id-generator';
import { throws } from 'assert';

export default class Canvas2d {
    constructor () {
        this.canvas = document.createElement('canvas');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.container = document.querySelector('.application__container')
        this.container.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');

        this.needRender = true;

        this.pointSize = 5;
        this.points = []; // { float x, float y, int id}
        this.lines = []; // { point start, point end, int id }

        this.renderCBs = [];

        this.render();
    }

    // parameters: float x, float y 
    // returns: int id
    addPoint (x,y) {
        const id = IdGenerator.getId()
        this.points.push({ x, y, id });
       
        return id;
    }

    // parameters: int id, float x, float y
    // returns null
    movePoint (id, x, y) {
        
    }
    
    getPoint (id) {
        let result;
        this.points.forEach(point => {
            if(point.id == id) { result = point; return; }
        });
        
        if(result) {
            return result;
        }
    }

    getPointAtPosition (x,y) {
        // Allow the user get a point that's pretty close to under the mouse.
        const pointSize = this.pointSize * 1.5;
        for(let i = 0; i < this.points.length; i += 1) {
            const point = this.points[i];
            if(point.x < x + pointSize &&
               point.x > x - pointSize &&
               point.y < y + pointSize &&
               point.y > y - pointSize) {
                   return point;
               }
        }

        return null;
    }

    // parameters: int first, int second
    // returns: int id
    addLine(first,second) {
        const f = this.getPoint(first);
        const s = this.getPoint(second);
        const id = IdGenerator.getId();

        if(!f || !s) { console.warn('line missing parameter', first, second); return; }
        
        this.lines.push({ id, first: f, second: s });
    }


    render () {
        this.ctx.fillStyle = '#343434';
        this.ctx.fillRect(0,0, window.innerWidth, window.innerHeight);
        this.renderLines();
        this.renderPoints();
        this.ctx.fillStyle = 'black';

        if(this.renderCBs) {
            this.renderCBs.forEach(cb => { cb(); });
        }


        window.requestAnimationFrame(this.render.bind(this));
    }

    renderLines () {
        this.ctx.strokeStyle = 'grey';

        this.lines.forEach(line => {
            this.ctx.beginPath();
            this.ctx.moveTo(line.first.x, line.first.y);
            this.ctx.lineTo(line.second.x, line.second.y);
            this.ctx.stroke();            
        });

        this.ctx.strokeStyle = 'black';
    }

    renderPoints () {
        this.points.forEach(point => {
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(point.x-this.pointSize/2, point.y-this.pointSize/2, this.pointSize, this.pointSize);
            this.ctx.fillStyle = 'black';
        })
    }
}