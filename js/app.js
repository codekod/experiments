// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
requirejs.config({
    "baseUrl": "js",
    "paths": {
      "jquery": "jquery.1.8.2.min",
      "echo": "echo",      
      "jquery.easing": "jquery.easing.1.3"      
    },
    "shim": {
        "jquery.easing" : { deps:['jquery']},
        "jquery" : {'exports' : 'jquery'}
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);
