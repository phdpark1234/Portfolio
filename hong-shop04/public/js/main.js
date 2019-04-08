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

//카테고리 SHOP 생성 - Ajax/json 통신
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

// window.resize()구현