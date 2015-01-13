require([
    'jquery',
    'validate',
    'additional_methods'
], function($) {

    var ignore_validation = 'input:hidden, input[type=button], input[type=submit], input[type=reset], input.button, .js_ignore_validation, .validation_ignore, .vld_ignore',
    elements_to_validate = $(".validate").find('fieldset, input, textarea, select').not(ignore_validation);
    // ------------------------------------------------
    // Modify Default Plugin Settings
    // ------------------------------------------------
    // Messages

    jQuery.extend(
        jQuery.validator.messages, {
            required: "This field is required",
            remote: "Please fix this field",
            email: "Please enter a valid email address",
            url: "Please enter a URL",
            date: "Please enter a valid date",
            dateISO: "Please enter a valid date (ISO)",
            number: "Please enter a number",
            digits: "Please enter only digits",
            creditcard: "Please enter a valid credit card number",
            equalTo: "Please enter the same value again",
            accept: "Please enter a value with a valid extension",
            maxlength: jQuery.validator.format("Please enter fewer than {0} characters"),
            minlength: jQuery.validator.format("Please enter at least {0} characters"),
            rangelength: jQuery.validator.format("Must be between {0} and {1} characters long"),
            range: jQuery.validator.format("Must between {0} and {1}"),
            max: jQuery.validator.format("Must be less than or equal to {0}"),
            min: jQuery.validator.format("Must be greater than or equal to {0}")
        },
        jQuery.validator.setDefaults({
            // Error Element
            error_classes: ["validation_error", "icon_error color_select"],
            success_classes: ["hidden", "icon_success"],
            ignore: '.js_ignore_validation',
            errorElement: "label",
            // Error Placement
            errorPlacement: function(error, element) {
                var $error = $(error),
                $input = $(element),
                $wrap = $input.closest('.validation'),
                $vld_msg = $wrap.find('.validation_msg')
                $vld_bdy = $wrap.find('.validation_body'),
                $vld_icon = $wrap.find('.vld_icon');

                $vld_msg.removeClass(this.success_classes[0]);
                $vld_msg.addClass(this.error_classes[0]);

                $error.prependTo($vld_bdy);

                if( $input.attr('type') !== 'number'
                && $input.attr('type') !== 'date'
                && ! $input.is('textarea')
                && ! $wrap.hasClass('vld_no_icon')){
                    $vld_icon.addClass(this.error_classes[1])
                        .removeClass(this.success_classes[1]);
                }
            },
            success: function(label, element) {
                // console.log('success handler');
                var $input = $(element),
                    $wrap = $input.closest('.validation'),
                    $vld_msg = $wrap.find('.validation_msg'),
                    $vld_icon = $wrap.find('.vld_icon');

                $vld_msg.addClass(this.success_classes[0]);

                if( $input.attr('type') !== 'number'
                && $input.attr('type') !== 'date'
                && ! $input.is('textarea')
                && ! $wrap.hasClass('vld_no_icon')){
                    $vld_icon.addClass(this.success_classes[1]);
                }
                $vld_msg.find('.error').remove();

                // var $element = $(element),
                //     $validation_container = $element.prevUntil('.validation_msg'),
                //     $label = $validation_container.parent('.validation');
                //
                // $validation_container.removeClass(this.error_classes)
                //     .find('.error').remove();
                //
                // if( $element.attr('type') !== 'number' ){
                //     $validation_container.addClass(this.success_classes)
                // }
            }
        })
    );

        // ------------------------------------------------
        // Add messages and icons to validation containers
        // ------------------------------------------------

        $(elements_to_validate).each(function(){
            $this = $(this);
            var validation_insert = "<div class='validation_msg absolute'><div class='validation_body'></div></div>",
                vld_icon = "<span class='vld_icon icon icon_before absolute'></span>",
                $parent = $this.parent();
                $parents = $this.parent().parent();
                $pointer = $this.attr('id');

            //Redefine parent to closest validation wrapper
            // Useful for validation groups.
            $parent = $this.closest('.validation');


            //Check for validation message (if not, add it)
            if (! $parent.has('.validation_msg').length){
                if ($this.has('legend').length){
                    $this.find('legend').addClass('contain').prepend(validation_insert);
                    $parent.addClass('vld_no_icon');
                }else {
                    $this.before(validation_insert);
                }
            };
            //Check for validation icon (if not, add it)
            if (! $parent.has('.vld_icon').length
                && ! $parent.hasClass('vld_no_icon')) {
                $this.after(vld_icon);
            };

        });
        var $validation_msg = $('.validation_msg');

        if(! $validation_msg.parent().hasClass('validation')
        && ! $validation_msg.parent().parent().hasClass('validation')){
            $validation_msg.parent().addClass('validation');
        };

        var $validation_labels = $validation_msg.closest('.validation'),
            //Move validation position instructions down to relevant elements
            trickle_down_classes = function($this, direction_class) {
                $this.removeClass(direction_class)
                     .find('.validation_msg')
                     .addClass(direction_class);
            };

        //Make sure absolute is added to icons and messages
        $('.vld_icon').add($validation_msg).addClass('absolute');

        //Normalize validation ignores
        $(ignore_validation).addClass('js_ignore_validation');

        $validation_labels.each(function() {
            var $this = $(this);

            if ($this.find('input').length > 1){
                $this.addClass('vld_group');
            };

            if ($this.hasClass('vld_right')){
                trickle_down_classes($this, 'vld_right');

            }else if($this.hasClass('vld_left')){
                trickle_down_classes($this, 'vld_left');

            }else if($this.is('.vld_top')){
                trickle_down_classes($this, 'vld_top');

            }else{
                trickle_down_classes($this, 'vld_bottom');
            };
        });

        $('tr.vld_group').each(function(){
            $(this).find('td').wrapInner('<div class="contain" style="height: 100%" />');
        });
        $('td.vld_group').each(function(){
            $(this).wrapInner('<div class="contain" style="height: 100%" />');
        })

        // ------------------------------------------------
        // Initialize
        // ------------------------------------------------
        $(".validate").validate();

        // ------------------------------------------------
        // Make sure errors are thrown on keyup
        // ------------------------------------------------
        // // $(document).click(function() {
        //     elements_to_validate.on("propertychange blur change keyup keypress input paste click", function() {
        //         // elements_to_validate.each(function() {

        //             if ($(this).hasClass('error')) {
        //                 $(this).parent().attr('data-icon', 'error').removeClass('icon_success').addClass('icon_error');
        //             }
        //         // });
        //     /*});*/
        // });



});
