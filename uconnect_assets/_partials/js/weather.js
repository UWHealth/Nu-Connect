require(['jquery'], function($) {
	// http://openweathermap.org/api
	// http://openweathermap.org/weather-conditions

	var w_url = "http://api.openweathermap.org/data/2.5/weather?q=Madison,wi&units=imperial";

	// retrieve json
	function getWeather(callback) {
	    $.ajax({
	        dataType: "jsonp",
	        url: w_url,
	        success: parseWeather
	    });
	};

	// parse json
	function parseWeather(data) {

	    var w_temp_current = Math.ceil(data.main.temp)+'&deg;',
	    	w_temp_high = Math.ceil(data.main.temp_max)+'&deg;',
	    	w_temp_low = Math.ceil(data.main.temp_min)+'&deg;',
	    	w_icon = data.weather[0].icon,
	    	w_id = data.weather[0].id;
	    	w_icon_class = '';

	    // Write temperatures
	    $('#w_temp_current_js').html(w_temp_current);
	    $('#w_temp_high_js').html(w_temp_high);
		$('#w_temp_low_js').html(w_temp_low);

	    // Check for icon
	    if (!w_icon == '') {
	    	// icon_weather_lightning
			if (w_icon == '11d' || w_icon == '11n') {
				w_icon_class = 'icon_weather_lightning';
			}
			// icon_weather_rainy_light
			if (w_icon == '09d' || w_icon == '09n') {
				w_icon_class = 'icon_weather_rainy_light';
			}
			// icon_weather_rainy
			if (w_icon == '10d' || w_icon == '10n') {
				w_icon_class = 'icon_weather_rainy';
			}
			// icon_weather_snowy
			if (w_icon == '13d' || w_icon == '13n') {
				// Check ID for // icon_weather_snowy_light
				if (w_id == '601' || w_id == '602' || w_id == '621' || w_id == '622') {
					w_icon_class = 'icon_weather_snowy_light';
				} else {
					w_icon_class = 'icon_weather_snowy';
				}
			}
			// icon_weather_fog
			if (w_icon == '50d' || w_icon == '50n') {
				w_icon_class = 'icon_weather_fog';
			}
			// icon_weather_sunny
			if (w_icon == '01d' || w_icon == '01n') {
				w_icon_class = 'icon_weather_sunny';
			}
			// icon_weather_cloudy_mostly
			if (w_icon == '02d' || w_icon == '02n') {
				w_icon_class = 'icon_weather_cloudy_mostly';
			}
			// icon_weather_cloudy
			if (w_icon == '03' || w_icon == '03n' || w_icon == '04n' || w_icon == '04n') {
				w_icon_class = 'icon_weather_cloudy';
			}
			// icon_weather_windy
			if (w_icon == '11d' || w_icon == '11n') {
				w_icon_class = 'icon_weather_lightning';
			}
	    } else { // If none returned check id
	    	if (!w_id == null) { // Check for ID
	    		// icon_weather_lightning
	    		if (w_id == '900' || w_id == '960' || w_id == '961') {
					w_icon_class = 'icon_weather_lightning';
				}
				// icon_weather_rainy
	    		if (w_id == '906') {
					w_icon_class = 'icon_weather_lightning';
				}
				// icon_weather_windy
	    		if (w_id == '905' || w_id == '956' || w_id == '957' || w_id == '958' || w_id == '959') {
					w_icon_class = 'icon_weather_windy';
				}
			}
	    }

	    // Add weather icon
	    $('#w_icon_js').addClass(w_icon_class);

	    // Unhide weather container
	    $('#w_js').removeClass('hidden', 50);
	};

	// Initialize Weather JSON
	getWeather();

});