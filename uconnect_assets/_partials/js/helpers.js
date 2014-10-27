var dependencies = [
        'handlebars'
    ];

require(dependencies, function() {

	// ------------------------------------------------
	// Custom Handlebars Helpers
	// ------------------------------------------------

	(function(Handlebars) {
	// module.exports.register = function (Handlebars, options, params) {
		Handlebars.registerHelper('ifEqual', function(a, b, options) {
			if(a == b) {
			   	return options.fn(this);
			} else {
		  		return options.inverse(this);
		  	}
		});
	// };
	}(window.Handlebars));

});