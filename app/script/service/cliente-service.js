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
                imprimirTicket: function (ticket) {
//                    var find1 = '<center>';
//                    var ref1 = new RegExp(find1, 'g');
//
//                    var find2 = '</center>';
//                    var ref2 = new RegExp(find2, 'g');
//
//                    var find3 = '<br>';
//                    var ref3 = new RegExp(find3, 'g');
//
//                    var find4 = '&nbsp;';
//                    var ref4 = new RegExp(find4, 'g');
//
//                    var find5 = '/';
//                    var ref5 = new RegExp(find5, 'g');

//                    var find6 = '/';
//                    var ref6 = new RegExp(find6, 'g');

//                    ticket = ticket.replace(ref1, '');
//                    ticket = ticket.replace(ref2, '\n');
//                    ticket = ticket.replace(ref3, '\n');
//                    ticket = ticket.replace(ref4, ' ');
//                    ticket = ticket.replace(ref5, '');
//                    ticket = ticket.replace(ref6, '&&');
//                    ticket = ticket.replaceAll("<center>", "");
//                    ticket = ticket.replaceAll("</center>", "\n");
//                    ticket = ticket.replaceAll("<br>", "\n");
//                    ticket = ticket.replaceAll("&nbsp;", " ");
                    console.log(url + "/imprimirTicket/" + ticket);
//                    alert(url + "/imprimirTicket/" + ticket);
                    return $http.get(url + "/imprimirTicket/" + ticket);
                },
                insertarCabeceraHistorico: function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w) {
                    return $http.get(url + "/insertarCabeceraHistorico/" + a + "/" + b + "/" + c + "/" + d + "/" + e + "/" + f + "/" + g + "/" + h + "/" + i + "/" + j + "/" + k + "/" + l + "/" + m + "/" + n + "/" + o + "/" + p + "/" + q + "/" + r + "/" + s + "/" + t + "/" + u + "/" + v + "/" + w);
                },
                actualizarClientePendiente: function (id) {
                    return $http.get(url + "/actualizarClientePendiente/" + id);
                },
                actualizarMontoCabecera: function (idFcc, monto) {
                    return $http.get(url + "/actualizarMontoCabecera/" + idFcc + "/" + monto);
                },
                enviarDetalleFactura: function (indice, idArticulo, codigo, descri, iva, cantidad, monto, total, idFactCab) {
                    return $http.get(url + "/enviarDetalleFactura/" + indice + "/" + idArticulo + "/" + codigo + "/" + descri + "/" + iva + "/" + cantidad + "/" + monto + "/" + total + "/" + idFactCab);
                },
                enviarPrueba: function (x, caja, nroPedido, obser) {
                    return $http.put(url + "/enviarPrueba/" + caja + "/" + nroPedido + "/" + obser, x);
                },
                enviarformaPago: function (idFac, descri, monto, codigo, numero) {
                    return $http.put(url + "/enviarformaPago/" + idFac + "/" + descri + "/" + monto + "/" + codigo + "/" + numero);
                },
                listarPorRuc: function (id) {
                    return $http.get(url + "/listarPorRuc/" + id);
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
                crearClienteData: function (ci, nombre, apellido) {
                    return $http.get(url + "/insertarClieData/" + ci + "/" + nombre + "/" + apellido);
                },
                actualizar: function (data) {
                    return $http.put(url, data);
                },
                eliminar: function (id) {
                    return $http.delete(url + "/" + id);
                }
            };
        });