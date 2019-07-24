'use strict'
appLogin
        .factory('TalonarioSucursalService', function ($http, config) {
            var url = config.backend + "/talonariosSucursale";
            return {
                listar: function () {
                    return $http.get(url + "/full");
                },
                listarPorCodigo: function (id) {
                    return $http.get(url + "/listarPorCodigo/" + id);
                },
                listarPorSucursal: function (id, idTimbrado) {
                    return $http.get(url + "/listarPorSucursal/" + id + "/" + idTimbrado);
                },
                listarPorId: function (id) {
                    return $http.get(url + "/" + id);
                },
                listarFullTRUE: function () {
                    return $http.get(url + "/fullTRUE");
                },
                actualizarPorId: function (id) {
                    return $http.get(url + "/actualizarPorId/" + id);
                },
                actualizarListo: function (id) {
                    return $http.get(url + "/actualizarListo/" + id);
                },
                bajaPorId: function (id) {
                    return $http.get(url + "/bajaPorId/" + id);
                },
                crear: function (data) {
                    return $http.post(url, data);
                },
                actualizar: function (data) {
                    return $http.put(url, data);
                },
                eliminar: function (id) {
                    return $http.delete(url + "/" + id);
                }
            };
        });