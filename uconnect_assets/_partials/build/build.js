({
    baseURL:'../js/',
    mainConfigFile: '../js/main.js',
    dir: '../../js/',
    keepBuildDir: true,
    preserveLicenseComments: false,
    // optimize: 'none',
    paths: {
        'jquery': "vendor/jquery",
        'wistia': 'empty:'
    },
    modules: [
    {
        name: 'main',
        include: ['app']
    },{
        name: 'color_bg_init',
        exclude: ['jquery','velocity']
    },{
        name: 'mixitup_init',
        exclude: ['jquery']
    }

    ]
})
