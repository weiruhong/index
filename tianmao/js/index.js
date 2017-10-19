window.onload=function(){
  //换一批
       var onearr=[];
       var twoarr=[];
       var threearr=[];
       var fourarr=[];
       var con=$(".tp");
       var title=$(".titlea");
       var huan=$(".gj-e")[0];
       //放图片
       for(var i=9;i<45;i++){
          onearr.push("img/"+i+".jpg");//36
          twoarr.push("img/"+i+".jpg");//36
          threearr.push("img/"+i+".jpg");//36
          fourarr.push("img/"+i+".jpg");//36
       }
       //随机取24张图片
        function random(arr){
          var newarr=[];
          for(i=0;i<24;i++){
            newarr.push(arr[parseInt(Math.random()*34)]);
          }
          return newarr;
        }
        random(onearr);
        var tuarr=[onearr,twoarr,threearr,fourarr]
        function show(num){
           var imgarr=random(tuarr[num])
           for(i=0;i<imgarr.length;i++){
              var div=document.createElement("div");
              div.style.cssText="width:132px;heihgt:81px;float:left;background:white;margin-left:2px;margin-bottom:2px;text-align:center;line-height:81px;position:relative;";
              var xin=document.createElement("img");
              xin.style.cssText="position:absolute;top:10px;right:10px;display:none";
              xin.src="./images/160.png";
              div.appendChild(xin);
              var img=document.createElement("img")
              img.src=imgarr[i];
              img.style.cssText="vertical-align:middle; width:90px;heihgt:45px"
              div.appendChild(img)
              con[num].appendChild(div)

              div.className="imgbo";

              xin.className="taoxin";
              // alert(xin.className)
              var imgbo=$(".imgbo");
              var taoxin=$(".taoxin");
              for(var j=0;j<imgbo.length;j++){
                imgbo[j].index=j;
                imgbo[j].onmouseover=function(){
                  taoxin[this.index].style.display="block";
                }
                imgbo[j].onmouseout=function(){
                  taoxin[this.index].style.display="none";
                }
                
              }
           }
        }        
        show(0)
        index=0;
        for (var i=0;i<title.length;i++){
          title[i].index=i;
          title[i].flag=true;
          title[0].flag=false;
          title[i].onclick=function(){
            index=this.index;
            for(var j=0;j<con.length;j++){
              con[j].style.zIndex=1;
              title[j].style.fontSize="12px";
              title[j].style.fontWeight="normal";
              title[j].style.textDecoration="none";
            }
            con[this.index].style.zIndex=2;
            title[this.index].style.fontSize="14px";
            title[this.index].style.fontWeight="bold";
            title[this.index].style.textDecoration="underline";
            if(this.flag){
              show(this.index);
              this.flag=false;
            }
          }
        }
        huan.onclick=function(){
          con[index].innerHTML="";
          show(index)
        }
//右侧定位
function ydw(){
  var drr=$(".drr");
  var right1=$(".right1");
  for(var i=0;i<drr.length;i++){
    drr[i].index=i;
    drr[i].onmouseover=function(){
      for(var j=0;j<right1.length;j++){
          animate(right1[this.index],{width:90},500,Tween.Linear)
      }
    }
    drr[i].onmouseout=function(){
      animate(right1[this.index],{width:0},500,Tween.Linear)
    }
  }
}
ydw();
// 返回顶部
var fhdb=$(".drr dra")[0];
fhdb.onclick=function(){
  var obj=document.documentElement.scrollTop?document.documentElement:document.body;
  animate(obj,{scrollTop:0},500,Tween.Linear)
}

//选项卡
/*var titlea=getClass("titlea");
var tp=getClass("tp")
for(var i in titlea){
     (function(i){
	     titlea[i].onclick=function(){
	     	for(var j=0;j<tp.length;j++){
	     		tp[j].style.display="none";
	     		titlea[j].style.fontWeight="normal";
	     		titlea[j].style.textDecoration="none";
	     	}
	     	tp[i].style.display="block";
	     	titlea[i].style.fontWeight="bold";
	     	titlea[i].style.textDecoration="underline";
	     }
     })(i);
     		
}*/
// 桃心显示 
/*var imgbox=$(".xxk")[0];
var lis=$("li",imgbox);
var taoxin=$(".xin");
for(var i=0;i<lis.length;i++){
     lis[i].index=i;
     lis[i].onmouseover=function(){
     taoxin[this.index].style.display="block";
     }
     lis[i].onmouseout=function(){
          taoxin[this.index].style.display="none";
     }
}*/

//天猫搜索/楼层跳转/按需加载
var td=$(".td")[0];
var dw=$(".dw")[0];
var xdw=$("li",dw);
var fz=$(".fz");
var lcarr=["1F","2F","3F","4F","5F","6F","7F","8F","9F","10F","11F","12F"]
var wzarr=["精品女装","美容护肤","精品男装","休闲女鞋","户外运动","电子设备","家用电器","母婴玩具","新鲜食品","图书管理","家装家纺","百货超市",]
var flag=true;
var flag2=true;
for(var i=0;i<xdw.length;i++){
  xdw[i].index=i;
  xdw[i].onclick=function(){
    var obj=document.documentElement.scrollTop?document.documentElement:document.body;
    animate(obj,{scrollTop:fz[this.index].aa-100},500,Tween.Linear);
    for(var j=0;j<xdw.length;j++){
      xdw[j].style.background="";
    }
    xdw[this.index].style.background="red";

  }
}
window.onscroll=function(){
     var obj=document.documentElement.scrollTop?document.documentElement:document.body;
     var scrollT=obj.scrollTop;
     if(scrollT>=600){
        if(flag){
          animate(td,{top:0},500,Tween.Linear);
          flag=false;
          flag2=true;
        }
      }else{
        if(flag2){
          animate(td,{top:-50},500,Tween.Linear)
          flag=true;
          flag2=false;
        }
      }
      if(scrollT>=500&&scrollT<=6500){
        dw.style.display="block";
      }else{
        dw.style.display="none";
      }
      for(var i=0;i<fz.length;i++){
        fz[i].aa=fz[i].offsetTop;
        if(scrollT>=fz[i].aa-100){
          for(j=0;j<xdw.length;j++){
            xdw[j].style.background="";
            xdw[j].style.fontSize="";
            xdw[j].style.lineHeight="";
            xdw[j].style.color="";
            xdw[j].innerHTML=lcarr[j];

          }
          xdw[i].style.background="red";
          xdw[i].innerHTML=wzarr[i];
          xdw[i].style.fontSize="12px";
          xdw[i].style.lineHeight="18px";
          xdw[i].style.color="white";
        }
      }
      var floor=$(".fz");
      var ch=document.documentElement.clientHeight;
        var obj=document.documentElement.scrollTop?document.documentElement:document.body;
        for(var i=0;i<floor.length;i++){
          if(floor[i].offsetTop<obj.scrollTop+ch){
            var imgs=$("img",floor[i]);
            for(var j=0;j<imgs.length;j++){
              imgs[j].src=imgs[j].getAttribute("aa");
            }
          }
          
          
        }
}
//楼层跳转
    // var dw=$(".dw")[0];
    // var xdw=$("li",dw);
    // var fz=$(".fz");
    //      for(var i=0;i<xdw.length;i++){
    //       xdw[i].index=i;
    //       xdw[i].onclick=function(){
    //         var obj=document.documentElement.scrollTop?document.documentElement:document.body;
    //         animate(obj,{scrollTop:fz[this.index].aa},500,Tween.Linear)
    //             for(j=0;j<xdw.length;j++){
    //               xdw[j].style.background=""
    //             }
    //             xdw[this.index].style.background="red";
    //       }
    //      }
    //      window.onscroll=function(){
    //       var obj=document.documentElement.scrollTop?document.documentElement:document.body;
    //       var scrollT=obj.scrollTop;
    //       //左侧按钮************************
    //         if(scrollT>=300){
    //           dw.style.display="block";
    //         }else{
    //           dw.style.display="none";
    //         }
    //         for(var i=0;i<fz.length;i++){
    //           fz[i].aa=fz[i].offsetTop;
    //           var sheight=scrollT+330;
    //           if(sheight>=fz[i].aa){
    //             for(var j=0;j<xdw.length;j++){
    //               xdw[j].style.background="";
    //             }
    //             xdw[i].style.background="red";
    //           }
    //         }
    //   }
//轮播
  var imgs=$(".img");
  var list=$(".list");
  var main1=$(".main1")[0];
  var bgarr=["#b90af9","#feb8dd","#dfdfdf","#17263b","#ff489b","#e04648"]
  for(var i=0;i<list.length;i++){
     list[i].index=i;
     list[i].onmouseover=function(){
          clearInterval(t)
          for(var j=0;j<imgs.length;j++){
          imgs[j].style.zIndex=2;
          list[j].style.background="#333";  
          }
          imgs[this.index].style.zIndex=3;
          list[this.index].style.background="#C40000";
          main1.style.background=bgarr[this.index];      
     }
     list[i].onmouseout=function(){
          t=setInterval(move,2000);
          num=this.index+1;
     }
  }
  var t=setInterval(move,2000)
  var num=1;
  function move(){
    if(num==6){
     num=0;
    }
    for(var i=0;i<imgs.length;i++){
     imgs[i].style.zIndex=2;
     list[i].style.background="#333";
    }
    imgs[num].style.zIndex=3;
    list[num].style.background="#C40000";
    main1.style.background=bgarr[num];
    num++;
  }
  var maina=$(".main-a")[0];
  var mlis=$("li",maina);
  var maic=$(".maic");
  var bannercon=$(".banner-center-con");
  var bgarr2=["#b90af9","#d40c54","#e64d48","#efefef","#f9345f","#8213b7","#81dfe1","#dfefd5","#364cf8","#248ef2","#ffc700","#e4e4e4","#ff5782","#d40c54","#f63a3b","#dc0338"];
  for(var i=0;i<mlis.length;i++){
    mlis[i].index=i;
    mlis[i].onmouseover=function(){
      if(this.index==0){
        clearInterval(t);
        for(var j=0;j<bannercon.length;j++){
          bannercon[j].style.zIndex=2;
        }
        bannercon[0].style.zIndex=6;
        main1.style.background=bgarr[num-1];
        t=setInterval(move,2000);
      }else{
        clearInterval(t);
        for(j=0;j<bannercon.length;j++){
          bannercon[j].style.zIndex=2;
        }
        bannercon[this.index].style.zIndex=6;
        main1.style.background=bgarr2[this.index];
      }
      for(var j=0;j<maic.length;j++){
        maic[j].style.display="none";
      }
      maic[this.index].style.display="block";
    }
  }
  
//下拉菜单
  var righta=$(".righta");
  var rightb=$(".rightb");
  var right=$(".right")[0];
  for(var i=0;i<righta.length;i++){
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
  //节点轮播
function lou(num){
  var imgb=$(".imgb")[num];
  var leftbtn=$(".leftbtn")[num];
  var rightbtn=$(".rightbtn")[num];
  var t=setInterval(moveleft,1000)
  function moveleft(){
    animate(imgb,{left:-100},500,Tween.Linear,function(){
      var first=getFirst(imgb);
      imgb.appendChild(first);
      imgb.style.left=0;
    })
  }
  function moveright(){
    var last=getLast(imgb);
    imgb.insertBefore(last,getFirst(imgb));
    imgb.style.left="-100px";
    animate(imgb,{left:0},500,Tween.Linear)
  }
  leftbtn.onmouseover=rightbtn.onmouseover=function(){
     clearInterval(t);
  }
  leftbtn.onmouseout=rightbtn.onmouseout=function(){
    t=setInterval(moveleft,1000)
  }
  leftbtn.onclick=function(){
    moveleft();
  }
  rightbtn.onclick=function(){
    moveright();
  }
}
lou(0);
lou(1);
lou(2);
lou(3);
lou(4);
lou(5);
var xl=$(".xl");
// var maina=$(".xxl")[0];
 var mlis=$(".main-aa");
for(var i=0;i<mlis.length;i++){
  mlis[i].index=i;
  hover(mlis[i],function(){
    for(var j=0;j<xl.length;j++){
      xl[j].style.display="none";
    }
    xl[this.index].style.display="block";
  },function(){
    xl[this.index].style.display="none";
  })
} 
//左侧固定定位
var cws=document.documentElement.clientWidth;
var dwa=$(".dw")[0];
window.onresize=function(){
  cws=document.documentElement.clientWidth
  dwa.style.left=((cws-1351)/2)+30+"px";
}
}