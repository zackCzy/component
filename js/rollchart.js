/** 
 *rollchart.js
 *<project> 
 *Created by zack on 2014-12-30.
 *Copyright 2014 zack. All rights reserved.
**/

define(['jquery'],function($){	
	function Rollchart(){
		//私有滚图JQ对象
		var rollcharts=null;
	};
	Rollchart.prototype={
		/**
		 * <pre>滚图初始化函数</pre>
		 * @param images  初始化字典
		 * 			{
		 * 				hrefs:Array,//图片点击连接地址
		 * 				images:Array(new Image),//图片对象数组
		 * 				alts:Array,//图像title 以及alt
		 * 				width:int,(默认全屏)//轮播宽度
		 * 				height:int,(默认500)//轮播高度
		 * 				times:int(默认5000)//轮播时间
		 * 			}
		 * @param element 将初始化滚轮添加到Dom对象 支持选择器语法
		 * */
		init:function (images,element){
			var that =this;
			this.images=(function(pImages){
				var images={};
				images.width= (document.documentElement.scrollWidth || document.body.scrollWidth||window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
			   	if( parseInt(images.width)<1000){
			    	images.width=1000;
			    }
			   	images.urls=[];
			   	images.hrefs=[];
			   	images.height=500;
			   	images.alts=[];
			   	for (var i=0;i<pImages.image.length;i++) {
			   		images.urls[i]=pImages.image[i].src;
			   		images.hrefs[i]="#";
			   		images.alts[i]="";
			   	}	
			   	images.count=0;
				images.animateFlag=null;
				images.times=5000;
				return images;
			})(images);
			
			$.extend(true, this.images, images);
			
			//创建包裹滚轮
			var rollchart=$("<div class='gaofu_nav_rollchart'></div>").css({
				"width":that.images.width,
				"overflow":"hidden",
				"height":that.images.height,
				"background": "#fff",
				position: "relative",
				"z-index": 1,
			}).hover(function(){
				clearInterval(that.time);
			},timeOpen);
			
			//创建图片列表
			var rollchartUl=$("<ul id='rollchart'></ul>").css({
				"width":that.images.width*that.images.urls.length,
				display: "block",
				overflow: "hidden",
				height: "320px",
				position: "absolute",
				top: "0px",
				left: "0",
				"list-style": "none"
			});
		
			var selectUl=$("<ul id='select_img'style='width:"+(that.images.urls.length*35)+"px;'></ul>").css({
				"list-style": "none",
				display: "block",
				height: "30px",
				margin: "0 auto",
				zoom: 1,
				position: "static"
			});
		
			for ( var i = 0; i < that.images.urls.length; i++) {
				(function(n){
					$("<li></li>").append(
						$("<a></a>").attr({
							href:that.images.hrefs[i],
							target:"_blank"
						}).css({
							//"margin-left":-(-that.images.width)/2,
						}).append(
							$("<img/>").attr({
								src:that.images.urls[i],
								title:that.images.alts[i],
								alt:that.images.alts[i]
							}).css({
								width:that.images.width,
								height:that.images.height
							})
						)
					).css({
						float:"left" 
					}).appendTo(rollchartUl);
					
					selectUl.append(
						$("<li></li>")
						.css({
							width: "13px",
							height: "13px",
							background: ( i==0? "#EA5D52" : "#fff"),
							"border-radius": "16px",
							margin: ( i==0? "6px 15px 0 10px" : "6px 15px 0 0"),
							cursor: "pointer",
							float: "left"
						})
						.on("mouseover",function(){
							$("#select_img li").eq(that.images.count).css("background","#FFFFFF").end().eq(n).css("background","#EA5D52");
							that.images.count=n;
							$("#rollchart").stop().animate({
								left:-(that.images.count*that.images.width)
							},500);			
						})
					);
				})(i);
			}
			rollchart.append(rollchartUl).append(
				$("<div></div").css({
					width: "100%",
					height: "30px",
					position: "absolute",
					bottom: "10px",
					left:0
				}).append(selectUl)
			);
			//定时器开启
			function timeOpen(){
				that.time=setInterval(function(){
					if(++that.images.count<that.images.urls.length){
						$("#rollchart").animate({
							left:-(that.images.count*that.images.width)
						});
					}else{
						$("#rollchart").animate({
							left:"0"
						});
						that.images.count=0;
					}
					$("#select_img li").eq(that.images.count).css("background","#EA5D52");
					$("#select_img li").eq(that.images.count-1<0 ? that.images.urls.length-1:that.images.count-1).css("background","#FFFFFF");
		        },that.images.times);
			}
			timeOpen();
			if(element!=null&&$(element).get(0)!=undefined){
				$(element).append(rollchart);
			}
			rollcharts=rollchart;
		},
		getRollchart:function(){
			return rollcharts;	
		}
	}
	return{
		Rollchart:Rollchart
	}
});

