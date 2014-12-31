define([
    'jquery',
    'general_functions'
], function($, gf) {

    // Hide links from directory content that point to old (CS) U-Connect pages
    $('#directory a').each(function() {
        var href = $(this).attr('href');
        if (href) {
            if (gf.check_string(href, 'servlet') === true) {
                $(this).css('display', 'none');
            } else if (gf.check_string(href, 'directory') === true) {
                $(this).attr('href', 'https://uconnect.wisc.edu'+href);
            }
        }
    });

    // Hide profile image
    $('.profileImage-container').addClass('hidden');

    // Remove <strong> tags
    $('#listing-container strong').contents().unwrap();

    // Show additional links
    // $('.whiteLink').css({'display':'block !important'});

    // Hide additional links (could be CS)
    $('.whiteLink').parent('p').remove();

    return directory;

});