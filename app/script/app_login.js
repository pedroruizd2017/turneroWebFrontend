var appLogin = angular.module('turneroWebLoginApp', ['ui.router', 'ngCookies', 'ui.bootstrap', 'base64']);

appLogin.constant('config', {
//    'backend': 'http://localhost:8888/turneroWeb',
//    'backend': 'http://192.168.2.152:8888/domoAdminServer',
//    'backend': 'http://172.20.10.2:8888/turneroWeb',
//    'backend': 'http://192.168.0.10:8888/turneroWeb',
    'backend': 'http://192.168.0.14:8888/turneroWeb',
//    'backend': 'http://" + config.ipFront + ":8888/domoAdminServer',
//    'backend': 'http://192.168.2.95:8888/domoAdminServer'
    'cantPaginacion': 10,
//    'ipFront': 'localhost',
//    'ipFront': '192.168.0.10',
//    'ipFront': '172.20.10.2',
    'ipFront': '192.168.0.14',
    'caja': '1',
    'sucursal': 1,
//    'ipFront': '172.20.10.2',
//    'urlNow': 'http://172.20.10.2:8017',
//    'urlNow': 'http://localhost:8017',
//    'urlNow': 'http://192.168.0.10:8017',
    'urlNow': 'http://192.168.0.14:8017',
//    'ipFront': '192.168.2.152',
    'idCompControlAcceso': 7
//    'backend': 'http://192.168.2.95:8888/domoAdminServer'z
});

//app.config(function ($stateProvider, $httpProvider) {
//    $stateProvider.state('login-user', {
//        url: '/login',
//        templateUrl: 'index.html',
//        controller: 'loginCtrl'
//    });
////    $stateProvider.state('login-user', {
////        url: '/login',
////        templateUrl: 'partial/login.html',
////        controller: 'loginCtrl'
////    });
////    $stateProvider.state('menu-user', {
////        url: '/menu',
////        templateUrl: 'partial/menu.html',
////        controller: 'loginMenu'
////    });
//})
//.run(function ($state) {
//    $state.go('login-user');
//});