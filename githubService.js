(function() {

  var github = function($http, $log) {

    var getUser = function(username) {
      $log.info("Getting info for: " + username);
      return $http.get("https://api.github.com/users/" + username)
        .then(function(response) {
          return response.data;
        });
    };

    var getRepos = function(user) {
      $log.info("Getting repos at: " + user.repos_url)
      return $http.get(user.repos_url)
        .then(function(response) {
          return response.data;
        });
    };

    var getRepoUrl = function(username, reponame) {
      return "https://api.github.com/repos/" + username + "/" + reponame;
    };
    
    var getRepo = function(username, reponame) {
      var repoUrl = getRepoUrl(username, reponame)
      $log.info("Getting repo at: " + repoUrl)
      return $http.get(repoUrl)
        .then(function(response) {
          return response.data;
        });
    };

    var getContributors = function(username, reponame) {
      var contributorsUrl = getRepoUrl(username, reponame) + "/contributors";
      $log.info("Getting contributors at: " + contributorsUrl);
      return $http.get(contributorsUrl)
        .then(function(response) {
          return response.data;
        });
      
    };
    
    return {
      getUser: getUser,
      getRepos: getRepos,
      getRepo: getRepo,
      getContributors: getContributors
    };

  };

  var module = angular.module("githubUserViewer");
  module.factory("github", github);

}());