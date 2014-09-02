require(['jquery', 'slick'], function($) {

	if (!$('html').hasClass('lte8')) { // don't load on lte ie8

	    var $slides = $('.slide');

	    if ($slides.parent().hasClass('slider') === false
		   && $slides.length > 1) {
	        $slides.wrapAll("<div id='slider' class='slider'></div>");
	    }

	    var $slider = $('#slider'),
			overflow = 'o_hide';

	    $slider.slick({
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			autoplaySpeed: 15000,
			slide: '.slide',
			cssEase: 'cubic-bezier(.49,1.48,.62,.85)',
			arrows: true,
			swipe: true,
			draggable: false
	    });
	    
	}

});