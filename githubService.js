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

    return {
      getUser: getUser,
      getRepos: getRepos
    };

  };

  var module = angular.module("githubUserViewer");
  module.factory("github", github);

}());