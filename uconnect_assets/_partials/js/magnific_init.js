require([
        'jquery',
        'general_functions',
        'magnific'
    ], function($, gf) {

    // if (!$('html').hasClass('lte-ie8')) {

		// var clickedLink,
		// 	embed_type,
		// 	iframe_url,
		// 	iframe_url_isCAS,
		// 	mfp_interval_cas;

		function mfp_close_any() {
			window.top.eval('$.magnificPopup.close()');
		}

	    // Remove default loading text, opting strictly for CSS loading spinner
	    $.extend(true, $.magnificPopup.defaults, {
	    	tLoading: ''
	    });

	    $('.magnific_popup').magnificPopup({
	    	midClick: true,
			mainClass: 'mfp-zoom-out-cur'
		});
        if($('[data-lightbox]').length){
            
            $('[data-lightbox]').each(function(){
                $type = $(this).attr('data-lightbox');
                $(this).magnificPopup({type: $type});
            });
        };
	    $('.mfp_iframe').magnificPopup({
			type: 'iframe', // embed_type,
			midClick: true,
			mainClass: 'mfp-zoom-out-cur',
			callbacks: {
				// Show magnific loading while waiting for iframes
				// .mfp-preloader has the .loading silent-class attached and the following callbacks are not needed for other mfp 'type' initializations
				// https://stackoverflow.com/questions/21259424/magnific-popup-iframe-how-to-show-that-the-iframe-is-loading
				beforeAppend : function() {
					var curLength = 0,
						iframe = this.content.find('iframe');

					var mfp_interval_loading = setInterval(
						function() {
							if (iframe.length !== curLength) {
								curLength = $('.mfp-iframe').length;
								$('.mfp-preloader').show();
								$('.mfp-content').hide();
							} else {
								$('.mfp-preloader').hide();
								$('.mfp-content').show();
							}
						}, 25
					);

					iframe.on('load',function() {
						clearInterval(mfp_interval_loading);
						$('.mfp-preloader').hide();
						$('.mfp-content').show();
					});
				},
				open : function() {
				},
				close : function() {
				}
			}
		});

	// 	function mfp_check_login() {
	// 		iframe_header = $('#cas').contents().find('#content .container__page_title h2').text();
	// 		// Prevent undefined
	// 		if ($("#cas").length > 0) {
	// 			iframe_url = $("#cas").get(0).contentWindow.location.href;
	// 			iframe_url_isCAS = gf.check_string(iframe_url, 'service');
	// 		}
	// 		// console.log('iframe_url: '+iframe_url);
	// 		// console.log('iframe_url_isCAS: '+iframe_url_isCAS);
	// 		if (iframe_url_isCAS == true) {
	// 			// [LOGIN] <h2> = "Log In Successful"
	// 			// if (iframe_header === 'Log In Successful') {
	// 			// 	clearInterval(mfp_interval_cas);
	// 			// 	if (clickedLink === 'loginlink') {
	// 			// 		// [source] "Login"
	// 			// 		location.reload();
	// 			// 	} else {
	// 			// 		// Close modal and continue to magnific-close callback
	// 			// 		mfp_close_any();
	// 			// 	}
	// 			// } else if (iframe_header === 'Login Failed') {
	// 			// 	clearInterval(mfp_interval_cas);
	// 			// 	$('#cas').contents().find('.btn-submit').click(function() {
	// 			// 		mfp_interval_cas = setInterval(mfp_check_login, 1);
	// 			// 	});
	// 			// }
	// 		} else {
	// 			clearInterval(mfp_interval_cas);
	// 			mfp_close_any();
	// 			location.reload();
	// 		}
	// 	}

		//-------------------------------
	    // CAS login
	    //-------------------------------
		// $('.mfp_iframe_login').click(function(){
		// 	clickedLink = $(this).attr('id');
		// }).magnificPopup({
		// 	type: 'iframe', // embed_type,
		// 	midClick : true,
		// 	mainClass : 'mfp-zoom-out-cur',
		// 	focus : $('#loginform input#user'),
		// 	callbacks : {
		// 		// Show magnific loading while waiting for iframes
		// 		// https://stackoverflow.com/questions/21259424/magnific-popup-iframe-how-to-show-that-the-iframe-is-loading
		// 		beforeAppend : function() {
		// 			var curLength = 0;
		// 			var mfp_interval_loading = setInterval(
		// 				function() {
		// 					if ($('iframe').length !== curLength) {
		// 						curLength = $('.column-header').length;
		// 						$('.mfp-content').hide();
		// 						$('.mfp-preloader').show();
		// 					}
		// 				}, 50);
		// 			this.content.find('iframe').on('load',function() {
		// 				clearInterval(mfp_interval_loading);
		// 				$('.mfp-content').show();
		// 				$('.mfp-preloader').hide();
		// 			});
		// 		},
		// 		// Give iframe a name and ID
		// 		markupParse: function(template, values, item) {
		// 	    	template.find('iframe').attr('name', 'cas').attr('id', 'cas');
		// 	   	},
		// 		/*
		// 		 * ----------------------
		// 		 * CAS + Magnific Summary
		// 		 * ----------------------
		// 		 * - will not load on IE8; instead users are sent directly to CAS (*look to else-statement below where CAS target is getting applied), then return to page
		// 		 * - all lightbox triggers have .fancyform class; on click, the id is passed to clickedLink var serving to distinguish which login btn clicked (login, hi-5, update profile, add to group)
		// 		 *  - When magnific opens, a very short timeout function continually checks for the iframe CAS header text to change
		// 		 *  - After "Log In Successful":
		// 		 *  	- for login btn: reload page
		// 		 */
		// 		open : function() {
		// 			$('#cas').load(function() {
		// 				$('#cas').contents().find('.btn-submit').click(function() {
		// 					mfp_interval_cas = setInterval(mfp_check_login, 1);
		// 				});
		// 			});
		// 		},
		// 		close : function() {
		// 		}
		// 	}
		// });
	// } else {

		// 11.13.14 // This is now being accomplished via the Delivery App: fullCasLogInURL + "?service=" + currentUrl
		// $("#loginlink").each(function() {
		// 	var url_host = (window.location.host).toLowerCase(),
		// 		url_current = window.location.href,
		// 		url_original = $(this).attr('href'),
		// 		cas_environment;
		// 	if ( (url_host.indexOf('local') >= 0) || (url_host.indexOf('dev') >= 0) ) {
		// 		cas_environment = 'dev.';
		// 	} else if (url_host.indexOf('staging') >= 0) {
		// 		cas_environment = 'staging.';
		// 	} else {
		// 		cas_environment = 'n.';
		// 	}
		// 	console.log('url_host: ' + url_host);
		// 	console.log('url_current: ' + url_current);
		// 	console.log('url_original: ' + url_original);
		// 	console.log('cas_environment: ' + cas_environment);
		// 	// $(this).attr('href', url_original + '?service=https%3A%2F%2F' + cas_environment + 'uconnect.wisc.edu');
		// 	$(this).attr('href', url_original + '?service=' + url_current);
		// });
	// }

});
