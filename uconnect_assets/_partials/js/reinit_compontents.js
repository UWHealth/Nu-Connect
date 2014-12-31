define([
    'jquery',
    'slider',
    'select_dropdown',
    'mixitup_init',
    'tabs'
], function($, slider, dd, mixitup) {

    return {

        reinit_compontents: (function(output) {

            // Tabs
            // if ( $(output).find('.tab_content').length ) {
                $(output).tabbed({
                    "speed": 200
                });
            // }

            // Slider
            // if ( $(output).find('.slide').length ) {
                slider.slider_init();
            // }

            // Dropdowns
            // if ( $(output).find('.dd, select').length ) {
                dd.tamingselect();
            // }

            // Mixitup
            // if ( $(output).find('.mixitup').length ) {
                mixitup.mixitup_init();
            // }

        })

    }

});
