$(document).ready(function(){
    /* Fade Effect */
    $(window).on('scroll', function(e){
        var vh = $(window).height();
        var pos = $(window).scrollTop();

        $('#landing, #about').each(($i, $s, $ss) => {
            $s = $($s);
            var $overlay = $s.find('.overlay');
            var offset = $s.offset().top;

            if(pos > offset){
                var opacity = (pos - offset) / vh;
                if(opacity < 0) opacity = 0;
                else if(opacity > 1) opacity = 1;

                $overlay.show().css('opacity', opacity);
            }
            else {
                $overlay.hide();
            }
        });
    });

    $('.card').on('click', function(e){
        $card = $(this);

        var $header = $card.find('.card-header').html();
        $('#modal .modal-header').html($header);

        var $desc = $card.data('description');
        $('#modal .modal-body').html($desc);

        $('#modal').modal('show');
    });
});