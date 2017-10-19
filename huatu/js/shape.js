function shape(canvas,canvas1,cobj){
    this.canvas=canvas;
    this.canvas1=canvas1;
    this.cobj=cobj;
    this.fillStyle="#000";
    this.strokeStyle="#000";
    this.lineWidth=1;
    this.type="stroke";
    this.shapes="line";
    this.width=canvas1.width;
    this.height=canvas1.height;
    this.history=[];
}
shape.prototype={
    init:function(){
        this.cobj.fillStyle=this.fillStyle;
        this.cobj.strokeStyle=this.strokeStyle;
        this.cobj.lineWidth=this.lineWidth;
    },
    line:function(x,y,x1,y1){
        var that=this;
        that.cobj.beginPath();
        that.cobj.moveTo(x,y);
        that.cobj.lineTo(x1,y1);
        that.cobj.stroke();
        that.cobj.closePath();
    },
    rect:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.rect(x,y,x1-x,y1-y);
        this.cobj[this.type]();
        this.cobj.closePath();
    },
    circle:function(x,y,x1,y1){
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.beginPath();
        this.cobj.arc(x,y,r,0,Math.PI*2,true);
        this.cobj[this.type]();
        this.cobj.closePath();
    },
    pen:function(){
        var that=this;
        that.canvas1.onmousedown=function(e){
            var x= e.offsetX;
            var y= e.offsetY;
            that.cobj.beginPath();
            that.cobj.moveTo(x,y);
            that.canvas1.onmousemove=function(e){
                var x1= e.offsetX;
                var y1= e.offsetY;
                that.cobj.lineTo(x1,y1);
                that.cobj.stroke();
            }
            that.canvas1.onmouseup=function(){
                that.cobj.closePath();
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.canvas1.onmousemove=null;
                that.canvas1.onmouseup=null;
            }
        }
    },
    five:function(x,y,x1,y1){
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1=r/2;
        this.cobj.beginPath();
        this.cobj.moveTo(x+r,y);
        for(var i=1;i<10;i++){
            if(i%2==0){
                this.cobj.lineTo(x+Math.cos(i*36*Math.PI/180)*r,y+Math.sin(i*36*Math.PI/180)*r);
            }else{
                this.cobj.lineTo(x+Math.cos(i*36*Math.PI/180)*r1,y+Math.sin(i*36*Math.PI/180)*r1);
            }
        }
        this.cobj.closePath();
        this.cobj[this.type]();
    },
    xp:function(xpobj,w,h){
        var that=this;
        that.canvas.onmousedown=function(){
           that.canvas.onmousemove=function(e){
               var ox= e.offsetX;
               var oy= e.offsetY;
               var lefts=ox-w/2;
               var tops=oy-h/2;
               if(lefts<0){
                   lefts=0;
               }
               if(lefts>that.width-w){
                   lefts=that.width-w;
               }
               if(tops<0){
                   tops=0;
               }
               if(tops>that.height-h){
                   tops=that.height-h;
               }
               xpobj.css({
                   left:lefts,
                   top:tops,
                   display:"block",
               })
               that.cobj.clearRect(lefts,tops,w,h);
           }
            that.canvas.onmouseup=function(){
                xpobj.css("display","none");
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
            }
        }
    },
    draw:function(){
        var that=this;
        that.canvas.onmousedown=function(e){
            var x= e.offsetX;
            var y= e.offsetY;
            that.canvas.onmousemove=function(e){
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length!=0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                that.init();
                var x1= e.offsetX;
                var y1= e.offsetY;
                that[that.shapes](x,y,x1,y1);
            }
            that.canvas.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
            }
        }
    },
    select:function(selectareaobj){
        var that=this;
        that.canvas.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            var minx,miny, w,h;
            that.init();
            that.canvas.onmousemove=function(e){
                var endx= e.offsetX;
                var endy= e.offsetY;
                minx=startx>endx?endx:startx;
                miny=starty>endy?endy:starty;
                w=Math.abs(startx-endx);
                h=Math.abs(starty-endy);
                selectareaobj.css({
                    left:minx,
                    top:miny,
                    width:w,
                    height:h,
                    display:"block"
                })
            }
            that.canvas.onmouseup=function(){
                that.canvas.onmouseup=null;
                that.canvas.onmousemove=null;
                that.temp=that.cobj.getImageData(minx,miny,w,h);
                that.cobj.clearRect(minx,miny,w,h);
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.cobj.putImageData(that.temp,minx,miny);
                that.drag(minx,miny,w,h,selectareaobj);
            }
        }
    },
    drag:function(x,y,w,h,selectareaobj){
        var that=this;
        that.canvas.onmousemove=function(e){
            selectareaobj.css("cursor","move");
        }
        that.canvas.onmousedown=function(e){
            var ax= selectareaobj.position().left;
            var ay= selectareaobj.position().top;
            var ox= e.clientX;
            var oy= e.clientY;
            that.canvas.onmousemove=function(e){
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length!=0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                var mx= e.clientX;
                var my= e.clientY;
                var lefts=(mx-ox)+ax;
                var tops=(my-oy)+ay;
                if(lefts<0){
                    lefts=0;
                }
                if(lefts>that.width-w){
                    lefts=that.width-w;
                }
                if(tops<0){
                    tops=0;
                }
                if(tops>that.width-h){
                    tops=that.width-h;
                }
                selectareaobj.css({
                    left:lefts,
                    top:tops
                })
                x=lefts;
                y=tops;
                that.cobj.putImageData(that.temp,lefts,tops);
            }
            that.canvas.onmouseup=function(){
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
                that.drag(x,y,w,h,selectareaobj);
            }
        }
    }
}