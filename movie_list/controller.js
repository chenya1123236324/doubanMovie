(function(angular){
    'use  strict'
    angular.module('moviecat.movie_list',[
        'ngRoute',
        'moviecat.services.http'
    ])
        .config(['$routeProvider',function($routeProvider){
            $routeProvider.when('/:category/:page',{
                templateUrl:'movie_list/view.html',
                controller:'MovieListController'
            });
        }])

        .controller('MovieListController',[
            '$scope',
            '$route',
            '$routeParams', //路由中的参数
            'HttpService',
            'AppConfig',
            function($scope,$route,$routeParams,HttpService,AppConfig){
                var count =AppConfig.pageSize;
                var page =parseInt($routeParams.page); //当前第几页
                var start =(page-1)*count; //当前从第几页开始
                $scope.loading =true;
                $scope.subjects=[];
                $scope.title="";
                $scope.message="";
                $scope.totalCount=0;
                $scope.totalPages=0;
                $scope.currentPage=page;//当前所处的页数
                HttpService.jsonp(AppConfig.listApiAddress+$routeParams.category,
                    //$routeParams 的数据来源:1.路由匹配出来的 2.?参数
                    {
                        start:start,
                        count:count,
                        q:$routeParams.q
                    },
                    function(data){
                        $scope.title=data.title;
                        $scope.subjects=data.subjects;
                        $scope.totalCount=data.total; //总页数
                        $scope.totalPages =Math.ceil($scope.totalCount/count);
                        //$apply的作用就是让指定的表达式重新同步
                        $scope.loading =false;
                        $scope.$apply();
                });

                $scope.go=function(page){
                    if(page>=1&&page<=$scope.totalPages)
                    $route.updateParams({page: page});
                };
        }]);

})(angular);