var dependencies = [
        'jquery',
        'general_functions'
    ];

require(dependencies, function($, gf) {

    //-------------------------------
    // return extension (file) class
    //-------------------------------
    function extensionClass(variable) {
        var extension = variable;
        switch(extension) {
            case 'jpg':
            case 'jpeg':
            case 'jfif':
            case 'png':
            case 'pns':
            case 'gif':
            case 'bmp':
            case 'tiff':
            case 'raw':
            case 'exif':
            case 'webp':
            case 'hdr':
            case 'svg':
            case 'ai':
            case 'psd':
            case 'psb':
            case 'psp':
            case 'ps':
                return 'icon_image';
            break;
            case 'zip':
            case '7zip':
            case 'rar':
                return 'icon_zip';
            break;
            case 'pdf':
                return 'icon_pdf';
            break;
            case 'doc':
            case 'docx':
            case 'docm':
            case 'dot':
            case 'dotx':
                return 'icon_doc';
            break;
            case 'xls':
            case 'xlsx':
            case 'xlsm':
            case 'xlsb':
            case 'xlt':
            case 'xltx':
            case 'xltm':
            case 'xla':
            case 'xlam':
                return 'icon_xls';
            break;
            default:
                return 'icon_file';
        }
    };

    $(function() {

        //-------------------------------
        // parse data-file via classname (uconnect-resources-index.hbs)
        //-------------------------------
        $('.icon_setup_data_file').each(function(){
            var file = $(this).data('file'),
                extension = gf.get_extension(file),
                className = extensionClass(extension);
            $(this).addClass(className);
        });

    });

});
