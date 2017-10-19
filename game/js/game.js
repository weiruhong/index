function game(){
    this.clientw=document.documentElement.clientWidth;
    this.clienth=document.documentElement.clientHeight;
    this.letterArr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.letterLen=5;//个数
    this.speed=3;
    this.spans=[];
    this.currArr=[];//当前字母
    this.currposArr=[];
    this.die=10;
    this.sore=0;
    this.currsore=0;
    this.num=10;
    this.soreEle=document.getElementsByClassName("sore")[0].getElementsByTagName("span")[1];
    this.dieEle=document.getElementsByClassName("die")[0].getElementsByTagName("span")[1];
    // this.step=10;
    this.aa=1;//关卡数 
}
game.prototype={
    play:function(){
        this.getLetter(this.letterLen);//将字母显示到页面当中
        this.move();
        this.key();
    },
    key:function(){
        var that=this;
        document.onkeydown=function(e){
            var ev=e||window.event;
            var code=String.fromCharCode(ev.keyCode);
            for(var i=0;i<that.spans.length;i++){
                if(that.spans[i].innerHTML==code){
                    document.body.removeChild(that.spans[i]);
                    that.spans.splice(i,1);
                    that.currArr.splice(i,1);
                    that.currposArr.splice(i,1)
                    that.getLetter(1);
                    that.sore++;
                    that.currsore++;
                    that.soreEle.innerHTML=that.sore;
                    if(that.currsore%that.num==0){
                        that.aa++;
                        alert("第"+that.aa+"关");
                        that.next();
                    }
                    break;
                }
            }
        }
    },
    next:function(){
        clearInterval(this.t);
        for(var i=0;i<this.spans.length;i++){
            document.body.removeChild(this.spans[i]);
        }
        this.spans=[];
        this.speed++;
        this.currposArr=[];
        this.currArr=[];
        this.letterLen++;
        this.num+=10;
        this.play();
    },
    move:function(){
        var that=this;
        this.t=setInterval(function(){
            for(var i=0;i<that.spans.length;i++){
                var top=that.spans[i].offsetTop+that.speed;
                that.spans[i].style.top=top+"px";
                if(top>that.clienth){
                    document.body.removeChild(that.spans[i]);
                    that.spans.splice(i,1);
                    that.currArr.splice(i,1);
                    that.currposArr.splice(i,1);
                    that.getLetter(1);
                    that.die--;
                    that.dieEle.innerHTML=that.die;
                    if(that.die==0){
                        alert("game over!");
                        location.reload();
                    }
                    
                }
            }
        },60)
    },
    getLetter:function(num){//现货区指定的字母
        var arr=this.getRand(num);
        var posArr=[];
        // var eleArr=[];
        for(var i=0;i<arr.length;i++){
            var span=document.createElement("span");
            var x=100+(this.clientw-200)*Math.random();
            var y=100*Math.random();
            var width=70;
            while(this.check1(posArr,x,width)){
                x=(100+(this.clientw-200)*Math.random());
            }
            posArr.push({minx:x,maxx:x+width});
            this.currposArr.push({minx:x,maxx:x+width});
            span.style.cssText="width:"+width+"px;height:75px;position:absolute;left:"+x+"px;top:"+y+"px;font-size:30px;background-image:url(img/"+arr[i]+".png);color:rgba(0,0,0,0);background-size:50px 75px;background-repeat:no-repeat;";
            span.innerHTML=arr[i];
            var aa=document.body
            aa.appendChild(span);
            this.spans.push(span)
        }   
    },
    check1:function(arr,x,width){
        for(var i=0;i<arr.length;i++){
            if(!(x+width<arr[i].minx||arr[i].maxx+width<x)){
                return true;
            }
        }
        return false;
    },
    getRand:function(num){//指定的数组去指定的字母
        var arr=[];
        for(var i=0;i<num;i++){
            var rand=Math.floor(this.letterArr.length*Math.random());
            while(this.check(this.currArr,this.letterArr[rand])){
                rand=Math.floor(this.letterArr.length*Math.random());
            }
            arr.push(this.letterArr[rand]);
            this.currArr.push(this.letterArr[rand])
        }
        return arr;
    },
    check:function(arr,val){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==val){
                return true;
            }
        }
        return false;
    },
}