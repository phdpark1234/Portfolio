$(function(){

var aniel = $("#sliderWrap ul");
var anielchild = $("#sliderWrap ul li");
var anielchildmargin = 0;
/*노출되는 컨텐츠 너비*/
var displaynum = 1;
var aniWidth =$("#sliderWrap").width() / displaynum;
var aniSpeed = 400;//애니메이션 스피드
var timeSet = 3000;//주기시간
var anielchildW = aniWidth - (anielchildmargin * 2);
var dir = "-=";//왼쪽방향

$("#btns").width($("#sliderWrap").width() - (anielchildmargin * 2));
anielchild.width(anielchildW);
anielchild.css({"margin-left":anielchildmargin,"margin-right":anielchildmargin});
aniel.css("margin-left",-aniWidth);//제이쿼리로 위치

var autoSetting=setInterval(function(){
    aniRoll(dir);
    },timeSet);
$("#btns button").click(function(e) {
	clearInterval(autoSetting);//자동슬라이딩 삭제
	if($(this).hasClass('left')) dir="-=";    else dir="+=";
	aniRoll(dir);	
});

$("#tabBox li").click(function(e) {
    $("#tabBox li").removeClass();
	$(this).addClass("on");
});

function aniRoll(a){//선언위치 중요하지 않음
    aniel.animate({"marginLeft":a+aniWidth},aniSpeed,function(){
	    if(a == "-="){
		    $(" > :first-child", this).appendTo($(this));
		}else{
	        $(" > :last-child", this).prependTo($(this));
	    }
		//aniel.find("li").eq(0).appendTo(aniel);
		aniel.css("margin-left",-aniWidth);
	    });
}
$("#loadDiv").load("../bookclover/load.html");

  });
