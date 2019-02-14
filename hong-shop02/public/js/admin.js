//HTML Header Include
w3.includeHTML(function(){
    var locName = document.URL;
    var fullName = locName.substring(locName.lastIndexOf("/") + 1, document.URL.length);
    var fName = fullName.split(".");
    var loc = ["admin","shop","blog","port"];
    var index = 0;
    for(var i in loc){
        if(loc[i] == fName[0]){
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

//database = CRUD(Create/Read/Update/Delete)
//firebase Init 
const.log = console.log;
var config = {
    apiKey: "AIzaSyBB776Z4v6HhDXIUDk8D3hgVM87L4jnxmI",
    authDomain: "hong-shop01.firebaseapp.com",
    databaseURL: "https://hong-shop01.firebaseio.com",
    projectId: "hong-shop01",
    storageBucket: "hong-shop01.appspot.com",
    messagingSenderId: "250184950012"
};
firebase.initializeApp(config);

//공통 변수
var db = firebase.database();
var ref = new Array();
var key = "";

// 페이지 시작과 동시에 homeInit() 실행하고, FB이벤트 콜백함수를 생성한다.
homeInit();
function homeInit(){
    ref[0] = db.ref("root/home/");
    ref[0].on("child_added", homeAdd);
    ref[0].on("child_removed", homeRev);
    ref[0].on("child_changed", homeChg);
}
// Firebase  Callback 함수.시작
//Home 데이터가 추가됨면 data 변수에 추가된 내용을 담아 실행한다.
function homeAdd(data){
    var sel = ["",""];
    if(data.val().target == "_blank") sel[0] = "selected";
    else sel[1] = "selected";
    var html = `
    <li id="${data.key}">
        <input type="text" class=w3-border w3-show-inline-block home_title"
        value="${data.val().title}">
        <input type="text" class="w3-input w3-border w3-show-inline-block home_link"
        value="${data.val().link}">
        <select class="w3-select w3-border w3-show-inline-block home_target">
            <option value="_blank" ${sel[0]}>새창</option>
            <option value="_self" ${sel[1]}></option>
        </select>
        <button class="w3-green w3-button" onclick="dataChg(this);">수정</button>
        <button class="w3-red w3-button" onclick="dataRev(this);">삭제</button>
    </li>`;
    $("#homes").append(html);
}
// Home 데이터가 삭제되면 data변수에 삭제된 내용을 담아 실행한다.
function homeRev(data)