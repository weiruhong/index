$(function(){
	//导航下拉
	var yiji=$(".zj-c");
	var erji=$(".zj2-ul");
	for(var i=0;i<yiji.length;i++){
		yiji[i].index=i;
		yiji[i].onmouseover=function(){
			for(var j=0;j<erji.length;j++){
				//erji[j].style.display="none";
				animate(erji[this.index],{height:230},500,Tween.Linear);
			}
		}
		yiji[i].onmouseout=function(){
			animate(erji[this.index],{height:0},500,Tween.Linear);
		}
	}
	//轮播
	var imgs=$(".imgs");
	var listb=$(".listbox")[0];
	var rightl=$(".rightl")[0];
	var leftl=$(".leftl")[0];
	var list=$("li",listb);
	var imgbox=$(".imgbox")[0];
	for(var i=0;i<list.length;i++){
		list[i].index=i;
		list[i].onmouseover=function(){
			clearInterval(t);
			for(var j=0;j<imgs.length;j++){
				imgs[j].style.zIndex=2;
				list[j].className="";
			}
			imgs[this.index].style.zIndex=3;
			list[this.index].className="hot";
		}
		list[i].onmouseout=function(){
			t=setInterval(moveright,2000);
			num=this.index+1;
		}
	}
	var t=setInterval(moveright,2000);
	var num=0;
	function moveright(){
		if(num==5){
			num=0;
		}
		for(var i=0;i<imgs.length;i++){
			imgs[i].style.zIndex=2;
			list[i].className="";
		}
		imgs[num].style.zIndex=3;
		list[num].className="hot";
		num++;
	}
	imgbox.onmouseover=function(){
		clearInterval(t);
	}
	imgbox.onmouseout=function(){
		t=setInterval(moveright,2000)
	}
    rightl.onclick=function(){
    	moveright();
    }
    leftl.onclick=function(){
    	/*var num=imgs.length-1;*/
    	if(num<0){
			num=imgs.length-1;
		}
		for(var i=0;i<imgs.length;i++){
			imgs[i].style.zIndex=2;
			list[i].className="";
		}
		imgs[num].style.zIndex=3;
		list[num].className="hot";
		num--;
    }
    rightl.onmouseover=leftl.onmouseover=function(){
    	clearInterval(t);
    }
    rightl.onmouseout=leftl.onmouseout=function(){
    	t=setInterval(moveright,2000);
    }
//banner左侧
	var uls=$(".main-b")[0];
	var lis=$("li",uls);
	var inner=$(".lefta");
	for(var i=0;i<lis.length;i++){
		lis[i].index=i;
		lis[i].onmouseover=function(){
			for(var j=0;j<inner.length;j++){
				inner[j].style.display="none";
			}
			inner[this.index].style.display="block";
		}
		lis[i].onmouseout=function(){
			inner[this.index].style.display="none";
		}
	}
    //点击
    function sj(val){
    	var mxb=$(".mxb")[val];
		var mxdp=$(".mxdp",mxb);
		var lt=$(".lt")[val];
		var gt=$(".gt")[val];
		var lis=$(".xiaomi-d");
		var len=mxdp.length;
		var num=0;
		for(var i=0;i<lis.length;i++){
			lis[i].index=i;
			lis[i].onclick=function(){
				animate(mxb,{marginLeft:-this.index*1226},600)
			}	
		}
		function move(){
			if(num==1){
				num=0;
				return;
			}
			num++;
			animate(mxb,{marginLeft:-num*1226},600)	
		}
		function move1(){
			if(num<0){
				num=0;
				return;
			}
			animate(mxb,{marginLeft:-num*1226},600)
			num--;
		}
		gt.onclick=function(){
			move();
		}
		lt.onclick=function(){
			move1();
		}
    }
    sj(0);
	//鼠标经过
	function xian(num){
		var main=$(".dp-e")[num];
		var mlis=$("li",main);
		var mx=$(".mx",main);
		for(var i=0;i<mlis.length;i++){
			mlis[i].index=i;
			mlis[i].onmouseover=function(){
				for(var j=0;j<mx.length;j++){
					animate(mx[this.index],{height:75},500,Tween.Linear)
				}
			}
			mlis[i].onmouseout=function(){
				animate(mx[this.index],{height:0},500,Tween.Linear)
			}
		}
	}
	xian(0);
	xian(1);
	xian(2);
	//选项卡
	function xxk(num){
		var one=$(".dp-one")[num];
		var two=$("li",one);
		var cona=$(".dp-e")[num]
		var cons=$(".dp-f",cona);
		for(var i=0;i<two.length;i++){
			two[i].index=i;
			two[i].onmouseover=function(){
				for(var j=0;j<cons.length;j++){
					cons[j].style.display="none";
				}
				cons[this.index].style.display="block";
			}
		}
	}
	
xxk(0)
xxk(1)
xxk(2)
//选项卡
function ten(num){
var tska=$(".tska")[num];
var anniu=$("li",tska);
var ecs=$(".ecs")[num];
var ec=$(".ec",ecs);
var you=$(".you")[num];
var zuo=$(".zuo")[num]
var num=0;
	you.onclick=function (){
		if(num==3){
			num=3;
			return;
		}
		num++;
		for(var i=0;i<anniu.length;i++){
			anniu[i].className="";
		}
		anniu[num].className="dhot";
		ecs.style.marginLeft=-296*num+"px";		
	}
    zuo.onclick=function (){
		if(num<0){
			num=0;
			return;
		}
		for(var i=0;i<anniu.length;i++){
			anniu[i].className="";

		}
		anniu[num].className="dhot";
		ecs.style.marginLeft=-296*num+"px";
	    num--;
    }

    for(var i=0;i<anniu.length;i++){
		anniu[i].index=i;
		anniu[i].onclick=function(){
		 for(var j=0;j<anniu.length;j++){
			anniu[j].className="";
		 }
		anniu[this.index].className="dhot";
		ecs.style.marginLeft=-296*this.index+"px";
	  }
	}
}
ten(0);
ten(1);
ten(2);
ten(3);

})