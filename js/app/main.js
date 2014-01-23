define(["jquery", "jquery.easing", "echo"], function($) {
    $(function() {

    // start of contents
    
    // THIS IS THE TOGGLING MENU
    
    wrapper = $('body');
    el = wrapper.find('.mobile'); //careful with classes here
    act = el.children().children();
    act.children().not('a').hide();
    act.click(function() {
        if($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).children().not('a').slideUp('slow');
        } else {
            $(this).addClass('open');
            $(this).children().not('a').slideDown('slow');
            $(this).siblings().removeClass('open');
            $(this).siblings().children().not('a').slideUp('slow');
        }
    });
   
    
    // THIS IS THE MOBILE CHECK AND PSEUDO HOVER FOR SELECTED LINKS 
     
    //var target = document.getElementsByTagName('body');
    var check = {any:function(){
       return navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
    }};
    if(check.any()) {
        $('nav').css('position', 'relative');
        lnt = $(".tch"); // careful with classes here
        lnt.bind("click.a", function(event) {
          event.preventDefault();
          $(this).unbind(".a");
        });

        lnt.click(function(e) {
           if ($(this).hasClass('focus')) {
               $(this).removeClass('focus');
           } else {
               $(this).addClass('focus');
           }
        });
    };
    
    // THIS IS THE SHOW-MENU ON SCROLLING UPWARD 

    // careful with .bind here - on body
    var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
    $('body').bind(mousewheelevt, function(e){

        var evt = window.event || e //equalize event object     
        evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
        var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF

        if(delta > 0) {
              $('#nav').slideDown(300);  
        }
        else{
            $('#nav').slideUp(300);
        }   
    });


    // THIS IS THE SHOW-MENU WHEN SWIPING UPWARD

    // detect upward downward swipe
    function addSwipeListener(el, listener){
        var startY; // X for horizontal
        var distance;
        var direction;

        function onTouchStart(e){
            if (e.touches.length > 0) {
                startY = e.touches[0].pageY;
                el.addEventListener('touchmove', onTouchMove, false);
                el.addEventListener('touchend', onTouchEnd, false);
            }
        };

        function onTouchMove(e){
            if (e.touches.length > 1){
                return;
            } else {
              distance = e.touches[0].pageY - startY;
            }
            if (Math.abs(distance) > 15) {
                c = 10;
                // upward + : + downward
                listener({ target: el, direction: distance > 0 ? '' + $('body').addClass('m_open') + '' : '' + $('#nav').removeClass('m_open') + '' });
            }
        };
        el.addEventListener('touchstart', onTouchStart, false);
    };

    addSwipeListener(document.body);
    
    
    // THIS IS THE RANDOM PICKER OF ELEMENTS
    
    
    /*-- ARRAY MADE FROM XML FEED 
    
    if (window.XMLHttpRequest)
      {  xmlhttp=new XMLHttpRequest();  }
    else
      {  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");  }

    xmlhttp.open("GET","feed.xml",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML; 

    var x=xmlDoc.getElementsByTagName("EACHFEED");
    var ads = [];
    for (i=0; i < x.length; i++)
      {
      var tit = x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue,
          uri = x[i].getElementsByTagName("URL")[0].childNodes[0].nodeValue,
          imm = x[i].getElementsByTagName("IMG")[0].childNodes[0].nodeValue,
          loc = x[i].getElementsByTagName("LOCATION")[0].childNodes[0].nodeValue;
          ads.push('<a href=" ' + uri + ' "><img src=" ' + imm + ' " alt="" /><b>' + tit + '</b><p>' + loc + '</p></a>');
      };
      
      **/
    
    // fast example array
    var ads = ['<div>1</div>', '<div>2</div>', '<div>3</div>', '<div>4</div>', '<div>5</div>', '<div>6</div>', '<div>7</div>', '<div>8</div>', '<div>9</div>', '<div>10</div>', '<div>11</div>', '<div>12</div>', '<div>13</div>', '<div>14</div>', '<div>15</div>'];
    
    $.fn.loadAds = function( ads, interval ) {  
        return this.each( function() {
            var item = $(this);
            item.fadeOut( 'slow', function() {                
 
                // fisher-yates algorithm             
                Array.prototype.shuffle = function() {   
                        var a = this,
                            n = a.length;

                        for(var i = n - 1; i > 0; i--) {
                            var j = Math.floor(Math.random() * (i + 1));
                            var tmp = a[i];
                            a[i] = a[j];
                            a[j] = tmp;
                        }
                        return a.slice(0,5); // history required for advanced options
                }
               item.empty().append(ads.shuffle());
               item.fadeIn( 'slow' );

            });
            timeOut = setTimeout( function(){ item.loadAds( ads, interval )}, interval );
                if( !item.is(':animated') ) { clearTimeout( timeOut ); item.loadAds( ads, interval );} 
        });
    };

    $(document).ready(function() {
          $('#shuffle').loadAds( ads, 5000 ); // shuffle every 5 sec
    });
    
    // set classes to img based on width

    function setClasses(image) {

                if (!$(image).width()) {

                    $(image).load(function(){
                        setClasses(this);
                    });

                    return;
                }

                if ($(image).width() < 300 * 0.85) {
                    $(image).addClass('small');
                }

                if ($(image).width() > 300 * 0.85) {
                    $(image).addClass('medium');
                }

                if ($(image).width() > 600 * 0.85) {
                    $(image).addClass('big');
                }
            }        

            $('.img img').each(function() {
                setClasses(this);
    });
        
        
    // switchImage ease

    function switchImg() {
            var $last = $('.pics a:last');
            $last.find('img').fadeOut(900, 'jswing', function() {
                $last.prependTo('.pics');
                $last.find('img').fadeIn();
            });
        }
        
    var switchem = setInterval( switchImg, 6000 );      
    
    // scroll sidebar
    $(window).scroll(function() {
        $('#right-sidebar').animate({ top: $(window).scrollTop() + "px" }, { queue: false, duration: 500}, "fast");
    });
    
    // lazy load images echojs by toddmotto
    Echo.init({
          offset: 0,
          throttle: 250
    });    
    
    
    // isyslider - pass width of thumbs, height of thumbs and num of elements to show
    $.fn.isyslider = function(w, h, n) {
        return this.each( function(index, item) {
                
                // structure and gfx
                var main = $(this);
                var target = $(this).children();
                target.first().before(target.last());
                var tl = target.length;
                var cls = main.attr('class');
                target.wrapAll('<div class="' + cls + '_slide" />');
                target.parent().wrapAll('<div class="' + cls + '_cont" />');
                var slider = target.parent();
                var wrapper = slider.parent();
                target.css({'background':'#333', 'margin':'0 1px', 'float':'left', 'display':'block', 'width':'' + w + 'px', 'height':'' + h + 'px'});
                target.children().css({'width':'100%', 'height':'auto'});
                wrapper.parent().prepend('<div class="' + cls + '_prev">‹</div>');
                wrapper.parent().append('<div class="' + cls + '_next">›</div>');
                var prev = main.children().first();
                var next = main.children().last();  
                var wd = (n * 2) + (n * w);
                var sw = (tl * w) + (tl * 2);
                var tw = target.outerWidth() * (-1);
                prev.css({'width':'40px', 'height':'' + h + 'px', 'text-align':'center', 'line-height':'' + h + 'px', 'cursor':'pointer', 'float':'left'});
                next.css({'width':'40px', 'height':'' + h + 'px', 'text-align':'center', 'line-height':'' + h + 'px', 'cursor':'pointer'});
                wrapper.css({'float':'left', 'width':'' + wd + 'px', 'height':'' + h + 'px', 'position':'relative'});
                slider.css({'left': '-' + (w + 2 ) + 'px', 'top':'0', 'width':'' + sw + 'px', 'height':'' + h + 'px', 'position':'absolute'});
                // functions
                prev.click(function() {
                        var indent = parseInt(slider.css('left')) + target.outerWidth();
                        slider.animate({'left' : indent}, 200,function(){    
                                $('.' + cls + '_slide > *:first').before($('.' + cls + '_slide > *:last'));           
                                slider.css({'left' : tw - 2});
                        });
                        return false;
                });
                next.click(function() {
                        //main.css({'border':'1px solid #f0f'});
                        var indent = parseInt(slider.css('left')) - target.outerWidth();
                        slider.animate({'left' : indent}, 200,function(){    
                                $('.' + cls + '_slide > *:last').after($('.' + cls + '_slide > *:first'));           
                                slider.css({'left' : tw - 2});
                        });
                        return false;
                });
                

            });
        };
        
        $('.slider_one').isyslider(100, 100, 3);
        $('.slider_two').isyslider(140, 140, 2);

  });
});
