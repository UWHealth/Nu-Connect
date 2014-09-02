require(['jquery'], function($) {

    // ------------------------------------------------
    // Browser Check: <IE8
    // ------------------------------------------------
    if ($('html').hasClass('lte8')) {
        require(['polyfills_lte_ie8']);
    }

    // ------------------------------------------------
    // Browser Check: <IE9
    // ------------------------------------------------
    if ($('html').hasClass('lte9')) {
        require(['polyfills_lte_ie9']);
    }

});