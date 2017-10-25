(function() {

  var app = angular.module("githubUserViewer");

  var RepoController = function(
    $scope, github, $routeParams) {

    var onRepoComplete = function(data) {
      $scope.repo = data;
      console.log("Result: " + data.html_url);
      github.getContributors($scope.username, $scope.reponame).then(onContributorsComplete, onError);
    };

    var onContributorsComplete = function(data) {
      $scope.contributors = data;
    };

    var onError = function(reason) {
      $scope.error = "Could not fetch the data.";
    };

    $scope.username = $routeParams.username;
    $scope.reponame = $routeParams.reponame;
    github.getRepo($scope.username, $scope.reponame).then(onRepoComplete, onError);
    
  };

  app.controller("RepoController", RepoController);

}());