

$(function(){
    //add scroll on mouse whell for horizontal participants list
    $(".presenters").mousewheel(function(event, delta) {

        this.scrollLeft -= (delta * 30);

        event.preventDefault();

    });
});

//add participant pref nav
function OpenParticipantPref(element){
    $('.PartcipantPref').remove();

    var $el = jQuery(element),
        userName = jQuery(element).attr('data-name');


    $("<div class='PartcipantPref d-inline-block'>"+ userName +"<a class='VideoClientIcon-headset' href='#'></a><a class='VideoClientIcon-network-cam active' href='#'></a><a class='VideoClientIcon-high-five' href='#'></a></div>").insertAfter($($el))

    //DEMO ADD ACTIVE CLASS
    $('.PartcipantPref a').on('click', function(){
        jQuery(this).toggleClass('active');
    });
}