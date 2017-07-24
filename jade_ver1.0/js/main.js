
//共通ヘッダーフッターインクルード
$(function(){
    $.ajaxSetup({cache:false});
    $("header").load("/inc/_header.html");
//    $("footer").load("/inc/_footer.html");
});

//ロールオーバー
function smartRollover() {
    if(document.getElementsByTagName) {
        var images = document.getElementsByTagName("img");
        for(var i=0; i < images.length; i++) {
            try{
                if(images[i].getAttribute("src").match("_offs."))
                {
                    images[i].onmouseover = function() {
                        this.setAttribute("src", this.getAttribute("src").replace("_offs.", "_ons."));
                    }
                    images[i].onmouseout = function() {
                        this.setAttribute("src", this.getAttribute("src").replace("_ons.", "_offs."));
                    }
                }
            }catch(e){
                //getAttributeで取得する属性が無かった場合、nullが返ってきてエラーになる為回避
            }
        }
    }
}
if(window.addEventListener) {
    window.addEventListener("load", smartRollover, false);
}
else if(window.attachEvent) {
    window.attachEvent("onload", smartRollover);
}
//


//SPハンバーガー
$(function(){
    $(document).on('click','.hum-btn',function(){
        var $headerNav = $(".header nav");
        var $humBtn = $(".hum-btn img");
        if($headerNav.hasClass("active")){
            $humBtn.attr("src","/img/top/hg.png");
            $headerNav.fadeOut('fast');
        }else{
            $humBtn.attr("src","/img/top/hg_close.png");
            $headerNav.fadeIn('fast');
        }
        $headerNav.toggleClass("active");
    });
});
//スムーススクロール
$(function(){
    // #で始まるアンカーをクリックした場合に処理
    $('a[href^=#]').on('click',function() {
        // スクロールの速度
        var speed = 500; // ミリ秒
        // アンカーの値取得
        var href= $(this).attr("href");
        // 移動先を取得
        var target = $(href == "#" || href == "" ? 'html' : href);
        // 移動先を数値で取得
        var position = target.offset().top;
        // スムーススクロール
        $('body,html').animate({scrollTop:position}, speed, 'swing');
        return false;
    });
});


//topサイドボタン
$(function(){
    $(window).on('load resize', function(){
        var w = $(window).width();
        var x = 768;
        var o = $(".addbtnpc");
        var offset = o.offset();
        var topPadding = 395;
        var dt = 600;
        var $headerNav = $(".header nav");
        var $humBtn = $(".hum-btn img");
        if(w>=x){
            $(window).scroll(function() {
                if ($(window).scrollTop() > offset.top) {
                    o.stop().animate({
                        marginTop: $(window).scrollTop() - offset.top + topPadding
                    },{'duration':dt,'easing':'easeOutBack'});
                } else {
                    o.stop().animate({
                        marginTop: 0
                    });
                };
            });
            $headerNav.show();
        }else{
            $headerNav.hide();
            $headerNav.removeClass("active");
            $humBtn.attr("src","/img/top/hg.png");
        }
    });
});


//topアニメ
$(function(){
    var w = $(window).width();
    var x = 768;
    if(w>=x){
        $(window).scroll(function(){
            var s = $(this).scrollTop();
            var m1 =  $('.topic-1').offset().top;
            var m2 =  50;
            var m3 =  2830;
            if(s>m1){
                $(".card-l").show().addClass("slideLeft");
                $(".card-r").show().addClass("slideRight");
            }
            if(s>m2){
                $(".rota01").fadeIn().addClass("bigEntrance");
                setTimeout(function(){
                    $(".rota02").fadeIn().addClass("bigEntrance");
                },200);
            }
            if(s>m3){
                $(".p1").fadeIn().addClass("hatch");
                $(".p2").fadeIn().addClass("hatch");
                $(".p3").fadeIn().addClass("hatch");
                $(".p4").fadeIn().addClass("hatch");
                $(".p5").fadeIn().addClass("hatch");
            }
        });
    }else{
        $(window).scroll(function(){
            var s = $(this).scrollTop();
            var m1 =  $('.topic-1').offset().top;
            var m2 =  200;
            var m3 =  $('.trigg').offset().top;
            if(s>m1){
                $(".card-l").show().addClass("bigEntrance");
                $(".card-r").show().addClass("bigEntrance");
            }
            if(s>m2){
                $(".rota01").fadeIn().addClass("bigEntrance");
                setTimeout(function(){
                    $(".rota02").fadeIn().addClass("bigEntrance");
                },200);

            }
            if(s>m3){
                $(".p1").fadeIn().addClass("hatch");
                $(".p2").fadeIn().addClass("hatch");
                $(".p3").fadeIn().addClass("hatch");
                $(".p4").fadeIn().addClass("hatch");
                $(".p5").fadeIn().addClass("hatch");
            }
        });
    }
})

//IE9判定

var _ua = (function(){
    return {
        lte_IE6:typeof window.addEventListener == "undefined" && typeof document.documentElement.style.maxHeight == "undefined",
        lte_IE7:typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined",
        lte_IE8:typeof window.addEventListener == "undefined" && typeof document.getElementsByClassName == "undefined",
        lte_IE9:document.uniqueID && typeof window.matchMedia == "undefined",
        gte_IE10:document.uniqueID && window.matchMedia ,
        eq_IE8:document.uniqueID && document.documentMode === 8,
        eq_IE9:document.uniqueID && document.documentMode === 9,
        eq_IE10:document.uniqueID && document.documentMode === 10,
        eq_IE11:document.uniqueID && document.documentMode === 11,
        //        eq_IE10:document.uniqueID && window.matchMedia && document.selection,
        //        eq_IE11:document.uniqueID && window.matchMedia && !document.selection,
        //        eq_IE11:document.uniqueID && window.matchMedia && !window.ActiveXObject,
        Trident:document.uniqueID
    }
})();
if(_ua.eq_IE9){
    $(function(){
        $("#top .include-area").empty();
        $("#top .ie9").show();
        $("#flow .picBtn").empty();
        $("#flow .ie9").show();
        $("#tousen .include-area-inner").empty();
        $("#tousen .ie9").show();
    })
}
