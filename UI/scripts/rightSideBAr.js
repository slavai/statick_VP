
function Video_onSessionPage_UI_Init(){
    $(window).resize(function() {
        resizeInit();
    });

    $(function() {
        var $mainWrapper = jQuery('.V-VideoContainer'),
            wrapperHeight = jQuery('.MainVideoFrame-wrapper').height();
        $mainWrapper.height(wrapperHeight);

        $( "#bar1, #bar2" ).sortable({
            helper: 'clone',
            connectWith: ".connectedBar",
            handle: ".sectionHeader",
            placeholder: "sectionHeader-placeholder",
            start: function(event, ui) {
                jQuery('.sideBarWrapper').addClass('sortingStart');
            },
            stop: function(event, ui) {
                jQuery('.sideBarWrapper').removeClass('sortingStart');
            },
            receive: function(event, ui) {
                var countChildren = $(this).children().length;
                if (countChildren >= 3) {
                    //ui.sender: will cancel the change.
                    //Useful in the 'receive' callback.
                    $(ui.sender).sortable('cancel');
                    $(ui.item).addClass('cancel').delay(500).queue(function(){
                        $(this).removeClass("cancel").dequeue();
                    });
                }
                else{
                    //add sorting item height
                    var $target = jQuery(event.target),
                        $item = jQuery(ui.item),
                        targetHeight = $target.height(),
                        sectionNeighbor = $target.find("section");

                    if(sectionNeighbor.length >= 1){
                        $item.height(targetHeight - sectionNeighbor.height() - 15);
                    }

                }
                resizeInit();
            }
        }).disableSelection();

    });

}

//append tile on nav item
function appendBar(element){
    var subjectId = jQuery(element).attr("data-id"),
        $subjectId = jQuery("#" + subjectId),
        cloneSubject = $subjectId.clone(true),
        barS1 = $("#bar1 section").size(),
        barS2 = $("#bar2 section").size(),
        itemCount = false,
        colCount = 0;


    if(!jQuery('.connectedBar #'+subjectId).length){
        console.log(1);
        jQuery(element).addClass("active");
        //first checking, what bars has place for tile
        //second check, first or second position are avalible
        if (barS1 <= 1) {
            if(barS1 === 1){
                itemCount = true
            }
            BarId = jQuery('#bar1');
            colCount = 1;
        }else if(barS2 <= 1){
            if(barS2 === 1){
                itemCount = true
            }
            BarId = jQuery('#bar2');
            colCount = 2;
        }else{
            //$.showFlashMessage('panel full', {type: 'info', timeout: 20000})
        }

        //if tile are second, add new with height= wrapperHeight - firstTile
        if(itemCount){
            cloneSubject.height(BarId.height() - BarId.find("section").height());
        }

        cloneSubject.appendTo(BarId);
        console.log(cloneSubject);
        console.log(BarId);
        $('.VideoClient').addClass('showSidebarLine-'+colCount);
        resizeInit();
    }else{
        jQuery('.connectedBar #' + subjectId).remove();
        jQuery("[data-id='"+ subjectId +"']").removeClass('active');

    }
    $('.styledScroll').scrollbar();

};
function CloseBar(element){
    var $el = jQuery(element),
        closedTab_id = jQuery(element).parents("section").attr("id");

    jQuery('.connectedBar #' + closedTab_id).remove();
    jQuery("[data-id='"+ closedTab_id +"']").removeClass('active');

};
function resizeInit(){
    var wrapperHeight = jQuery('.V-VideoContainer').height();
    $( ".connectedBar section" ).filter(function(index){
        var parent = jQuery(this).parents('.connectedBar'),
            parentHeight = jQuery(parent).height();

        if(jQuery(parent).find('section').length === 1){
            return true
        }

        return false
    }).resizable({
        handles: 's',
        distance: 0,
        minHeight: 41,
        maxHeight: wrapperHeight - 41,
        start: function (event, ui) {
            // just remember the total width of self + neighbor
            this.heightWithNeighbor = ui.originalSize.height + ui.element.next().outerHeight();
            // fix FF resizing issue sometimes cause div to overflow
            $(this).parent().addClass("resizing");
        },
        resize: function (event, ui) {
            // and just subtract it!
            ui.element.next().height(this.heightWithNeighbor - ui.size.height);
        },
        stop: function (event, ui) {
            // clean up, is this needed?
            delete this.heightWithNeighbor;
            $(this).parent().removeClass("resizing");
        }
    }).on('resize', function (event) {
        event.stopPropagation();
    });
    $('.styledScroll').scrollbar();
}


jQuery(document).ready(function(){
    Video_onSessionPage_UI_Init();
    //add stilization for scroll
    //DONT WORK FOR FF or OPERA ON MAC OSX, osx scrollbars settings fuck not webkit browsers (OSX sucks, Jobs come back to us)
    $('.styledScroll').scrollbar();
    resizeInit();
});

function ManageAllParticipants_dropDownOpen(e){
    console.log('1');
    $(e).parents('.userWrapp').toggleClass('active');
    return false;
}