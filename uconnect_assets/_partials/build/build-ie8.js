({
    baseURL:'../js/',
    mainConfigFile: '../js/main_ie8.js',
    dir: '../../js/',
    keepBuildDir: true,
    preserveLicenseComments: false,
    // optimize: 'none',
    paths: {
        'jquery': "vendor/jquery.1.11.0",
        'wistia': 'empty:'
    },
    modules: [
    {
        name: 'main',
        include: ['app']
    },{
        name: 'search/searchblox_news',
        exclude: ['jquery']
    },{
        name: 'search/searchblox_events',
        exclude: ['jquery']
    },{
        name: 'search/searchblox_search',
        exclude: ['jquery']
    },{
        name: 'color_bg_init',
        exclude: ['jquery','velocity']
    },{
        name: 'mixitup_init',
        exclude: ['jquery']
    }

    ]
})
