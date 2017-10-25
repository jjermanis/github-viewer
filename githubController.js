(function() {

  var app = angular.module("githubUserViewer");

  var GitHubController = function(
    $scope, $interval, $location) {

    // default values
    $scope.helpCountdown = 10;

    var clearFields = function() {
      $scope.helpPrompt = null;
    }

    var decrementHelpCountdown = function() {
      $scope.helpCountdown -= 1;
      if ($scope.helpCountdown < 1) {
        $scope.helpPrompt = "Need help?  Try searching for a github user by " 
            + "id. For example, try searching for 'jjermanis'.";
      }
    };

    $scope.search = function(username) {
      if (helpCountdownInterval)
        $interval.cancel(helpCountdownInterval);
      clearFields();
      $location.path("user/" + username);
    };

    var helpCountdownInterval = null;
    var startHelpCountdown = function() {
      helpCountdownInterval = $interval(decrementHelpCountdown, 1000, $scope.helpCountdown);
    };

    startHelpCountdown();

  };

  app.controller("GitHubController", GitHubController);

}());