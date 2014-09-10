require(['jquery', 'magnific_init', 'general_functions'], function($) {

    var object_class = 'object_';

    //-------------------------------
    // Manage embed height // use embed width to calculate height
    //-------------------------------
    function updateEmbedHeight() {
        var embed = $('.embed'),
            embed_height = embed.attr('height'),
            embed_width = embed.width();
        // width of embed is ~75% of the container's height (~ 8.5 x 11)
        embed_height = Math.ceil( embed_width / (3 / 4) ) + 'px';
        embed.attr('height', embed_height);
    }
    
    // (re)fire height function on window resize
    $(window).resize(function() {
        updateEmbedHeight();
    });
    //-------------------------------
    // Setup embed & provide fallback for if url is not available
    //-------------------------------
    function embedSetup() {
        // initialize embed
        // setting url dynamically b/c when ie renders tab JS, the loaded object/iframe disappears
        $('.embed').each(function() {
            var embed = $(this),
                embed_classes = embed.attr('class').split(' '); // Get array of class name(s)
                embed_method = embed.data('method'),
                embed_url = embed.data('file'),
                embed_url_query_string = app.get_query_string('page')
                embed_object = '';

            // Append query string argument, if available (searching for ?page=something)
            if (embed_url_query_string != false ) {
                embed_url += embed_url_query_string;
            }

            // Iterate the class(es) & return object var
            for (var i = 0; i < embed_classes.length; i++) {
                if (embed_classes[i].indexOf(object_class) > -1) {
                    embed_object = embed_classes[i].slice(object_class.length, embed_classes[i].length);
                }
            }

            // Check for various methods and replace placeholder div's html
            if (embed_url.length > 0) {
                if (embed_method == 'object') {
                    embed.replaceWith('<object width="100%" height="940px" class="embed '+object_class+embed_object+'" target="'+embed_url+'" type="application/'+embed_object+'"></object>');
                } else if (embed_method == 'iframe') {
                    embed.replaceWith('<iframe width="100%" height="940px" class="embed '+object_class+embed_object+'" src="'+embed_url+'"></iframe>');
                } else {
                    embed.replaceWith('<'+embed_method+' width="100%" height="940px" class="embed '+object_class+embed_object+'" src="'+embed_url+'"></'+embed_method+'>');
                }
            } else {
                embed.parent().html('').append('<div class="pad center"><span class="icon icon_before color_alert" data-icon="error"></span>Document could not be loaded. <a href="mailto:uconnect@uwhealth.org?Subject=U-Connect embed Document Not Loading&body=[Page URL] ' + window.location + '">Please let us know about it.</a></div>');
            }
        });

        // set embed height
        updateEmbedHeight();
    }

    $(function() {
        // initialize embed
        if (!$('html').hasClass('lte8')) { // don't load on lte ie8
            embedSetup();
        }
    });    

});