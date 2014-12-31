require([
    'jquery',
    'avoid_console_conflicts',
    'general_functions',
    'tab_events',
    'menu',
    'toggle',
    'accordion_setup',
    'search',
    'breadcrumbs',
    'header',
    'footer',
    'polyfills',
    'magnific_init',
    'analytics'
], function($){

    // ------------------------------------------------
    // Append page number to URL query string
    // Steps to initialize:
    // (1) create link in T4
    // (2) under link's 'Events' tab, apply function to onclick handler: page(#)
    // ------------------------------------------------
    $('a[onclick]').each(function() {
        var onclick = $(this).attr('onclick');
        if (require('general_functions').check_string(onclick, 'page') === true) {
            var href = $(this).attr('href'),
                pageNum = onclick.replace(/[^0-9]/gi, ''),
                url;
            if (require('general_functions').check_string(href, '#') === false) {
                url = href + "#?page=" + pageNum;
            } else {
                url = href + "?page=" + pageNum;
            }
            $(this).attr('href', url);
        }
    });

    //Prevent Click events
    $('body').on('click', '.js_no_click', function(e){
        e.preventDefault();
    });

    //Move first news paragraph above right pod.
    if( $('#js_pod_right').next('p').length >= 1){
        var $right_pod = $('#js_pod_right'),
            $first_paragraph = $right_pod.next('p');
        $first_paragraph.addClass('heading').detach();
        $right_pod.before($first_paragraph);
    }

    // Fire date formatter
    $('.format_date').each(function() {
        var date = require('general_functions').format_date($.trim($(this).text())),
            month = date.month,
            day = date.day;
        // console.log('date: '+date);
        // console.log('month: '+month);
        // console.log('day: '+day);
        // console.log('this: '+ $(this) );
        if ($(this).hasClass('date_two_lines')) {
            month = '<span>' + month + '</span>';
            day = '<span>' + day + '</span>';
            $(this).html(month + day);
        } else {
            $(this).text(month + day);
        }
    });

    // Check for FAQs before loading
    if($('#faq, #FAQ').length){
        require(['faq']);
    };

    // Check if tables exist before loading
    if($('table').length){
        require(['tables']);
    };
    if($('.validate').length){
        require(['validate_init']);
    };

    // Check for dropdowns before loading
    if( $('select, .dd').length){
        require(['select_dropdown'], function(sd) {
            sd.tamingselect();
        });
    };

});
