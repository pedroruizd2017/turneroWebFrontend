'use strict'
appLogin
        .factory('ClienteService', function ($http, config) {
            var url = config.backend + "/clientes";
            return {
                listar: function () {
                    return $http.get(url + "/full");
                },
                listarPorCodigo: function (id) {
                    return $http.get(url + "/listarPorCodigo/" + id);
                },
                listarPorCI: function (id) {
                    return $http.get(url + "/listarPorCI/" + id);
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
                crearCliente: function (ci, nombre, apellido) {
                    return $http.get(url + "/insertarClie/" + ci + "/" + nombre + "/" + apellido);
                },
                actualizar: function (data) {
                    return $http.put(url, data);
                },
                eliminar: function (id) {
                    return $http.delete(url + "/" + id);
                }
            };
        });