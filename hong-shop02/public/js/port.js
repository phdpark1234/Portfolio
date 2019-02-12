// HTML Header Include
w3.includeHTML(function(){
    var locName = document.URL;
    var fullName = locName.substring(locName,lastIndexOF("/") + 1, document.URL.length);
    var fName = fullName.split(".");
    var loc = ["admin", "shop", "blog", "port"];
    var index = 0;
    for(var i in loc) {
        if(loc[i] == fName[0]) {
            index = i;
            break;
        }
    }
    $(".navs li").css({"color":"#aaa", "background-color":"transparent"});
    $(".navs li").eq(index).css({"color":"#fff", "background-color":"#444"});
    $(".navs li").click(function(){
        location.href = $(this).data("src");
    });
});

// database = CRUD(Creat/Read/Update/Delete)
// Firebase Init 
const log = colsole.log;
var config = {
    apiKey: "AIzaSyD3JSL5MPJe8P9A_jc4raBgfgoXU-M-kKo",
    authDomain: "hong-shop02.firebaseapp.com",
    databaseURL: "https://hong-shop02.firebaseio.com",
    projectId: "hong-shop02",
    storageBucket: "hong-shop02.appspot.com",
    messagingSenderId: "872346986252"
};
firebase.initializeApp(config);

// 공통 변수
var db = firebase.database();
var ref = new Array();
var key = "";

// 네비게이션 구현
$(".navs li").on("click", function(){
    $(".navs li").css({"color":"#aaa", "background-color":"transparent"});
    $(this).css({"color":"#fff", "background-color":"#444"});
});
$(".navs li").eq(0).trigger("click");

//페이지 시작과 동시에  homeInit()실행하고, FB이벤트 콜백함수를 생성한다.
homeInit();
function homeInit(){
    ref[0] = db.ref("root/home/");
    ref[0].on("child_added", homeAdd);
    ref[0].on("child_removed", homeRev);
    ref[0].on("child_changed", homeChg);
}

//  Firebase Callback 함수. 시작
//Home 데이터가 추가되면  data변수에 추가된 내용을 실행한다.
function homeAdd(data){
    var sel = ["", ""];
    if(data.val().target = "_blank") sel[0] = "selected";
    else sel[1] = "selected";
    var html = `
    <li id="${data.key}">
        <input type="text" class="w3-input w3-border w3-show-inline-block home_title"
        value="${data.val().title}">
        <input type="text" class="w3-input w3-border w3-show-inline-block home_link"
        value="${data.val().link}">
        <select class="w3-select w3-border w3-show-inline-block home_target">
            <option value="_blank" ${sel[0]}>새창</option>
            <option value="_self" ${sel[1]}>현재창</option>
        </select>
        <button class="w3-green w3-button" onclick="dataChg(this);">수정</button>
        <buttonm class="w3-red w3-button" onclick="dataRev(this);">삭제</button>
    </li>`;
    $("#home").append(html);
}
// Home 데이터가 삭제되면  data 변수에 삭제된 내요을 담아 실행한다.
function homeRev(data){
    $("#"+data.key).remove();
}
// Home 데이터가 수정되면  data변수에 수정된 내용을 담아 실행한다.
function homeChg(data){
    $("#"+data.key).stop().animate({"opacity":0}, 300, function(){
        $(this).css({"opacity":1});
    });
}
// Firebase Callback 함수.종료

// home 저장 버튼을 눌렀을 때
$("#bt1_save").on("click", function(){
    if($("#title1").val() == ""){
        alert("제목 !!");
        return;
    }
    if($("#link1").val() == ""){
        alert("링크 !!");
        return;
    }
    //Firebase 추가 명령
    ref[0].push({
        title: $("#title1").val(),
        link: $("#link1").val(),
        target: $("#target1").val()
    }).key;
    $("#title1").val("");
    $("#link1").val("");
});

// home 삭제버튼을 눌렀을 때
function dataRev(obj) {
    if(confirm("정말로 삭제하시겠습니까?")){
    //Firebase  삭제 명령
    db.ref("/root/home/"+$(obj).parent().attr("id")).remove();
    }    
}

//home 수정버튼을 눌렀을 때
function dataChg(obj){
    var $li = $(obj).parent();
    key = $li.attr("id");
    console.log(key);
    if($li.find(".home_title").val() == ""){
        alert("제목 !!");
        return;
    }
    if($li.find(".home_link").val() == ""){
        alert("링크 !!");
        return;
    }
    //Firebase 수정 명령
    db.ref("root/home"+key).update({
        title: $li.find(".home_title").val(),
        link: $li.find(".home_link").val(),
        target: $li.find(".home_target").val()
    });
}