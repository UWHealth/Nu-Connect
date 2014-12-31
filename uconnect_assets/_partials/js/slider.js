define([
	'jquery',
	'slick'
], function($) {

	return {

		slider_init: (function() {

			if (!$('html').hasClass('lte8')) { // don't load on lte ie8

				if (window.slides === undefined) {
					//Prevents this from running twice on the same slider.
					// Gets reset at the end of this script.
					// Must be global.
				    window.slides = $('.unslicked');
					var $slides = window.slides,
						slider_number = 1;

					function reset_slider_variables(){
						//Reset global variable.
						$('.slide').removeClass('unslicked');
						window.slides = undefined;
					}

					    if ($slides.length > 1) {

							require(['slick'], function(slick){

								if ($('.slick-slider')!== undefined){
									var slider_counter = $('.slick-slider').length;
									slider_number = slider_number + slider_counter;
									var sliderID = "slider" + slider_number;
								} else {
									var sliderID = "slider1";
								}

								$slides.wrapAll("<section id='"+sliderID+"' class='slider'></section>");
								var $slider = $('#'+sliderID),
									overflow = 'o_hide';

								if ($('html').hasClass('ie9')){
									$slider.slick({
										dots: true,
										infinite: true,
										speed: 250,
										slidesToShow: 1,
										autoplaySpeed: 15000,
										slide: '.slide',
										cssEase: 'ease-out',
										arrows: true,
										draggable: false,
										useCSS: false
									});
								}else{
									$slider.slick({
										dots: true,
										infinite: true,
										speed: 500,
										slidesToShow: 1,
										autoplaySpeed: 15000,
										slide: '.slide',
										cssEase: 'cubic-bezier(.65, 1.45, .65, .91)',
										arrows: true,
										swipe: true,
										draggable: false
								    });
								}
								reset_slider_variables();
							});
						}else{
							reset_slider_variables();
						}

				}
			}

		})

	}

});
