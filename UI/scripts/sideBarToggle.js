$('body .btn-HidePanel-toggle').on('click', function (event) {
    event.preventDefault();
    if(!$(this).hasClass('active')){
        $(this).addClass('active');
        hidePanel();
    }else{
        $('body').removeClass('hidePanels');
        $(this).removeClass('active');
        clearTimeout(window._timeout_right);
        window._timeout_right = null;
        $('body').unbind('mousemove.right-panel');
    }
});

jQuery('.ShowLine').hover(
    function () {
        $('body').removeClass('hidePanels');
    });

function hidePanel() {
    window._timeout_right = setTimeout(function () {
        $('body').addClass('hidePanels');
        window._timeout_right = null;
    }, 1000);
    var rightPannelLabelEl = $('.ShowLine').get(0);
    var rightPannelEl = $('.V-right-panel-contaiver').get(0);
    $('body').bind('mousemove.right-panel', function (event) {
        if (event.target == rightPannelLabelEl || event.target == rightPannelEl) {

            clearTimeout(window._timeout_right);
            window._timeout_right = null;
            $('body').removeClass('hidePanels');
        } else {
            if (!window._timeout_right) {
                window._timeout_right = setTimeout(function () {
                    $('body').addClass('hidePanels');
                    window._timeout_right = null;
                }, 1000);
            }
        }
    });
}