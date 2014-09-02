require(['jquery', 'velocity'], function($) {

    $('[data-toggle]').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        var toggletarget = $(this).attr('data-toggle');
        var iconswitch = $(this).attr('data-icon-switch');
        if (iconswitch === undefined) {
            iconswitch = [$(this).attr('data-icon'), $(this).attr('data-icon')];
        } else {
            iconswitch = iconswitch.split(" ");
        }
        if ($(this).hasClass('slide_anim') === true) {
            if ($(toggletarget).is(":visible")) {
                $(toggletarget).velocity("slideUp", 200, "easeInBack");
                $(this).attr('data-icon', iconswitch[0]);
            } else {
                $(toggletarget).velocity("slideDown", 200, "easeOutBack");
                $(this).attr('data-icon', iconswitch[1]);
            }
        } else {
            $(toggletarget).fadeToggle(200);
        }
    });

});