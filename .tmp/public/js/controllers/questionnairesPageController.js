angular.module('cleverplacement').controller('questionnairesPageController', [
  '$scope', '$http',
  function($scope, $http) {

    $scope.me = window.SAILS_LOCALS.me;

    /////////////////////////////////////////////////////////////////////////////
    // Immediately start fetching list of questionnaires from the server.
    /////////////////////////////////////////////////////////////////////////////

    // Set up $scope.questionnaires as an empty array to ensure it always exists.
    $scope.questionnaires = [];

    // First, show a loading spinner
    $scope.questionnairesLoading = true;

    $scope.submitquestionnairesError = false;


      // Get the existing questionnaires.
      io.socket.get('/questionnaire', function whenServerResponds(data, JWR) {
        $scope.questionnairesLoading = false;
        console.log('Fetched questionnaires and subscribed... Response:', data);

        if (JWR.statusCode >= 400) {
          $scope.submitquestionnairesError = true;
          $scope.questionnairesLoading = false;
          console.log('something bad happened',data);
          $scope.$apply();
          return;
        }

        $scope.questionnaires = data;

        // Apply the changes to the DOM
        // (we have to do this since `io.socket.get` is not a
        // angular-specific magical promisy-thing)
        $scope.$apply();

      });


    ///////////////////////////////////////////////////////////////
    // SET UP LISTENERS FOR DOM EVENTS
    ///////////////////////////////////////////////////////////////

    /**
     * When new questionnaire is submitted...
     * (the binding from our form's "submit" event to this function is
     *  handled via `ng-submit="submitNewquestionnaire($event)` in the HTML)
     */
    $scope.submitNewquestionnaire = function() {

      // A little "spin-lock" to prevent double-submission
      // (because disabling the submit button still allows double-posts
      //  if a user hits the ENTER key to submit the form multiple times.)
      if ($scope.busySubmittingquestionnaire) {
        return;
      }

      // Harvest the data out of the form
      // (thanks to ng-model, it's already in the $scope object)
      var _newquestionnaire = {
        title: $scope.newquestionnaireTitle,
        src: $scope.newquestionnaireSrc,
      };

      // create placeholder anchor element
      var parser = document.createElement('a');

      // assign url to parser.href
      parser.href = _newquestionnaire.src;

      // Use the indexOf parser.search as the first argument and length of
      // parser.search as the second argument of parser.search.substring
      // The result is the YouTube ID --> LfOWehvvuo0
      var youtubeID = parser.search.substring(parser.search.indexOf('=') + 1, parser.search.length);

      _newquestionnaire.src = 'https://www.youtube.com/embed/' + youtubeID;

      // (this is where you put your client-side validation when relevant)

      // Side note:
      // Why not use something like `$scope.questionnaireForm.title` or `$scope.newquestionnaire.title`?
      // While this certainly keeps things more organized, it is a bit risky in the Angular
      // world.  I'm no Angular expert, but we have run into plenty of 2-way-binding issues/bugs
      // in the past from trying to do this.  I've found two guiding principles that help prevent
      // these sorts of issues:
      // + very clearly separate the $scope variables in your form from the $scope variables
      //   representing the rest of your page.
      // + don't point `ng-model` at the property of an object or array (e.g. `ng-model="foo.bar"`)
      //   Angular handles its 2-way bindings by reference, and it's not too hard to get into weird
      //   situations where your objects are all tangled up.

      // Now we'll submit the new questionnaire to the server:

      // First, show a loading state
      // (also disables form submission)
      $scope.busySubmittingquestionnaire = true;

      io.socket.post('/questionnaire', {
        title: _newquestionnaire.title,
        src: _newquestionnaire.src
      }, function whenServerResponds(data, JWR) {

        $scope.questionnairesLoading = false;

        if (JWR.statusCode>=400) {
          console.log('something bad happened');
          return;
        }

        $scope.questionnaires.unshift(_newquestionnaire);

        // Hide the loading state
        // (also re-enables form submission)
        $scope.busySubmittingquestionnaire = false;

        //Clear out form inputs
        $scope.newquestionnaireTitle = '';
        $scope.newquestionnaireSrc = '';

        $scope.$apply();

      });

      io.socket.on('questionnaire', function whenAquestionnaireIsCreatedUpdatedOrDestroyed(event) {
        // console.log('Is it firing',event);

        // Add the new questionnaire to the DOM
        $scope.questionnaires.unshift({
          title: event.data.title,
          src: event.data.src
        });

        // Apply the changes to the DOM
        // (we have to do this since `io.socket.get` is not a
        // angular-specific magical promisy-thing)
        $scope.$apply();
      });


    };

  }
]);
