(function() {

  var app = angular.module("githubUserViewer");

  var UserController = function(
    $scope, github, $routeParams) {

    // default values
    $scope.repoSortOrder = "-stargazers_count";
 
    var clearFields = function() {
      $scope.user = null;
      $scope.repos = null;
      $scope.error = null;
    }

    var onUserComplete = function(data) {
      $scope.user = data;
      github.getRepos($scope.user).then(onReposComplete, onError);
    };

    var onReposComplete = function(data) {
      $scope.repos = data;
    };

    var onError = function(reason) {
      $scope.error = "Could not fetch the data.";
    };

    $scope.username = $routeParams.username;
    github.getUser($scope.username).then(onUserComplete, onError);
  };

  app.controller("UserController", UserController);

}());