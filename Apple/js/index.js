$(function(){
   /*导航效果*/
	var $btn=$(".btn");
	var $minnav=$(".min-nav");
	var $maxnav=$(".max-nav");
	$btn.click(function(){
		$(this).toggleClass("active")
		$maxnav.slideToggle(200)
	})
    resizeWin();
	$(window).resize(resizeWin)


	/*banner效果*/
	var $banner=$(".bannerinner");
	var $btns=$(".btnlist a");
    var num1=0,num2=0;
    $btns.eq(0).addClass("change");
	var t=setInterval(move,3000);
	function move(){
		var left=$banner.eq(0).width();
		num2++;
		if(num2>3){
			num2=0;
		}
        $banner.css({zIndex:20});
        $banner.eq(num1).css({zIndex:21}).animate({left:-left},500,"linear");
        $banner.eq(num2).css({left:left,zIndex:21}).animate({left:0},500,"linear");
        $btns.removeClass("change");
        $btns.eq(num2).addClass("change");
        num1=num2;
	}
	$btns.click(function(){
		clearInterval(t);
		var index=$(this).index();
		var left=$banner.eq(0).width();
		$btns.removeClass("change");
		if(index>num1){
          $banner.eq(num1).css({zIndex:21}).animate({left:-left},500,"linear");
          $banner.eq(index).css({left:left,zIndex:21}).animate({left:0},500,"linear");
		}else{
          $banner.eq(num1).css({zIndex:21}).animate({left:left},500,"linear");
          $banner.eq(index).css({left:-left,zIndex:21}).animate({left:0},500,"linear");
		}
		$btns.eq(index).addClass("change");
		num1=num2=index;
		setTimeout(function(){
          t=setInterval(move,3000)
		},3000)
	})

	/*底部效果*/
	var $ht=$(".column h3");
	var $uls=$(".column ul");
	$ht.click(function(){
		var i=$(this).index(".column h3");
		if($(this).hasClass("title")){
		  $uls.eq(i).slideToggle(200);
		  $(this).find(".jia").toggleClass("revolve");
	    }else{
	    	return false;
	    }
	})

   function resizeWin(){
		 var ww=$(window).width();
		 var wh=$(window).height();
		 $maxnav.css({'display':''})
		 $btn.removeClass("active");
		 if(ww>768){
		 	$maxnav.css({'display':'block','height':'100%'});
		 	$(".column h3").removeClass("title");
		 	$(".column ul").css({'display':'block'})
		 	
		 }
		 if(ww<768){
		 	$maxnav.css({'height':wh-44,'display':'none'});
		 	$(".column h3").addClass("title");
		 	$(".column ul").css({'display':'none'})
		 }
	}
})