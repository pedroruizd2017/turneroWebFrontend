'use strict'
appLogin
        .factory('RangoRetiroPedidoService', function ($http, config) {
            var url = config.backend + "/rangoRetiroCompra";
            return {
                actualizarObtenerRango: function (id) {
                    return $http.get(url + "/actualizarObtenerRango/" + id);
                },
                actualizarObtenerRangoObjectActual: function (id) {
                    return $http.get(url + "/actualizarObtenerRangoObjectActual/" + id);
                },
                listarPorId: function (id) {
                    return $http.get(url + "/" + id);
                },
                listarFullPreparacion: function () {
                    return $http.get(url + "/listarFullPreparacion");
                },
                listarListo: function () {
                    return $http.get(url + "/listarListo");
                },
                listarFullListo: function () {
                    return $http.get(url + "/listarFullListo");
                },
                actualizarPreparado: function (id) {
                    return $http.get(url + "/actualizarPreparado/" + id);
                },
                actualizarListo: function (id) {
                    return $http.get(url + "/actualizarListo/" + id);
                },
                actualizarEntregado: function (id) {
                    return $http.get(url + "/actualizarEntregado/" + id);
                },
                listarUsuario: function (id) {
                    return $http.get(url + "/listarUsuario/" + id);
                },
                listarPorIdUsuario: function (id) {
                    return $http.get(url + "/idUsuario/" + id);
                },
                restauraPassPorIdUsuario: function (id) {
                    return $http.get(url + "/restauraPassPorIdUsuario/" + id);
                },
                restauraEmailPorIdUsuario: function (id) {
                    return $http.get(url + "/restauraEmailPorIdUsuario/" + id);
                },
                crear: function (data) {
                    return $http.post(url, data);
                },
                crearPorIdUsuario: function (id) {
                    return $http.get(url + "/crearPorIdUsuario/" + id);
                },
                actualizarPorIdUsuario: function (id) {
                    return $http.get(url + "/actualizarPorIdUsuario/" + id);
                },
                actualizar: function (data) {
                    return $http.put(url, data);
                },
                eliminar: function (id) {
                    return $http.delete(url + "/" + id);
                }
            };
        });