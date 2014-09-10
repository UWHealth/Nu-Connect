require(['jquery', 'velocity'], function($) {

///////////////////////
// Toggle function ( toggle_this() )
///////////////////////
// Controls toggle events/animation
// ACCEPTS: object, target, and an optional icon array
//
// NOTE: preventDefault is not included in this function.
///////////////////////

	var toggle_this = function($this, $toggle_target, $icons){

		//Give the clicked object 'active' class for styling purposes
		$this.toggleClass('active');

		//Check for existence of icons (from data-icon and data-icon-switch)
		if($icons.length === 0){
			//if no icon, then pass nothing.
			if($this.attr('data-icon') !== undefined){
				var $icon_change = [$this.attr('data-icon'), $this.attr('data-icon')];
			}else{
				var $icon_change = ["",""];
			}
		}else if($icons.length === 1){
			//If only one icon, then duplicate original icon
			var $icon_change = [$icons, $icons];
		}else{
			//If an array is passed(correctly), then just pass it along
			var $icon_change = $icons;
		}

		//Check for sibling targets since this is not easily passed via html
		if ($toggle_target === 'sibling'){

			//Making sure data-sibling exists,
			//Otherwise, throw an error.
			if ($this.attr('data-sibling')!== undefined){

				//Finding the sibling target
				$toggle_target = $this.next(function(){
					return $this.attr('data-sibling');
				});
			}else{
				console.error("data-sibling is undefined for "+$this);
			}

		}else{
			//Convert toggle-target strings into jquery objects
			if(typeof $toggle_target ==="string"){
				$toggle_target = $($toggle_target);
			}
		}

		//Default animation type and timing
		var anim_easing = ["easeInBack", "easeOutBack", "default"],
			anim_time = [200, 200];

		//Checking for custom animation ease
		if($this.attr('data-anim') !== undefined){
			//Create an array for first and second easing
			anim_easing = $this.attr("data-anim").split(" ");
		}
		//Checking for custom animation timing
		if($this.attr('data-anim-time')!== undefined){
			//Create an array for first and second timing
			anim_time = $this.attr('data-anim-time').split(" ");
		}

		//Slide animation behavior

		//  determined by class of .slide_anim
		if ($this.hasClass('slide_anim') === true) {

			//Velocity lacks support for toggle animations
			// Checking for target visibility to simulate this behavior

			if ($toggle_target.is(":visible")) {
				$toggle_target.velocity("slideUp", anim_time[0], anim_easing[0])
				.addClass('inactive');

				//Change data-icon to custom setting
				// This is usually the first icon, defined in data-icon
				$this.attr('data-icon', $icon_change[0]);
			} else {
				$toggle_target.velocity("slideDown", anim_time[1], anim_easing[1])
				.removeClass('inactive');

				//Change data-icon to custom icon, if necessary
				// This is usually the inverse icon of the default
				$this.attr('data-icon', $icon_change[1]);
			}
			//If not requesting slide animation,
			//  default to fade
		} else {
			//Removing bounce from default animation
			//(creates an unwanted strobe effect with fade)
			if (anim_easing[2] === "default"){
				anim_easing = ["easeOut", "easeOut"];
			}

			if ($toggle_target.is(":visible")) {
				$toggle_target.velocity("fadeOut", anim_time[0], anim_easing[0])
				.addClass('inactive');
				$this.attr('data-icon', $icon_change[0]);
			} else {
				$toggle_target.velocity("fadeIn", anim_time[1], anim_easing[1])
				.removeClass('inactive');
				$this.attr('data-icon', $icon_change[1]);
			};
		}
	}

	//Default toggle object click handler
	//Just needs the data-toggle attribute
    $('body').on('click', '[data-toggle]', function(e) {

		//Prevent links from doing their thang
		e.preventDefault();

		//Collecting necessary data
        var toggle_target = $(this).attr('data-toggle'),
			icon_original = $(this).attr('data-icon'),
        	icon_secondary = $(this).attr('data-icon-switch'),
			toggle_sibling = $(this).attr('data-sibling'),
			icon_switch = [];

		//Checking for icon-switch
		if (icon_secondary  !== undefined) {
			var toggle_icon = icon_secondary.split(" ");
		}
		else {
			if(icon_original === undefined){
				icon_original = "";
			}
			var toggle_icon = [icon_original, icon_original];
		}

		//Call toggle function
        toggle_this($(this), toggle_target, toggle_icon);
    });

});