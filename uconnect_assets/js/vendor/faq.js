require(['jquery'], function($) {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // FAQ
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    $('#FAQ h1, #faq h1').each(function() {
        $(this).nextUntil("#FAQ h1, #faq h1")
            .andSelf()
            .wrapAll('<div class="faq accordion accordion_closed icon icon_right">');
    });

    // Initialize accordions
    require(['accordion_init']);

});