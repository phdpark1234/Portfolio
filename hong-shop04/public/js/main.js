const log = console.log;
//모든 이미지가 서버로부터 전송이 완료되면 리사이즈 이벤트를 한 번 실행하여
//이미지 높이를 계산하게 한다.
$("body").imagesLoaded(function(){
    $(window).trigger("resize");
});

$(window).resize(function(){
    var hei = 0;
    $(".auto_hei").each(function(i){
        if(hei < $(this).height()) hei = $(this).height();
        $(this).parent().height(hei);
    });
}).trigger("resize");

//$.ajax() 객체화
var Ajax = (function(){
    function Ajax(url, fn, opts) {
        var obj = this;
        this.url = url;
        this.fn = fn;
        if(opts) {
            if(opts.type) this.opts.type = opts.type;
            if(opts.dataType) this.opts.dataType = opts.dataType;
            if(opts.data) this.opts.data = opts.data;
        }
        else {
            this.opts = {};
            this.opts.type = "get";
            this.opts.dataType = "json";
            this.opts.data = {};
        }
        $.ajax({
            type: obj.opts.type,
            url: obj.url,
            data: obj.opts.data,
            dataType: obj.opts.dataType,
            success: obj.fn,
            error: function(xhr, status, error) {
                console.log(xhr, status, error);
            }
        });
    }
    return Ajax;
}());

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBXNzr5vUN8PeyYn4Isqv4lkPr4MquT4HM",
    authDomain: "hong-shop04.firebaseapp.com",
    databaseURL: "https://hong-shop04.firebaseio.com",
    projectId: "hong-shop04",
    storageBucket: "hong-shop04.appspot.com",
    messagingSenderId: "739154943271"
};
firebase.initializeApp(config);
//Firebase Init
var db = firebase.database();

mainInit();

function mainInit() {
    db.ref("root/home").on("child_added", homeAdd);
    db.ref("root/blog").on("child_added", blogAdd);
}

//카테고리 HOME 생성
function homeAdd(data) {
    var html = '';
    html += '<li class="rt_arrow">';
    html += '<a href="'+data.val().link+'" target="'+data.val().target+'">'+data.val().title+'</a></li>';
    $(".nav_sub").eq(0).append(html);
}
//카테고리 BLOG 생성
function blogAdd(data) {
    var html = '';
    html += '<ul id="'+data.key+' class="grid-item">';
    html += '<li class="grid-item">'+data.val().name+'</li>';
    html += '</ul>';
    $(".grid").append(html);
    db.ref("root/blog/"+data.key+"/sub").once("value", function(sub){
        sub.forEach(function(v, i){
            html = '<li class="rt_arrow" id="'+v.key+'>';
            html += '<a href="'+v.val().link+' target="'+v.val().target+'>'+v.val().name+'</a>';
            html +='</li>';
            $("#"+data.key).append(html);
        });
    });
}

//카테고리 SHOP 생성 - Ajax/json 통신
new Ajax("../json/shop.json", shopAjax);
function shopAjax(data) {
    var html = '<div class="shop_cates wrap clear">';
    for(var i=0; i<data.cates.length; i++) {
        html += '<ul>';
        html += '<li class="shop_cate_tit">'+data.cates[i].tit+'</li>';
        html += '<li>';
        html += '<ul>';
        for(var j=0; j<data.cates[i].data.length; j++) {
        html += '<li class="shop_cate_name rt_arrow">';
        html += '<a href="'+data.cates[i].data[j].link+' target="'+data.cates[i].data[j].target+'>'+data.cates[i].data[j].name+'</a></li>';    
        }
        html += '</ul></li></ul>';
    }
    html += '</div>';
    html += '<ul class="shop_prds">';
    for(i=0; i<data.prds.length; i++) {
        html += '<li class="shop_prd ovhide"><a href="'+data.prds[i].link+' target="'+data.prds[i].target+'><img src="'+data.prds[i].src+' class="img  size_ani"></a></li>';
    }
    html += '</ul>';
    $(".nav_sub").eq(1).append(html);
}

