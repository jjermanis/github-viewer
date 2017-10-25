(function() {
  
  var app = angular.module("githubUserViewer", ["ngRoute"]);
  
  app.config(function($routeProvider) {
    
    $routeProvider
      .when("/main", {
        templateUrl: "main.html",
        controller: "GitHubController"
      })
      .when("/user/:username", {
        templateUrl: "user.html",
        controller: "UserController"
      })
      .when("/repo/:username/:reponame", {
        templateUrl: "repo.html",
        controller: "RepoController"
      })
      .otherwise({redirectTo:"/main"});
  });
  
}());