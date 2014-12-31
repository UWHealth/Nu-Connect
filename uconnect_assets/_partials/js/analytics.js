require([
    'jquery',
    'general_functions',
    'hover_intent'
], function($, gf) {

    (function($) {

    ///////////
    // To-Do
    ///////////
    //

    ///////////////////////////////////
    // Structure
    ///////////////////////////////////
    // Header
    // Sidebar
    // Main Content
    // Footer
    // ---
    // Section Specific
    // Components
    // Forms

        //////////////////////////////////////////////////////////////////////////
        // Header
        //////////////////////////////////////////////////////////////////////////
            // Utility bar
                // Nav
                $('#utilities a').click(function() {
                    ga('send', 'event', 'Header', 'Utility Nav', $(this).text());
                });
                // Main search
                    // Focus
                    $('#global_search').focus(function() {
                        ga('send', 'event', 'Header', 'Global Search', 'Input field focus');
                    });
                    // Search type: All / Directory / Forms / HFFY / Policies (btn group)
                    $('#search_options a').click(function() {
                        ga('send', 'event', 'Header', 'Global Search', 'TOTAL Filters');
                        ga('send', 'event', 'Header', 'Global Search', 'Filter: ' + $(this).text());
                    });
                    // Submission
                    $('.utility_search .search_button').click(function() {
                        ga('send', 'event', 'Header', 'Global Search', 'TOTAL Queries');
                        ga('send', 'event', 'Header', 'Global Search', 'Query: ' + $('#global_search').val());
                    });
                    // Close btn
                    $('#search_close').click(function() {
                        ga('send', 'event', 'Header', 'Global Search', 'Closed: "X" btn');
                    });
                    // Closed search shade w/out using close btn
                    $(document).on('click', 'body', function(e) {
                        if ($('#top_nav').hasClass('search_active')) {
                            if (gf.check_click($('#top_nav'), e) === false && gf.check_click($('#global_search'), e) === false) {
                                ga('send', 'event', 'Header', 'Global Search', 'Closed: Clicked outside search');
                            }
                        }
                    });
                // Login/logout
                $('#loginlink').click(function() {
                    ga('send', 'event', 'Header', 'Login', $(this).attr('href'));
                });
                $('#logoutlink').click(function() {
                    ga('send', 'event', 'Header', 'Logout', $(this).attr('href'));
                });
            // Logo
            $('#main_logo').click(function() {
                ga('send', 'event', 'Header', 'Logo', 'File: ' + $(this).find('img').attr('src'));
            });
            // Mega nav
                // Clicked off mega nav to close
                $(document).on('click', 'body', function(e) {
                    if ($('#mega_buttons .tab').hasClass('active')) {
                        if (gf.check_click($('#mega_nav'), e) === false && gf.check_click($('#mega_buttons'), e) === false && gf.check_click($('[data-toggle="#mega_nav"]'), e) === false) {
                            // Closed
                            if ($('#mega_nav').hasClass('active')) {
                                ga('send', 'event', 'Header', 'Mega Nav', 'Closed: Clicked outside Mega Nav');
                            }
                        }
                    // Opened
                    } else {
                        ga('send', 'event', 'Header', 'Mega Nav', 'Opened');
                    }
                });
                // Clicked same tab to close menu
                $('#mega_buttons .tab').click(function() {
                    if ($('#mega_nav').hasClass('active')) {
                        ga('send', 'event', 'Header', 'Mega Nav', 'Closed: Clicked on Mega Nav tab');
                    }
                });
                // Top (tab) sections
                $('#mega_buttons a').click(function() {
                    ga('send', 'event', 'Header', 'Mega Nav', 'Lvl 1, ' + $(this).text());
                });
                    // Sub sections
                    $('#mega_nav .tabbed .tabbed .tabs a').click(function() {
                        ga('send', 'event', 'Header', 'Mega Nav', 'Lvl 2, ' + $(this).text());
                    });
                        // Bordered list
                        $('#mega_nav .list_mega_nav').click(function() {
                            ga('send', 'event', 'Header', 'Mega Nav', 'Lvl 3, TOTAL Bordered List');
                            ga('send', 'event', 'Header', 'Mega Nav', 'Lvl 3, Bordered List: ' + $(this).text());
                        });
                        // Promo/feature buttons
                        $('#mega_nav .tabbed .tabbed .tab_content .promos a').click(function() {
                            ga('send', 'event', 'Header', 'Mega Nav', 'Lvl 3, TOTAL Promos');
                            ga('send', 'event', 'Header', 'Mega Nav', 'Lvl 3, Promo: ' + $(this).text());
                        });
                    // Quick Links
                    $('#mega_nav .quick_links a').click(function() {
                        ga('send', 'event', 'Header', 'Mega Nav', 'Lvl 2, TOTAL Quick Links');
                        ga('send', 'event', 'Header', 'Mega Nav', 'Lvl 2, Quick Link: ' + $(this).text());
                    });
                // Mobile Menu
                    // Open / Close
                    $('#utility a[href="#mega_nav"]').click(function() {
                        // Closed
                        if ($(this).hasClass('active')) {
                            ga('send', 'event', 'Header', 'Mega Nav Mobile', 'Closed: Mobile Menu btn');
                        // Opened
                        } else {
                            ga('send', 'event', 'Header', 'Mega Nav Mobile', 'Opened: Menu btn');
                        }
                    });
                    // Tabs
                    $('#mega_nav > .tabbed > .tab_button').click(function() {
                        if ($(this).hasClass('active')) {
                            ga('send', 'event', 'Header', 'Mega Nav Mobile', 'Closed: Mobile lvl 1');
                        // Opened
                        } else {
                            ga('send', 'event', 'Header', 'Mega Nav Mobile', 'Opened: Mobile lvl 1');
                        }
                    });
                    $('#mega_nav > .tabbed > .tabbed > .tab_button').click(function() {
                        if ($(this).hasClass('active')) {
                            ga('send', 'event', 'Header', 'Mega Nav Mobile', 'Closed: Mobile lvl 2');
                        // Opened
                        } else {
                            ga('send', 'event', 'Header', 'Mega Nav Mobile', 'Opened: Mobile lvl 2');
                        }
                    });
            // Overview
                // Breadcrumbs
                $('.img_header .breadcrumbs a').click(function() {
                    ga('send', 'event', 'Header', 'Breadcrumbs', $(this).text());
                });
                // Expando
                $('#reveal_header').click(function() {
                    // Up
                    if ($(this).hasClass('clicked')) {
                        ga('send', 'event', 'Header', 'Summary', 'Expand');
                    // Down
                    } else {
                        ga('send', 'event', 'Header', 'Summary', 'Close');
                    }
                });
                // Tags
                $('.img_header .tag_bar a').click(function() {
                    ga('send', 'event', 'Header', 'Tag Bar', 'TOTAL');
                    // When expando required
                    if ($('#reveal_header').hasClass('clicked')) {
                        ga('send', 'event', 'Header', 'Tag Bar', 'W/ summary expanded: ' + $(this).text());
                    // When always visible
                    } else {
                        ga('send', 'event', 'Header', 'Tag Bar', 'W/out summary expanded: ' + $(this).text());
                    }
                });

        //////////////////////////////////////////////////////////////////////////
        // Sidebar
        //////////////////////////////////////////////////////////////////////////
            // Section search (optional)
                // Focus
                $('#sidebar .search_box').focus(function() {
                    ga('send', 'event', 'Sidebar', 'Sub Section Search', 'TOTAL input focus');
                    ga('send', 'event', 'Sidebar', 'Sub Section Search', 'Input focus: ' + $(this).attr('placeholder'));
                });
                // Submission
                $('#sidebar .search_button').click(function() {
                    ga('send', 'event', 'Sidebar', 'Sub Section Search', 'TOTAL submissions');
                    ga('send', 'event', 'Sidebar', 'Sub Section Search', 'Submission: ' + $(this).attr('placeholder'));
                    ga('send', 'event', 'Sidebar', 'Sub Section Search', 'Query: ' + $('#sidebar .search_box').val() + '(from: ' + $(this).attr('placeholder') + ')');
                });
            // Side Nav
            $('#js_side_nav a').click(function() {
                // Total Link Clicks
                ga('send', 'event', 'Sidebar', 'Nav: TOTAL link clicks', $(this).text());
                // Total Secured Link Clicks
                if ($(this).hasClass('secured-link')) {
                    ga('send', 'event', 'Sidebar', 'Nav: TOTAL secured link clicks', $(this).text());
                }
                // Section Parent
                if ($(this).parent().hasClass('parent')) {
                    ga('send', 'event', 'Sidebar', 'Nav: section home', $(this).text());
                // Current Branch
                } else if ($(this).parent().hasClass('currentbranch0')) {
                    if ($(this).parent().parent().hasClass('accordion_split')) {
                        ga('send', 'event', 'Sidebar', 'Nav: current branch w/ accordion', $(this).text());
                    } else {
                        ga('send', 'event', 'Sidebar', 'Nav: current branch w/out accordion', $(this).text());
                    }
                } else {
                // Section Sibling
                    if ($(this).parent().parent().hasClass('accordion_target')) {
                        ga('send', 'event', 'Sidebar', 'Nav: Section Sibling w/in accordion', $(this).text());
                    } else {
                        ga('send', 'event', 'Sidebar', 'Nav: Section Sibling', $(this).text());
                    }
                }
            });
            // Accordions
            $('#js_side_nav .accordion_trigger').click(function() {
                // Closed
                if ($(this).hasClass('active')) {
                    ga('send', 'event', 'Sidebar', 'Nav: Accordion', 'Closed');
                // Opened
                } else {
                    ga('send', 'event', 'Sidebar', 'Nav: Accordion', 'Opened');
                }
            });
            // Related
            $('#related a').click(function() {
                ga('send', 'event', 'Sidebar', 'Related', $(this).text());
            });
            // Mobile Menu
            $('#sidebar .sidebar_button[data-toggle="#sidebar_content"]').click(function() {
                // Closed
                if ($(this).hasClass('active')) {
                    ga('send', 'event', 'Sidebar', 'Mobile Menu Btn', 'Closed');
                // Opened
                } else {
                    ga('send', 'event', 'Sidebar', 'Mobile Menu Btn', 'Opened');
                }
            });

        //////////////////////////////////////////////////////////////////////////
        // [TABs] Main Content Tabs
        //////////////////////////////////////////////////////////////////////////
            // Tab click
            $('main .tabbed a.tab').click(function() {
                ga('send', 'event', 'Main Content', '[TAB] Click', $(this).text());
            });

        //////////////////////////////////////////////////////////////////////////
        // [TAB] Focus
        //////////////////////////////////////////////////////////////////////////
            // Link clicked
            $('#focus a').click(function() {
                ga('send', 'event', 'Main Content', '[TAB] Focus', 'TOTAL Link Clicks');
                ga('send', 'event', 'Main Content', '[TAB] Focus', 'Link: ' + $(this).text());
            });

        //////////////////////////////////////////////////////////////////////////
        // FAQ
        //////////////////////////////////////////////////////////////////////////
        $('.faq_question').click(function() {
            // Closed
            if ($(this).hasClass('active')) {
                ga('send', 'event', 'Main Content', '[TAB] Faq', 'TOTAL Closed');
                ga('send', 'event', 'Main Content', '[TAB] Faq', 'Closed: ' + $(this).text());
            // Opened
            } else {
                ga('send', 'event', 'Main Content', '[TAB] Faq', 'TOTAL Opened');
                ga('send', 'event', 'Main Content', '[TAB] Faq', 'Opened: ' + $(this).text());
            }
        });
        $('.faq_answer a').click(function() {
            ga('send', 'event', 'Main Content', '[TAB] Faq', 'TOTAL Answer Links');
            ga('send', 'event', 'Main Content', '[TAB] Faq', 'Answer Link: ' + $(this).text());
        });

        //////////////////////////////////////////////////////////////////////////
        // [TAB] Directory
        //////////////////////////////////////////////////////////////////////////
        $('#directory a').click(function() {
            ga('send', 'event', 'Main Content', '[TAB] Directory', 'TOTAL Links Clicked');
            ga('send', 'event', 'Main Content', '[TAB] Directory', 'Link: ' + $(this).text());
            // "Associated"
            if ($(this).parent().prev('h2').text() === 'Associated') {
                ga('send', 'event', 'Main Content', '[TAB] Directory', 'TOTAL "Associated" links clicked');
            }
            // "Staff"
            if ($(this).parent().hasClass('searchResults-leftCol')) {
                ga('send', 'event', 'Main Content', '[TAB] Directory', 'TOTAL "Staff" links clicked');
            }
        });
        // "Contact Details"
        $('#directory #top a').click(function() {
            ga('send', 'event', 'Main Content', '[TAB] Directory', 'TOTAL "Contact Details" links clicked');
        });
        // "More Information"
        $('#directory .moreinfo-container a').click(function() {
            ga('send', 'event', 'Main Content', '[TAB] Directory', 'TOTAL "More Information" links clicked');
        });
        // Error loading
            // Click on "Let us know" email link
            $('#directory_error').click(function() {
                ga('send', 'event', 'Main Content', '[TAB] Directory', '(Error) Email U-Connect inbox');
            });

        //////////////////////////////////////////////////////////////////////////
        // [TAB] Resources
        //////////////////////////////////////////////////////////////////////////
            // Filter
                // DD open
                $('#resources .dd_trigger').click(function() {
                    ga('send', 'event', 'Main Content', '[TAB] Mixitup', 'Filter Dropdown opened');
                });
                // DD close
                $('#resources .dd_activetrigger').click(function() {
                    ga('send', 'event', 'Main Content', '[TAB] Mixitup', 'Filter Dropdown closed');
                });
                // DD option
                $('#resources .dd_visible li').click(function() {
                    ga('send', 'event', 'Main Content', '[TAB] Mixitup', 'TOTAL Filter Dropdown options');
                    ga('send', 'event', 'Main Content', '[TAB] Mixitup', 'Filter Dropdown option: ' + $(this).text());
                });
            // Sort
            $('#resources .sort').click(function() {
                ga('send', 'event', 'Main Content', '[TAB] Mixitup', 'TOTAL Sorts');
                ga('send', 'event', 'Main Content', '[TAB] Mixitup', 'Sort by: ' + $(this).text());
            });
            // Link
            $('#resources .element').click(function() {
                ga('send', 'event', 'Main Content', '[TAB] Mixitup', 'TOTAL Links clicked');
                ga('send', 'event', 'Main Content', '[TAB] Mixitup', 'Link: ' + $(this).text());
            });

        //////////////////////////////////////////////////////////////////////////
        // Promos
        //////////////////////////////////////////////////////////////////////////
            // Hover
            $('.promo .half_content').hover(function() {
                ga('send', 'event', 'Main Content', '[Promo]', 'TOTAL Hovers');
                ga('send', 'event', 'Main Content', '[Promo]', 'Hovered: ' + $(this).find('box_promo_head').text());
            });
            // Click
            $('.promo .half_content').click(function() {
                ga('send', 'event', 'Main Content', '[Promo]', 'TOTAL Clicks');
                ga('send', 'event', 'Main Content', '[Promo]', 'Clicked: ' + $(this).find('box_promo_head').text());
            });

        //////////////////////////////////////////////////////////////////////////
        // Box Card
        //////////////////////////////////////////////////////////////////////////
            // Exapandable
                // Hover (and then article expands and image is hidden)
                    // link click
                    $('.card_expand').click(function() {
                        ga('send', 'event', 'Compontents', 'Card', 'Expanded, TOTAL Cards clicked');
                        ga('send', 'event', 'Compontents', 'Card', 'Expanded, card clicked: ' + $(this).attr('href'));
                    });
                    // $('.card_expand').hoverIntent(
                    //     function() {
                    //         $(this).data('inTime', new Date().getTime());
                    //         console.log('hoverTime: '+hoverTime);
                    //     }, function() {
                    //         var outTime = new Date().getTime();
                    //         var hoverTime = ( outTime - $(this).data('inTime') ) / 1000;
                    //         console.log('hoverTime: '+hoverTime);
                    //         ga('send', 'event', 'Compontents', 'Card', 'Expanded, card hovered over for: ' + hoverTime +'s');
                    //     }
                    // );
            // Static (not exapandable)
                // Link click
                    $('.card .heading a').click(function() {
                        ga('send', 'event', 'Compontents', 'Card', 'Static, TOTAL Header link clicks');
                        ga('send', 'event', 'Compontents', 'Card', 'Static, Header link clicked: ' + $(this).text());
                    });
                // Keywords
                    // Expando
                    $('.card .card_tags_toggle').click(function() {
                        ga('send', 'event', 'Compontents', 'Card', 'Static, TOTAL Tag accordion clicks');
                        // open
                        if (! $(this).hasClass('active') ){
                            ga('send', 'event', 'Compontents', 'Card', 'Static, TOTAL Tag accordion click open');
                        } else {
                        // close
                            ga('send', 'event', 'Compontents', 'Card', 'Static, TOTAL Tag accordion click close');
                        }
                    });
                    // Keyword clicks
                    $('.card a.tag').click(function() {
                        ga('send', 'event', 'Compontents', 'Card', 'Static, TOTAL Tag clicks');
                        ga('send', 'event', 'Compontents', 'Card', 'Static, Tag clicked: ' + $(this).text());
                        if ( $(this).parent('.card_tags').hasClass('open') ) {
                            // Accordion opened
                            ga('send', 'event', 'Compontents', 'Card', 'Static, Tag clicks with accordion opened');
                        } else {
                            // Accordion closed
                            ga('send', 'event', 'Compontents', 'Card', 'Static, Tag clicks with accordion closed');
                        }
                    });

        //////////////////////////////////////////////////////////////////////////
        // Slick Slider
        //////////////////////////////////////////////////////////////////////////
            // Navigation
                // Circle btns
                $('.slick-dots button').click(function() {
                    ga('send', 'event', 'Compontents', 'Slick Slider', 'Nav, TOTAL Circles Clicked');
                    ga('send', 'event', 'Compontents', 'Slick Slider', 'Nav, Circle: ' + $(this).text());
                });
                // L/R square btns
                $('.slick-prev').click(function() {
                    ga('send', 'event', 'Compontents', 'Slick Slider', 'Nav, Previous');
                });
                $('.slick-next').click(function() {
                    ga('send', 'event', 'Compontents', 'Slick Slider', 'Nav, Next');
                });
            // Title
            $('.slide h1 a').click(function() {
                ga('send', 'event', 'Compontents', 'Slick Slider', 'TOTAL Title clicks');
                ga('send', 'event', 'Compontents', 'Slick Slider', 'Title clicked: ' + $(this).text());
            });
            // Img
            $('.slide .box_flag_media a').click(function() {
                ga('send', 'event', 'Compontents', 'Slick Slider', 'TOTAL Img clicks');
                ga('send', 'event', 'Compontents', 'Slick Slider', 'Img clicked: ' + $(this).attr('href'));
            });

        //////////////////////////////////////////////////////////////////////////
        // Mixitup
        //////////////////////////////////////////////////////////////////////////
            // Filter
                // DD open
                $('.controls .dd_trigger').click(function() {
                    ga('send', 'event', 'Compontents', 'Mixitup', 'Filter, TOTAL Dropdowns opened');
                });
                // DD close
                $('.controls .dd_activetrigger').click(function() {
                    ga('send', 'event', 'Compontents', 'Mixitup', 'Filter, Dropdown close');
                });
                $(document).on('click', 'body', function(e) {
                    if ($('.controls .dd').hasClass('dd_activetrigger')) {
                        if (gf.check_click($('.dd_activetrigger'), e) === false ) {
                            // Closed
                            ga('send', 'event', 'Compontents', 'Mixitup', 'Filter, Clicked Outside Dropdown to Close');
                        }
                    }
                });
                // DD option
                $('.controls .dd_visible li').click(function() {
                    ga('send', 'event', 'Compontents', 'Mixitup', 'Filter, TOTAL Dropdown options clicked');
                    ga('send', 'event', 'Compontents', 'Mixitup', 'Filter, Dropdown option: ' + $(this).text());
                });
            // Sort
            $('.controls .sort').click(function() {
                ga('send', 'event', 'Compontents', 'Mixitup', 'Sort, TOTAL Sorts');
                ga('send', 'event', 'Mixitup', 'Sort, Sort by: ' + $(this).text());
            });
            // Link
            $('.mix_initiated .element').click(function() {
                ga('send', 'event', 'Compontents', 'Mixitup', 'Mixed Results, TOTAL Links clicked');
                ga('send', 'event', 'Compontents', 'Mixitup', 'Mixed Results, Link: ' + $(this).text());
            });

        //////////////////////////////////////////////////////////////////////////
        // SEARCH
        //////////////////////////////////////////////////////////////////////////
            // Overview bar
                // remove filter
                    // single
                    $('#tag_bar .facetview_filterselected a').click(function() {
                        ga('send', 'event', 'Section Specific', 'Search Results', 'TOTAL Individual filters removed');
                        ga('send', 'event', 'Section Specific', 'Search Results', 'Filter removed: ' + $(this).text());
                    });
                    // all
                    $('.facetview_clear_all_filters').click(function() {
                        ga('send', 'event', 'Section Specific', 'Search Results', 'TOTAL "Remove Filters"');
                    });
            // Sidenav
                // Filter By
                $('#facetview_filters a').click(function() {
                    ga('send', 'event', 'Section Specific', 'Search Results', 'TOTAL Filters clicked');
                    ga('send', 'event', 'Section Specific', 'Search Results', 'Filter: ' + $(this).text());
                });
                    // Organization
                    $('#facetview_labels a').click(function() {
                        ga('send', 'event', 'Section Specific', 'Search Results', 'TOTAL "Organization" Filters clicked');
                    });
                    // Type
                    $('#facetview_typeofcontent a').click(function() {
                        ga('send', 'event', 'Section Specific', 'Search Results', 'TOTAL "Type" Filters clicked');
                    });
                    // Category
                    $('#facetview_pageCategories a').click(function() {
                        ga('send', 'event', 'Section Specific', 'Search Results', 'TOTAL "Category" Filters clicked');
                    });
                    // Tag
                    $('#facetview_keywords a').click(function() {
                        ga('send', 'event', 'Section Specific', 'Search Results', 'TOTAL "Tag" Filters clicked');
                    });
            // Featured/Sponsored Result
                    // Circle btns
                    $('.facet_view .slick-dots button').click(function() {
                        ga('send', 'event', 'Section Specific', 'Search Results', 'Featured Result Slider, Nav, TOTAL Circles Clicked');
                        ga('send', 'event', 'Section Specific', 'Search Results', 'Featured Result Slider, Nav, Circle: ' + $(this).text());
                    });
                    // L/R square btns
                    $('.facet_view .slick-prev').click(function() {
                        ga('send', 'event', 'Section Specific', 'Search Results', 'Featured Result Slider, Nav, Previous');
                    });
                    $('.facet_view .slick-next').click(function() {
                        ga('send', 'event', 'Section Specific', 'Search Results', 'Featured Result Slider, Nav, Next');
                    });
                // Title
                $('.facet_view h1 a').click(function() {
                    ga('send', 'event', 'Section Specific', 'Search Results', 'Featured Result Slider, TOTAL Title clicks');
                    ga('send', 'event', 'Section Specific', 'Search Results', 'Featured Result Slider, Title clicked: ' + $(this).text());
                });
                // Img
                $('.facet_view .box_flag_media a').click(function() {
                    ga('send', 'event', 'Section Specific', 'Search Results', 'Featured Result Slider, TOTAL Img clicks');
                    ga('send', 'event', 'Section Specific', 'Search Results', 'Featured Result Slider, Img clicked: ' + $(this).attr('href'));
                });
            // Search results
                // Breadcrumbs
                $('.srch_breadcrumbs a').click(function() {
                    ga('send', 'event', 'Section Specific', 'Search Results', 'TOTAL Breadcrumbs clicked');
                    ga('send', 'event', 'Section Specific', 'Search Results', 'Breadcrumb: ' + $(this).text());
                });
                // Interior links
                $('#facetview_results .link_naked').click(function() {
                    if ( $(this).parent('.srch_heading') ) {
                        // Title
                        ga('send', 'event', 'Section Specific', 'Search Results', 'TOTAL Titles clicked');
                        ga('send', 'event', 'Section Specific', 'Search Results', 'Title: ' + $(this).text());
                    } else if ( $(this).hasClass('.tag') ) {
                        // Tag
                        ga('send', 'event', 'Section Specific', 'Search Results', 'TOTAL Tags clicked');
                        ga('send', 'event', 'Section Specific', 'Search Results', 'Tag: ' + $(this).text());
                    } else if ( $(this).parent('h2.txt_label') ) {
                        // Directory job title
                        ga('send', 'event', 'Section Specific', 'Search Results', 'TOTAL Directory job titles clicked');
                        ga('send', 'event', 'Section Specific', 'Search Results', 'Directory job title: ' + $(this).text());
                    } else if ( $(this).parent('dd.list_item') ) {
                        // Directory phone/email
                        ga('send', 'event', 'Section Specific', 'Search Results', 'TOTAL Directory phone/email clicked');
                        ga('send', 'event', 'Section Specific', 'Search Results', 'Directory phone/email: ' + $(this).text());
                    }
                });
            // Pagination
            $('.facetview_go_to_page').click(function() {
                ga('send', 'event', 'Section Specific', 'Search Results', 'TOTAL Pagination clicks');
                ga('send', 'event', 'Section Specific', 'Search Results', 'Pagination: ' + $(this).text());
            });

        //////////////////////////////////////////////////////////////////////////
        // HFFY
        //////////////////////////////////////////////////////////////////////////
            // HFFY Shopping Cart
                // HFFY name/id link
                $('#hffy_cart_js .icon_hffy').click(function() {
                    ga('send', 'event', 'Sidebar', 'HFFY Cart', 'HFFY Title Link');
                });
                // Remove HFFY
                $('#hffy_cart_js .icon_delete').click(function() {
                    ga('send', 'event', 'Sidebar', 'HFFY Cart', 'Remove HFFY');
                });
                // Place order
                $('#hffy_cart_js button[type="submit"]').click(function() {
                    ga('send', 'event', 'Sidebar', 'HFFY Cart', 'Place Order');
                });
                // Mobile Menu Btn
                $('#sidebar .sidebar_button[data-toggle="#hffy_cart_js"]').click(function() {
                    // Closed
                    if ($(this).hasClass('active')) {
                        ga('send', 'event', 'Sidebar', 'Mobile Menu Btn', 'Closed');
                    // Opened
                    } else {
                        ga('send', 'event', 'Sidebar', 'Mobile Menu Btn', 'Opened');
                    }
                });
            // "Add to Cart"
            // #hffy_spanish #hffy_addToCart
            // #hffy_english #hffy_addToCart
            $('#hffy_addToCart').click(function() {
                ga('send', 'event', 'Section Specific', 'HFFY', 'TOTAL "Add to Cart" clicks');
                if ($(this).parent('.tab_content').attr('id', 'hffy_spanish')) {
                    ga('send', 'event', 'Section Specific', 'HFFY', 'Spanish "Add to Cart" click');
                } else {
                    ga('send', 'event', 'Section Specific', 'HFFY', 'English "Add to Cart" click');
                }
                // Section
                ga('send', 'event', 'Section Specific', 'HFFY', 'Added to Cart (section): ' + $('#js_img_header .breadcrumbs li:nth-last-child(2) a').text());
                // Document
                ga('send', 'event', 'Section Specific', 'HFFY', 'Added to Cart (name): ' + $(this).parent().find('input[name="name"]').val());
                ga('send', 'event', 'Section Specific', 'HFFY', 'Added to Cart (id): ' + $(this).parent().find('input[name="itemId"]').val());
            });
            // Alternate version click
            $('#js_alt_version').click(function() {
                ga('send', 'event', 'Section Specific', 'HFFY', 'TOTAL Alternate version clicks');
                ga('send', 'event', 'Section Specific', 'HFFY', 'Alternate version: ' + $(this).text());
            });
            // Download
            $('#hffy_download').click(function() {
                ga('send', 'event', 'Section Specific', 'HFFY', 'TOTAL Download clicks');
                ga('send', 'event', 'Section Specific', 'HFFY', 'Downloaded: ' + $(this).attr('href'));
                if ($(this).parent('.tab_content').attr('id', 'hffy_spanish')) {
                    ga('send', 'event', 'Section Specific', 'HFFY', 'TOTAL Spanish Download clicks');
                    ga('send', 'event', 'Section Specific', 'HFFY', 'Spanish Download: ' + $(this).attr('href'));
                } else {
                    ga('send', 'event', 'Section Specific', 'HFFY', 'TOTAL English Download clicks');
                    ga('send', 'event', 'Section Specific', 'HFFY', 'English Download: ' + $(this).attr('href'));
                }
            });
            // Fullscreen
            $('#hffy_fullscreen').click(function() {
                ga('send', 'event', 'Section Specific', 'HFFY', 'TOTAL Fullscreen clicks');
                ga('send', 'event', 'Section Specific', 'HFFY', 'Fullscreen: ' + $(this).attr('href'));
                if ($(this).parent('.tab_content').attr('id', 'hffy_spanish')) {
                    ga('send', 'event', 'Section Specific', 'HFFY', 'Spanish Fullscreen clicks');
                    ga('send', 'event', 'Section Specific', 'HFFY', 'Spanish Fullscreen: ' + $(this).attr('href'));
                } else {
                    ga('send', 'event', 'Section Specific', 'HFFY', 'English Fullscreen clicks');
                    ga('send', 'event', 'Section Specific', 'HFFY', 'English Fullscreen: ' + $(this).attr('href'));
                }
            });

        //////////////////////////////////////////////////////////////////////////
        // Child Widget / Accordion Trees
        //////////////////////////////////////////////////////////////////////////
            // Header
                // Branch Title
                $('.accordion_tree > .accordion_tree_head').click(function() {
                    ga('send', 'event', 'Compontents', 'Child Widget / Accordion Tree', 'TOTAL Branch title clicks');
                    ga('send', 'event', 'Compontents', 'Child Widget / Accordion Tree', 'Branch Title: ' + $(this).text());
                });
                // Branch Title Toggle
                $('.accordion_tree > .accordion_trigger').click(function() {
                    // Opened
                    if ($(this).hasClass('active')) {
                        ga('send', 'event', 'Compontents', 'Child Widget / Accordion Tree', 'Opened: Branch accordion');
                    // Closed
                    } else {
                        ga('send', 'event', 'Compontents', 'Child Widget / Accordion Tree', 'Closed: Branch accordion');
                    }
                });
                // Section Title
                $('.accordion_tree .accordion .sub_heading').click(function() {
                    ga('send', 'event', 'Compontents', 'Child Widget / Accordion Tree', 'TOTAL Section title clicks');
                    ga('send', 'event', 'Compontents', 'Child Widget / Accordion Tree', 'Section title: ' + $(this).text());
                });
                // Section Title Toggle
                $('.accordion_tree .accordion .accordion_trigger').click(function() {
                    // Opened
                    if ($(this).parent().hasClass('js_accordion_open')) {
                        ga('send', 'event', 'Compontents', 'Child Widget / Accordion Tree', 'Opened: Section accordion');
                    // Closed
                    } else {
                        ga('send', 'event', 'Compontents', 'Child Widget / Accordion Tree', 'Closed: Section accordion');
                    }
                });
                // Sub Section
                $('.accordion_tree .accordion .accordion_target a').click(function() {
                    ga('send', 'event', 'Compontents', 'Child Widget / Accordion Tree', 'TOTAL Sub-Section title clicks');
                    ga('send', 'event', 'Compontents', 'Child Widget / Accordion Tree', 'Sub-Section title: ' + $(this).text());
                });

        //////////////////////////////////////////////////////////////////////////
        // Footer
        //////////////////////////////////////////////////////////////////////////
            // Report out of date content
            $('#reportOutOfDate').click(function() {
                ga('send', 'event', 'Footer', 'Last Updated Bar', '"Report out of date content"');
            });
            // Breadcrumbs row
                // Logo
                $('.footer_breadcrumbs .logo a').click(function() {
                    ga('send', 'event', 'Footer', 'Breadcrumb Bar', 'Logo');
                });
                // Crumb
                $('.footer_breadcrumbs .breadcrumbs a').click(function() {
                    ga('send', 'event', 'Footer', 'Breadcrumb Bar', 'TOTAL Breadcrumbs');
                    ga('send', 'event', 'Footer', 'Breadcrumb Bar', 'Breadcrumb: ' + $(this).text());
                });
            // Updates row
                // U-Connect search
                    // Focus
                    $('#footer_sub_search').focus(function() {
                        ga('send', 'event', 'Footer', 'U-Connect Updates Bar', 'Search input focus');
                    });
                    // Submission
                    $('#sidebar_footer_content .search_button').click(function() {
                        ga('send', 'event', 'Footer', 'U-Connect Updates Bar', 'Search submission');
                        ga('send', 'event', 'Footer', 'U-Connect Updates Bar', 'Search query: ' + $('#footer_sub_search').val());
                    });
                // U-Connect nav (help/tips, update/event)
                $('#sidebar_footer_content .list_bordered a').click(function() {
                    ga('send', 'event', 'Footer', 'U-Connect Updates Bar', 'TOTAL Nav clicks');
                    ga('send', 'event', 'Footer', 'U-Connect Updates Bar', 'Nav: ' + $(this).text());
                });
                // Mobile Menu
                $('#sidebar_footer .sidebar_button').click(function() {
                    // Closed
                    if ($(this).hasClass('active')) {
                        ga('send', 'event', 'Footer', 'Sidebar', 'Mobile menu closed');
                    // Opened
                    } else {
                        ga('send', 'event', 'Footer', 'Sidebar', 'Mobile menu opened');
                    }
                });
                // Recent U-Connect Updates
                    // Title
                    $('#uconnect_updates_row .card_heading a').click(function() {
                        ga('send', 'event', 'Footer', 'U-Connect Updates Bar', 'TOTAL Article title clicks');
                        ga('send', 'event', 'Footer', 'U-Connect Updates Bar', 'Article title: ' + $(this).text());
                    });
                    // Tag
                    $('#uconnect_updates_row .tag').click(function() {
                        ga('send', 'event', 'Footer', 'U-Connect Updates Bar', 'TOTAL Tag clicks');
                        ga('send', 'event', 'Footer', 'U-Connect Updates Bar', 'Tag: ' + $(this).text());
                        if ($(this).parent().parent().hasClass('open')) {
                            ga('send', 'event', 'Footer', 'U-Connect Updates Bar', 'TOTAL Tag clicks w/ accordion opened');
                        }
                    });
                    // Accordion
                    $('#uconnect_updates_row .card_tags_toggle').click(function() {
                        // Closed
                        if ($(this).hasClass('active')) {
                            ga('send', 'event', 'Footer', 'U-Connect Updates Bar', 'Tag accordion closed');
                        // Opened
                        } else {
                            ga('send', 'event', 'Footer', 'U-Connect Updates Bar', 'Tag accordion closed');
                        }
                    });
            // Utility row
                // UW Health logo
                $('.footer_utility_nav .logo_uwhealth').parent().click(function() {
                    ga('send', 'event', 'Footer', 'U-Connect Utility Bar', 'UW Health logo');
                });
                // Nav items
                $('.footer_utility_nav a').click(function() {
                    ga('send', 'event', 'Footer', 'U-Connect Utility Bar', 'TOTAL Utility links clicked');
                    ga('send', 'event', 'Footer', 'U-Connect Utility Bar', 'Utility link: ' + $(this).text());
                });

        //////////////////////////////////////////////////////////////////////////
        // Wistia Video
        //////////////////////////////////////////////////////////////////////////
        $('.wistia_embed').click(function() {
            ga('send', 'event', 'Compontents', 'Video', 'Wistia iFrame click');
        });

        //////////////////////////////////////////////////////////////////////////
        // WebEngage Feedback
        //////////////////////////////////////////////////////////////////////////
        // Open
        $('#webklipper-publisher-widget-container-content-expand-collapse').click(function() {
            ga('send', 'event', 'Compontents', 'Feedback', 'WebEngage form opened');
        });
        // Close
        $('#webklipper-publisher-widget-container-close-div').click(function() {
            ga('send', 'event', 'Compontents', 'Feedback', 'WebEngage form closed');
        });

        //////////////////////////////////////////////////////////////////////////
        // Magnific Analytics Events
        //////////////////////////////////////////////////////////////////////////
        $('.mfp-close').click(function() {
            ga('send', 'event', 'Compontents', 'Magnific', 'Close: Lightbox');
        });
        $('.mfp-arrow-left').click(function() {
            ga('send', 'event', 'Compontents', 'Magnific', 'Gallery, Left arrow');
        });
        $('.mfp-arrow-right').click(function() {
            ga('send', 'event', 'Compontents', 'Magnific', 'Gallery, Right arrow');
        });
        $('.mfp-img').click(function() {
            ga('send', 'event', 'Compontents', 'Magnific', 'Gallery, Image click');
        });
        $('.mfp-title').find('a').click(function() {
            ga('send', 'event', 'Compontents', 'Magnific', 'Gallery, Title link: ' + $(this).text());
        });
        $('.popup-modal-dismiss').click(function() {
            ga('send', 'event', 'Compontents', 'Magnific', 'Close: Modal');
        });
        $('.mfp-preloader').find('a').click(function() {
            ga('send', 'event', 'Compontents', 'Magnific', 'Error: Could not be loaded - ' + $(this).attr('href'));
        });

        //////////////////////////////////////////////////////////////////////////
        // CAS
        //////////////////////////////////////////////////////////////////////////
        // var iframe_url = $("#cas").get(0).contentWindow;
        // iframe_url.find('.btn-submit').click(function() {
        //     ga('send', 'event', 'Compontents', 'Magnific', 'CAS, TOTAL Login Btn Clicks');
        //     // Login after unsuccessful attempt
        //     if (iframe_url.find('.container__page_title h2').text() !== 'Login') {
        //         ga('send', 'event', 'Compontents', 'Magnific', 'CAS, TOTAL Login Btn Clicks After Previous Unsuccessful Attempt');
        //     }
        // });
        // iframe_url.find('#company-name').click(function() {
        //     ga('send', 'event', 'Compontents', 'Magnific', 'CAS, Logo');
        // });
        // iframe_url.find('#content a').click(function() {
        //     ga('send', 'event', 'Compontents', 'Magnific', 'CAS, ' + $(this).attr('title'));
        // });

        //////////////////////////////////////////////////////////////////////////
        // Button Group
        //////////////////////////////////////////////////////////////////////////
        $('.button_group a').click(function() {
            ga('send', 'event', 'Compontents', 'Button Group', 'TOTAL clicks');
            ga('send', 'event', 'Compontents', 'Button Group', $(this).text());
        });

        //////////////////////////////////////////////////////////////////////////
        // Forms
        //////////////////////////////////////////////////////////////////////////
        // Form submitted
        $('input[type="submit"]').click(function() {
            var error_input = $(this).parent('form').find('input.error');
            // Submitted w/ error(s)
            if (error_input.index() >= 0) {
                ga('send', 'event', 'Forms', 'Submit', 'TOTAL Errors');
                ga('send', 'event', 'Forms', 'Submit', 'Error, form action: ' + $(this).parent('form').attr('action'));
                ga('send', 'event', 'Forms', 'Submit', 'Error, form ID: ' + $(this).parent('form').attr('id'));
                ga('send', 'event', 'Forms', 'Submit', 'Error, form name: ' + $(this).parent('form').attr('name'));
                error_input.each(function() {
                    var error_input_name = $(this).attr('name');
                    ga('send', 'event', 'Forms', 'Submit', 'Error input: ' + error_input_name + ', message: ' + $('label[for="' + error_input_name + '"]').text());
                });
            // Submitted w/out error(s)
            } else {
                ga('send', 'event', 'Forms', 'Submit', 'TOTAL Successful submissions');
                ga('send', 'event', 'Forms', 'Submit', 'Success, form action: ' + $(this).parent('form').attr('action'));
                ga('send', 'event', 'Forms', 'Submit', 'Success, form ID: ' + $(this).parent('form').attr('id'));
                ga('send', 'event', 'Forms', 'Submit', 'Success, form name: ' + $(this).parent('form').attr('name'));
            }
        });
        // Input focus
        $('input').focus(function() {
            var error_input_name = $(this).attr('name');
            // Required field
            if ($(this).attr('required') || $(this).attr('data-rule-required', 'true')) {
                if ($(this).hasClass('error') || $(this).attr('aria-invalid', 'true')) {
                    ga('send', 'event', 'Forms', 'Input', 'TOTAL Required focuses w/ error showing');
                    ga('send', 'event', 'Forms', 'Input', 'Required focus w/ error: ' + error_input_name + ', message: ' + $('label[for="' + error_input_name + '"]').text());
                } else {
                    ga('send', 'event', 'Forms', 'Input', 'TOTAL Required focuses w/out error showing');
                }
            } else {
                ga('send', 'event', 'Forms', 'Input', 'TOTAL Non-required focuses');
            }
            ga('send', 'event', 'Forms', 'Input', 'TOTAL Focuses');
        });
        // Textarea focus
        $('textarea').focus(function() {
            var error_input_name = $(this).attr('name');
            // Required field
            if ($(this).attr('required') || $(this).attr('data-rule-required', 'true')) {
                if ($(this).hasClass('error') || $(this).attr('aria-invalid', 'true')) {
                    ga('send', 'event', 'Forms', 'Textarea', 'TOTAL Required focuses w/ error showing');
                    ga('send', 'event', 'Forms', 'Textarea', 'Required focus w/ error: ' + $(this).closest('.validation_msg').find('.validation_body label').text());
                    ga('send', 'event', 'Forms', 'Textarea', 'Required focus w/ error: ' + error_input_name + ', message: ' + $('label[for="' + error_input_name + '"]').text());
                } else {
                    ga('send', 'event', 'Forms', 'Textarea', 'TOTAL Required focuses w/out error showing');
                }
            } else {
                ga('send', 'event', 'Forms', 'Textarea', 'TOTAL Non-required focuses');
            }
            ga('send', 'event', 'Forms', 'Textarea', 'TOTAL Focuses');
        });
        // DD open
        $('.dd_trigger').click(function() {
            ga('send', 'event', 'Forms', 'Dropdown', 'Dropdown opened');
        });
        // DD close
        $('.dd_activetrigger').click(function() {
            ga('send', 'event', 'Forms', 'Dropdown', 'Dropdown closed: clicked on active element');
        });
        // DD option
        $('.dd_wrapper li').click(function() {
            ga('send', 'event', 'Forms', 'Dropdown', 'TOTAL Dropdown options clicked');
            ga('send', 'event', 'Forms', 'Dropdown', 'Dropdown option clicked: ' + $(this).text());
        });
        // Clicked on document to close DD
        $(document).on('click', 'body', function(e) {
            if ($('.dd').hasClass('dd_activetrigger')) {
                if (gf.check_click($('.dd_activetrigger'), e) === false ) {
                    // Closed
                    ga('send', 'event', 'Forms', 'Dropdown', 'Dropdown closed: clicked outside dropdown');
                }
            }
        });

        //////////////////////////////////////////////////////////////////////////
        // Downloads && External Links
        //////////////////////////////////////////////////////////////////////////
        $("a[href]").each(function() {
            var href = $(this).attr("href").replace(/http(s*?):\/\//,""),
                navurl = window.location.pathname,
                title = $(this).text(),
                type = 'Internal Links';
            // If no GA Universal pageTracker, stop here
            if( ga !== undefined ) {
                // Check if link is not relative, and isn't within our domain
                if( (href.match(/^\//) === null ) &&
                   (! href.match(/uconnect.wisc.edu/) ) &&
                   (! href.match(/^#/) )
                ) {
                    type = 'External Links';
                // Check if link is a file to be downloaded
                } else if ( href.match(/(\.file|\.pdf|\.doc|\.xls|\.docx|\.txt|\.rtf|\.xls|\.xlsx|\.xlsm|\.xlsb|\.zip)/) !== null ) {
                    type = 'User Downloads';
                } else if ( href.match(/mailto/) !== null ) {
                    type = 'Internal Mailto Links';
                }
                // If something is found to track, bind the click event
                if( type !== undefined ) {
                    $(this).bind("click",function(e) {
                        ga('send', 'event', type, 'Linked TO:' + href, 'TITLE: ' + title + ', Linked FROM: ' + navurl);
                    });
                }
            }
        });

    })(jQuery);
});