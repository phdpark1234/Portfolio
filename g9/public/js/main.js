 // Initialize Firebase
var config = {
    apiKey: "AIzaSyBB776Z4v6HhDXIUDk8D3hgVM87L4jnxmI",
    authDomain: "hong-shop01.firebaseapp.com",
    databaseURL: "https://hong-shop01.firebaseio.com",
    projectId: "hong-shop01",
    storageBucket: "hong-shop01.appspot.com",
    messagingSenderId: "250184950012"
};
firebase.initializeApp(config);
//Firebase Init
var db = firebase.database();
db.ref("root/home").on("child_added", homeAdd);
function homeAdd(data){
	var html = `
	<li class="rt_arrow">
		<a href="${data.val().link}"
		target="${data.val().target}">${data.val().title}
		</a>
	</li>`;
	$(".nav_sub").eq(0).append(html);
}  

//top_nav hover 이벤트
$(".top_icon").mouseenter(function(){
	$(this).children("img").css({"opacity":.7});
});
$(".top_icon").mouseleave(function(){
	$(this).children("img").css({"opacity":1});
});

//nav 이벤트 (nav_sub show/hide)
$(".nav").mouseenter(function(){
	$(this).children(".nav_sub").css(
	{"display":"block", "opacity":0}).stop()
	.animate({"opacity":1, "top":"45px"}, 200);
});
$(".nav").mouseleave(function(){
	$(this).children(".nav_sub").stop().animate(
	{"opacity":0, "top":"80px"}, 200, function(){
		$(this).css({"display":"none"});
	});
});

//rt_wings 이벤트
$(".top_nav .fa-bars").click(function(){
	var $bg = $(".rt_bg");
	var $cont = $(".rt_cont");
	$bg.css({"opacity":0, "display":"block"}).stop().animate({"opacity":.3}, 300);
	$cont.css({"display":"block", "right":"-240px"}).stop().animate({"right":0}, 300);
});

$(".rt_cont .fa-close").click(function(){
	var $bg = $(".rt_bg");
	var $cont = $(".rt_cont");
	$bg.stop().animate({"opacity":0}, 300,
	function(){
		$(this).css({"display":"none"});
	});
	$cont.stop().animate({"right":"-240px"},300,function(){
		$(this).css({"display":"none"});
	});
});

$(".rt_bg").click(function(e){
	e.stopPropagation();
	$(".rt_cont .fa-close").trigger("click");
});

// 반응형/높이를 위한 resize

$(window).resize(function(){
	banInit();
}).trigger("resize");

/*** 메인 배너 ***/
function banInit(){
	$(".banner_wrap").height($(".banner_wrap > li").height());
}

var slide = new SlideHori($("#banner1"), $(".slide"));