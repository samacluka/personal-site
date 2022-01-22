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

    $('.card[data-description]').on('click', function(e){
        $card = $(this);

        var $header = $card.find('.card-header').html();
        $('#modal .modal-header').html($header);

        var $desc = $card.data('description');
        $('#modal .modal-body').html($desc);

        $('#modal').modal('show');
    });
});