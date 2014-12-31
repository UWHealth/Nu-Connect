require([
    'jquery',
    'general_functions'
], function($, gf) {

    function sortDataDate(a, b) {
        return ($(b).data('date')) > ($(a).data('date')) ? 1 : -1;
    }

    function sortDataIndex(a, b) {
        return ($(b).data('index')) < ($(a).data('index')) ? 1 : -1;
    }

    // ------------------------------------------------
    // Homepage "Feed"
    // ------------------------------------------------
    // Wide features (via hbs) & feed articles (via SearchBlox RSS) sources are combined
    // ------------------------------------------------
    // component/feature-wide.hbs
    // ------------------------------------------------
    // (1) featureWide_setDate() = Format date
    //      (a) create data-date (to be sorted)
    //      (b) reformat date
    // (2) featureWide_sortDate() = Sort data-date (descending)
    // (3) featureWide_setIndex() = set data-index
    //      (a) "X" in pattern: 1, 2, X, 4, 5, 6, X, 7, 8, 10, X, 12, 13, 14, X...
    //          (i) "X" = components/feature-wide.hbs
    // ------------------------------------------------
    // SearchBlox RSS Feed/Collection
    // ------------------------------------------------
    // (4) feed_buildUrl() = Get number of feeds to return from SearchBlox collection && build URL to retrieve SearchBlox collection
    // (5) getSearchbloxJSON() = Get feed
    // (6) parseSearchbloxJSON() = Parse necessary feed info
    //      (a) Parse each result and replace http protocol w/ https (set when defining itemString var)
    //      (b) Remove unnecessary HTML in "summary": output data to DOM container, use .text() to strip html, clear container
    //      (c) feed_setCardCol() = Set feed (.card) column width
    //      (d) format_month() = Format date
    //      (e) Check source of article
    //      (f) Change article img (if not available) to default
    // (7) feed_buildHtml() = Format RSS data to (.card) html
    // (8) feed_setIndex() = Set data-index
    //      (a) "X" in pattern: X, X, 3, X, X, X, 7, X, X, X, 11, X, X, X, 15...
    //          (i) "X" = SearchBlox feed article
    // ------------------------------------------------
    // Combined
    // ------------------------------------------------
    // (9) setOutputPattern() = Combine and sort featureWide & SearchBlox article

    var featureWide_index = 0,
        featureWide_max = 6,
        featureWide_indexInterval = 3,
        html_index = 0,
        feed_total = 20,
        featureWide_indexArray = [],
        featureWide = $('#feature_wide_container .sort'),
        outputContainer = $('#feeds_modified'),
        feed_url,
        feed_checkUrl;

    // Add loading spinner
    outputContainer.addClass('loading');

    // ------------------------------------------------
    // Format date
    // ------------------------------------------------
    function featureWide_setDate() {
        $.each((featureWide), function() {
            var dateContainer = $(this).find('time'),
                displayDate = dateContainer.text(),
                dateDate = new Date(displayDate).valueOf(),
                date = new Date(displayDate),
                dateMonth = gf.format_month(date.getMonth()),
                dateDay = date.getDate();
            // Set data-date, to be sorted
            $(this).attr('data-date', dateDate);
            // Format date as MMM d
            dateContainer.text('').text(dateMonth + ' ' + dateDay);
        });
        featureWide_sortDate();
    }

    // ------------------------------------------------
    // Sort data-date
    // ------------------------------------------------
    function featureWide_sortDate() {
        featureWide.sort(sortDataDate).appendTo('#feature_wide_container');
        featureWide_setIndex();
    }

    // ------------------------------------------------
    // Sort data-index
    // ------------------------------------------------
    function featureWide_setIndex() {
        var featureWide_data_index;
        $.each((featureWide), function(i) {
            // Count each feature
            featureWide_index++;
            // console.log('featureWide_index: '+featureWide_index);
            // Apply data-index
            if (featureWide_index > featureWide_max) {
                $(this).addClass('hidden');
            }
            if (featureWide_index == 1) {
                featureWide_data_index = featureWide_index * featureWide_indexInterval;
            } else {
                featureWide_data_index = (featureWide_index * featureWide_indexInterval) + i;
            }
            $(this).attr('data-index', featureWide_data_index);
            // Push data-index to indexes array
            featureWide_indexArray.push(featureWide_data_index);
        });
        // console.log('featureWide_indexArray: '+featureWide_indexArray);
        feed_buildUrl();
    }

    // ------------------------------------------------
    // Get number of feeds to return from SearchBlox collection
    // & build URL to retrieve SearchBlox collection
    // ------------------------------------------------
    function feed_buildUrl() {
        // Setup feed_total
        // feed_total = 26 - featureWide_max;
        // [local]
        if (gf.check_string(gf.get_origin(), 'localhost') || gf.check_string(gf.get_origin(), 'local') ) {
            feed_url = '/searchbloxUpdates.json';
        // [prod]
        } else {
            // feed_total = '&pagesize=' + feed_total;
            // feed_url = '/searchblox/servlet/SearchServlet?cname=U-Connect-Homepage&query=*&sort=lastmodified' + feed_total;
            feed_url = '/feeds/json/homepage/index.json';
        }
        // gather results
        // getSearchbloxJSON(feed_total, parseSearchbloxJSON);
        getSearchbloxJSON(parseSearchbloxJSON);
        // console.log('feed_total: '+feed_total);
    }

    // ------------------------------------------------
    // Get feed
    // ------------------------------------------------
    // function getSearchbloxJSON(feed_total, callback) {
    function getSearchbloxJSON(callback) {
        $.ajax({
            url: feed_url,
            dataType: 'json',
            success: function(data) {
                callback(data.results);
            },
            error: function () {}
        });
    }

    // ------------------------------------------------
    // Check feed source
    // ------------------------------------------------
    function feed_checkSource(source) {
        if (gf.check_string(source, 'uwsmph')) {
            return 'med.wisc.edu';
        } else if (gf.check_string(source, 'uwhealth.org')) {
            return 'uwhealth.org';
        } else {
            return 'U-Connect';
        }
    }

    // ------------------------------------------------
    // Set feed (.card) column width
    // ------------------------------------------------
    function feed_setCardCol(i) {
        if (i <= 1) {
            return 'half';
        } else {
            return 'third';
        }
    }

    // ------------------------------------------------
    // Parse necessary feed info
    // ------------------------------------------------
    function parseSearchbloxJSON(feed_response) {
        $.each((feed_response.result), function(i) {
            // Stop at 20
            if (i < 20) {
                var content_type,
                    image_src,
                    image_src_helper,
                    itemString = feed_response.result[i].description,
                    link = feed_response.result[i].url,
                    source = feed_checkSource(link),
                    html_col_type = feed_setCardCol(i),
                    date = gf.format_date(feed_response.result[i].lastmodified),
                    dateMonth = date.month,
                    dateDay = date.day,
                    title = feed_response.result[i].title,
                    icon_type = 'triangle right',
                    action_text = 'Read More',
                    itemString = itemString // Ensure protocols are https
                                    .replace(/\\/g,'')
                                    .replace(/(http\:\/\/www\.uwhealth\.orghttp)/g, '')
                                    .replace(/(http\:\/\/www\.uwhealth\.org\/files\/smph\/)/g, '\/\/\med\.wisc\.edu\.org\/files\/smph\/')
                                    .replace(/(http\:)/g, '');
                // ------------------------------------------------
                // Image, Article-Content-Type, & Action-Text Setup
                // ------------------------------------------------
                // [U-Connect] The description is JSON, it's a U-Connect update
                // if ( itemString.toLowerCase().indexOf('<table>') ) {
                if ( source === 'U-Connect' ) {
                    desc_json = JSON.parse(itemString);
                    content_type = desc_json[0];
                    itemString = desc_json[2];
                    // Should JSON have image path, use it
                    if ( desc_json[1] !== '' ) {
                        image_src = desc_json[1];
                    // If no img available, use defaults: Page Update/News
                    } else {
                        if ( desc_json[0] === "Page Update" ) {
                            image_src = '/cosmos/uconnect/img/bg/pat_bubble_large.png';
                            action_text = 'View Update';
                        } else {
                            image_src = '/cosmos/uconnect/img/bg/bg_news.jpg';
                        }
                    }
                // [Public] If description contains a <table> tag, it's a Feedburner/public site update
                } else {
                    content_type = 'News';
                    itemString = $(itemString)[0];
                    action_text = action_text;
                    icon_type = "&#xe668"
                    var img_public_src = $('#feeds_formatter').find('img:eq(0)').attr('src');
                    // If no image supplied, then supply default(s)
                    if ( img_public_src === undefined ) {
                        // [SMPH]
                        if ( source === 'med.wisc.edu' ) {
                            image_src = '/cosmos/uconnect/img/defaults/smph_crest.jpg';
                        }
                        // [UW Health]
                        if ( source === 'uwhealth.org' ) {
                            image_src = '/cosmos/uconnect/img/defaults/uwhealth_logo.png';
                        }
                    }
                }

                var summary = '<p>' + $('#feeds_formatter').append(itemString).text() + '</p>';

                // console.log(itemString);
                // console.log(image_src);
                // console.log('summary: '+summary);
                // console.log('displayDate: '+displayDate);
                // console.log('date: '+date);
                // console.log('displayDate.getMonth(): '+displayDate.getMonth());
                // console.log('dateMonth: '+dateMonth);
                // console.log('dateDay: '+dateDay);

                // ------------------------------------------------
                // Build html
                // ------------------------------------------------
                feed_buildHtml(html_col_type, link, image_src, content_type, title, summary, source, date, dateMonth, dateDay, action_text, icon_type);
                // Clear dummy text
                $('#feeds_formatter').text('');
            }
        });
        feed_setIndex()
    }

    // ------------------------------------------------
    // Format RSS data to (.card) html
    // ------------------------------------------------
    function feed_buildHtml(html_col_type, link, image_src, content_type, title, summary, source, date, dateMonth, dateDay, action_text, icon_type) {
        var html_card = '<div class="column '+html_col_type+' sort smalls_pad_n" data-date="'+date+'">' + // data-index="'+html_index+'"
                            '<a href="'+link+'" class="link_naked card_expand">' +
                                '<article class="card box_panel">' +
                                    '<header class="card_media" style="background-image: url(\''+image_src+'\');">' +
                                        '<label class="sub_heading card_label card_bottom color_white card_cover_dark">' +
                                            content_type +
                                        '</label>' +
                                    '</header>' +
                                    '<div class="card_body">' +
                                        '<h2 class="heading card_heading">' +
                                            title +
                                        '</h2>' +
                                        '<div class="txt_small color_txt">' +
                                            summary +
                                        '</div>' +
                                    '</div>' +
                                    '<footer class="card_foot card_cover txt_small">' +
                                        '<div class="card_info color_label">' +
                                            source +
                                            '<time class="float_right block clearfix txt_upper">' +
                                                dateMonth + ' ' + dateDay +
                                            '</time>' +
                                        '</div>' +
                                        '<div class="card_action">' +
                                            '<strong class="icon icon_after icon_absolute icon_absolute_right block" data-icon-after="'+icon_type+'">' +
                                                action_text +
                                            '</strong>' +
                                        '</div>' +
                                    '</footer>' +
                                '</article>' +
                            '</a>' +
                        '</div>';
        $('#feeds').append(html_card);
    }

    // ------------------------------------------------
    // Set data-index
    // ------------------------------------------------
    function feed_setIndex() {
        var feed = $('#feeds .sort'),
            feed_index;
        $.each((feed), function(i) {
            feed_index++;
            // Define the first three article's indexes manually
            if (i == 0) {
                feed_index = 1;
            } else if (i == 1) {
                feed_index = 2;
            } else if (i == 2) {
                feed_index = 4;
            } else {
                // if feed_index matched a featureWide index, skip it
                if ($.inArray(feed_index, featureWide_indexArray) !== -1) {
                    feed_index++;
                }
            }
            $(this).attr('data-index', feed_index);
        });

        setOutputPattern();
    }

    // ------------------------------------------------
    // Combine and sort featureWide & SearchBlox article
    // ------------------------------------------------
    function setOutputPattern() {
        var elements_before_move = $('#feeds_container .sort');
        elements_before_move.sort(sortDataIndex).appendTo(outputContainer);
        // Remove loading spinner
        outputContainer.removeClass('loading 100');
    }

    $(document).ready(function() {
        featureWide_setDate();
        // setOutputPattern();
    });

});
