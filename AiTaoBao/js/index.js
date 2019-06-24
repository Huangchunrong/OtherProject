window.onload = function(){
	// 轮播图
	var wrap = document.getElementById("carousel");
	var pre = document.getElementById("btn-pre");
	var next = document.getElementById("btn-next");
	var animated = false;
	var timer;
	pre.onclick = function(){
    if(!animated){
		    circle--;
		    if(circle < 1){
			     circle = 6;
	      	}
        circleFun();
  		  carouFun(520);
    }
	}
	next.onclick = function(){
    if(!animated){
		    circle++;
	    	if(circle > 6){
			     circle = 1;
		     }
        circleFun();
        carouFun(-520);
    }
	}
	// 向左向右移动
	function  carouFun(x){
    animated = true; 
		// 获取初始位置wrap.style.left
		var L = parseInt(wrap.style.left) + x;
		var time = 400;//位移总时间
    var interval = 10;//位移间隔时间
    var speed = x/(time/interval); //每次位移量

  function go(){
    if((speed<0 && parseInt(wrap.style.left)>L) || (speed>0 && parseInt(wrap.style.left)<L)){
       wrap.style.left = parseInt(wrap.style.left) + speed + "px";
       setTimeout(go,interval);
    }else{
       animated = false; 
       wrap.style.left = L + "px"; 
        if(L < -3120){
          wrap.style.left = -520 + "px";
        }else if(L > -520){
          wrap.style.left = -3120 + "px";
        }
      }
    } 
    go();       
	}
	 // 定时器
   function autoFun(){
        timer = setInterval(function(){
    	 next.onclick();
    },3000);
   }
   // 定时器自动播放
    autoFun();
   // 鼠标移进停止播放 移除继续播放
    var  wrapC = document.getElementById("wrap-carousel");
         wrapC.onmouseover = function(){
         	clearInterval(timer);
         }
         wrapC.onmouseout = function(){
         	autoFun();
         }
	 
   //  小圆点随左右移动
   
   var circle = 1;
   var wrapli = document.getElementById("circle").getElementsByTagName("li");
   function circleFun(){
   for(var i = 0;i < wrapli.length;i++){
   	 	wrapli[i].className = "";
   	 	   }
      wrapli[circle-1].className = "on";
     }

     //  点击小圆点图片随之移动

     for(var i = 0; i < wrapli.length; i++ ){
         (function(i){
         	// console.log(i);
         	wrapli[i].onmouseover=function(){
         		var clickindex = parseInt(this.getAttribute("index"));
         		var offsetlenth = -520*(clickindex - circle); //目标小圆点与原点的长度
            if(animated == false){
               circle = clickindex;
         		   carouFun(offsetlenth);
               circleFun();
              }
         		// console.log(clickindex);
     	     }
         })(i);
     	 
     }

 //  小轮播图切换
   var wrapSmall = document.getElementById("ca-sel");
	 var pre3 = document.getElementById("btn3-pre");
	 var next4 = document.getElementById("btn4-next");
   var animate = false; //判断是否在执行动画
	 var timer2;
	 function smallFun(m){
	 	var smLeft = parseInt(wrapSmall.style.left) + m;
    var time = 300;//移动总时间
    var inter = 10;//位移间隔时间
    var spe = m/(time/inter);

    function ant(){
      animate = true;
      if((spe < 0 && parseInt(wrapSmall.style.left) > smLeft)||(spe > 0 && parseInt(wrapSmall.style.left) < smLeft)){
        wrapSmall.style.left = parseInt(wrapSmall.style.left) + spe +"px";
        setTimeout(ant,inter);
      }else{
        animate = false;
          wrapSmall.style.left = smLeft +"px";
          if(smLeft > -210 ){
            wrapSmall.style.left = -1260 + "px";
          }else if(smLeft < -1260){
            wrapSmall.style.left = -210 + "px";
          }
      }
    }
	 	ant();
	 }

	 pre3.onclick = function(){
      if(!animate){ //当不执行动画时即animate为false时点击才有效
  	 	smallFun(210);
     }
	 }
	 next4.onclick = function(){
	 	 if(!animate){
      smallFun(-210);
     }
	 }
	 // 无限切换每三秒
	 timeFun();

	 function timeFun(){
	 	timer2 = setInterval(function(){
	 		pre3.onclick();
	 	},2000);
	 }
	 // 鼠标悬停停止切换功能
	 wrapSmall.onmouseover = function(){
	 	clearInterval(timer2);
	 }
	 wrapSmall.onmouseout = function(){
	 	timeFun();
	 }

    // 侧边导航定位样式随滚动内容切换
  $(window).scroll(function(){
  		var top = $(document).scrollTop();
  		var menuNav = $("#menuNav");
  		var item1 = $("#item1");
  		var items = $(".wrap-bcon").find(".item");
  		var currentId = " ";
  		var itHeight = item1.offset().top;
  		if(top>=itHeight-100){
  			menuNav.show();
  		}else{
  			menuNav.hide();
  		}
  		items.each(function(){
  			var itemHeight = $(this).offset().top;
  			if(top>itemHeight-200){
  				currentId = "#" + $(this).attr("id");
  			}else{
  				return false;
  			}
  			// console.log(currentId);
  		});
  		var currentlink = menuNav.find(".on");
  			// console.log(currentlink);
  		if(currentId && currentlink.attr("href") != currentId){
  			currentlink.removeClass("on");
  			menuNav.find("[href ='"+currentId+ "']").addClass("on");
  		}
  });
  // 列表大轮播
  var itemR = $(".item-right");
  var  width = itemR.width();
  var  rowf = $(".r-contain li").first().clone();
       $(".r-contain").append(rowf);
  var  size = $(".r-contain li").length;
  var timer = null;
  var count = 0;
  timer = setInterval(function(){
        count++;
        move();
        // console.log(count);
  },4000);
  // 核心运动函数
  function move(){
    // 当往右移动到最后一张的时候
    if(count >= size){
      $(".r-contain").css("left",0);
      count = 1;
    }
    //当往左移动至第负一张时left设置为最后一张即和第一张一样的克隆的那一张
    if(count < 0){
      $(".r-contain").css("left",-width*(size-1));
      count = size-2;
    }
    $(".r-contain").animate({"left":-width*count},800);
    // 小圆点跟随
    if(count ==size-1){
      $(".r-circle li").eq(0).addClass("on").siblings().removeClass("on");
    }else{ 
      $(".r-circle li").eq(count).addClass("on").siblings().removeClass("on");
    }
      // 小园点前的计数显示
        var d = $(".r-circle").find(".on").attr("id");
        console.log(d);
        $(".xianshi").text( d +"/5");
  }

 // 点击小圆点跳转对应页面
   $(".r-circle li").click(function(){
       var index = $(this).index();
       console.log(index);
            count = index;
            move();
   });
 // 鼠标悬停 
    itemR.mouseover(function(){
        clearInterval(timer);
    });
    itemR.mouseout(function(){
        timer = setInterval(function(){
          count++;
          move();
         },4000);
    });
    var h = $(".wrap-bcon").height();
    console.log(h);
   
}

