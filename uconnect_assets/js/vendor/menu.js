require(['jquery', 'tabs', 'general_functions'], function($) {

    $(document).on('click', 'body', function(e) {
        if ($('#mega_buttons .tab').hasClass('active')) {
            if (app.click_check($('#mega_nav'), e) === false && app.click_check($('#mega_buttons'), e) === false && app.click_check($('[data-toggle="#mega_nav"]'), e) === false) {
                $('#mega_nav').find('.tab_button.active').removeClass('active')
                $('#mega_buttons').find('.active').removeClass('active');
                // $('#mega_nav').not('.active').find('.tab_content:visible')
                $('#mega_nav > .tabbed > .tab_content:visible')
                    .velocity({
                        "margin-top": [0, 0],
						rotateX: ["90deg", [.41, -0.5, 0, 1.14], "0"],
						//cubic-bezier(.41, -0.5, 0, 1.14)
                        translateY: ["-1%", [.31, -0.41, .5, .59], "0"],
                        opacity: [0, "easeOut", 1]
                    }, {
                        display: "none"
                    }, {
                        duration: 40
                    });
                if ($('#mega_nav').hasClass('active')) {
                    $('[data-toggle="#mega_nav"]').click();
                }
            }
        }
    });

    // Remove line-breaks from tab_buttons
    function removeMainNavLineBreaks() {
            $('#mega_nav .tab_button').find("br").remove();
    }
    removeMainNavLineBreaks();
    $(window).resize(function() {
        removeMainNavLineBreaks();
    });

    $(function() {

        // Duplicate each utility nav link for mobile, a give appropriate style classes
        $('#utilities a').each(function() {
            $(this).clone()
                .appendTo($('#mega_nav > .tabbed'))
                .addClass('tab_button utility_tab tab_link')
                .attr('data-tabbed', 'true');
        });

    });

});