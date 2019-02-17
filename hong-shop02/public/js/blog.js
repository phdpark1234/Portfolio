// HTML Header Include
w3.includeHTML(function(){
    /*
    var locName = document.URL;
    var fullName = locName.substring(locName.lastIndexOf("/") + 1, document.URL.length);
    var fName = fullName.split(".");
    */
   var fName = document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.length).split(".");
   var loc = ["admin", "shop", "blog", "port"];
   var index = 0;
   for(var i in loc){
       if(loc[i] == fName[0]){
           index = 1;
           break;
       }
   }
   $(".navs li").css({"color":"#aaa", "background-color":"transparent"});
   $(".navs li").eq(index).css({"color":"#fff","backgroud-color":"#444"});
   $(".navs li").click(function(){
      location.href = $(this).data("src"); 
   });
});

//database = CRUD(Creat/Read/Update/Delete)
//Firebase Init 
const log = console.log;
var config = {
    apiKey: "AIzaSyD3JSL5MPJe8P9A_jc4raBgfgoXU-M-kKo",
    authDomain: "hong-shop02.firebaseapp.com",
    databaseURL: "https://hong-shop02.firebaseio.com",
    projectId: "hong-shop02",
    storageBucket: "hong-shop02.appspot.com",
    messagingSenderId: "872346986252"
};
firebase.initializeApp(config);

//공통 변수
var db = firebase.database();
var ref = null;
var key = "";
var lastKey = "";

init();
function init(){
    ref =  db.ref("/root/blog");
    ref.on("child_added", onAdd);
    ref.on("child_removed", onRev);
    ref.on("child_changed", onChg);
}
function onAdd(data) {
    db.ref("root/blog").limitToLast(1).once("value", function(snapshot){
        //forEach는 jQuery each와 똑같다.
        snapshot.forEach(function(v, i){
            lastKey = v.key;
        });
    });
    $("#mc_sel").prepend(`<option value="${data.key}">${data.val().name}</option>`);
    $("#mc_sel").trigger("change");
}
function onRev(data) {
    $("#mc_sel option:selected").remove();
    $("#mc_sel").trigger("change");
}
function onChg(data){
    $("#mc_sel option").each(function(){
        if(data.key == $(this).val()) $(this).text(data.val().name);
    });
}
function mcRev(obj){
    if(confirm("정말 삭제?")){
        db.ref("root/blog/"+$("#mc_sel option:selected").val()).remove();
    }
}
function mcChg(obj){
    ley = $("#mc_sel option:selected").val();
    log(key);
    var newTit = $(obj).prev().val();
    if(newTit == ""){
        alert("제목을 넣으세요.");
        $(obj).prev().focus();
        return;
    }
    db.ref("root/blog/"+key).update({
        name: newTit
    });
}

$("#mc_save").click(function(){
    if($("#mc_in").val() == ""){
        alert("메인 제목!!");
        $("#mc_in").focus();
        return;
    }
    ref = db.ref("/root/blog");
    ref.push({
        name: $("#mc_in").val()
    }).key;
    $("#mc_in").val("");
});

$("#mc_sel").change(function(){

    $(this).children("option").each(function(){
        var html = `
        <input type>
        `;
    });
});