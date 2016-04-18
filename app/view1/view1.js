'use strict';

angular.module('myApp.issues', ['js.issueFilters'])
.controller('getDetailController', ["$scope","$routeParams","$http",
	function($scope,$routeParams,$http) {
		$scope.issuenumber = $routeParams.issuenumber;
		$http.get("https://api.github.com/repos/npm/npm/issues/"+$scope.issuenumber)
		.then(function(response){
			var data = response.data;
			$scope.issue = {
				title:data.title,state:data.state,
				labels:data.labels,username:data.user.login,
				avatar:data.user.avatar_url,body:data.body
			}
		});
}]);