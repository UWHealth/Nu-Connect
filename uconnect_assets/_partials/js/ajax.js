define([
    'jquery'
], function($) {

    // $.ajaxSetup({
    //     scriptCharset: "utf-8", // "ISO-8859-1"
    //     contentType: "application/json; charset=utf-8"
    // });

    var output;

    function setAjax(options) {

        output = options.output;

        function ajax_option(inline, default_option) {
            if (inline) {
                return inline;
            } else {
                return default_option;
            }
        }

        var data;

        $.ajax({
            url: options.url,
            crossDomain: ajax_option(options.crossDomain, false),
            cache: ajax_option(options.cache, false),
            type: ajax_option(options.type, 'get'),
            data: ajax_option(options.data, {
                format: options.format,
                APIKey: options.APIKey,
                source: options.source,
                sourceData: options.sourceData,
                count: options.count,
                authMode: options.authMode
            }),
            dataType: ajax_option(options.dataType, 'html'),
            async: ajax_option(options.async, false),
            beforeSend: options.beforeSend,
            error: ajax_option(options.errorCallback, function(jqXHR, exception) {
                    var error = '';
                    if (jqXHR.status === 0) {
                        error = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        error = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        error = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        error = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        error = 'Time out error.';
                    } else if (exception === 'abort') {
                        error = 'Ajax request aborted.';
                    } else {
                        error = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    return options.error;
                }
            ),
            jsonpCallback: ajax_option(options.jsonpCallback, function(data) {
                    // [Default]
                }
            ),
            success: ajax_option(options.successCallback, function(data) {
                    $(output).html(data);
                    // return data;
                }
            ),
            complete: ajax_option(options.completeCallback, function(data) {
                    // [Default]
                }
            ),
            timeout: ajax_option(options.timeoutCallback, function(data) {
                    // [Defaultdata]
                }
            )
        });
    }

    return {
        setAjax: setAjax
    }

});