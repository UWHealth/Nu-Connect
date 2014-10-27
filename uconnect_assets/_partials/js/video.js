var dependencies = [
        'jquery',
        'wistia'
    ];

require(dependencies, function($) {

    // Parse through DOM and apply Wistia videoFoam (responsive lib: requirejs name/module "wistia")
    wistiaEmbeds.onFind(function(video) {
      	video.videoFoam(true);
    });

});