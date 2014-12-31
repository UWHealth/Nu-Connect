require(['jquery', 'velocity'], function($){
    $(function(){
        var help_items = [],
            help_text = [],
            help_wrap = ['<div class="absolute help_tip txt_normal"><span class="txt_normal space_n icon icon_before help_icon" data-icon="&#xe65c"></span><div class="help_tip_inner" data-tip="','"></div></div>'];

        function help_to_dom(help_placement){
            help_length = help_placement.length;


            for(i=0; i <= help_length; i++){
                $(help_placement[i])
                    .prepend(help_text[i]);
            }
        }

        function populate_help($help_content){
            $help_content.find("[data-help]").each(function(){
                var $this = $(this);
                help_items.push($this.attr("data-help"));
                help_text.push(help_wrap[0] + $this.next('p')[0].innerText + help_wrap[1]);
            });
            help_to_dom(help_items)
        }

        $.ajax({
            url: "/help/u-connect-help/",
            dataType: "html",
            success: function(data){
                var $aj_loaded = $(data).find("#help_content");
                populate_help($aj_loaded);
            }
        });
    });
});
