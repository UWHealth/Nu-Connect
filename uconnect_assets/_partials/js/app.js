require([
    'jquery',
    'avoid_console_conflicts',
    'general_functions',
    'menu',
    // 'colors', // eventually on every page
    'tables', // scrape dom, call another module(file) **create (modular) dom_scrape file
    'toggle',
    'accordion_setup',
    'search',
    'breadcrumbs',
    'header',
    'footer',
    'polyfills',
    'select_dropdown', //potential: define module within dropdown, make unavailable; define function that scrapes dom for dropdown, then require dd module (in two files)
    'faq',
    'magnific_init'
    /*,'analytics'*/
], function($){

    // ------------------------------------------------
    // Append page number to URL query string
    // ------------------------------------------------
    window.page = (function(obj, pageNum){
        if (require('general_functions').check_string(obj.href, '#') == false) {
            location.href = obj.href + "#?page=" + pageNum;
        } else {
            location.href = obj.href + "?page=" + pageNum;
        }
        return false;
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

});