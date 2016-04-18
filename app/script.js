		var IssueApp = angular.module('IssueApp', ['ngRoute',"js.issueFilters","ngSanitize"]);

		// configure our routes
		IssueApp.config(function($routeProvider) {
			$routeProvider
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})
			.when('/about', {
				templateUrl : 'pages/about.html',
				controller  : 'aboutController'
			})
			.when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			})
			.when("/issuenumber/:issuenumber",{
				templateUrl : 'pages/issue.html',
				controller : 'detailController'
			});
		});

		IssueApp.factory("issueFactory",function($http) {
			var dataFactory = {};

			dataFactory.getIssueLists = function(ipage) {
				var issueLists = [];
				$http.get("https://api.github.com/repos/npm/npm/issues?page="+ipage).then(function (response) {
					for (var i=0;i<response.data.length;i++ ) {
						var data = response.data[i];
						issueLists.push({
							title:data.title,number:data.number,
							labels:data.labels,issuername:data.user.login,
							issueravatar:data.user.avatar_url,body:data.body
						});
					}
				});
				return issueLists;
			}
			return dataFactory;
		});

		// create the controller and inject Angular's $scope
		IssueApp.controller('mainController', ["$scope","issueFactory",function($scope,issueFactory) {
			$scope.ipage = 1;
			$scope.issueLists=issueFactory.getIssueLists($scope.ipage);
			$scope.getIssueLists =  function (ipage) {
				if (ipage>=1) {
					$scope.issueLists=issueFactory.getIssueLists(ipage); 
					$scope.ipage=ipage;
				}
			};
			$scope.increasePage = function() {
				$scope.ipage++;
				$scope.getIssueLists($scope.ipage);
			};
			$scope.decreasePage = function () {
				$scope.ipage--;
				if ($scope.ipage>=1) {
					$scope.getIssueLists($scope.ipage);
				} else {
					$scope.ipage = 1;
				}
			};
		}]);

		IssueApp.controller('aboutController', function($scope) {
			$scope.message = 'It is the IssueViewer for npm npm';
		});

		IssueApp.controller('contactController', function($scope) {
			$scope.message="rc3097@nyu.edu";
		});

		IssueApp.controller('detailController', ['$scope','$routeParams','$http',function($scope,$routeParams,$http){
			$scope.issuenumber = $routeParams.issuenumber;
			$http.get("https://api.github.com/repos/npm/npm/issues/"+$scope.issuenumber)
				.then(function(response) {
					var  data = response.data;
					$scope.issue = {
			            title:data.title,state:data.state,
			            labels:data.labels,username:data.user.login,
			            avatar:data.user.avatar_url,body:data.body
			        };
				});
		}]);