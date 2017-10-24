(function() {

  var app = angular.module("githubUserViewer", []);

  var GitHubController = function(
    $scope, github, $interval, $anchorScroll, $location) {

    // default values
    $scope.repoSortOrder = "-stargazers_count";
    $scope.helpCountdown = 10;

    var clearFields = function() {
      $scope.user = null;
      $scope.repos = null;
      $scope.error = null;
      $scope.helpPrompt = null;
    }

    $scope.search = function(username) {
      if (helpCountdownInterval) 
        $interval.cancel(helpCountdownInterval);
      clearFields();
      github.getUser(username).then(onUserComplete, onError);
    };

    var onUserComplete = function(data) {
      $scope.user = data;
      github.getRepos($scope.user).then(onReposComplete, onError);
    };

    var onReposComplete = function(data) {
      $scope.repos = data;
      $location.hash("userDetails");
      $anchorScroll();
    };

    var onError = function(reason) {
      $scope.error = "Could not fetch the data.";
    };


    var decrementHelpCountdown = function() {
      $scope.helpCountdown -= 1;
      if ($scope.helpCountdown < 1) {
        $scope.helpPrompt = "Need help?  Try searching for a github user by "
          +"id. For example, try searching for 'jjermanis'.";
      }
    };

    var helpCountdownInterval = null;
    var startHelpCountdown = function() {
      helpCountdownInterval = $interval(decrementHelpCountdown, 1000, $scope.helpCountdown);
    };

    startHelpCountdown();


  };

  app.controller("GitHubController", GitHubController);

}());