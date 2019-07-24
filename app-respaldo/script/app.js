var app = angular.module('turneroWebApp', ['ui.router', 'ngCookies', 'base64', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'zingchart-angularjs']);

app.constant('config', {
//    'backend': 'http://172.20.10.2:8888/turneroWeb',
//    'backend': 'http://192.168.0.12:8888/turneroWeb',
//    'backend': 'http://" + config.ipFront + ":8888/domoAdminServer',
    'backend': 'http://localhost:8888/turneroWeb',
//    'backend': 'http://192.168.2.152:8888/domoAdminServer',
    'cantPaginacion': 10,
//    'ipFront': '192.168.0.12',
//    'ipFront': '172.20.10.2',
    'ipFront': 'localhost',
    'idCompControlAcceso': 7
            // el itemsPerPage faltaría configurar tbn en ui-bootstrap-tpls-2.5.0.js linea 4492
});

app.config(function ($stateProvider, $httpProvider) {
    $stateProvider.state('menu-user', {
        url: 'home',
        templateUrl: 'partial/home.html'
//        controller: 'menuCtrl'
    });
    $stateProvider.state('message', {
        url: 'message',
        templateUrl: 'partial/message.html',
        controller: 'messageCtrl'
    });
    $stateProvider.state('temperatura', {
        url: 'temperatura',
        templateUrl: 'partial/monitoreo/temperatura/index.html',
        controller: 'temperaturaCtrl'
    });
    $stateProvider.state('pruebaConsumo', {
        url: 'pruebaConsumo',
        templateUrl: 'partial/control_consumo/pruebaConsumo/index.html',
        controller: 'listPruebaConsumoCtrl'
    });
    $stateProvider.state('pruebaConsumoGral', {
        url: 'pruebaConsumoGral',
        templateUrl: 'partial/control_consumo/pruebaConsumoGral/index.html',
        controller: 'listPruebaConsumoGralCtrl'
    });
    $stateProvider.state('humo', {
        url: 'humo',
        templateUrl: 'partial/monitoreo/humo/index.html',
        controller: 'humoCtrl'
    });
    $stateProvider.state('humedad', {
        url: 'humedad',
        templateUrl: 'partial/monitoreo/humedad/index.html',
        controller: 'humedadCtrl'
    });
    $stateProvider.state('movimiento', {
        url: 'movimiento',
        templateUrl: 'partial/monitoreo/movimiento/index.html',
        controller: 'movimientoCtrl'
    });
    $stateProvider.state('sensores', {
        url: 'sensores',
        templateUrl: 'partial/automatizacion/sensores/index.html',
        controller: 'listSensorCtrl'
    });
//    $stateProvider.state('sensores', {
//        url: 'sensores',
//        templateUrl: 'partial/automatizacion/sensores/index.html',
//        controller: 'listSensorNodoCtrl'
//    });
    $stateProvider.state('fingerPrint', {
        url: 'fingerPrint',
        templateUrl: 'partial/seguridad/fingerPrint/index.html',
        controller: 'controlAccesoCtrl'
    });
    $stateProvider.state('adminEdificio', {
        url: 'adminEdificio',
        templateUrl: 'partial/seguridad/adminEdificio/index.html',
        controller: 'adminEdificioCtrl'
    });
    $stateProvider.state('roles', {
        url: 'roles',
        templateUrl: 'partial/seguridad/roles/index.html',
        controller: 'listRolesCtrl'
    });
    $stateProvider.state('modulos', {
        url: 'modulos',
        templateUrl: 'partial/seguridad/modulos/index.html',
        controller: 'listModulosCtrl'
    });
    $stateProvider.state('marcas', {
        url: 'marcas',
        templateUrl: 'partial/referencial/marca/index.html',
        controller: 'listMarcasCtrl'
    });
    $stateProvider.state('tipoComponente', {
        url: 'tipoComponente',
        templateUrl: 'partial/referencial/tipoComponente/index.html',
        controller: 'listTipoComponenteCtrl'
    });
    $stateProvider.state('componente', {
        url: 'componente',
        templateUrl: 'partial/monitoreo/componente/index.html',
        controller: 'listComponenteCtrl'
    });
    $stateProvider.state('dependencia', {
        url: 'dependencia',
        templateUrl: 'partial/referencial/dependencia/index.html',
        controller: 'listDependenciaCtrl'
    });
    $stateProvider.state('ciudad', {
        url: 'ciudad',
        templateUrl: 'partial/referencial/ciudad/index.html',
        controller: 'listCiudadCtrl'
    });
    $stateProvider.state('tipoEdificio', {
        url: 'tipoEdificio',
        templateUrl: 'partial/referencial/tipoEdificio/index.html',
        controller: 'listTipoEdificioCtrl'
    });

    $stateProvider.state('personas', {
        url: 'personas',
        templateUrl: 'partial/seguridad/personas/index.html',
        controller: 'listPersonasCtrl'
    });

    $stateProvider.state('andeCategoria', {
        url: 'andeCategoria',
        templateUrl: 'partial/referencial/andeCategoria/index.html',
        controller: 'listAndeCategoriaCtrl'
    });

    $stateProvider.state('placas', {
        url: 'placas',
        templateUrl: 'partial/referencial/placa/index.html',
        controller: 'listPlacasCtrl'
    });

    $stateProvider.state('elementos', {
        url: 'elementos',
        templateUrl: 'partial/seguridad/elementos/index.html',
        controller: 'listElementosCtrl'
    });
    $stateProvider.state('parametros', {
        url: 'parametros',
        templateUrl: 'partial/automatizacion/parametro/index.html',
        controller: 'listParametrosCtrl'
    });
    $stateProvider.state('usuarios', {
        url: 'usuarios',
        templateUrl: 'partial/seguridad/usuarios/index.html',
        controller: 'listUsuariosCtrl'
    });
    $stateProvider.state('cambiarClave', {
        url: 'cambiarClave',
        templateUrl: 'partial/seguridad/cambiarClave/index.html',
        controller: 'ChangePassUsuariosCtrl'
    });
    $stateProvider.state('historial_acceso', {
        url: 'historial_acceso',
        templateUrl: 'partial/seguridad/historial_acceso/index.html',
        controller: 'listAccesoFingerCtrl'
    });
    $stateProvider.state('tarifa', {
        url: 'tarifas',
        templateUrl: 'partial/control_consumo/tarifas/index.html',
        controller: 'listTarifaCtrl'
    });
    $stateProvider.state('edificio', {
        url: 'edificios',
        templateUrl: 'partial/control_consumo/edificios/index.html',
        controller: 'listEdificioCtrl'
    });
    $stateProvider.state('nodo', {
        url: 'nodos',
        templateUrl: 'partial/control_consumo/nodos/index.html',
        controller: 'listNodoCtrl'
    });
    $stateProvider.state('admin', {
        url: 'admin',
        templateUrl: 'partial/monitoreo/administracion/index.html',
        controller: 'listAdminCtrl'
    });
    $stateProvider.state('manejo', {
        url: 'manejo',
        templateUrl: 'partial/monitoreo/manejo_controles/index.html',
        controller: 'listManejoCtrl'
    });
    $stateProvider.state('tipoPlaca', {
        url: 'tipoPlaca',
        templateUrl: 'partial/referencial/tipoPlaca/index.html',
        controller: 'listTipoPlacaCtrl'
    });
    $stateProvider.state('nodoPin', {
        url: 'nodoPin',
        templateUrl: 'partial/control_consumo/nodoPin/index.html',
        controller: 'listNodoPinCtrl'
    });
    $stateProvider.state('placaPin', {
        url: 'placaPin',
        templateUrl: 'partial/control_consumo/placaPin/index.html',
        controller: 'listPlacaPinCtrl'
    });
    $stateProvider.state('tipoPlacaPin', {
        url: 'tipoPlacaPin',
        templateUrl: 'partial/referencial/tipoPlacaPin/index.html',
        controller: 'listTipoPlacaPinCtrl'
    });
    $stateProvider.state('consumo_general', {
        url: 'consumoGral',
        templateUrl: 'partial/control_consumo/consumoGral/index.html',
        controller: 'listConsumoGralCtrl'
    });
    $stateProvider.state('consumo', {
        url: 'consumo',
        templateUrl: 'partial/control_consumo/consumo/index.html',
        controller: 'listConsumoCtrl'
    });
    $stateProvider.state('plan', {
        url: 'plan',
        templateUrl: 'partial/automatizacion/plan/index.html',
        controller: 'listPlanCtrl'
    });

})
        .run(function ($state) {
            $state.go('menu-user');
        });