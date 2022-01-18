$(document).ready(function(){
    $(window).scrollTop(0);

    const scrollElement =
        window.document.scrollingElement ||
        window.document.body ||
        window.document.document;

    var scroll = {
        activeSection: 0,
        totalSections: document.getElementsByTagName('section').length,
        throttled: false,
        throttleDur: 500,
    }

    var downSection = () => {
        if (scroll.activeSection < scroll.totalSections) {
            ++scroll.activeSection;
            scrollToSection(scroll.activeSection);
        }
    }

    var upSection = () => {
        if (scroll.activeSection > 0) {
            --scroll.activeSection;
            scrollToSection(scroll.activeSection);
        }
    }

    var scrollToSection = (section) => {
        $('.fade-in').removeClass('is-visible');

        anime({
            targets: scrollElement,
            scrollTop: (section) * window.innerHeight,
            duration: scroll.throttleDur,
            easing: 'linear',
            complete: () => {
                ogPos = section * vh;
                $(`section:nth-child(${section}) .fade-in`).addClass('is-visible');
            }
        });

        scroll.activeSection = section;
    }

    window.addEventListener("keydown", function(e) {
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }

        if(!scroll.throttled) {
            scroll.throttled = true
            
            setTimeout(function() {
                scroll.throttled = false;
            }, 1.5 * scroll.throttleDur);

            if ([32, 40].indexOf(e.keyCode) > -1) {
                downSection();
            }
            if ([38].indexOf(e.keyCode) > -1) {
                upSection();
            }
        }
    }, false);

    window.addEventListener('scroll', function(e) {
        e.preventDefault()
    }, false);

    window.addEventListener('wheel', function(e) {
        e.preventDefault();

        if (!scroll.throttled) {
            scroll.throttled = true;
            
            setTimeout(function() {
                scroll.throttled = false;
            }, 1.5 * scroll.throttleDur)
            
            if(e.deltaY < 0) {
                upSection();
            } 
            else {
                downSection();
            }
        }
    }, false);

    var initialY = null;

    window.addEventListener('touchstart', function(e) {
        initialY = e.touches[0].clientY;
    }, false);

    window.addEventListener('touchmove', function(e) {
        e.preventDefault();

        if (initialY === null) {
            return
        }

        var currentY = e.touches[0].clientY;

        var diffY = initialY - currentY;

        if(!scroll.throttled) {
            scroll.throttled = true
            
            setTimeout(function() {
                scroll.throttled = false;
            }, 1.5 * scroll.throttleDur);
            
            if (diffY > 0) {
                downSection();
            } 
            else {
                upSection();
            }
        }

        initialy = null;

    }, {passive: false});


    // Scroll back to correct section when resized.
    window.addEventListener('resize', function(e) {
        scrollToSection(scroll.activeSection);
    }, false);
    
    function sectionName(section){
        return $(`section:nth-child(${section})`).attr('id');
    }

    /* Section fading */
    var vh = $(window).height();
    var ogPos = 0;

    $(window).on('scroll', function(e){
        var pos = $(window).scrollTop();

        var opacity = 0;
        var sn = (ogPos / vh) + 1; // css is one-indexed, so +1
        if(pos > ogPos){ // down
            opacity = (pos - ogPos) / vh;
        }
        else { // up
            sn = sn - 1;
            opacity = 1 - ((ogPos - pos) / vh);
        }

        if(opacity > 1) opacity = 1;
        if(opacity < 0) opacity = 0;

        sn = sectionName(sn);
        if(!sn) return false;
        
        $(`section:not(#${sn}) .overlay`).hide();
        $(`#${sn} .overlay`).show().css('opacity', opacity);
    });

    $('.card').on('click', function(e){
        $card = $(this);

        var $header = $card.find('.card-header').html();
        $('#modal .modal-header').html($header);

        var $desc = $card.data('description');
        $('#modal .modal-body').html($desc);

        $('#modal').modal('show');
    })
});