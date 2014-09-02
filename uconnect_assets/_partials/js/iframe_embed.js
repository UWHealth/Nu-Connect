require(['jquery', 'magnific', 'magnific_init'], function($) {

    //-------------------------------
    // Manage iFrame height // use iframe width to calculate height
    //-------------------------------
    function updateIframeHeight() {
        var iframe_embed = $('.iframe_embed'),
            iframe_embed_height = iframe_embed.attr('height'),
            iframe_embed_width = iframe_embed.width();
        // width of embed is 75% of the container's height (~ 8.5 x 11)
        iframe_embed_height = iframe_embed_width / (3 / 4) + 'px';
        iframe_embed.attr('height', iframe_embed_height);
    }
    // (re)fire height function on window resize
    $(window).resize(function() {
        updateIframeHeight();
    });

    //-------------------------------
    // Setup iFrame
    //-------------------------------
    function setupIframe() {
        $('.pdf_object').each(function() {
            var iframe = $(this),
                iframe_url = iframe.data('file'); // + "#toolbar=1&amp;statusbar=1&amp;messages=1&amp;navpanes=1"; // excluded #toolbar string b/c it brings up extra Adobe PDF top utility bar
                $(iframe).attr('src', iframe_url);
            // check if pdf URL is available; if not, throw error
            if (iframe_url.length > 0) {
                iframe.attr('src', iframe_url);
            } else {
                iframe.parent().html('').append('<div class="pad center"><span class="icon icon_before color_alert" data-icon="error"></span>Document could not be loaded. <a href="mailto:uconnect@uwhealth.org?Subject=U-Connect iFrame Document Not Loading&body=[Page URL] ' + window.location + '">Please let us know about it.</a></div>');
            }
        });
    }

    // initialize iFrame
    setupIframe();

    $(function() {
        // set iFrame height
        if (!$('html').hasClass('lte8')) { // don't load on lte ie8
            updateIframeHeight();
        }
    });

});