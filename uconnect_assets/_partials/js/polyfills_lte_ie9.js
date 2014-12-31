require([
    'jquery',
    'general_functions'
], function($, gf) {

	var maxHeight;

	////////////////////////////////////////////////////////////////////////////////////////////////////////
    // When opening mega-nav, slide embed content down
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
	function moveEmbedDown(maxHeight) {
		$('.embed').velocity({
            "margin-top": [maxHeight, 0]
        }, {
            duration: 360
        });
	}

	function moveEmbedUp() {
		$('.embed').velocity({
            "margin-top": [0, 0]
        }, {
            duration: 360
        });
	}

	$(function() {

		if (gf.element_exists($('.embed')) === true) {
			$('#mega_buttons .tab').click(function() {
				if (! $(this).hasClass('active') ) {
					var tabID = $(this).attr('href'),
						height1 = $('.img_header #body_content').height(),
						height2 = parseInt($('main > .wrap').css('padding-top')),
						height3 = $('.main_content .tabs').height(),
						height4 = parseInt($('main section.tab_content').css('padding-top')),
						height_elementsBeforeEmbedContent = height1 + height2 + height3 + height4;
					// console.log('tabID: ' + tabID);
					// console.log('height1: ' + height1);
					// console.log('height2: ' + height2);
					// console.log('height3: ' + height3);
					// console.log('height4: ' + height4);
					// console.log('height_elementsBeforeEmbedContent: ' + height_elementsBeforeEmbedContent);
					// console.log('$(tabID).height(): ' + $(tabID).height());
					if ($(tabID).height() > height_elementsBeforeEmbedContent) {
						maxHeight = $(tabID).height() / 3;
						// console.log('if true, maxHeight: ' + maxHeight);
					} else {
						maxHeight = 0;
						// console.log('if false, maxHeight: ' + maxHeight);
					}
					moveEmbedDown(maxHeight);
				} else {
					moveEmbedUp();
				}
			});
		}

	});

    $(document).on('click', 'body', function(e) {
        if (!$('#mega_buttons .tab').hasClass('active')) {
            if (gf.check_click($('#mega_nav'), e) === false && gf.check_click($('#mega_buttons'), e) === false && gf.check_click($('[data-toggle="#mega_nav"]'), e) === false) {
            	moveEmbedUp();
            }
        }
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Placeholder fix
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
	$(function() {
		var input_container_inner = '<div class="container_placeholder contain"/>';

    	$("form input:not([type=submit])").each(function(){

		    var input = $(this),
		    	input_name = input.attr('name'),
		    	// input_container_outer = '<div class="contain inline_block"/>',
		    	txt_placeholder = input.attr('placeholder'),
		    	label_placeholder = input.parent().find('.label_placeholder');

			// Insert <label> with absolute positioning after an input and/or textarea
			if (txt_placeholder) {

				// Wrap input in container (w/ relative position)
			    if (!input.parent('form').hasClass('button_inset')) {
			    	// Set z-index so input's hover effect still applies
					input.css('z-index', '2');
			    	// Use relative container
			    	input.wrap(input_container_inner);
			    	// Add placeholder label
					$('<label class="label_placeholder" for="' + input_name + '">' + txt_placeholder + '</label>').insertAfter(input);
				} else {
					// Add placeholder label
					$('<label class="label_placeholder" for="' + input_name + '">' + txt_placeholder + '</label>').insertBefore(input);
			    }

				// Change z-index on label when input field is :focus, :active, .active
				input.focus(function() {
					input.parent().find('.label_placeholder').css('z-index','2');
				});
				input.blur(function() {
					input.parent().find('.label_placeholder').css('z-index','0');
				});

				// If input has value, hide the placeholder label
				input.bind("input keyup keydown keypress change blur", function() {
				    updatePlaceholderVisibility(input);
				});
			}

		});

	});

	// If input has value, hide the placeholder label
	function updatePlaceholderVisibility(input) {
		if (input.val().length === 0) {
			input.parent().find('.label_placeholder').removeClass('hidden');
		} else {
			input.parent().find('.label_placeholder').addClass('hidden');
		}
	}

	// Fix for Utility Search (that updates placeholder text)
	$('#search_options .button').click(function() {

		var input = $('#global_search'),
			placeholder_update = $(this).data('placeholder'),
			txt_placeholder = $('#search_column .label_placeholder');

		// updatePlaceholderText(input, updatePlaceholderText);
		if (txt_placeholder.text() !== placeholder_update) {
			txt_placeholder.text('Search ' + placeholder_update);
		}

	});

});
