require(['jquery', 'magnific'], function($) {
	
	if (!$('html').hasClass('lte8')) { // don't load on lte ie8

	    $('.magnific_popup').magnificPopup();

	    $('.magnific_popup_iframe').magnificPopup({
	        type: 'iframe',
	        midClick: true,
	        focus: $('#username')//,
	  	//       callbacks: {
			//     beforeAppend: showIframeLoading,
			//     open: function () {
		 //    		$('.mfp-iframe').load(function() {
		 //    			var iframe_url = $(".mfp-iframe").get(0).contentWindow.location.toString();
		 //    			setTimeout(function(){
			// 	    		if ( (iframe_url.indexOf('cas/logout') != -1) && (loginlink == 'loginlink') ){
			// 	    			mfp_close_any();
			// 	    			location.reload();
			// 	    		} else if ( (iframe_url.indexOf('cas/logout') != -1) && (loginlink != 'loginlink') ){
			// 	    			mfp_close_any();
			// 	    		}
		 //    			}, 250);
		 //    		});
			//     },
			//     close: function() {
			//     	mfp_close_any();
			//     	$.post('/cas/logout', {"user":$("#user").val(),"type":"json"}, function(data){
			//     		if ( data.status == "1") {
			// 		    	if(clickedLink == 'loginlink'){ // login and stay on same page
			// 					location.reload();
			// 				}
			// 			}else if((data.status == "2") || (data.status == "0")){
			// 				var url = "/uconnect-error.hbs";
			// 				$(location).attr('href',url);
			// 			}
			// 		});
			//     }
			// }
	    }).click(function(){
			clickedLink = $(this).attr('id');
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
		            curLength = $('.column-header').length;
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