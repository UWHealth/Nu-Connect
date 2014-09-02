require(['jquery', 'velocity'], function($) {

    var header_icon_update = $('#header_icon_update');

    //-------------------------------
    // Header left (larger) icon
    //-------------------------------
    function update_header_icon() {
        var header_icon_target = $('.img_header header .side_content');
        // Replace its content
        header_icon_target.replaceWith(header_icon_update);
        // Remove icon container's .hide class
        header_icon_update.removeClass('hide');
    }
    // Check DOM for #header_icon_update
    if (header_icon_update.index() >= 0) {
        update_header_icon();
    }
	var $overview = $('#overview'),
		$tagbar = $('#tag_bar'),
		overview_height = $overview.innerHeight(),
		$button_reveal = $('#reveal_header'),
		header_classes = function(targets, classes){
			$(targets).toggleClass(classes);
		}

	if ( overview_height > 100 ){
		header_classes('#overview, #tag_bar', 'mask');
		header_classes('#reveal_header','hidden');
	};

	$('body').on('click', '#reveal_header', function(){
		if($overview.hasClass('mask')){
			$overview.velocity({
				'max-height': [overview_height, [240, 13], '100px']
			},{
				duration: 500
			}, {
				begin: header_classes('#reveal_header','clicked'),
				complete: header_classes('#overview, #tag_bar', 'mask')
			});
		}else{
			$overview.velocity(
				"reverse"
			,{
				duration: 320
			},{
				begin: header_classes('#reveal_header','clicked'),
				complete: header_classes('#overview, #tag_bar', 'mask')
			});
		}
	});


});