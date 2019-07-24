'use strict'
appLogin
        .factory('ClientePendienteService', function ($http, config) {
            var url = config.backend + "/clientePendiente";
            return {
                listar: function () {
                    return $http.get(url + "/full");
                },
                listarPendiente: function () {
                    return $http.get(url + "/listarPendiente");
                },
                listarPorCi: function (ci) {
                    return $http.get(url + "/listarPorCi/" + ci);
                },
                insertarIdTRUE: function (ci) {
                    return $http.get(url + "/insertarIdTRUE/" + ci);
                },
                actualizarEstado: function (id, estado) {
                    return $http.get(url + "/actualizarEstado/" + id + "/" + estado);
                },
                listarPorId: function (id) {
                    return $http.get(url + "/" + id);
                },
                crear: function (data) {
                    return $http.post(url, data);
                },
//                actualizar: function (id, ) {
//                    return $http.get(url + "/" + id);
//                },
                actualizar: function (data) {
                    return $http.put(url, data);
                }

//                buscandoServiciosComision: function (id, inicio, fin) {
//                    return $http.get(url + "/buscandoServiciosComision/" + id + "/" + inicio + "/" + fin);
//                },
//                buscandoServiciosComisionOrderArt: function (id, inicio, fin) {
//                    return $http.get(url + "/buscandoServiciosComisionOrderArt/" + id + "/" + inicio + "/" + fin);
//                },
//
//                actualizarListo: function (id) {
//                    return $http.get(url + "/actualizarListo/" + id);
//                },
//                bajaPorId: function (id) {
//                    return $http.get(url + "/bajaPorId/" + id);
//                },
//
//                crearRecuperarObj: function (data) {
//                    return $http.post(url + "/insertar", data);
//                },
//
//                eliminar: function (id) {
//                    return $http.delete(url + "/" + id);
//                }
            };
        });