'use strict';
//-----------------------------------
// Global app namespace
// ------------------------------------------------
// variables declared outside of a function will go on the global scope
// var app = window.app || {};
var mq; // set global var for media query check

// ------------------------------------------------
// require.js config
// ------------------------------------------------
require.config({
    // 'nodeRequire': 'require',
    // 'optimize': 'none', // for DEV
    // 'urlArgs': 'bust', // DEV
    'urlArgs': 'bust=v2', // PROD
    'paths': {
        // ------------------------------------------------
        // Vendor-based
        // ------------------------------------------------
        'jquery': 'vendor/jquery',
        'npm': 'npmloader',
        'mixitup': 'vendor/mixitup',
        'mixitup_debug': 'vendor/mixitup_debug',
        'validate': 'vendor/validate',
        'additional_methods': 'vendor/additional_methods',
        'slick': 'vendor/slick',
        'velocity': 'vendor/velocity',
        'magnific': 'vendor/magnific',
        'hover_intent': 'vendor/hover_intent',
        'jbreadcrumb': 'vendor/jbreadcrumb',
        'select_dropdown': 'select_dropdown',
        'wistia': '//fast.wistia.com/static/embed_shepherd-v1',
        'knob': 'vendor/knob',
        'data_tables': 'vendor/data_tables',
        'data_tables_responsive': 'vendor/data_tables_responsive',
        'numeric': 'vendor/numeric',
        'picker': 'vendor/picker',
        'picker_date': 'vendor/picker_date',
        'picker_time': 'vendor/picker_time',
        'picker_legacy': 'vendor/picker_legacy',
        'select2': 'vendor/select2',
        'moment': 'vendor/moment',
        'jquery_linkify': 'vendor/jquery_linkify',
        'jquery_ui_custom': 'vendor/jquery_ui_custom',
        'cookie': 'search/cookie',
        'searchblox_events': 'search/searchblox_events',
        'searchblox_news': 'search/searchblox_news',
        'searchblox_search': 'search/searchblox_search'
    },
    'shim': {
        // ------------------------------------------------
        // Vendor-based
        // ------------------------------------------------
        'jquery': {
            'exports': ['jquery', 'jQuery', '$']
        },
        'validate': {
            'deps': ['jquery']
        },
        'validate_init': {
            'deps': ['validate']
        },
        'velocity': {
            'deps': ['jquery']
        },
        'velocity_ui': {
            'deps': ['velocity']
        },
        'additional_methods': {
            'deps': ['validate']
        },
        'mixitup': {
            'deps': ['jquery']
        },
        'mixitup_debug': {
            'deps': ['mixitup']
        },
        'magnific': {
            'deps': ['jquery']
        },
        'magnific_init': {
            'deps': ['magnific']
        },
        'hover_intent': {
            'deps': ['jquery']
        },
        'jbreadcrumb': {
            'deps': ['hover_intent']
        },
        'knob': {
            'deps': ['jquery']
        },
        'data_tables': {
            'deps': ['jquery']
        },
        'data_tables_responsive': {
            'deps': ['data_tables']
        },
        'numeric': {
            'deps': ['jquery']
        },
        'picker': {
            'deps': ['jquery']
        },
        'picker_date': {
            'deps': ['picker']
        },
        'picker_time': {
            'deps': ['picker']
        },
        'picker_legacy': {
            'deps': ['picker']
        },
        'select2': {
            'deps': ['jquery']
        },
        'tables': {
            'deps': ['jquery']
        },
        'jquery_linkify': {
            'deps': ['jquery']
        },
        'jquery_ui_custom': {
            'deps': ['jquery']
        },
        'cookie': {
            'exports': ['cookie']
        },
        'searchblox_events': {
            'deps': [
                'jquery',
                'moment',
                'jquery_linkify'
            ]
        },
        'searchblox_news': {
            'deps': [
                'jquery',
                'moment',
                'jquery_linkify'
            ]
        },
        'searchblox_search': {
            'deps': [
                'jquery',
                'cookie',
                'moment',
                'jquery_linkify'
            ]
        },
        'reinit_compontents': {
            'deps': [
                'jquery',
                'slider',
                'select_dropdown',
                'tabs'
            ]
        }
    }
});

// ------------------------------------------------
// Initialize App
// ------------------------------------------------
// load foundational libs
require(["app"], function(){});
