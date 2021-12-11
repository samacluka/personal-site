$(document).ready(function(){
    console.log('running!!!');

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
            ++scroll.activeSection
            scrollToSection(scroll.activeSection)
        }
    }

    var upSection = () => {
        if (scroll.activeSection > 0) {
            --scroll.activeSection
            scrollToSection(scroll.activeSection)
        }
    }

    var scrollToSection = (section) => {
        anime({
            targets: scrollElement,
            scrollTop: (section) * window.innerHeight,
            duration: scroll.throttleDur,
            easing: 'linear'
        })

        scroll.activeSection = section
    }

    window.addEventListener("keydown", function(e) {
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault()
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
    }, false)

    window.addEventListener('scroll', function(e) {
        e.preventDefault()
    }, false)

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
    }, false)

    var initialY = null;

    window.addEventListener('touchstart', function(e) {
        initialY = e.touches[0].clientY;
    }, false)

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
            scroll.throttled = false
            }, 1.5 * scroll.throttleDur)
            
            if (diffY > 0) {
            downSection()
            } else {
            upSection()
            }
        }

        initialy = null

    }, {passive: false})


    // Scroll back to correct section when resized.
    window.addEventListener('resize', function(e) {
    scrollToSection(scroll.activeSection)
    }, false)

});