//DEMO
jQuery(document).ready(function(){

    $('.MainVideoButton').click(function(){
        if($( this ).hasClass('INTRdefault')){
            $(this).removeClass('INTRdefault').addClass('waitResponse');
            setTimeout(function() {
                $('.waitResponse').removeClass('waitResponse').addClass('PlayINTR');
                $('section.play').addClass('record');
            }, 4500);
        }
    });
});
//DEMO end