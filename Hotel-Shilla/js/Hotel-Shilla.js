$(function(){
	$.ajax({
		type:"GET",
		dataType:"xml",
		url:"/Hotel-Shilla/xml/term.xml",
		success: function(xml){
			
			var term=$(xml).find("약관").text();
			var termArr=term.split("●");
			var termOutput="";
			
			for(var i in termArr){
				termOutput+="<br>"+termArr[i];
				}
			$("#termbox").html(termOutput);	
			},
		error: function(){
			alert("에러 발생");
			}	
		});
	
	
	var count = 0;
	var autoAni = setInterval(function(){
		if(count < 3)count++; else count = 0;
		aniSlide(count);
		},3000);	

		$("#quick li a").click(function(){
			$("html, body").stop().animate({"scrollTop":0},500);
		});		
		
		

	function aniSlide(num){
		$("#Sliderwrap ul").stop(true, true).animate({"marginLeft":(num+1)*(-960)},400,function(){
			$("#sliderPager a").removeClass("on");
			$("#sliderPager a").eq(num).addClass("on");
		});
	};

	
});
