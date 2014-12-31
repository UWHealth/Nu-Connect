require([
    'jquery',
    'placeholder'
], function($) {

    // getComputedStyle - used in check_mq()
    // http://snipplr.com/view/13523/
    // if (!window.getComputedStyle) {
    //     window.getComputedStyle = function(el, pseudo) {
    //         this.el = el;
    //         this.getPropertyValue = function(prop) {
    //             var re = /(\-([a-z]){1})/g;
    //             if (prop == 'float') prop = 'styleFloat';
    //             if (re.test(prop)) {
    //                 prop = prop.replace(re, function() {
    //                     return arguments[2].toUpperCase();
    //                 });
    //             }
    //             return el.currentStyle[prop] ? el.currentStyle[prop] : null;
    //         }
    //         return this;
    //     }
    // }

    // var ownerDocument = elem.ownerDocument;
    // if (!ownerDocument) {
    //     return null;
    // }
    // var defaultView = ownerDocument.defaultView;
    // if (!defaultView) {
    //     return null;
    // }

    // Flat-accordion fix: main content container needs height adjustment
    $('.build_flat_accordion .accordion').click(function() {
        var accordion_height = $(this).height(),
            body = $(this).closest('.main_content'),
            body_height = body.height();
        if ($(this).hasClass('accordion_closed')) {
            body_height = body_height - accordion_height;
            body.css({
                body: body_height
            }).addClass('z').removeClass('z'); // add/remove class to update DOM
        } else {
            body_height = body_height + accordion_height;
            body.css({
                body: body_height
            }).addClass('z').removeClass('z'); // add/remove class to update DOM
        }
    });

    // Placeholder text
    // http://mths.be/placeholder v2.0.8 by @mathias
    $('input, textarea').placeholder();

    $(function() {

        // TEMP fix for Toggles
        $('.sidebar_button').click();

    });

});
