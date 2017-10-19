$(function(){
    var box=$('.box');
    var copy=$(".copy");
    var canvas=$("canvas");
    var cobj=canvas[0].getContext("2d");
    canvas.attr({
        width:copy.width(),
        height:copy.height()
    });
    var tool=$(".tool");
    tool.mousedown(function(e){
        var ox=e.pageX;
        var oy=e.pageY;
        var x=tool.position().left;
        var y=tool.position().top;
        $(document).mousemove(function(e){
            var cx=e.pageX;
            var cy=e.pageY;
            var lefts=(cx-ox)+x;
            var tops=(cy-oy)+y;
            var bx=box.width();
            var by=box.height();
            var sx=tool.width();
            var sy=tool.height();
            if(lefts<0){
                lefts=0;
            }
            if(lefts>bx-sx){
                lefts=bx-sx;
            }
            if(tops<0){
                tops=0;
            }
            if(tops>by-sy){
                tops=by-sy;
            }
            tool.css({
                left:lefts,top:tops,
            });
        })
        $(document).mouseup(function(){
            $(document).off("mousemove");
        })
        e.preventDefault();
    })
    var obj=new shape(copy[0],canvas[0],cobj);
    /*图形*/
    $('.shapes li').click(function(){
        if($(this).attr("data-role")!="pen"){
            obj.shapes=$(this).attr("data-role");
            obj.draw();
        }else{
            obj.pen();
        }
    })
    /*类型*/
    $(".type li").click(function(){
        obj.type=$(this).attr("data-role");
    })
    /*线条颜色*/
    $(".borderColor input").change(function(){
        obj.strokeStyle=$(this).val();
    })
    /*填充颜色*/
    $(".bgColor input").change(function(){
        obj.fillStyle=$(this).val();
    })
    /*线条粗细*/
    $(".border li").click(function(){
        obj.lineWidth=$(this).attr("data-role");
    })
    $(".xpSize li").click(function(){
        var w=$(this).attr("data-role");
        var h=$(this).attr("data-role");
        $(".xp").css({
            width:w,
            height:h,
        })
        obj.xp($(".xp"),w,h);
    })
    $(".file li").click(function(){
        var index=$(this).index(".file li");
        if(index==0){
            if(obj.history!=0){
                var yes=window.confirm("是否保存");
                if(yes){
                    location.href=(canvas[0].toDataURL().replace("data:image/png","data:stream/octet"));
                }
            }
            obj.history=[];
            cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
        }else if(index==1){
            location.href=(canvas[0].toDataURL().replace("data:image/png","data:stream/octet"));
        }else if(index==2){
            cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
            if(obj.history!=0){
                var last=obj.history.pop();
                cobj.putImageData(last,0,0);
            }else{
                alert("无法返回");
                return;
            }
        }
    })
    $(".parent li").click=function(){
        if(obj.temp){
            obj.history.push(cobj.getImageData(0,0,canvas[0].width,canvas[0].height));
            obj.temp=null;
        }
    }
    $(".select li").click(function(){
        obj.select($(".selectArea"));
    })
})