//카테고리 PORTFOLIO 생성 - Ajax/json 통신
new Ajax("../json/port.json", portAjax);
function portAjax(data) {
    for(var i in data.ports) {
        var html = '<li class="rt_arrow"><a href="'+data.ports[i].link+' target="'+data.ports[i].target+'>'+data.ports[i].name+'</a></li>';
        $(".nav_sub").eq(3).append(html);
    }
}
//메인 좌측 네비 - lefts - Ajax/json 통신
new Ajax("../json/left.json", leftAjax);
function leftAjax(data) {
    var html; 
    for(var i in data.lefts) {
        html = '<li class="rt_arrow">'+data.lefts[i].name+'</li>';
        $(".left").append(html);
    }
}

//window,resize()구현 
$(window).resize(function(){

}).trigger("resize");

//top_nav hover 이벤트
$(".top_icon").mouseenter(function(){
    $(this).children("img").css({"opacity":.7});
});
$(".top_icon").mouseleave(function(){
    $(this).children("img").css({"opacity":1});
});

// nav 이벤트 (nav_sub show/hide)
$(".nav").mouseenter(function(){
    $(this).children(".nav_sub").css({"display":"block", "opacity":0}).stop().animate({"opacity":1, "top":"45px"}, 200);
});
$(".nav").mouseleave(function(){
    $(this).children(".nav_sub").stop().animate({"opacity":0, "top":"80px"}, 200, function(){
        $(this).css({"display":"none"});
    });
});


