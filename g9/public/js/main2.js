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