//1.获取类名的兼容函数
//classname:类名要加引号
//obj：父容器，表示从哪个父容器里来获取子容器
/*var bigbox=getClass("bigbox")[0];
var inner=getClass("inner",bigbox)[0];
inner.style.background="pink";*/
function getClass(classname,obj){
var obj=obj||document;//只要有一个为真它就为真，如果obj存在，
//就赋值给声明的obj，如果不存在，就docume赋值给声明的obj
//（声明的obj表示从哪个对象里获取）
     if(obj.getElementsByClassName){//为真时表示是现代浏览器
          return obj.getElementsByClassName(classname);
     }else{//为假是表示是IE8
          var alls=obj.getElementsByTagName("*");//获取所有标签元素
          var arr=[];
          for(i=0;i<alls.length;i++){//遍历这个alls集合
               if(checkClass(alls[i].className,classname)){
                 arr.push(alls[i]);
               }
          }
          return arr;//如果为真，则保存在数组中
     }
}
function checkClass(str,classname){//检测一个元素里是否有我们想要找的类名
     var newarr=str.split(" ");//将元素的类名（字符串）中的空格分割成数组
     for(var i=0;i<newarr.length;i++){//遍历这个数组，那数组中的每一个值
          //与classname比较，
          if(newarr[i]==classname){//如果相同，表示找到了，这个函数返回真
                return true;
          }
     }
               return false;//等这个数组遍历完以后，如果还没有找到相同的类名，则这个函数返回假
}
//*******************************************************************
//2.获取与设置对象的纯文本的兼容函数
//从哪个对象里来获取纯文本
//表示要设置的文本
//ff obj.textContent;
//IE obj.innerText
function getText(obj,val){
     if(val!=undefined){//设置
          if(obj.textContent||obj.textContent==""){
               obj.textContent=val;
          }else{
               obj.ineerText=val;
          }  
                     
     }else{ //获取
          if(obj.textContent){//为真表示是W3C的浏览器
               return obj.textContent;
          }else{//表示IE
               return obj.ineerText;
          } 
     }
}
//****************************************************************
//3. cc.获取外部与行内样式的属性
//FF window.getComputedStyle.width;
//ie obj.currentStyle.width;
     //var box=getClass("box")[0];
     function getStyle(obj,attr){//形参 var height
          if(obj.currentStyle){//FF
               return parseInt(obj.currentStyle[attr]);
          }else{//IE
          return parseInt(window.getComputedStyle(obj,null)[attr]);
          }
    }
    //document.write(getStyle(box).height);
    //document.write(getStyle(box,"height"));
//************************************************************************
//4. document.getElementById()
//   $(".one"); slice(0,1)  charAt(0)==""
//   $("#first")
//   $("div")
function $(selector,father){
     obj=father||document;
     if(typeof(selector)=="string"){//判断selector是否是字符串
          selector=selector.replace(/^\s*|\s*$/g,"")//找出字符串前后的空格并用空字符串替换，
          //替换以后的结果覆盖原来的selector;
          if(selector.charAt(0)=="."){//类名
               return getClass(selector.slice(1),obj)
          }else if(selector.charAt(0)=="#"){//ID
               return obj.getElementById(selector.slice(1));
          }else if(/^[a-z|1-10]{1-10}$g.test(selector)/){//标签
               return obj.getElementsByTagName(selector);
          }
     }else if(typeof selector=="function"){
          window.onload=function(){
               selector();
          }
     }
}  
//5.获取对象的子节点 
//a:只获取元素节点  b：获取元素+文本节点
function getChilds(father,type){
     var type=type||"a";//type没有赋值时，默认为“a”（第二个
     var childs=father.childNodes;//找到所有的儿子
     var arr=[];//声明一个容器
     for(i=0;i<childs.length;i++){
          if(type=="a"){
             if(childs[i].nodeType==1){//获得元素节点
               arr.push(childs[i])
             }  
          }else if(type=="b"){
               if(childs[i].nodeType==1||(childs[i].nodeValue.replace(/^\s*|\s*$/g,"")!=""&&childs[i].nodeType!=8)){
                    arr.push(childs[i]);
               }
          }
          
     }
     return arr;
}
//6.获取第一个子节点
function getFirst(father){
     return getChilds(father)[0];
}
//7.获取最后一个节点
function getLast(father){
     return getChilds(father)[getChilds(father).length-1]
}
//8.获取指定的子节点
function getRandom(father,val){
     return getChilds(father)[val];
} 
//9.获取下一个兄弟节点
function getDown(obj){
   var down=obj.nextSibling;
   while(down.nodeType==3||down.nodeType==8){
     down=down.nextSibling;
     if(down==null){
          return false;
     }
   }
   return down;
} 
//10.获取上一个兄弟节点
function getUp(obj){
  var up=obj.previousSibling;
  if(up==null){
    return false;
  }while(up.nodeType==3||up.nodeType==8){
   up=up.previousSibling;
   if(up==null){
    return false;
   } 
  }
  return up;
} 
//11.要插入到某个对象之后
//newobj:要追加的对象
//在哪个对象之前
//对象共有的方法一般是加在原型上的，而原型只能给构造函数添加，所以共有的方法是添加到对象的构造函数的原型上的
//this：指的是最终调用这个方法的对象，而这个对象是通过构造函数new出来的对象
Object.prototype.insertAfter=function(newobj,obj){
   var down=getDown(obj);//过去obj的下一个兄弟节点
   if(down){//如果兄弟节点存在
    this.insertBefore(newobj,obj);//就把newobj插入到这个兄弟节点的前面（也就是obj对象的后面）
   }else{//如果兄弟节点不存在，表示obj就是最后一个节点了
    this.appendChild(newobj);//直接追加到父对象的后面
   }
}
//12.将一个元素对象作为一个漂浮窗口
//box：漂浮窗口
//close：关闭按钮
//speedx：x轴的速度
//speedy：y轴的速度
function floatwindow(box,close,val1,val2){
               /*var box=$(".box")[0];
               var close=$(".close")[0];*/
               var t=setInterval(move,val1)
               var sheepX=val2;
               var sheepY=val2;
               var swidth=box.offsetWidth;//自身的宽
               var sheight=box.offsetHeight;//自身的高
               var cwidth=document.documentElement.clientWidth;//浏览器的宽
               var cheight=document.documentElement.clientHeight;//浏览器的高
               //浏览器的三大事件 window.onload  文档加载完成事件
                                  //window.onscroll 窗口滚动条事件
                                  //window.onresize  窗口改变事件
               window.onresize=function(){
               cwidth=document.documentElement.clientWidth;//浏览器的宽
                 cheight=document.documentElement.clientHeight;//浏览器的高
               }
               function move(){
                    var selfleft=box.offsetLeft;//自身的左边距
                    var selftop=box.offsetTop;//自身的上边距
                    var newleft=selfleft+sheepX;//加速之后的左边距
                    var newtop=selftop+sheepY;//加速之后的上边距
                    
                    if(newtop>=(cheight-sheight)){//下
                         newtop=cheight-sheight;
                         sheepY*=-1;
                    }
                    if(newleft>=(cwidth-swidth)){//右
                         newleft=cwidth-swidth;
                         sheepX*=-1;
                    }
                    if(newtop<=0){//上
                         newtop=0;
                         sheepY*=-1;
                    }
                    if(newleft<=0){//左
                         newleft=0;
                         sheepX*=-1;
                    }
                    box.style.left=newleft+"px";
                    box.style.top=newtop+"px";
               }
               box.onmouseover=function(){
                    clearInterval(t)
               }
               box.onmouseout=function(){
                    t=setInterval(move,val1);
               }
               close.onclick=function(){
                    box.style.display="none";
               }    
          }

