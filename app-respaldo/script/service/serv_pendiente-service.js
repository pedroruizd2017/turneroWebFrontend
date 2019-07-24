'use strict'
appLogin
        .factory('ServPendienteService', function ($http, config) {
            var url = config.backend + "/servPendiente";
            return {
                listar: function () {
                    return $http.get(url + "/full");
                },
                buscandoServicios: function (idCP, idFunc) {
                    return $http.get(url + "/buscandoServicios/" + idCP + "/" + idFunc);
                },
                eliminarPorId: function (id) {
                    return $http.get(url + "/eliminarPorId/" + id);
                },
                actualizarPorLista: function (data) {
                    return $http.put(url + "/actualizarPorLista", data);
                },
                buscandoServiciosComision: function (id, inicio, fin) {
                    return $http.get(url + "/buscandoServiciosComision/" + id + "/" + inicio + "/" + fin);
                },
                buscandoServiciosComisionOrderArt: function (id, inicio, fin) {
                    return $http.get(url + "/buscandoServiciosComisionOrderArt/" + id + "/" + inicio + "/" + fin);
                },
                listarPorId: function (id) {
                    return $http.get(url + "/" + id);
                },
                actualizarListo: function (id) {
                    return $http.get(url + "/actualizarListo/" + id);
                },
                actualizarCantidad: function (id, cant) {
                    return $http.get(url + "/actualizarCantidad/" + id + "/" + cant);
                },
                actualizarByEstado: function (data) {
                    return $http.put(url + "/actualizarByEstado/", data);
                },
                bajaPorId: function (id) {
                    return $http.get(url + "/bajaPorId/" + id);
                },
                crear: function (data) {
                    return $http.post(url, data);
                },
                crearRecuperarObj: function (data) {
                    return $http.post(url + "/insertar", data);
                },
                actualizar: function (data) {
                    return $http.put(url, data);
                },
                eliminar: function (id) {
                    return $http.delete(url + "/" + id);
                }
            };
        });