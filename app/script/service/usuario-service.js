'use strict'
appLogin
        .factory('UsuarioService', function ($http, config) {
            var url = config.backend + "/usuario";
            return {
                listar: function () {
                    return $http.get(url + "/full");
                },
                listarPorId: function (id) {
                    return $http.get(url + "/listarPorId/" + id);
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