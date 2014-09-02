require(['jquery', 'velocity'], function(a) {

    //Tab setup
    (function(a) { //Using a instead of jQuery's $ to prevent conflicts.
        a.tabbed = function(b) {
            var c = this;

            c.init = function() {
                var tabGroups = [],
                    z = a(".tab_button"),
                    total_tabs = z.length,
                    y, x, w,
                    addons = "";

                //Set the user-set speed options.
                c.options = a.extend({}, a.tabbed.defaultOptions, b);

                //Loop over all tab_buttons
                for (var i = 0; i < total_tabs; i++) {

                    //Select the current tab and it's next two siblings.
                    y = z[i],
                    x = a(y).next()[0],
                    w = a(x).next()[0];

                    //Add the tab_buttons and siblings to tabGroups array.
                    tabGroups.push(y, x);

                    //Loop over siblings until the next sibling is not a tab_button.
                    //This is necessary to check for nested tab groups (a.k.a. tabception).
                    do {
                        w = a(x).next()[0];
                        x = a(w).next()[0];

                        //Break loop if next sibling is not a tab_button.
                        if (a(w).hasClass("tab_button") !== true) {
                            break;
                        }

                        //Add tab_buttons and siblings to tabGroups array.
                        tabGroups.push(w, x);

                    } while (a(w).hasClass("tab_button") === true);

                    //Check if we've already added this tab to a grouping.
                    if (a(y).data("tabbed") !== true && a(y).attr('data-tabbed') != 'true') {

                        //Grab data-tab attributes (since they can be used as optional style alternatives)
                        if (a(y).attr("data-tab") !== undefined) {
                            addons = a(y).attr("data-tab");
                        }

                        //Add "tabbed" data to the group's items.
                        a(tabGroups).data("tabbed", true)

                        //Wrap the group in a section with the class 'tabbed'
                        //and add add-on classes if they exist.
                        .wrapAll("<section class = 'tabbed " + addons + "' />");
                    }

                    //Clear out the tabGroups array and addons
                    // and begin the loop again.
                    tabGroups.length = 0;
                    addons = "";

                }

                var tabbed = a('.tabbed');

                //Add a nav element to the top of the groups
                //only if they contain more than one tab_content child
                a(tabbed).each(function() {
                    if (a(this).children('.tab_content').length > 1 && a(this).attr('data-tabbed') != 'true') {
                        a(this).prepend("<nav class='tabs' />");
                    };
                });

                //Duplicate tab_buttons and put them inside nav.tabs
                a(".tab_button:not([data-tabbed='true'])").each(function() {
                    //Find the appropriate nav.tabs
                    var tabNav = a(this).closest(".tabbed").children(".tabs");

                    //Clone the tab_buttons and move them to nav.tabs
                    //Meanwhile add .tab and remove .tab_button classes for style purposes.
                    a(this).clone()
                        .appendTo(tabNav)
                        .addClass('tab')
                        .removeClass("tab_button");
                });

                //Make the first tab and tab_button in each grouping the active tab.
                a(".tabbed .tab_button:first-of-type, .tab:first-child").not(".toggle").not(".tab_link").addClass("active");

                //Hide all tab_content.
                a(".tab_content").hide();

                //Grab the hash/href value of each active tab.
                var d = "" + a(".tab.active, .tab_button.active").map(function() {
                    return a(this).attr("href");
                }).get();
                //Find cooresponding tab contents based on the
                // hash/href ID we just grabbed and make them active.
                a(d).each(function() {
                    a(this).show();
                });

                //Try to normalize heights of all tab groupings.
                //This is particularly important for groupings with tab_sides.
                a('.tab_content').not('#mega_nav .tab_content').each(function() {
                    var tabHeight = a(this).closest('.tabbed').find('.tabs:first').outerHeight();
                    var baseline = parseInt(a("body").css('line-height'), 10);

                    //Align to baseline grid.
                    tabHeight = Math.ceil(tabHeight / baseline) * baseline - 1;
                    a(this).css("min-height", tabHeight);
                });

                //HACK: Adding toggle classes to mega_menu buttons since we cannot
                //reliably do this on our own
                $('#mega_nav .tabbed .tab_button').addClass('toggle');
                $('#mega_nav .tabbed .tab_button').not('.tab_link').addClass('icon');
                $('#mega_nav').removeClass('invisible');


                //----------------------------------------------------------
                //        Actions for tab clicks
                //----------------------------------------------------------
                a(".tabs a.tab").click(function(e) {

                    if (!$(this).hasClass('tab_link')) {
                        e.preventDefault();

                        // Just making sure we don't animate already active tabs.
                        if (a(this).hasClass('active') === false) {

                            //Grab the target's ID through the clicked tab's href/hash value.
                            var $this = a(this);
                            d = a(this).attr("href");

                            //Unhide the correct tab content.
                            if (typeof a.velocity == 'object') {
                                if ($this.hasClass('toggle')) {
                                    //Hiding all target siblings tab_content.
                                    a(d).siblings(".tab_content:visible")
                                        .velocity({
                                            translateY: ["-10%", "easeOut", "0"],
                                            opacity: [0, "easeIn", 1]
                                        }, {
                                            display: "none"
                                        }, {
                                            duration: 120
                                        });
                                    a(d).velocity({
										rotateX: ["0", "easeOutExpo", "90deg"],
                                        translateY: ["0", [480, 22], "-30%"],
                                        opacity: [1, "easeIn", 0],
                                    }, {
                                        display: "block"
                                    }, {
                                        duration: c.options.speed
                                    });
                                } else {
                                    a(d).siblings(".tab_content:visible").hide();
                                    a(d).velocity({
                                        opacity: [1, "easeIn", 0]
                                    }, {
                                        display: "block"
                                    }, {
                                        duration: c.options.speed
                                    });
                                }
                            } else {
                                //Hiding all target siblings tab_content.
                                a(d).siblings(".tab_content").hide();
                                a(d).fadeIn(c.options.speed);
                            }
                            //Finding tab and tab_button siblings
                            //And then removing "active" class.
                            a("a[href='" + d + "']")
                                .siblings(".tab, .tab_button")
                                .addBack()
                                .removeClass("active");

                            //Adding back the "active" class
                            //to the appropriate buttons.
                            a(this).addClass("active");
                            a("a[href='" + d + "'].tab_button").addClass("active");

                            // Toggle-tabs (if active)
                        } else if (a(this).hasClass('toggle')) {
                            d = a(this).attr("href");

							if (typeof a.velocity == 'object') {
                                a(d).velocity({
                                    "margin-top": [0, 0],
									rotateX: ["90deg", "easeOutExpo", "0"],
                                    translateY: ["0", "easeOutExpo", "0"],
                                    opacity: [0, "easeOut", 1]
                                }, {
                                    display: "none"
                                }, {
                                    duration: 45
                                });
                            } else {
                                a(d).fadeOut(75);
                            }
                            a(this).removeClass('active');
                            a("a[href='" + d + "'].tab_button")
                                .removeClass('active');
                        }
                    }

                });

                //Actions for accordion tab_buttons.
                //Nearly identical to the previous function,
                //but with a slide effect.
                a(".tab_button").click(function(e) {
                    if (!$(this).hasClass('tab_link')) {
                        e.preventDefault();

                        if (a(this).hasClass('active') === false) {
                            d = a(this).attr("href");

                            if (typeof a.velocity !== 'object') {
                                a(d).siblings(".tab_content:visible")
                                    .addBack()
                                    .css("min-height", "0")
                                    .slideUp(c.options.speed);
                                a(d).slideToggle(c.options.speed);

                            } else {
                                a(d).siblings(".tab_content:visible")
                                    .velocity({
                                        height: 0,
                                        translateY: 0,
										rotateX: 0,
                                    }, {
                                        display: "none"
                                    }, {
                                        duration: 50
                                    }, {
                                        queue: false
                                    });
                                a(d).velocity({
									rotateX: 0,
                                    translateY: 0,
                                    opacity: 1
                                }, {
                                    duration: 0
                                });
                                a(d).velocity("slideDown", 200, {}, {
                                    display: "block"
                                }, {
                                    easing: "easeInBack"
                                }, {
                                    queue: false
                                });
                            }

                            a("a[href='" + d + "']")
                                .siblings(".tab, .tab_button")
                                .addBack()
                                .removeClass("active");
                            a(this).addClass("active");
                            a("a[href='" + d + "'].tab").addClass("active");

                        } else if (a(this).hasClass('toggle')) {

                            d = a(this).attr("href");

                            if (typeof a.velocity !== 'object') {
                                a(d).slideUp(c.options.speed);
                            } else {
                                a(d).velocity({
									rotateX: 0,
                                    translateY: 0,
                                    opacity: 1
                                }, {
                                    duration: 0
                                });
                                a(d).velocity("slideUp", 95, "easeOut");
                            }
                            a(this).removeClass('active');
                            a("a[href='" + d + "'].tab")
                                .removeClass('active');
                        }
                    }
                });
            };
            c.init();
        };
        //Default options along with a targeted creation of
        a.tabbed.defaultOptions = {
            speed: 300
        };
        a.fn.tabbed = function(b) {
            return this.each(function() {
                (new a.tabbed(b));
            });
        };

        // Init
        $("body").tabbed({
            "speed": 200
        });

    })(jQuery);

});