// 공통사항 변수 선언
const log = console.log;

var $bar = $(".navs_mo");
var $bar2 = $(".nav_close");
var $nav = $(".navs_mo_sub");
var navWid = $nav.width();

// 반응형/높이를 위한 resize
$(window).resize(function(){
	navInit(); //모바일 네비게이션 가리기
	banInit(); //배너 Auto Height
}).trigger("resize");

// 메인 배너
function banInit(){
	$(".banner_wrap").height($(".banner_wrap > li").height());
}

//모바일 네비게이션
$bar.click(navToggle);
$bar2.click(navToggle);
function navInit(){
	navWid = $nav.width();
	if($(window).width() > 768) navHide();
}
function navHide(){
	$nav.css({"left":-navWid+"px"});
}
function navToggle(){
	if($nav.positin().left == 0) $nav.stop().animate({"left": -navWid+"px"},500);
	else $nav.stop().animate({"left":0}, 500);
}