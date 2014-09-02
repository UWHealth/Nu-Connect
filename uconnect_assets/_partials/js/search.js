require(['jquery', 'velocity', 'general_functions'], function($) {

    if (!$('html').hasClass('lte8')) { // don't load on lte ie8

        //If Megamenu or search shade is clicked outside of while active, then we hide them.
        var searching = function(focused) {
            var focus_target = $(focused).attr('data-focus');
            $(focus_target).toggleClass('search_active');
        }, close_button = $("#search_close"),
            $main_search = $('#global_search');

        $main_search.on('focus', function(e) {
    		e.stopPropagation();
            var focus_target = $(this).attr('data-focus');
            if ($(focus_target).hasClass('search_active') === false) {
                searching(this);
            }
        });

    	$(document).on('click','body', function(e) {
            if ($('#top_nav').hasClass('search_active')) {
                if (app.click_check($('#top_nav'), e) === false
    				&& app.click_check($main_search, e) === false) {
                    searching($main_search);
                }
            }
        });

    	$(close_button).on('click', function(e){
    		e.preventDefault();
    		searching($main_search);
    	});

        //Making sure search menu clicks return themselves correctly
        $('.utility_options').on('click', function(e) {
            e.preventDefault();
                if ($(e.target).hasClass('button')) {
                    //If any of the buttons are clicked, change the active query then change the appropriate placeholder class
                    $('.search_options .button').removeClass('active');
                    $(e.target).addClass('active');
                    var placeholder_text = "Search " + $(e.target).attr('data-placeholder');
                    $main_search.attr('placeholder', placeholder_text);
                }
                $main_search.focus();
            e.stopPropagation();
            return false;
    	});

    }

});