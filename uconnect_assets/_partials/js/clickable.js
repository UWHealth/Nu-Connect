require(['jquery'], function($) {

    var click_target,
        target_push;
    $(".clickable").click(function() {
        click_target = "" + $(this).attr("data-target");
        click_push = "" + $(this).attr("data-class");
        $(click_target).toggleClass(click_push);
        $(this).toggleClass('clicked');
    });

});