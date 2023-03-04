function fadeSection(){
    var pos = $(window).scrollTop();

    $('#landing, #about').each(($i, $s, $ss) => {
        $s = $($s);
        var $overlay = $s.find('.overlay');
        var offset = $s.offset().top;
        var height = $s.height();
        var posDelay = 0.6; // start effect when this % of the section is scrolled past
        var startPos = (offset + posDelay * height); // position when the effect starts (section specific)
        // var endPos = offset + height; // position when the opacity should be >= 1

        if(pos > startPos){
            var opacity = (pos - startPos) / (height * (1 - posDelay));
            if(opacity < 0) opacity = 0;
            else if(opacity > 1) opacity = 1;

            $overlay.show().css('opacity', opacity);
        }
        else {
            $overlay.hide();
        }
    });
}

$(document).ready(function(){
    /* Fade Effect */
    $(window).on('scroll', fadeSection);
    fadeSection(); // on page load

    $('.flip-card-container').on('click', function(e){
        if( $(e.target).closest('.camera-button').length ) return;
        let input = $(this).find('.flip-input'); 
        input.prop('checked', !input.prop('checked'));
    });

    $('[data-toggle="popover"]').popover({
        container: 'body',
        trigger: 'hover click',
        html: true
    });

    $('.hasHover').on('mouseover mouseout', function(e){
        $(this).find('.regular').toggle();
        $(this).find('.hover').toggle();
    });

    $('html').on('click', function(e) {
        if (!$(e.target).is('[data-toggle="popover"]') && $(e.target).closest('.popover').length == 0) {
            $('[data-toggle="popover"]').popover('hide');
        }
    });
});