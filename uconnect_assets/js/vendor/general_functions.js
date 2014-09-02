require(['jquery'], function($) {

    // ------------------------------------------------
    // Return DOM between two elements
    // Usage: $('body').between($('#someid'), $('#someid2')).each(function () { Do what you want. });
    // ------------------------------------------------
    // $.fn.between = function(elm0, elm1) {
    //     var index0 = $(this).index(elm0);
    //     var index1 = $(this).index(elm1);
    //     if (index0 <= index1) {
    //         return this.slice(index0, index1 + 1);
    //     } else {
    //         return this.slice(index1, index0 + 1);
    //     }
    // }

    // ------------------------------------------------
    // Remove whitespace and line breaks
    // ------------------------------------------------
    // $.fn.cleanHTML = function() {
    //     this.contents().filter(function() {
    //         if (this.nodeType != 3) {
    //             $(this).htmlClean();
    //             return false;
    //         } else {
    //             this.textContent = $.trim(this.textContent);
    //             return !/\S/.test(this.nodeValue);
    //         }
    //     }).remove();
    //     return this;
    // }

    // ------------------------------------------------
    // Check clicked element against its container
    // ------------------------------------------------
    app.click_check = (function(container, event) {
        if (!container.is(event.target) // if the target of the click isn't the container
            && container.has(event.target).length === 0) {
            return false;
        } else {
            return true;
        }
    });

    // ------------------------------------------------
    // Check current template,  #template_check
    // ------------------------------------------------
    var template_check = $('#template_check');
    if (template_check.index() >= 0) {
        var template = $.trim(template_check.text());
        window.template = template;
    } else {
        window.template = '';
    }

    // ------------------------------------------------
    // Check label(s),  #label_check, return HC/MF/UW Health
    // ------------------------------------------------
    var label_check = $('#label_check');
    if (label_check.index() >= 0) {
        var label_check = $('#label_check span');
        // if only one label, use it
        if (label_check.length == '1') {
            window.labels = label_check.text();
        } else { // if > 1 label, default to UW Health
            window.labels = "UW Health";
        }
    } else {
        window.labels = '';
    }

    // ------------------------------------------------
    // Check current media query
    // #mq_check:before content specified in _app.scss, retrieve content via JS
    // [NOTE] IE<=8 does not support retrieving pseudo content and does not work
    // ------------------------------------------------
    // This if statement will catch errors for old browsers and return null, rather than failing
    if (!window.getComputedStyle) {
        window.getComputedStyle = function(el, pseudo) {
            this.el = el;
            this.getPropertyValue = function(prop) {
                var re = /(\-([a-z]){1})/g;
                if (prop == 'float') prop = 'styleFloat';
                if (re.test(prop)) {
                    prop = prop.replace(re, function() {
                        return arguments[2].toUpperCase();
                    });
                }
                return el.currentStyle[prop] ? el.currentStyle[prop] : null;
            }
            return this;
        }
    }
    // Global mq_check function
    app.mq_check = function() {
        var mq = getComputedStyle(document.querySelector('#mq_check'), "::before").getPropertyValue("content");
        window.mq = mq; // update global var
        return mq;
    };

    $(function() {
        // Fire media-query-check on load
        app.mq_check();
    });

    $(window).resize(function() {
        // media-query-check on window resize
        app.mq_check();
    });

	//Prevent Click events
	$('body').on('click', '.js_no_click', function(e){
		e.preventDefault();
	})

});