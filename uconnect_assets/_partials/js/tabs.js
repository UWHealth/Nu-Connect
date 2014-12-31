var dependencies = [
        'jquery',
        'velocity'
    ];

require([
        'jquery',
        'velocity',
        'general_functions'
    ], function(a, velocity, gf) {

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
                    if (a(y).data("tabbed") !== true && a(y).attr('data-tabbed') != 'true' && a(y).parent().attr('data-tabbed') != 'true') {

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

                var $tabbed = a('.tabbed');

                //Add a nav element to the top of the groups
                //only if they contain more than one tab_content child
                $tabbed.not('[data-tabbed="true"]').each(function() {
                    if (a(this).children('.tab_content').length > 1 && a(this).attr('data-tabbed') !== 'true') {
                        a(this).prepend("<nav class='tabs' />");
                    }
                });

                //Duplicate tab_buttons and put them inside nav.tabs
                a(".tab_button:not([data-tabbed='true'])").each(function() {
                    //Find the appropriate nav.tabs
                    var $this = a(this),
                        tab_parent = $this.closest(".tabbed"),
                        tabNav = tab_parent.children(".tabs");

                    if(tab_parent.attr('data-tabbed')!=='true'){

                        //Clone the tab_buttons and move them to nav.tabs
                        //Meanwhile add .tab and remove .tab_button classes for style purposes.
                        $this.clone()
                            .appendTo(tabNav)
                            .addClass('tab')
                            .removeClass("tab_button");
                    }
                });

                //Make the first tab and tab_button in each grouping the active tab.
                $tabbed.not('.active_tabs').find(".tab_button:first-of-type, .tab:first-child").not(".toggle").not(".tab_link").addClass("active");

                //Hide all tab_content.
                a(".tab_content").hide();

                //Grab the hash/href value of each active tab.
                var d = "" + a(".tab.active, .tab_button.active").map(function() {
                    return a(this).attr("href");
                }).get();
                //Find cooresponding tab contents based on the
                // hash/href ID we just grabbed and make them active.
                a(d).each(function() {
                    a(this).show().addClass('tab_content_active');
                });

                //Try to normalize heights of all tab groupings.
                //This is particularly important for groupings with tab_sides.
                // a('.tab_content').not('#mega_nav .tab_content').each(function() {
                //     var tabHeight = a(this).closest('.tabbed').find('.tabs:first').outerHeight();
                //     var baseline = parseInt(a("body").css('line-height'), 10);
                //
                //     //Align to baseline grid.
                //     tabHeight = Math.ceil(tabHeight / baseline) * baseline - 1;
                //     // a(this).css("min-height", tabHeight);
                // });

                //HACK: Adding toggle classes to mega_menu buttons since we cannot
                //reliably do this on our own
                $('#mega_nav .tabbed .tab_button').addClass('toggle');
                $('#mega_nav .tabbed .tab_button').not('.tab_link').addClass('icon');
                $('#mega_nav').removeClass('invisible');
				$('#mega_nav .tabbed').show();


                //Make all tab groups fixed (by adding data-tabbed="true").
                $tabbed.attr('data-tabbed','true')
                    .data('tabbed', true).addClass('active_tabs');

                // $('#body_content .tabbed, main .tabbed').each(function(){
                //     var $this = $(this),
                //         child_count = $this.find('.tabs').children().length;
                //     if(child_count <= 1){
                //         $this.find('.tab_content')
                //             .removeClass('tab_content')
                //             .addClass('tab_single');
                //         $this.find('.tabs').remove();
                //     };
                // });
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
