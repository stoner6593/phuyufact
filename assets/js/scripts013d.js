//Efecto transacción de imágenes a partir de logo con TweenMax

function MorphActionClass(){

    var _this = this;

    this.started = false;

    this.preload = function(){

        this.navigation = $(".sysSlide .navigation");
        this.animator = $("#logo-animator");
        this.svg = $("#LogoNube")[0];
        this.animator.addClass("show");
        
    };

    this.updatePos = function(){

        if(!this.started) return;

        var navigation = this.navigation
        , offset = navigation.offset()
        , height = navigation.height()
        , offsetY = 10
        , offsetX = 20;
        this.animator.addClass("ready").css({
            left: (offset.left + offsetX) + 'px',
            top: (offset.top + height + offsetY) + 'px'
        });
    };

    this.next = function(numSlide){

        if(!this.started) return;
        
        var path = $("#ANIMATOR_" + numSlide);
        if(path.length){
            
            var next_fill = path.attr("fill") || "#ffffff";
            TweenMax.to(this.svg, 1.005, {
                morphSVG: path[0], 
                yoyo: true, 
                fill: next_fill, 
                repeat: 0
            });
        }else{
            //this.animator.addClass("hide");
        }
    };

    this.start = function(){

        this.started = true;
        this.animator.addClass("ready");
        this.updatePos();
        setTimeout(function(){
            //End preloader animations
            $("[data-stop]").data("stop", 0);
            _this.animator.addClass("endAnimate");
        }, 500 + 250); //#logo-animator effect time
    };
    
}

var PageStarted = false, PageStartedTimeout;

function DoneAll(){

    PageStarted = true;

    MorphAction.start();
    
    $(".preloaderWindow .logo").removeClass("show");
    $(".preloaderWindow .line").removeClass("show");
    $(".preloaderWindow .text").removeClass("show");
    $(".preloaderWindow").addClass("hide");
    
    setTimeout(function(){
        $(".sysSlider .sysSlide:first .headline").css("opacity", 1);
        $(".sysSlider .sysSlide:first").addClass("title-animation");
    },500);
}

var MorphAction = new MorphActionClass();

$(window).ready(function() {

    MorphAction.preload();
    
    $(".preloaderWindow .logo").addClass("show");
    $(".preloaderWindow .line").addClass("show");
    $(".preloaderWindow .text").addClass("show");
    $(".sysSlider .sysSlide:first .headline").css("opacity", 0);
    
    $(window).on('load', function(){
        if(PageStarted) return;
        PageStartedTimeout && clearTimeout(PageStartedTimeout);
        setTimeout(DoneAll, location.hostname === "localhost" ? 2000 : 0);
    });

    PageStartedTimeout = setTimeout(DoneAll, 3000);
    
    $(window).resize();
    
    
    /* 
     * 
    var path = document.querySelector('.test');
    alert(path.getTotalLength());
    
    */
   
    $('#fullpage').fullpage({
        autoScrolling: false,
        fitToSection: false,
        controlArrows: false,
        menu: '#menu',
        onLeave: function(index, nextIndex, direction){
            var leavingSection = $(this);

            if(index == 1 && direction =='down'){
                $('.hamburger').addClass("active");
            }
            else if(index == 2 && direction == 'up'){
                $('.hamburger').removeClass("active");
            }
        }
    });
    var body = $("html, body");
    
    $('.scrollDown a').click(function(){
        $.fn.fullpage.moveSectionDown();
    });
    
    $('.scrollUp a, .buttonPrincipal a, .logo a').click(function(){
        body.animate({ scrollTop:$(".sys").offset().top}, 800);
        return false;
    });
    
    sysSlider = $('.sysSlider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: false,
        focusOnSelect: false,
        arrows: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        pauseOnFocus: false,
        pauseOnHover: false
    });

    sysSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        var cur = $(slick.$slides[currentSlide]), next = $(slick.$slides[nextSlide]);
        cur.removeClass('title-animation');
        next.addClass('title-animation');

        //Animar SVG
        MorphAction.next(nextSlide);

    }).on('first', function(){
        console.log("ok", arguments);
    });
    
    $('.goToPrev').click(function(){
        $('.sysSlider .slick-prev').click();
    });
    
    $('.goToNext').click(function(){
        $('.sysSlider .slick-next').click();
    });
    
    $('.goTo3Slide').click(function(){
        sysSlider.slick('slickGoTo', 2);
    });
    
    var quoteSlider = $('.quoteSlider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: false,
        focusOnSelect: true,
        arrows: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        pauseOnFocus: false,
        pauseOnHover: false,
        responsive: [
            {
              breakpoint: 600,
              settings: {
                arrows: false
              }
            }
        ]
    });
    
    // mobile menu
    
    $(".hamburger").click(function() {
	$(".menuMobilePopup").show(0);
	$(".menuMobilePopup").animate({"opacity": 1}, 0);
	$(".menuMobilePopupWindow").delay(0).addClass("show");
    });

    $(".menuMobilePopup a").click(function() {
	$(".menuMobilePopupWindow").removeClass("show");
	$(".menuMobilePopup").delay(200).animate({"opacity": 0}, 200);
	$(".menuMobilePopup").delay(200).hide(0);
    });
    
    // quote slider
    
    $('a[data-slide]').click(function(e) {
        e.preventDefault();
        var slideno = $(this).data('slide');
        $('.quoteSlider').slick('slickGoTo', slideno - 1);
    });
    
});

$(window).scroll(function(){
    
});

$(window).resize(function() {
    
    MorphAction.updatePos();
    
});