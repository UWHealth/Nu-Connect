require(['jquery', 'accordion_setup'], function($) {

    // Add current year to copyright text
    var current_year = new Date().getFullYear();
    $('#current_year_js').html('').html(current_year);

    var footerArticleWrapper = $('#uconnect_updates_row'),
        footerArticleURL =
        '/feeds/json/homepage-updates/index.json'; /* [prod] */
        //'../homepageUpdates.json'; /* [local] */

    // Ajax call
    $.getJSON(footerArticleURL, function(json) {

        // Check for valid JSON array
        if ($.isArray(json.homepageUpdates)) {
            // Each news-article
            $.each(json.homepageUpdates, function(i, article) {
                // Check for valid JSON array
                // && if news-article has keywords
                if ($.isArray(this.keywordTags) && (this.keywordTags != '')) {
                    var keyword_tags = [];
                    // format each keyword tag into <li>
                    $.each(this.keywordTags, function(i, keyword) {
                        keyword_tags += '<li><a class="icon tag" href="' + keyword + '">' + keyword + '</a></li>';
                    });
                    // add each news article's html
                    footerArticleWrapper.append('<article class="column third small_auto"><div class="box_panel box_card"><a href="' + this.url + '"><h3 class="h6 txt_serif box_card_head">' + this.title + '</h3><time class="txt_small txt_upper">' + this.date + '</time><div class="box_card_body has_keywords">' + this.summary + '</div></a><div class="box_card_foot accordion tagged icon icon_right"><ul class="list_inline txt_small list_space list_tag"><li class="txt_upper">Tagged</li>' + keyword_tags + '</ul></div>');
                } else {
                    footerArticleWrapper.append('<article class="column third small_auto"><div class="box_panel box_card"><a href="' + this.url + '"><h3 class="h6 txt_serif box_card_head">' + this.title + '</h3><time class="txt_small txt_upper">' + this.date + '</time><div class="box_card_body">' + this.summary + '</div></a>');
                }
            });
        }

    });
});