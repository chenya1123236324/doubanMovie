(function(angular){
    'use  strict'
    angular.module('moviecat.movie_detail',[
        'ngRoute',
        'moviecat.services.http'
    ])
        .config(['$routeProvider',function($routeProvider){
            $routeProvider.when('/detail/:id',{
                templateUrl:'movie_detail/view.html',
                controller:'MovieDetailController'
            });
        }])
        .controller('MovieDetailController',[
            '$scope',
            '$route',
            '$routeParams', //路由中的参数
            'HttpService',
            'AppConfig',
            function($scope,$route,$routeParams,HttpService,AppConfig){
                $scope.movie={};
                $scope.loading =true;
                var id=$routeParams.id;
                var apiAddress= AppConfig.detailApiAddress+id;
                HttpService.jsonp(apiAddress,{},function(data){
                    console.log(data);
                    $scope.movie=data;
                    $scope.loading =false;
                    $scope.$apply();
                });

        }]);

})(angular);