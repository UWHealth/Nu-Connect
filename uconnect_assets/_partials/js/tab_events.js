require(['jquery', 'general_functions'], function(a, gf){
    //----------------------------------------------------------
    //        Actions for tab clicks
    //----------------------------------------------------------
    //Adds/removes loaded class
    // which adds a drop shadow (prevents animation jank)
    function toggle_loaded(el, remove){
        if (remove === true){
            a(el).removeClass('loaded');
        }else{
            a(el).addClass('loaded');
        }
    };

    a("body").on('click', ".tabs a.tab", function(e) {

        if (!a(this).hasClass('tab_link')) {
            e.preventDefault();

            var $this = a(this);
            var d = $this.attr("href");
            var $tab_content = a(d);
            var active_tab = 'tab_content_active';
            // Just making sure we don't animate already active tabs.
            if ($this.hasClass('active') === false) {

                //TOGGLE BEHAVIOR
                if ($this.hasClass('toggle')) {

                    //Hiding Sibling tab_content
                    //By sliding up and fading out

                    $tab_content.siblings(".tab_content:visible")
                        .velocity({
                            translateY: ["-1%", "easeOutQuad", "0"],
                            opacity: [0, "easeOut", 1],
                            scaleY: [0, "easeOut", 1]
                        }, {
                            display: "none",
                            begin: function(element){
                                toggle_loaded(element, true);
                            },
                            duration: 250
                        });

                    //Make target slide out (with a bounce) and fade in
                    $tab_content
                        .velocity({
                            scaleY: [1, [320, 21], 0],
                            translateY: ["0", [200, 15], "-2%"],
                        }, {
                            duration: 400,
                            queue: false,
                            display: "block",
                            complete: function(element){
                                toggle_loaded(element);
                            }
                        }).velocity(
                            {opacity: [1, "easeInSine", 0]},
                            {duration: 200}
                        );

                //NON-TOGGLE, just do fade fade
                } else {
                    //Hide target's sibilings
                    $tab_content.siblings(".tab_content:visible")
                        .hide()

                    $tab_content.velocity({
                        opacity: [1, "easeOutSine", 0]
                    }, {
                        display: "block",
                        duration: 250
                    })
                }

                //Remove "tab_content_active" class
                // Add it to targeted tab_content.
                $tab_content.siblings('.tab_content').removeClass(active_tab);
                $tab_content.addClass(active_tab);

                //Finding tab and tab_button siblings
                //And then removing "active" class.
                a("a[href='" + d + "']")
                    .siblings(".tab, .tab_button")
                    .addBack()
                    .removeClass("active");

                //Adding back the "active" class
                //to the appropriate buttons.
                $this.addClass("active");
                a("a[href='" + d + "'].tab_button").addClass("active");

            // ACTIVE Toggle-tabs
            } else if ( $this.hasClass('toggle') ) {

                //Shrink target
                $tab_content.velocity({
                    //Margin required to fix weirdness when
                    //browser window resizes
                    "margin-top": [0, 0],
                    //Give it a little bounce
                    scaleY: [0, [.41, -0.5, 0, 1.14], 1],
                    translateY: [0, "ease", 0],
                },{
                    display: "none",
                    duration: 360,
                    queue: false,
                    begin: function(element){
                        toggle_loaded(element);
                    }
                }).velocity(
                    {opacity: [ 0, "easeOutQuad", 1]},
                    {duration: 300
                })

                $tab_content.removeClass(active_tab);

                $this.removeClass('active');
                a("a[href='" + d + "'].tab_button")
                    .removeClass('active');
            }
        }

    });

    //Actions for accordion tab_buttons.
    //Nearly identical to the previous function,
    //but with a slide effect.
    a("body").on('click', ".tab_button", function(e) {

        var $this = a(this);
        var d = $this.attr("href");
        var $tab_content = a(d);
        var active_tab = 'tab_content_active';

        if (!$(this).hasClass('tab_link')) {
            e.preventDefault();

            if ($this.hasClass('active') === false) {
                d = $this.attr("href");

                $tab_content.siblings(".tab_content:visible")
                    .velocity({
                        translateY: 0,
                        scaleY: 1
                    },{
                        duration: 0
                    }, {
                        queue: false
                    }).velocity("slideUp",
                        {duration: 200},
                        {display: "none"}
                    );

                //Reset values
                $tab_content
                    .velocity({
                        scaleY: 1,
                        translateY: 0,
                        opacity: 1
                    }, { duration: 0 });

                $tab_content
                    .velocity("slideDown", 200, {
                        display: "block"
                    }, {
                        easing: gf.ease_in_back
                    }, {
                        queue: false
                    });

                //Remove "tab_content_active" class
                // Add it to targeted tab_content.
                $tab_content.siblings('.tab_content').removeClass(active_tab);
                $tab_content.addClass(active_tab);

                a("a[href='" + d + "']")
                    .siblings(".tab, .tab_button")
                    .addBack()
                    .removeClass("active");
                $this.addClass("active");
                a("a[href='" + d + "'].tab").addClass("active");

            } else if ($this.hasClass('toggle')) {

                $tab_content.velocity({
                    scaleY: 1, translateY: 0, opacity: 1
                }, {
                    duration: 0
                },{
                    display: "block"
                });
                $tab_content.velocity("slideUp", 120, "easeOut");

                $tab_content.removeClass(active_tab);

                $this.removeClass('active');
                a("a[href='" + d + "'].tab")
                .removeClass('active');
            }
        }
    });
});
