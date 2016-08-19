'use strict';
(function(angular) {
  // 由于默认angular提供的异步请求对象不支持自定义回调函数名
  // angular随机分配的回调函数名称不被豆瓣支持
      angular.module('moviecat.services.http',[])
          .service('HttpService',['$window','$document',function($window,$document){
               this.jsonp=function(url,data,callback){
                   // url : http://api.douban.com/vsdfsdf -> <script> -> html就可自动执行
                   if(typeof data=='function'){
                       callback = data;
                   }
                   var queryString =url.indexOf('?') ==-1?'?':'&';
                   for(var key in data){
                       queryString +=key+'='+data[key]+'&';
                   }
                   var fnSuffix = Math.random().toString().replace('.','');
                   var cbFuncName = 'my_json_cb'+fnSuffix;
                   queryString +='callback='+cbFuncName;
                   var scriptElement =$document[0].createElement('script');
                   scriptElement.src=url+queryString;
                   $window[cbFuncName] =function(data){
                       callback(data);
                       $document[0].body.removeChild(scriptElement);
                   }
                   $document[0].body.appendChild(scriptElement);
               }
          }]);
})(angular);
