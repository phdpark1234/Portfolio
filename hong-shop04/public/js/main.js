const log = console.log;
//모든 이미지가 서버로부터 전송이 완료되면 이사이즈 이벤트를 한 번 실행하여
//이미지 높이를 계산하게 한다.
$("body").imagesLoaded(function(){
    $(window).trigger("resize");
});

$(window).resize(function(){
    var hei = 0;
    $(".auto_hei").each(function(){
        if(hei < $(this).height()) hei = $(this).height();
        $(this).parent().height(hei);
    });
}).trigger("resize");

//$.ajax() 객체화
var Ajax = (function(){
    function Ajax(url, fn, opts){
        var obj = this;
        this.url = url;
        this.fn = fn;
        if(opts) {
            if(opts.type) this.opts.type = opts.type;
            if(opts.dataType) this.opts.dataType = opts.dataType;
            if(opts.data) this.opts.data =opts.data;
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
  //firebase Init
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
function blogAdd(data){
    var html = '';
    html += '<ul id="'+data.key+' class="grid-item">';
    html += '<li class="grid-tit">'+data.val().name+'</li>';
    html += '</ul>';
    $(".grid").append(html);
    db.ref("root/blog/"+data.key+"/sub").once("value", function(sub){
        sub.forEach(function(v, i){
            html = '<li class="rt_arrow" id="'+v.key+'>';
            html += '<a href="'+v.val().link+' target="'+v.val().target+'>'+v.val().name+'</a>';
            html += '</li>';
            $("#"+data.key).append(html);
        });
    });
}

// 카테고리 SHOP 생성 - Ajax/json 통신
new Ajax("../json/shop.json", shopAjax);
function shopAjax(data) {
    var html = '<div class="shop_cates wrap clear">';
    for(var i=0; i<data.cates.length; i++){
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
        html += '<li class="shop_prd ovhide"><a href="'+data.prds[i].link+' target="'+data.prds[i].target+'><img src="'+data.prds[i].src+' class="img size_ani"></a></li>';
    }
    html += '</ul>';
    $(".nav_sub").eq(1).append(html);
}

// 카테고리 PORTFOLIO 생성 - Ajax/json 통신
new Ajax("../json/port.json", portAjax);
function leftAjax(data) {
    var html;
    for(var i in data.lefts){
        html = '<li class="rt_arrow">'+data.lefts[i].name+'</li>';
        $(".left").append(html);
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

//window.resize() 구현
$(window).resize(function(){

}).trigger("resize");
//top_nav hover 이벤트
$(".top_icon").mouseenter(function(){
    $(this).children("img").css({"opacity":.7});
});
$(".top_icon").mouseleave(function(){
    $(this).children("img").css({"opacity":1});
});

//nav 이벤트 