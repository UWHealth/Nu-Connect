require(['jquery'], function($) {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Setup various elements w/ accordion + icon classes
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    var accordion_classes = 'accordion icon icon_right';

    // Setup elements that need accordion added
    $(".has_children").addClass(accordion_classes);

    // Check for .build_flat_accordion (policy landing)
	$('.build_flat_accordion').addClass('accordion_tree').each(function(i){
		var $this = $(this),
			headname = 'accordion_tree_head',
			headclass = '.'+headname,
			$headobj = $(headclass);
		$this.find('ul').addClass('list_naked');
		$this.find('a').addClass('link_naked');
		$this.find('.column').addClass('row');
		$this.find('.column > ul > li').addClass(headname);
		$this.find('.column > ul > li > a').addClass('column heading js_no_click');
		$('.accordion_tree_head > ul').addClass('row');
		$('.accordion_tree_head > ul > li').addClass('box box_small box_panel')
			.wrap('<div class="column half"/>').wrapInner('<div class="accordion icon icon_right"/>');
		$this.find('.accordion > a').addClass('block sub_heading js_no_click');
		$this.find('.accordion > ul').addClass('space_n_b');
//
//		$this.find('.column > ul > li').addClass('box box_panel')
//		.wrap('<div class="half column"/>');
//		$this.find('.box_panel > a').

	});

//    var flat_accordion = $('.build_flat_accordion .column > ul > li > ul > li');
//    flat_accordion.each(function() {
//        if ($(this).has("ul")) { // check if children present
//            $(this).addClass(accordion_classes);
//        }
//    });

    // Sidenav
    $("#sidebar .list_bordered ul li").has("ul").addClass(accordion_classes);
    $("[class*='multilevel_linkul']").parent("li").addClass(accordion_classes);

    // Initialize accordions
    require(['accordion_init']);

});