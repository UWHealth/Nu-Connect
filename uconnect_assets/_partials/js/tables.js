require(['jquery'], function($, t) {

    //Responsive tables
    (function(t) {
        var all_tables = t("table");
        var y = [];
        var z;
        for (var i = 0; i < all_tables.length; i++) {
            var current = t(all_tables)[i];
            z = t(current).find("th").map(function() {
                t(this).each(function() {
                    return this.innerText;
                });
            });
			if (typeof y.push !== 'undefined')
				y.push(z.prevObject);
			if (typeof y[0] !== 'undefined')
				y = y[0];
            t(current).find("tr").each(function() {
                t(this).find("td").each(function(j) {
					if (typeof y[j] !== 'undefined')
						t(this).attr("data-th", y[j].innerText);
                });
            });
        }
    })(jQuery);
    
});