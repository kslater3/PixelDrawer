

class Canvas {
    _canvas;
    _context;

    _pix_dim;

    _plot;

    _mouse_is_down;
    _mouse_is_inside;


    constructor(candiv_id, can_dim, pix_dim) {
        let canvasDiv = document.getElementById(candiv_id);

        this._canvas = document.createElement('canvas');

        this._canvas.style.width = can_dim + 'px';
        this._canvas.style.height = can_dim + 'px';
        this._canvas.width = can_dim;
        this._canvas.height = can_dim;
        this._canvas.style.border = '1px solid black';

        canvasDiv.appendChild(this._canvas);

        this._context = this._canvas.getContext('2d');

        this._pix_dim = pix_dim;


        this._plot = [];


        this._draw();


        this._canvas.addEventListener('mouseleave', () => {
            this._mouse_is_inside = false;
        });

        this._canvas.addEventListener('mouseenter', () => {
            this._mouse_is_inside = true;
        });


        this._canvas.addEventListener('mouseup', () => {
            this._mouse_is_down = false;
        });

        this._canvas.addEventListener('mousedown', (e) => {
            this._mouse_is_down = true;

            this._handle_drawing(e);
        });


        this._canvas.addEventListener('mousemove', (e) => {
            this._handle_drawing(e);
        });
    }


    _handle_drawing(e) {
        if(this._mouse_is_down && this._mouse_is_inside) {
            let pix_size = this._canvas.width / this._pix_dim;

            let can_pos = this._canvas.getBoundingClientRect();

            let x = Math.floor((e.clientX - can_pos.left)/pix_size);
            let y = Math.floor((e.clientY - can_pos.top)/pix_size);

            this._plot.push(x);
            this._plot.push(y);

            this._draw();
        }
    }


    _draw() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        let pix_x, pix_y;

        for(let i = 1; i < this._pix_dim; i++) {
            // Vertical Bars
            pix_x = this._canvas.width/this._pix_dim * i;
            pix_y = this._canvas.height;

            this._context.beginPath();
            this._context.moveTo(pix_x, 0);
            this._context.lineTo(pix_x, pix_y);
            this._context.stroke();


            // Horizonal Bars
            pix_x = this._canvas.width;
            pix_y = this._canvas.height/this._pix_dim * i;

            this._context.beginPath();
            this._context.moveTo(0, pix_y);
            this._context.lineTo(pix_x, pix_y);
            this._context.stroke();
        }


        let pixel_width = this._canvas.width/this._pix_dim;
        let pixel_height = this._canvas.height/this._pix_dim;

        for(let i = 0; i < this._plot.length/2; i++) {
            this._context.fillRect(this._plot[2*i] * pixel_width, this._plot[2*i+1] * pixel_height, pixel_width, pixel_height);
        }
    }
}







let canvas;



window.onload = function() {
    canvas = new Canvas('canvas-div', 400, 30);
}
