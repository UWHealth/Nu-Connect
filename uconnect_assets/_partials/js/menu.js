require(['jquery','general_functions','tabs'], function($, gf) {

    $(document).on('click', 'body', function(e) {
        if ($('#mega_buttons .tab').hasClass('active')) {
            if (gf.check_click($('#mega_nav'), e) === false && gf.check_click($('#mega_buttons'), e) === false && gf.check_click($('[data-toggle="#mega_nav"]'), e) === false) {

                // $('#mega_nav').not('.active').find('.tab_content:visible')
                $('#mega_nav > .tabbed > .tab_content:visible')
                    .velocity({
                        "margin-top": [0, 0],
                        scaleY: [0, [.41, -0.5, 0, 1.14], 1],
                        //cubic-bezier(.41, -0.5, 0, 1.14)
                        translateY: [0, [.31, -0.41, .5, .59], 0]
                    }, {
                        duration: 360,
                        queue: false,
                        begin: function(element){
                            $(element).removeClass('loaded');
                        }
                    }).velocity(
                        {opacity: [0, "easeOutSine", 1]},
                        {duration: 360, display: "none"}
                    );
                    $('#mega_nav').find('.tab_button.active').removeClass('active')
                    $('#mega_buttons').find('.active').removeClass('active');

                if ($('#mega_nav').hasClass('active')) {
                    $('[data-toggle="#mega_nav"]').click();
                }
            }
        }
    });

    $(function() {

        //Highlight the current Section in top nav
        //-----------------------------------------

        //Get current path (without hostname)
        var current_page = window.location.pathname + "/",
            current_section,
            $utility_nav = $('#utilities a');
            $all_nav = $('#mega_buttons .tab, #utilities a'),
            nav_paths=[];

        //Get the current section by grabbing everything between the first and second /s
        if (current_page !== "//") {
            current_section = current_page.match(/(?=\S)\/(.*?)\//)[0]
                .toString().replace(/(\/)/g,"").replace(',',"");
        }

        //Move all nav paths to a single array
        // while also removing /s and #s.
        if($all_nav !== null && current_section !== "//"){
            $all_nav.each(function(){
                nav_paths.push(
                    $(this).attr('href').replace(/\/|#/g, "")
                );
            });

            //Find current path in the nav_paths array.
            var current_nav_index = $.inArray(current_section, nav_paths);

            if(current_nav_index >= 0 ){
                //Apply current_branch
                $($all_nav[current_nav_index]).addClass('current_branch');
            };
        };
        // Duplicate each utility nav link for mobile, and give appropriate style classes
        $utility_nav.each(function() {
            $(this).clone()
                .appendTo($('#mega_nav > .tabbed'))
                .addClass('tab_button utility_tab tab_link')
                .attr('data-tabbed', 'true');
        });

    });

});
