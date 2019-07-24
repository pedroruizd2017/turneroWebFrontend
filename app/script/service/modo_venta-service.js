'use strict'
appLogin
        .factory('ModoVentaService', function ($http, config) {
            var url = config.backend + "/modoVenta";
            return {
                listar: function () {
                    return $http.get(url + "/full");
                },
                sinLogin: function () {
                    return $http.get(url + "/sinLogin");
                },
                aperturaCaja: function () {
                    return $http.get(url + "/aperturaCaja");
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