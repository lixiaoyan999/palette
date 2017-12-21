class Palette {
    constructor(canvas) {
        this.canvas = document.querySelector('canvas');
        this.ctx = canvas.getContext('2d');
        this.history = [];
        this.cw = this.canvas.width;
        this.ch = this.canvas.height;
    }

    line() {
        let that = this;
        that.canvas.onmousedown = function (e) {
            let ox = e.offsetX, oy = e.offsetY;
            that.canvas.onmousemove = function (e) {
                let mx = e.offsetX, my = e.offsetY;
                that.ctx.beginPath();
                that.ctx.clearRect(0, 0, 600, 600);
                if (that.history.length) {
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that.ctx.moveTo(ox, oy);
                that.ctx.lineTo(mx, my);
                that.ctx.stroke();
            }
            that.canvas.onmouseup = function (e) {
                that.history.push(that.ctx.getImageData(0, 0, 600, 600));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
            that.aboutpop();
        };
    };
    circle() {
        let that = this;
        that.canvas.onmousedown = function (e) {
            let ox = e.offsetX, oy = e.offsetY;
            that.canvas.onmousemove = function (e) {
                let mx = e.offsetX, my = e.offsetY;
                let r = Math.sqrt(Math.pow(mx - ox, 2) + Math.pow(my - oy, 2));
                that.ctx.clearRect(0, 0, 600, 600);
                that.ctx.beginPath();
                if (that.history.length) {
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that.ctx.arc(mx, my, r, 0, Math.PI * 2);
                that.ctx.stroke();
            }
            that.canvas.onmouseup = function (e) {
                that.history.push(that.ctx.getImageData(0, 0, 600, 600));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        };
        that.aboutpop();
    }
    pencill(){
        let that = this;
        that.canvas.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.ctx.clearRect(0,0,that.cw,that.ch);
            that.ctx.beginPath();
            that.ctx.moveTo(ox,oy);
            that.canvas.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length - 1],0,0);
                }
                that.ctx.lineTo(mx,my);
                that.ctx.stroke();
            };
            that.canvas.onmouseup = function(e){
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            };
        }
        that.aboutpop();
    }
    poly(ang){
        let that = this;
        that.canvas.onmousedown = function(e){
            let ox = e.offsetX, oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                let mx = e.offsetX, my = e.offsetY;
                let r = Math.sqrt(Math.pow(mx - ox, 2) + Math.pow(my - oy,2));
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                obj(r,ox,oy);
            };
            function  obj(r,ox,oy,num = ang){
                let jiaodu = Math.PI * 2 / num;
                that.ctx.beginPath();
                that.ctx.moveTo(ox+r,oy);
                for(let i = 0;i < num;i++){
                    let x = ox + r * Math.cos(jiaodu * i);
                    let y = oy + r * Math.sin(jiaodu * i);
                    that.ctx.lineTo(x,y);
                }
                that.ctx.closePath();
                that.ctx.stroke();
            }
            that.canvas.onmouseup = function (e) {
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            };
        };
        that.aboutpop();
    }
    polyj(ang){
        let that = this;
        that.canvas.onmousedown = function(e){
            let ox = e.offsetX, oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                let mx = e.offsetX, my = e.offsetY;
                let r = Math.sqrt(Math.pow(mx - ox, 2) + Math.pow(my - oy,2)),
                    r1 = r/3;
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                move(r,r1,ox,oy);
            };
            function  move(r,r1,ox,oy,num = ang){
                let jiaodu = Math.PI / num;
                let x,y;
                that.ctx.beginPath();
                that.ctx.moveTo(ox+r,oy);
                for(let i = 0;i < num * 2;i++){
                    if(i % 2 == 0){
                         x = ox + r * Math.cos(jiaodu * i);
                         y = oy + r * Math.sin(jiaodu * i);
                    }else{
                        x = ox + r1 * Math.cos(jiaodu * i);
                        y = oy + r1 * Math.sin(jiaodu * i);
                    }
                    that.ctx.lineTo(x,y);
                }
                that.ctx.closePath();
                that.ctx.stroke();
            }
            that.canvas.onmouseup = function (e) {
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            };
        };
        that.aboutpop();
    }
    aboutpop(){
        let that = this;
        document.onkeydown = function (e) {
            if (e.ctrlKey && e.key == 'z') {
                if (that.history.length) {
                    let a = that.history.pop();
                    if (that.history.length > 0) {
                        that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                    }
                }
            }
        };
    };

}

