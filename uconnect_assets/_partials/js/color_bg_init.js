//---Color_bg_init--------
// Grabs colors (using color_bg.js)
//  from flair and applies them to the header background.
//------------------------


require(['jquery','tinycolor','color_bg', 'velocity'], function($, tinycolor, color_bg){


    // Algorithms for preferred colors
    // http://pieroxy.net/blog/pages/color-finder/guide.html
    //------------------------------------------------------
    //Get saturated colors
    function favor_hue(r,g,b) {
        return (Math.abs(r-g)*Math.abs(r-g) + Math.abs(r-b)*Math.abs(r-b) + Math.abs(g-b)*Math.abs(g-b))/65535*50+1;
    }
    //Only grab black if necessary
    function avoid_black(r,g,b) {
        if(r<35 && g<35 && b<35){
            favor_hue(r,g,b);
        }else{
            return 1;
        }
    }
    //Grabs only bright colors (if they exist)--------------
    function favor_bright(r,g,b){
        if (r>235 && g>235 && b>235) return 0;
        return (r*r+g*g+b*b)/65535*20+1;
    }
    // //Exlude blacks and whites------------------------------
    // function exclude_extremes(r,g,b){
    //     if (r>225 && g>225 && b>225) {return 0;}
    //     else if(r<35 && g<35 && b<35){return 0;}
    //                             else {return 1;}
    // }
    // //Grab dark Colors (if they exist)----------------------
    // function favor_dark(r,g,b) {
    //     if(r<35 && g<35 && b<35) return 0;
    //     return 768-r-g-b+1;
    // }

    //Cross-browser way to add CSS to page
    function add_css(sheet, selector, rules, index) {
        if("insertRule" in sheet) {
            sheet.insertRule(selector + "{" + rules + "}", index);
        }
        else if("addRule" in sheet) {
            sheet.addRule(selector, rules, index);
        }
    }
    //Creating a style tag
    var sheet = (function() {
        // Create the <style> tag
        var style = document.createElement("style");

        style.setAttribute("media", "screen")

        // WebKit hack :(
        style.appendChild(document.createTextNode(""));

        // Add the <style> element to the page
        document.head.appendChild(style);

        return style.sheet;
    })();

        //Image to Extract from
    var _img_src = document.getElementById('js_image_extract').getAttribute('data-src'),
        //Object to apply new color to
        _img = new Image(1,1);
        _img.src = _img_src;
        _img.id = 'extract_colors'
        $bg = $('#js_img_header'),
        //Homepage or not?
        // Prevents querying the DOM more than necessary.
        _location_home = false;

    if($bg.hasClass('img_header_homepage')){
        //Skip everything if we're on the homepage.
        // Images require no additional processing since they're full background.
        $bg.css('background-color', 'white');
        _location_home = true;
    }


    //Main color application function
    //------------------------------------------
    function output_color(nat_clr, bright_clr){
        //Format dominant colors
        var nat_clr = tinycolor(nat_clr),
            bright_clr = tinycolor(bright_clr);
            // console.log("Computed Colors (Hue, Natural, Bright):");
            console.log("Natural:", nat_clr.toRgbString(), ", Bright:", bright_clr.toRgbString());

        //Grab color overlay and alternative color (for links)
        var clr_overlay = nat_clr.saturate(10).toHsl(),
            alt_clr = bright_clr.saturate(10).toHsl(),
            bg_clr = nat_clr;

        //Make sure Color overlay is no more than 25% lightness.
        if(clr_overlay.l > .25){
            clr_overlay.l = .25;
        }
        //Make sure alternative color is no more less than 94% lightness.
        if(alt_clr.l < .94){
            alt_clr.l = .94;
        }

        //Convert colors to Hex strings (easier calculation).
        alt_clr     =   tinycolor(alt_clr).toHexString();
        clr_overlay =   tinycolor(clr_overlay).toHexString();
        bg_clr      =   tinycolor(bg_clr).toHexString();

        //Add color rules to a new style tag in the head
        add_css(sheet, ".header_bar .list_tag a, .page_header a", "color:"+alt_clr);
        add_css(sheet, ".color_overlay:after", "background-color:"+clr_overlay);

        //Add the overlay
        $bg.addClass('color_overlay');

        //Animate the color background change
        $bg.velocity({
            backgroundColor: bg_clr
        },{
            duration: 200,
            easing: "easeOutSine"
        });
    };

    //---Initialize--------------------------------------------
    // Use ColorPicker(color_bg.js)
    // to get dominant colors and pass it to the above functions
    // (waits for image to load before computing)
    //---------------------------------------------------------
    if(!_location_home){

        _img.onload = function(){
            var _natural = new color_bg(avoid_black).getMostProminentColor(_img);
            var _bright = new color_bg(favor_bright).getMostProminentColor(_img);
            output_color(_natural, _bright);
        }
    }

});
