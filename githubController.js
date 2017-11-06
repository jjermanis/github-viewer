(function() {

  var app = angular.module("githubUserViewer");

  var GitHubController = function(
    $scope, $timeout, $location) {

    var clearFields = function() {
      $scope.helpPrompt = null;
    }

    var showHelp = function() {
      $scope.helpPrompt = "Need help?  Try searching for a github user by " 
          + "id. For example, try searching for 'jjermanis'.";
    };

    $scope.search = function(username) {
      if (helpTimeout)
        $timeout.cancel(helpTimeout);
      clearFields();
      $location.path("user/" + username);
    };

    var helpTimeout = null;
    var startHelpTimeout = function() {
      helpTimeout = $timeout(showHelp, 10000);
    };

    startHelpTimeout();

  };

  app.controller("GitHubController", GitHubController);

}());
