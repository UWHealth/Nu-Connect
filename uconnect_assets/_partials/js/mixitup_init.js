define([
    'jquery',
    'select_dropdown',
    'mixitup',
], function($, sd) {

    // Make sure dropdown has been initialized
    sd.tamingselect();

    return {

        mixitup_init: (function() {

            $(function() {

                // don't load on lte ie8
                if (!$('html').hasClass('lte8')) {

                    // Add counter for multiple mixitups
                    var mixes = $('#mixableContainer'),
                        mixes_filters = $('#mixableFilterSelect'),
                        mixes_filters_cat = $('#mixableFilterCategory'),
                        mixes_filters_org = $('#mixableFilterOrg'),
                        mixes_category = $('#category'),
                        mixes_sorting = $('#sorting'),
                        mixes_controls = $('#controls'),
                        mixes_counter = mixes.length;

                    // reset IDs (and names, where necessary) to include unique counter
                    mixes.attr('id', 'mixableContainer' + mixes_counter);
                    mixes_filters.attr('id', 'mixableFilterSelect' + mixes_counter).attr('name', 'mixableFilterSelect' + mixes_counter);
                    mixes_filters_cat.attr('id', 'mixableFilterCategory' + mixes_counter).attr('name', 'mixableFilterCategory' + mixes_counter);
                    mixes_filters_org.attr('id', 'mixableFilterOrg' + mixes_counter).attr('name', 'mixableFilterOrg' + mixes_counter);
                    mixes_category.attr('id', 'category' + mixes_counter);
                    mixes_sorting.attr('id', 'sorting' + mixes_counter);
                    mixes_controls.attr('id', 'controls' + mixes_counter);

            		// called after the initial sort.  this re-enables animations (by setting the animation duration higher than 0).
                    // it's important that the initial sort (before this call) has no animation, otherwise elements hidden inside tabs get broken.
                    function mixAfter(state) {

                        $("#mixableContainer"+mixes_counter).mixItUp(
                            'setOptions', {
                                animation: {
                                    effects: 'fade translateZ(-360px) scale(0.5)',
                                    easing: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
                                    duration: 120,
            						queue: true,
            						queueLimit: 2
                                },
            					callbacks: {
            						onMixEnd: null
                                    // onMixEnd: function(){
                                        // $("#mixableContainer").find('.loading').remove();
                                        // mixAfter();
                                    // }
            					}
            				}
            			);

                        if ( $("#mixableContainer"+mixes_counter).hasClass('sort_aToZ') ) {
                            setTimeout(function() {
                                $('.sort[value="name:asc"]').click();
                            }, 1);
                        }

                        // remove elements that could break mixitup styling, likely brought through html via copy/paste
                        $("#mixableContainer"+mixes_counter+" br").remove(); // <br /> tags
                        $("#mixableContainer"+mixes_counter+" .element a").removeAttr("style") // inline styling
                        $("#mixableContainer"+mixes_counter+" li").html().replace(/&nbsp;/g, ''); // &nbsp;

                    }

                    // initial configuration: animation duration of 0 (instant animations).  this is immediately changed after the first sort, inside mixAfter().
                    // important that the first sort has a duration of 0 to keep it from breaking inside of tabs.
                    if (! $("#mixableContainer"+mixes_counter).hasClass('mix_initiated')) {

                        $("#mixableContainer"+mixes_counter).mixItUp({
                            animation: {
                                duration: 0,
                                queue: true,
                                queueLimit: 3,
                                animateResizeContainer: false
                            },
                            controls: {
                                activeClass: ''
                            },
                            debug: {
                                enable: true,
                                mode: 'verbose'
                            },
                            layout: {
                                containerClass: 'mixitup'
                            },
                            load: {
                                filter: "all",
                                sort: "category:asc name:asc"
                            },
                            callbacks: {
                                onMixEnd: function(){
                                    $("#mixableContainer"+mixes_counter).find('.loading').remove();
                                    mixAfter();
                                }
                            },
                            selectors: {
                                sort: '.sort'
                            }
                        }).addClass('mix_initiated');

                    }

                    // add sorting controls to each sorting <li> "button".
                    $("#sorting"+mixes_counter+" li").each(function (index, element) {

                        $(element).click(function () {
                            sortMixItUp($(this).attr('value'), $(this));
                            $(this).addClass("active").siblings("li").removeClass("active");
                        });

                    });

                    // if only Category exists on this page, and not also ORG, use a simplified version of filtering...
                    if ($("li[data-type=mixitup_org_select]").length == 0) {

                        $("li[data-type=mixitup_category_select]").click(function () {
                            $('#mixableContainer'+mixes_counter).mixItUp('filter', $(this).attr('data-value'));
                        });

                    } else { // this is a page with both Category and ORG filters, so set both of those up in a specific way...

                        $("li[data-type=mixitup_category_select]").click(function () {
                            category = $(this).attr('data-value');
                            mixFilterCategoryAndOrg();
                        });

                        $("li[data-type=mixitup_org_select]").click(function () {
                            org = $(this).attr('data-value');
                            mixFilterCategoryAndOrg();
                        });
                    }

                    // sorts the elements, given a sort order (example: "name:asc").  this is called via the onclick handlers (attached above) of the sort controls (the <li> tags).
                    // also, in cases of A-Z or Z-A sorting, this adds classes to categories the container ("categoryHidden" and "sorted", respectively) in order to display categories
                    // in a special way.
                    function sortMixItUp(attr, $this) {

                        $("#mixableContainer"+mixes_counter).mixItUp('sort', attr);

                        if ($this.hasClass('cat_hide')) {
                            $(".mix.category").addClass('categoryHidden');
                            $("#mixableContainer"+mixes_counter).addClass("sorted");
                        } else {
                            $(".mix.category").removeClass('categoryHidden');
                            $("#mixableContainer"+mixes_counter).removeClass("sorted");
                        }

                    }

                    function mixFilterCategoryAndOrg() {

                        var category = $("#mixableFilterCategory"+mixes_counter).val();
                        var org = $("#mixableFilterOrg"+mixes_counter).val();
                        var filterString = "";

                        if (category !== "all") {
                            filterString += "." + category;
                        } else {
                            filterString += "all";
                        }

                        if (org !== "all") {
                            if (filterString === "all") {
                                filterString = "." + org;
                            } else {
                                filterString += "." + org;
                            }
                        }

                        $("#mixableContainer"+mixes_counter).mixItUp("filter", filterString);

                    }

                }

            });

        })

    }

});