//메인배너 / .bans
fadeShow();
function fadeShow() {
    var $wrap = $(".ban");
    var $slide = $(".ban > li");
    var depth = 10;
    var now = 0;
    var speed = 500;
    var timeout = 3000;
    var end = $slide.length - 1;
    var interval;
    var hei;
    //Pager 초기화
    $slide.each(function(){
        $(this).css({"position":"absolute", "top":0});
        $(".cycle-pager").append("<span>●</span>");
    });
    $(".cycle-pager span").click(function(){
        now = $(this).index();
        fadeAni();
        clearInterval(interval);
        interval = setInterval(fadeAni, timeout);
    });
    $(".bans").height($slide.eq(0).height());
    $(window).resize(function(){
        $(".bans").height($slide.eq(now).height());
    });
    //최초 실행
    interval = setInterval(fadeAni, timeout);
    function fadeAni() {
        $(window).trigger("resize");
        $(".cycle-pager span").removeClass("cycle-pager-active");
        $(".cycle-pager span").eq(now).addClass("cycle-pager-active");
        var hei = $slide.eq(now).height();
        $(".bans").stop().animate({"height":hei+"px"}, speed);
        $slide.eq(now).css({"z-index":depth++, "opacity":0}).stop().animate({"opacity":1}, speed, function(){
            //여기는 애니메이션 완료된 직후
            $slide.children("div").removeClass("aniset").css({
                "animation-name":"none",
                "animation-fill-mode":"backwards",
            });
            $(this).children("div").each(function(){
                $(this).addClass("aniset");
                $(this).css({
                    "animation-name":$(this).data("ani"),
                    "animation-delay":$(this).data("delay"),
                    "animation-duration":$(this).data("speed"),
                    "animation-fill-mode":"forwards"
                });
            });
            if(now == end) now = 0;
            else now++;
        });
    }
}
//horzShow();
function horzShow() {
    //맨 앞의 li를 복사해서 $(".ban")맨 뒤에 붙여라
    $(".ban").append($(".ban > li").eq(0).clone());
    var $wrap = $(".ban");
    var $slide = $(".ban > li");
    var now = 1;
    var speed = 500;
    var timeout = 3000;
    var end = $slide.length - 1;
    var interval;
    var hei = 0;
    //초기화
    $(window).resize(function(){
        hei = 0;
        $slide.each(function(i){
            //$(".ban > li")중 가장 큰 height 구함
            if(hei < $(this).height()) hei = $(this).height();
        });
        $wrap.height(hei);
    }).trigger("resize");
    $slide.each(function(i){
        $(this).css({"left":(i*100)+"%", "position":"absolute"});
        if(i<end) $(".cycle-pager").append("<span>●</span>");
    });
    $(".cycle-pager span").click(function(){
        now = $(this).index();
        horzAni();
        clearInterval(interval);
        interval = setInterval(horzAni, timeout); 
    });
    interval = setInterval(horzAni, timeout);
    function horzAni() {
        if(now == end) pnow = 0;
        else pnow = now;
        $(".cycle-pager span").removeClass("cycle-pager-active");
        $(".cycle-pager span").eq(pnow).addClass("cycle-pager-active");
        $wrap.stop().animate({"left":(-now*100)+"%"}, speed, function(){
            $(window).trigger("resize");
            if(now == end) {
                $wrap.css({"left":0});
                now = 1;
            }
            else now++;
        });
    }
}
//ctmShow();
function ctmShow() {
    $(".c_slide").append($(".c_slide > li").eq(0).clone());
    var $wrap = $(".c_slide");
    var $slide = $(".c_slide > li");
    var now = 1;
    var speed = 500;
    var timeout = 3000;
    var end = $slide.length - 1;
    var interval;
    var hei = 0;
    //초기화
    $(window).resize(function(){
        hei = 0;
        $slide.each(function(i){
            //$(".ban > li")중 가장 큰 height 구함
            if(hei < $(this).height()) hei = $(this).height();    
        });
        $wrap.height(hei);
    }).trigger("resize");
    $slide.each(function(i){
        $(this).css({"left":(i*100)+"%", "position":"absolute"});
    });
    interval = setInterval(horzAni, timeout);
    function horzAni() {
        if(now == end) pnow = 0;
        else pnow = now;
        $wrap.stop().animate({"left":(-now*100)+"%"}, speed, function(){
            $(window).trigger("resize");
            if(now == end) {
                $wrap.css({"left":0});
                now = 1;
            }
            else now++;
        });
    }
}
//vertShow();
function vertShow() {
    $(".ban").append($(".ban > li").eq(0).clone());
    var $wrap = $(".ban");
    var $slide = $(".ban > li");
    var now = 1;
    var speed = 500;
    var timeout = 3000;
    var end = $slide.length - 1;
    var interval;
    var hei = 1000;
    //초기화
    $slide.each(function(i){
        if(i<end) $(".cycle-pager").append("<span>●</span>");
    });
    function vertAni() {
        if(now == end) pnow = 0;
        else pnow = now;
        $(".cycle-pager span").removeClass("cycle-pager-active");
        $(".cycle-pager span").eq(pnow).addClass("cycle-pager-active");
        var top = $slide.eq(now).position().top;
        var hei = $slide.eq(now).height();
        $(".bans").stop().animate({"height":hei+"px"}, speed);
        $wrap.stop().animate({"top":-top+"px"}, speed, function(){
            if(now == end) {
                $wrap.css({"top":0});
                now = 1;
            }
            else now++;
        });
    }
}

// hover Animation
$(".hov_ani").each(function(){
    $(this).css({"postion":"relative"});
    $(this).append('<ul class="hov_mask" style="display:none"><li></li><li></li><li></li><li></li></li></ul>');
    $(this).mouseenter(function(){
        var speed = 250;
        var $mask = $(this).children(".hov_mask");
        $mask.fadeIn(speed);
        $mask.children("li").eq(0).stop().animate({"width":$mask.width()-20+"px"}, speed);
        $mask.children("li").eq(1).stop().animate({"width":$mask.width()-20+"px"}, speed);
        $mask.children("li").eq(2).stop().animate({"height":$mask.height()-20+"px"}, speed);
    });
});