//13.同一事件添加多个处理程序的兼容函数
function addEvent(obj,event,fun){
  if(obj.addEventListener){
    return obj.addEventListener(event,fun,false);
  }else{
    return obj.attachEvent("on"+event,fun);
  }
}     
//14.同一事件移除多个处理程序的兼容函数
function detEvent(obj,event,fun){
  if(obj.removeEventListener){
    return obj.removeEventListener(event,fun,false);
  }else{
    return obj.detachEvent("on"+event,fun);
  }
}
//15.解决鼠标滚轮事件的兼容问题
//mouseWheel(obj,upfun,downfun)
//obj 要执行滚轮事件的对象
//upfun 往上滚动的处理程序
//downfun 往下混动的处理程序
  function mouseWheel(obj,upfun,downfun){
  //添加滚轮事件的兼容问题
    if(obj.attachEvent){
      obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
    }else if(obj.addEventListener){
      obj.addEventListener("mousewheel",scrollFn,false);
      //chrome,safari -webkit-
      obj.addEventListener("DOMMouseScroll",scrollFn,false);
      //firefox -moz-
    }
        function scrollFn(e){
          var ev=e||window.event;
          var aa=ev.detail;
          var bb=ev.wheelDelta;
          if(ev.detail==-3||ev.wheelDelta==120){
            if(upfun){
              upfun.call(obj);
            }
          }
          if(ev.detail==3||ev.wheelDelta==-120){
            if(downfun){
              downfun.call(obj);
            }
          }
          //组织浏览器的默认行为
        if(ev.preventDefault)
            ev.preventDefault(); //阻止默认浏览器动作(W3C)
        else
            ev.returnValue = false;//IE中阻止函数器默认动作的方式  
        }
          
  }

//16.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/
//17.阻止事件流的兼容函数
function stopEvent(obj){
  if(obj.stopPropagation){
    obj.stopPropagation();
  }else{
    obj.cancelBubble=true;
  }
}
//18.阻止浏览器的默认行为的兼容函数
function stopClient(obj){
  if (obj.preventDefault)
  obj.preventDefault(); //阻止默认浏览器动作(W3C)
  else
  obj.returnValue= false;//IE中阻止函数器默认动作的
方式
}

//检测数组的类型
function isType(o,type){
    if(Object.prototype.toString.call(o) == '[object '+type+']'){
      return true;
    }
    return false;
  }
  function isArray(o){
     return isType(o,'Array'); 
  }
  
  function isObject(o){
    return isType(o,'Object');
  }

/*
    获取具有定位属性的父元素，相对于body的left top值
    offset(obj).left 相对于body left
    offset(obj).top 相对于body top
  */
  function offset(obj){
    var parent=obj.parentNode;
    var arr=[];
    var x=0;
    var y=0;
    while(parent.nodeName!=="BODY"){
      var str=getStyle(parent,"position");
      if(str=="absolute"||str=="relative"||str=="fixed"){
        arr.push(parent);
      }
      parent=parent.parentNode;
    }
    for(var i=0;i<arr.length;i++){
      var top=arr[i].offsetTop;
      var borderT=getStyle(arr[i],"borderTopWidth")
      y+=top+borderT;
      var left=arr[i].offsetLeft;
      var borderL=getStyle(arr[i],"borderLeftWidth");
      x+=left+borderL;
      }
      return{left:x,top:y};
  }