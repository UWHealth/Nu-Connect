require(['jquery'], function($) {

    //Helper for hiding/showing baseline-grid
    $('#toggles').children().click(function(e) {
        var toggles = $(this).attr("id");
        $('html').toggleClass(toggles);
        e.preventDefault();
    });

});