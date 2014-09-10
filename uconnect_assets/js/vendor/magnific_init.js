require(['jquery', 'magnific'], function($) {
	
	if (!$('html').hasClass('lte8')) { // don't load on lte ie8

		var clickedLink;

	    $('.magnific_popup').magnificPopup();

	    $('.magnific_popup_iframe').click(function(){
			clickedLink = $(this).attr('id');
		}).magnificPopup({
	        type: 'iframe',
	        midClick: true,
	        focus: $('#username'),
	  	    callbacks: {
				beforeAppend: showIframeLoading,
			    open: function () {
		    		$('.mfp-iframe').load(function() {
		    			var iframe_url = $(".mfp-iframe").get(0).contentWindow.location.toString();
		    			setTimeout(function(){
		    				// Logged in
				    		if ( (iframe_url.indexOf('cas/logout') == -1) && (clickedLink == 'loginlink') ){
				    			// Check for logged in URL
				    			if (iframe_url.indexOf('cas/login') == -1) {
					    			// mfp_close_any();
					    			location.reload();
				    			}
				    		// Logged out
				    		} else if ( (iframe_url.indexOf('cas/logout') != -1) && (clickedLink != 'logoutlink') ){
				    			mfp_close_any();
				    		}
		    			}, 5);
		    		});
			    }
			}
	    });

		function mfp_close_any() {
			window.top.eval('$.magnificPopup.close()');
		}
		
		// Show magnific loading while waiting for iframes
		// https://stackoverflow.com/questions/21259424/magnific-popup-iframe-how-to-show-that-the-iframe-is-loading
		var showIframeLoading = function() {
		    var curLength = 0;
		    var interval = setInterval(function() {
		        if ($('iframe').length !== curLength) {
		            curLength = $('.element_no_exist').length;
		            $('.mfp-content').hide();
		            $('.mfp-preloader').show();
		        }
		    }, 50);
		    this.content.find('iframe').on('load', function() {
		        clearInterval(interval);
		        $('.mfp-content').show();
		        $('.mfp-preloader').hide();
		    });
		};

	}

});