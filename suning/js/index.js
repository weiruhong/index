window.onload=function(){
	//导航下拉
	var righta=$(".righta");
	var rightb=$(".rightb");
	var len=righta.length;
	for(var i=0;i<len;i++){
		righta[i].index=i;
		hover(righta[i],function(){
			var sons=$("li",rightb[this.index]);
			var h=sons[0].offsetHeight;
			rightb[this.index].style.height=0;
			animate(rightb[this.index],{height:h*sons.length},200,Tween.Linear);
		},function(){
			animate(rightb[this.index],{height:0},200,Tween.Linear);
		})
	}
//banner 左侧
var ylc=$(".ylc");
var mainbb=$(".mainbb");
for(var i=0;i<mainbb.length;i++){
	mainbb[i].index=i;
	hover(mainbb[i],function(){
		for(var j=0;j<ylc.length;j++){
			ylc[j].style.display="none";
		}
		ylc[this.index].style.display="block";
	},function(){
		ylc[this.index].style.display="none";
	})
}
//右边定位
/*var right3=$(".right3");
var right1=$(".right1");
for(var i=0;i<right3.length;i++){
  right3[i].index=i;
  right3[i].onmouseover=function(){
    for(var j=0;j<right1.length;j++){
        right1[j].style.display='none';
    }
        right1[this.index].style.display='block';
  }
  right3[i].onmouseout=function(){
    right1[this.index].style.display='none';
  }
}
// 返回顶部
var fhdb=$(".right3 dra")[0];
fhdb.onclick=function(){
  var obj=document.documentElement.scrollTop?document.documentElement:document.body;
  animate(obj,{scrollTop:0},200,Tween.Linear)
}*/

//轮播
var imgs=$(".imgs");
var mainn=$(".mainn")[0];
var list=$("li",mainn);
var main=$(".main")[0];
var bgarr=["#f4e5ec","#b70bb5","#f6e9d9","#000000","#ff4e3e","#4535f0","#ea243b","#fff21a","#f1a303","#fd420b","#030303"]
var len=imgs.length;
for(var i=0;i<list.length;i++){
	list[i].index=i;
	list[i].onmouseover=function(){
		clearInterval(t);
		for(var j=0;j<len;j++){
			imgs[j].style.zIndex=2;			
		}
		imgs[this.index].style.zIndex=3;
		main.style.background=bgarr[this.index];
	}
	list[i].onmouseout=function(){
		t=setInterval(move,2000);
		num=this.index+1;
	}
}
var t=setInterval(move,2000);
var num=1;
function move(){
	if(num==len){
		num=0;
	}
	for(var i=0;i<len;i++){
		imgs[i].style.zIndex=2;
	}
	imgs[num].style.zIndex=3;
	main.style.background=bgarr[num];
	num++;
}
//选项卡
function getrm(num,color){
	var fsc=$(".fsc")[num];
	var flis=$("li",fsc);
	var xxk=$(".xxk")[num]
	var xxka=$(".xxka",xxk);
	for(var i=0;i<flis.length;i++){
		flis[i].index=i;
		flis[i].onmouseover=function(){
			for(var j=0;j<xxka.length;j++){
				xxka[j].style.display="none";
				flis[j].style.borderBottom=""
			}
			xxka[this.index].style.display="block";
			flis[this.index].style.borderBottom="2px solid "+color;
		}
	}	
}
getrm(0,"#FF6B80");
getrm(1,"#61b3ff");
getrm(2,"#aed55a");
getrm(3,"#ff9901");
getrm(4,"#ff6565");
getrm(5,"#fb7292");
getrm(6,"#6d93ff");
getrm(7,"#356acb");
getrm(8,"#7cbb2e");
getrm(9,"#9e652b");
//层跳转
var dw=$(".dw")[0];
var dlis=$("li",dw);
var fs=$(".fs");
var lcarr=["1F","2F","3F","4F","5F","6F","7F","8F","9F","10F"]
var wzarr=["服饰百货","手机通讯","生活日用","食品酒水","母婴玩具","美妆个护","电脑数码","家用电器","家装建材","图书音像",]
for(var i=0;i<dlis.length;i++){
	dlis[i].index=i;
	dlis[i].onclick=function(){
		var obj=document.documentElement.scrollTop?document.documentElement:document.body;
		// fs[this.index].aa=fs[this.index].offsetTop;
		// obj.scrollTop=fs[this.index].offsetTop;
		animate(obj,{scrollTop:fs[this.index].aa},500)
		for(var j=0;j<dlis.length;j++){
			dlis[j].style.background=""
		}
		dlis[this.index].style.background="red";
	}
}
window.onscroll=function(){
	var obj=document.documentElement.scrollTop?document.documentElement:document.body;
	var scrollT=obj.scrollTop;
	if(scrollT>=500&&scrollT<=6500){
		dw.style.display="block";
	}else{
		dw.style.display="none";
	}
	for(var i=0;i<fs.length;i++){
		fs[i].aa=fs[i].offsetTop;
		if(scrollT>=fs[i].aa-100){
			for(var j=0;j<dlis.length;j++){
				dlis[j].style.background="";
				dlis[j].innerHTML=lcarr[j];
			}
			dlis[i].style.background="red";
			dlis[i].innerHTML=wzarr[i];
		}
	}
var floor=$(".fs");
      var ch=document.documentElement.clientHeight;
        var obj=document.documentElement.scrollTop?document.documentElement:document.body;
        for(var i=0;i<floor.length;i++){
          if(floor[i].offsetTop<obj.scrollTop+ch){
            var imgs=$("img",floor[i]);
            for(var j=0;j<imgs.length;j++){
              imgs[j].src=imgs[j].getAttribute("asrc");
            }
          }
          
          
        }
}
//点击轮播
var xbox=$(".sbox");
var xa=$(".xa")[0];
var xas=$("li",xa);
var xright=$(".xright")[0];
var xleft=$(".xleft")[0];
var lens=xbox.length;
for(var i=0;i<lens;i++){
	var xboxW=xbox[0].offsetWidth;
	if(i!=0){
		xbox[i].style.left=xboxW+"px";
	}
}
var now=0;
var next=0;
var flag=true;
// var t=setInterval(Moveright,2000);
function Moveright(){
	if(!flag){
		return;
	}
	flag=false;
	next++;
	if(next==lens){
		next=0;
	}
	xbox[next].style.left=xboxW+"px";
	animate(xbox[now],{left:-xboxW},800)
	animate(xbox[next],{left:0},800,Tween.Linear,function(){
			flag=true;
		});
	xas[now].className="";
	xas[next].className="xhot";
	now=next;
}
    var xlen=xas.length;
	for(var i=0;i<xlen;i++){
		xas[i].index=i;
		xas[i].onclick=function(){
			if(now==this.index||!flag){
				return;
			}
			flag=false;
			if(now<this.index){
				xbox[this.index].style.left=xboxW+"px";
				animate(xbox[now],{left:-xboxW},800);
			}else{
				xbox[this.index].style.left=-xboxW+"px";
				animate(xbox[now],{left:xboxW},800);
			}
			animate(xbox[this.index],{left:0},800,Tween.Linear,function(){
				flag=true;
			})
			xas[now].className="";
			this.className="xhot";
			now=next=this.index;
		}
	}
xright.onclick=function(){
	Moveright();
}
xleft.onclick=function(){
	if(!flag){
    		return;
    	}
    	flag=false;
	next--;
	if(next<0){
		next=lens-1;
	}
	xbox[next].style.left=-xboxW+"px";
	animate(xbox[now],{left:xboxW},800);
	animate(xbox[next],{left:0},800,Tween.Linear,function(){
    		flag=true;
    	});
	xas[now].className="";
	xas[next].className="xhot";
	now=next;
}
var cws=document.documentElement.clientWidth;
var dwa=$(".dw")[0];
window.onresize=function(){
	cws=document.documentElement.clientWidth
	dwa.style.left=((cws-1351)/2)+30+"px";
}
var drr=$(".drr");
var right1=$(".right1");
for(var i=0;i<drr.length;i++){
  drr[i].index=i;
  drr[i].onmouseover=function(){
    for(var j=0;j<right1.length;j++){
        right1[j].style.display='none';
    }
        right1[this.index].style.display='block';
  }
  drr[i].onmouseout=function(){
    right1[this.index].style.display='none';
  }
}
// 返回顶部
var fhdb=$(".drr dda")[0];
fhdb.onclick=function(){
  var obj=document.documentElement.scrollTop?document.documentElement:document.body;
  animate(obj,{scrollTop:0},200,Tween.Linear)
}
}