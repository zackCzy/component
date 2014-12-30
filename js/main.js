require.config({
	paths:{
		jquery:"jquery-1.11.0"
	}
});

require(['jquery','rollchart'],function($,r){
	$(function(){
		var img1=new Image();
	  	img1.src="img/img1.jpg";
	  	var img2=new Image();
	  	img2.src="img/img3.jpg";
		var rollchart=new r.Rollchart();
		rollchart.init({
			image:[img1,img2],
			height:300,
			alts:["环球高富1","环球高富2"]
		},"body");
		$("#next").click(function(){
			rollchart.nextPage();
		});
		$("#prev").click(function(){
			rollchart.prevPage();
		});
		rollchart.on("next",next);
		rollchart.on("prev",prev);
	});
	function next(){
			alert("123")
	}
	function prev(){
			alert("321")
	}
});
