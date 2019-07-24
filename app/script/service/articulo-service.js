'use strict'
appLogin
        .factory('ArticuloService', function ($http, config) {
            var url = config.backend + "/articulos";
            return {
                listar: function () {
                    return $http.get(url + "/full");
                },
                listarPorSeccion: function (id) {
                    return $http.get(url + "/listarPorSeccion/" + id);
                },
                listarPorDescripcion: function (descr) {
                    return $http.get(url + "/listarPorDescripcion/" + descr);
                },
                listarPorId: function (id) {
                    return $http.get(url + "/listarPorId/" + id);
                },
                listarPorCodigo: function (id) {
                    return $http.get(url + "/listarPorCodigo/" + id);
                },
                actualizarCantidad: function (id, canti) {
                    return $http.get(url + "/actualizarCantidad/" + id + "/" + canti);
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