// create our angular app and inject ngAnimate and ui-router
// =============================================================================
angular.module('cleverplacement', ['ngAnimate', 'ui.router'])

// configuring our routes
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        // route to show our basic form (/form)
        .state('form', {
            url: '/questionnaire',
            //templateUrl: 'form.html',
            controller: 'formController'
        })

        // nested states
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        // .state('form.profile', {
        //     url: '/profile',
        //     templateUrl: 'template/form-p#/rofile.html'
        // })

      
        ;

    // catch all route
    // send users to the form page
    $urlRouterProvider.otherwise('/');
})

// our controller for the form
// =============================================================================
.controller('formController', function($scope) {

    // we will store all of our form data in this object
    $scope.formData = {};

    // function to process the form
    $scope.processForm = function() {
        alert('awesome!');
    };

});
