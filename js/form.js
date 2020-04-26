function adjustPositioning() {

    if ($(window).outerWidth() >= 992) {
        $('footer').find('.row:eq(1)').append($('.social-networks'));  
        origOffsetY = $('#logo-container').height();
        
    } else {
        $('footer').find('.row:eq(0)').append($('.social-networks'));
        origOffsetY = 0;
    }

    $(document).scroll();
}

$(document).ready(function() {
    $(window).on('resize', adjustPositioning);
    adjustPositioning();
})