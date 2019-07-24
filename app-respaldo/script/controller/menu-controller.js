'use strict'
appLogin
        .controller('inicioCtrl', ['$state', '$scope', 'config', '$cookies', '$interval', '$window', function ($state, $scope, config, $cookies, $interval, $window) {
                $scope.cambioTurno = function () {
                    $window.open(config.urlNow + "/cambio.html", '_blank');
                    console.log("CAMBIO TURNO")
                };
                $scope.listTurno = function () {
                    $window.open(config.urlNow + "/turnos.html", '_blank');
                    console.log("LISTA TURNO")
                };
                $scope.login = function () {
                    $window.open(config.urlNow + "/login.html", '_blank');
                    console.log("PEDIDOS");
                };
            }])
        .controller('menuCtrl', ['$state', '$scope', 'config', '$cookies', '$interval', function ($state, $scope, config, $cookies, $interval) {
//                setTimeout(alert("HOLA HORACIO"), 2000);
                $interval(function () {
//                    alert("HOLA HORACIO");
                    $("#numRetiro").fadeOut("fast")
                    $("#publicidad").fadeIn("fast")
                    $("#publicidad").html('<img style="width: 850px; height: 510px" src="https://media.giphy.com/media/v2YxCO2pwHjji/giphy.gif">')
                    setTimeout($scope.publicidad, 5000);
                }, 10000);
                $scope.publicidad = function () {
                    $("#numRetiro").fadeIn("fast")
                    $("#publicidad").fadeOut("fast")
                    $("#publicidad").html('<img style="width: 850px; height: 510px" src="https://media.giphy.com/media/v2YxCO2pwHjji/giphy.gif">')
                };
            }])
        .controller('turnoCtrl', ['$state', '$scope', 'config', '$cookies', '$interval', 'RetiroPedidoService', 'PublicidadService', function ($state, $scope, config, $cookies, $interval, RetiroPedidoService, PublicidadService) {
                $scope.retiroPedidoListos = [];
                $scope.cliente = "";
                $scope.anuncio = [];
                var numPublicidad = 0;
                var posicionPublicidad = 0;
                $scope.cargarPublicidad = function () {
                    PublicidadService.listarFullTRUE().success(function (d) {
                        $scope.anuncio = d;
                        numPublicidad = d.length;
                        posicionPublicidad = 0;
                        if (posicionPublicidad === numPublicidad) {
                            posicionPublicidad = 0;
                        } else {
                            posicionPublicidad++;
                        }
                        $("#publicidad").fadeIn("fast");
                        $("#publicidad").html('<img height="510"  src="' + $scope.anuncio[posicionPublicidad].link + '">')

                    }).error(function (e) {
                        console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                    });
                };
                $scope.cargarDatos = function () {
                    RetiroPedidoService.listar().success(function (d) {
                        angular.forEach(d, function (value, key) {
                            var descriRol = value.numero;
//                            var newstr = descriRol.replace(" ", "_");
                            value.numRetiro = descriRol;
                            $scope.retiroPedido.push(value);
                        });
                    });
                };
                $scope.listarPreparados = function () {
                    RetiroPedidoService.listarPreparacion().success(function (d) {
                        var i = 0;
                        var tabla = "";
                        var tam = d.length;
//                        alert(tam)
//                        console.log("ACA -> " + tam)
//                        tabla += "<tr class='default' style='font-size: 30pt'>";
                        angular.forEach(d, function (value, key) {
                            i++;
                            var descriRol = value.numero;
                            if (tam <= 4) {
                                tabla += "<tr style='font-size: 30pt; color: #FFF''><td><b>" + descriRol + "</b></td></tr>";
                            } else if (tam <= 8) {
                                if (i % 2 === 0) {
                                    tabla += "<td style='font-size: 30pt; color: #FFF'><b>" + descriRol + "</b></td></tr>";
                                } else {
                                    tabla += "<tr class='default'><td style='font-size: 30pt; color: #FFF'><b>" + descriRol + "</b></td>";
                                }
                            } else {
                                if (i === 3) {
                                    i = 0;
                                    tabla += "<td style='font-size: 30pt; color: #FFF'><b>" + descriRol + "</b></td></tr>";
                                } else if (i === 2) {
                                    tabla += "<td style='font-size: 30pt; color: #FFF'><b>" + descriRol + "</b></td>";
                                } else {
                                    tabla += "<tr class='default'><td style='font-size: 30pt; color: #FFF'><b>" + descriRol + "</b></td>";
                                }
                            }
//                            if (tam > 12) {
//                                if (i % 2 === 0) {
//                                    tabla += "<td style='font-size: 30pt'><b>" + descriRol + "</b></td></tr>";
//                                } else {
//                                    tabla += "<tr class='default'><td style='font-size: 30pt'><b>" + descriRol + "</b></td>";
//                                }
//                            } else {
//                                tabla += "<tr class='default' style='font-size: 30pt'><td><b>" + descriRol + "</b></td></tr>";
//                            }
                        });
                        if (tabla !== "") {
//                            tabla = "<tr class='default'>" + tabla + "</tr>";
//                            console.log("->> " + tabla)
                            if (tam === 4 || tam === 8 || tam === 12) {
                            } else {
                                if (tam <= 4) {
                                    tam += 1;
                                    for (var i = tam; i <= 4; i++) {
                                        tabla += "<tr style='font-size: 30pt; color: #0f7da4'><td><b>A100</b></td></tr>";
                                    }

                                } else if (tam <= 8) {
//                                var dif = 8 - tam;
                                    tam += 1;
//                                alert(tam)
                                    for (var i = tam; i <= 8; i++) {
                                        if (i % 2 === 0) {
                                            tabla += "<td style='font-size: 30pt; color: #0f7da4'><b>A100</b></td></tr>";
                                        } else {
                                            tabla += "<tr class='default'><td style='font-size: 30pt; color: #0f7da4'><b>A100</b></td>";
                                        }
                                    }
                                } else {
                                    tam += 1;
                                    for (var i = tam; i <= 12; i++) {
                                        if (i === 3 || i === 6 || i === 9 || i === 12) {
                                            tabla += "<td style='font-size: 30pt; color: #0f7da4'><b>A100</b></td></tr>";
                                        } else if (i === 2 || i === 5 || i === 8 || i === 11) {
                                            tabla += "<td style='font-size: 30pt; color: #0f7da4'><b>A100</b></td>";
                                        } else {
                                            tabla += "<tr class='default'><td style='font-size: 30pt; color: #0f7da4'><b>A100</b></td>";
                                        }
                                    }
                                }
                            }

                            $("#tablaListado").html(tabla);
                            $("#pedPreparado").fadeIn("slow");
                        } else {
                            for (var i = 0; i < 4; i++) {
                                tabla += "<tr style='font-size: 30pt; color: #0f7da4'><td><b>A100</b></td></tr>";
                            }
                            $("#tablaListado").html(tabla);
                            $("#pedPreparado").fadeIn("slow");
                        }
//                        alert(tabla)
                    });
                };
                $scope.entregado = function () {
                    $scope.retiroPedido = [];
                    var valorSeleccionado = "";
                    $("#listSeleccionado li").each(function (index) {
                        valorSeleccionado = $.trim($(this).text());
                        valorSeleccionado = valorSeleccionado.trim();
                        var arr = valorSeleccionado.split('-');
//                        console.log("NUMERO: " + $.trim($(this).text()) + " IS ACTIVE? : " + $(this).hasClass('active'))
                        if ($(this).hasClass('active') === true) {
//                            console.log("ENTREGADO -->> " + valorSeleccionado + " ID: " + $("#dato" + arr[0]).val());
                            RetiroPedidoService.actualizarEntregado($("#dato" + arr[0]).val()).success(function (d) {
                                if (d === true) {
                                    console.log("DATOS ACTUALIZADOS CORRECTAMENTE");
                                } else {
                                    console.log("DATOS SIN ACTUALIZARSE");
                                }
                                $scope.listaBox();
                            }).error(function (e) {
                                console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                            });
                        }
                    });
                };
                $scope.fullScreen = function () {
                    var elem = document.getElementById("body");
                    if (elem.requestFullscreen) {
                        elem.requestFullscreen();
                        console.log("1")
                    } else if (elem.mozRequestFullScreen) { /* Firefox */
                        elem.mozRequestFullScreen();
                        console.log("2")
                    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                        elem.webkitRequestFullscreen();
                        console.log("3")
                    } else if (elem.msRequestFullscreen) { /* IE/Edge */
                        elem.msRequestFullscreen();
                        console.log("4")
                    }
                }

                $scope.listaListos = function () {
//                    var elem = document.getElementById("body");
//                    elem.requestFullscreen();
//                    $scope.fullScreen();
                    RetiroPedidoService.listarListo().success(function (d) {
                        $scope.retiroPedidoListos = d;
                        if (d.length > 0) {
                            $("#pedListos").fadeIn("slow");
                            var cli = "";
                            angular.forEach(d, function (value, key) {
                                var descri = value.cliente;
                                cli += descri + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                            });
                            $("#aRetirar").html(cli);
                        } else {
                            $("#aRetirar").html("");
                        }
                        $scope.listarPreparados();
                    }).error(function (e) {
                        console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                    });
                };
                $interval(function () {
                    if (posicionPublicidad === numPublicidad) {
                        posicionPublicidad = 0;
                    } else {
                        posicionPublicidad++;
                    }
//                    if (posicionPublicidad % 2 === 0) {
//                        setTimeout(alertFunc, 3000);
//                        $("#publicidad").fadeIn("fast");
//                        $("#publicidad").html('<img style="width: 850px; height: 510px" src="' + $scope.anuncio[posicionPublicidad].link + '">')
//                    } else {
                    $("#publicidad").fadeIn("fast");
                    $("#publicidad").html('<img height="510"  src="' + $scope.anuncio[posicionPublicidad].link + '">')
//                    }
                    setTimeout($scope.publicidad(), 5000);
                }, 10000);
                $scope.publicidad = function () {
                    $scope.listaListos();
                };
//                function alertFunc() {
//                    $("#publicidad").html('CAJA 01 LISTO')
//                }

                $scope.listaListos();
                $scope.cargarPublicidad();
            }])
        .controller('cambioCtrl', ['$state', '$scope', 'config', '$cookies', '$interval', 'RetiroPedidoService', function ($state, $scope, config, $cookies, $interval, RetiroPedidoService) {
//                setTimeout(alert("HOLA HORACIO"), 2000);
                $scope.retiroPedido = [];
                $scope.cargarDatos = function () {
                    RetiroPedidoService.listar().success(function (d) {
                        angular.forEach(d, function (value, key) {
                            var descriRol = value.numero;
//                            var newstr = descriRol.replace(" ", "_");
                            value.numRetiro = descriRol;
                            $scope.retiroPedido.push(value);
                        });
                    });
                };
                $scope.next = function () {
                    alert("SIGUIENTE")
                }
                $scope.back = function () {
                    $scope.retiroPedido = [];
                    var valorSeleccionado = "";
                    $("#listSeleccionado li").each(function (index) {
                        valorSeleccionado = $.trim($(this).text());
                        valorSeleccionado = valorSeleccionado.trim();
                        var arr = valorSeleccionado.split('-');
//                        console.log("NUMERO: " + $.trim($(this).text()) + " IS ACTIVE? : " + $(this).hasClass('active'))
                        if ($(this).hasClass('active') === true) {
//                            console.log("LISTO -->> " + valorSeleccionado + " ID: " + $("#dato" + arr[0]).val());
                            RetiroPedidoService.actualizarPreparado($("#dato" + arr[0]).val()).success(function (d) {
                                if (d === true) {
                                    console.log("DATOS ACTUALIZADOS CORRECTAMENTE");
                                } else {
                                    console.log("DATOS SIN ACTUALIZARSE");
                                }
                                $scope.listaBoxSinSelecionar();
                            }).error(function (e) {
                                console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                            });
                        }
                    });
                };
                $scope.entregado = function () {
                    $scope.retiroPedido = [];
                    var valorSeleccionado = "";
                    $("#listSeleccionado li").each(function (index) {
                        valorSeleccionado = $.trim($(this).text());
                        valorSeleccionado = valorSeleccionado.trim();
                        var arr = valorSeleccionado.split('-');
//                        console.log("NUMERO: " + $.trim($(this).text()) + " IS ACTIVE? : " + $(this).hasClass('active'))
                        if ($(this).hasClass('active') === true) {
//                            console.log("ENTREGADO -->> " + valorSeleccionado + " ID: " + $("#dato" + arr[0]).val());
                            RetiroPedidoService.actualizarEntregado($("#dato" + arr[0]).val()).success(function (d) {
                                if (d === true) {
                                    console.log("DATOS ACTUALIZADOS CORRECTAMENTE");
                                } else {
                                    console.log("DATOS SIN ACTUALIZARSE");
                                }
                                $scope.listaBox();
                            }).error(function (e) {
                                console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                            });
                        }
                    });
                };
                $scope.front = function () {
                    var valorSeleccionado = "";
                    $("#listSeleccionado li").each(function () {
                        valorSeleccionado = $.trim($(this).text());
                        valorSeleccionado = valorSeleccionado.trim();
                        var arr = valorSeleccionado.split('-');
//                        console.log("PREPARACION -->> " + valorSeleccionado + " ID: " + $("#dato" + arr[0]).val());
                        RetiroPedidoService.actualizarListo($("#dato" + arr[0]).val()).success(function (d) {
                            if (d === true) {
                                console.log("DATOS ACTUALIZADOS CORRECTAMENTE");
                            } else {
                                console.log("DATOS SIN ACTUALIZARSE");
                            }
                            $scope.listaBoxSinSelecionar();
                        }).error(function (e) {
                            console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                        });
                    });
                };
                $scope.listaBox = function () {
                    var dato = false;
                    RetiroPedidoService.listarFullListo().success(function (d) {
                        $scope.listaDeSeleccionados = "";
                        angular.forEach(d, function (value, key) {
                            $scope.listaDeSeleccionados += "<li class=\"list-group-item ng-binding\"><b style=\"color: red; font-size: 22px; line-height: 1.4em;\">" + value.numero + " </b><b style=\"font-size: 20px;\"> - " + value.hora +
                                    "</b><input type=\"hidden\" id=\"dato" + value.numero.replace(" ", "_") + "\" value=\"" + value.idRetiro
                                    + "\"></li>";
                            dato = true;
                        });
                        $("#listSeleccionado").html($scope.listaDeSeleccionados);
                        if (dato === false) {
                            $("#listBox").hide();
                            $scope.listaBoxSinSelecionar();
                        } else {
                            $("#listBox").show();
                            $scope.listaBoxSinSelecionar();
                        }
                    });
                };
                $scope.listaBoxSinSelecionar = function () {
//                    console.log("HOLAAAA");
                    var myMap = new Map();
                    $scope.retiroPedido = [];
                    $("#checkAll1").removeClass();
                    $("#checkAll2").removeClass();
                    $("#checkAll1").addClass("glyphicon glyphicon-unchecked");
                    $("#checkAll2").addClass("glyphicon glyphicon-unchecked");
                    $("#listSeleccionado li").each(function (index) {
                        var valorSeleccionado = $.trim($(this).text());
                        myMap.set(valorSeleccionado, valorSeleccionado);
                        $("#listBox").show();
                    });
                    RetiroPedidoService.listarFullPreparacion().success(function (d) {
                        angular.forEach(d, function (value, key) {
                            var descriRol = value.numero;
                            var mapeo = myMap.get(descriRol);
                            if (mapeo === undefined) {
//                                console.log("CAHUUUUUU");
                                var newstr = descriRol.replace(" ", "_");
                                value.numRetiro = newstr;
                                $scope.retiroPedido.push(value);
                                $("#listBox").show();
                            }
                        });
                    });
                };
                $scope.listaBox();
                $(function () {
                    $('#listBox').on('click', '.list-group .list-group-item', function () {
                        $(this).toggleClass('active');
//                        $(this).addClass('active');
                    });
                    $('#listBoxModificar').on('click', '.list-group .list-group-item', function () {
                        $(this).toggleClass('active');
                    });
                    $('.list-arrows button').click(function () {
                        var $button = $(this), actives = '';
                        if ($button.hasClass('move-left')) {
                            actives = $('.list-right ul li.active');
//                            actives.clone().appendTo('.list-left ul');
                            actives.remove();
                        }
                        if ($button.hasClass('move-right')) {
                            actives = $('.list-left ul li.active');
                            actives.clone().appendTo('.list-right ul');
                            actives.remove();

                            $scope.front();
                        }
                    });
                    $('.dual-list .selector').click(function () {
                        var $checkBox = $(this);
                        if (!$checkBox.hasClass('selected')) {
                            $checkBox.addClass('selected').closest('.well').find('ul li:not(.active)').addClass('active');
                            $checkBox.children('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
                        } else {
                            $checkBox.removeClass('selected').closest('.well').find('ul li.active').removeClass('active');
                            $checkBox.children('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
                        }
                    });
                    $('[name="SearchDualList"]').keyup(function (e) {
                        var code = e.keyCode || e.which;
                        if (code === '9')
                            return;
                        if (code === '27')
                            $(this).val(null);
                        var $rows = $(this).closest('.dual-list').find('.list-group li');
                        var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
                        $rows.show().filter(function () {
                            var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                            return !~text.indexOf(val);
                        }).hide();
                    });
                });
            }])
        .controller('clienteCtrl', ['$state', '$scope', 'config', '$cookies', '$interval', 'RetiroPedidoService', 'ClienteService', 'ClientePendienteService', function ($state, $scope, config, $cookies, $interval, RetiroPedidoService, ClienteService, ClientePendienteService) {
//                setTimeout(alert("HOLA HORACIO"), 2000);
                $scope.retiroPedido = [];
                $scope.cargarDatos = function () {
                    RetiroPedidoService.listar().success(function (d) {
                        angular.forEach(d, function (value, key) {
                            var descriRol = value.numero;
//                            var newstr = descriRol.replace(" ", "_");
                            value.numRetiro = descriRol;
                            $scope.retiroPedido.push(value);
                        });
                    });
                };
                $scope.back = function () {
                    $scope.retiroPedido = [];
                    var valorSeleccionado = "";
                    $("#listSeleccionado li").each(function (index) {
                        valorSeleccionado = $.trim($(this).text());
                        valorSeleccionado = valorSeleccionado.trim();
                        var arr = valorSeleccionado.split('-');
//                        console.log("NUMERO: " + $.trim($(this).text()) + " IS ACTIVE? : " + $(this).hasClass('active'))
                        if ($(this).hasClass('active') === true) {
//                            console.log("LISTO -->> " + valorSeleccionado + " ID: " + $("#dato" + arr[0]).val());
                            RetiroPedidoService.actualizarPreparado($("#dato" + arr[0]).val()).success(function (d) {
                                if (d === true) {
                                    console.log("DATOS ACTUALIZADOS CORRECTAMENTE");
                                } else {
                                    console.log("DATOS SIN ACTUALIZARSE");
                                }
                                $scope.listaBoxSinSelecionar();
                            }).error(function (e) {
                                console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                            });
                        }
                    });
                };
                $scope.ingresar = function () {
                    ClienteService.listarPorCI($("#ciCliente").val()).success(function (d) {
                        if (d.nombre === undefined) {
//                            alert("USUARIO INGRESADO NO EXISTE");
                            birdAlert.notify({
                                msg: "USUARIO INGRESADO NO EXISTE.",
                                title: 'Mensaje del Sistema',
                                className: 'error'
                            });
                            $("#oculta").css("display", "none");
                            $("#ciCliente").attr('disabled', 'disabled');
                            $("#cliNombre").css("display", "inline");
                            $("#cliApellido").css("display", "inline");
                            $("#cliRegistrar").css("display", "inline");
                            $("#btnIngresar").css("display", "none");
                        } else {
//                            ClientePendienteService.listarPorCi(d.ruc).success(function (data) {
//                                if (data.cliente === null) {
//                                    ClientePendienteService.insertarIdTRUE(d.ruc).success(function (datosHERE) {
//                                        location.href = "./menu.html";
//                                        $cookies.putObject("usuarioLogueado", d);
//                                        $cookies.put("estado", true);
//                                    }).error(function (e) {
//                                    });
//                                } else {
                            location.href = "./menu.html";
                            $cookies.putObject("usuarioLogueado", d);
                            $cookies.put("estado", true);
//                                }
//                            }).error(function (e) {
//                            });
                        }
//                        $scope.listaBox();
                    }).error(function (e) {
                        console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                    });
                }
//                $scope.ingresar = function () {
//                    ClienteService.listarPorCodigo($("#telNumber").val()).success(function (d) {
//                        if (d.nombre === undefined) {
//                            birdAlert.notify({
//                                msg: "USUARIO INGRESADO NO EXISTE.",
//                                title: 'Mensaje del Sistema',
//                                className: 'error'
//                            });
//                        } else {
////                            alert("BIENVENIDO -> " + d.nombre + " " + d.apellido);
//                            location.href = "./menu.html";
//                            $cookies.putObject("usuarioLogueado", d);
//                            $cookies.put("estado", true);
//                        }
////                        $scope.listaBox();
//                    }).error(function (e) {
//                        console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
//                    });
//                }

                $scope.registrarCli = function () {
//                    alert($("#ciCliente").val() + " || " + $("#nombreCliente").val() + " || " + $("#apellidoCliente").val());
                    if ($("#ciCliente").val() === "" || $("#nombreCliente").val() === "" || $("#apellidoCliente").val() === "") {
                        birdAlert.notify({
                            msg: "LOS CAMPOS NO DEBEN QUEDAR VACIOS",
                            title: 'Mensaje del Sistema',
                            className: 'error'
                        });
                    } else {
//                    alert("DATOS BD--->>>" + $("#ciCliente").val() + $("#nombreCliente").val() + $("#apellidoCliente").val())
                        ClienteService.crearCliente($("#ciCliente").val(), $("#nombreCliente").val(), $("#apellidoCliente").val()).success(function (d) {
                            if (d.nombre === undefined) {
                                birdAlert.notify({
                                    msg: "NO SE PUDO INGRESAR AL SISTEMA, VERIFIQUE DATOS",
                                    title: 'Mensaje del Sistema',
                                    className: 'error'
                                });
                                alert("NO SE PUDO INGRESAR AL SISTEMA");
//                            $("#oculta").css("display","none")
//                            $("#ciCliente").attr('disabled','disabled');
//                            $("#cliNombre").css("display","inline")
//                            $("#cliApellido").css("display","inline")
//                            $("#cliRegistrar").css("display","inline")
                            } else {
//                            birdAlert.notify({
//                                msg: "BIENVENIDO -> " + d.nombre + " " + d.apellido,
//                                title: 'Mensaje del Sistema',
//                                className: 'success'
//                            });
                                ClientePendienteService.listarPorCi($("#ciCliente").val()).success(function (data) {
                                    if (data.cliente === null) {
                                        ClienteService.listarPorCodigo($("#ciCliente").val()).success(function (d) {
                                            ClientePendienteService.insertarIdTRUE(d.idCliente).success(function (datosHERE) {
                                                location.href = "./menu.html";
                                                $cookies.putObject("usuarioLogueado", d);
                                                $cookies.put("estado", true);
                                            }).error(function (e) {
                                            });
                                        }).error(function (e) {
                                            console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                                        });
                                    } else {
                                        location.href = "./menu.html";
                                        $cookies.putObject("usuarioLogueado", d);
                                        $cookies.put("estado", true);
                                    }
                                }).error(function (e) {
                                });
//                            alert("BIENVENIDO -> " + d.nombre + " " + d.apellido);
//                            location.href = "./menu.html";
//                            $cookies.putObject("usuarioLogueado", d);
//                            $cookies.put("estado", true);
                            }
//                        $scope.listaBox();
                        }).error(function (e) {
                            console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                        });
                    }
                }
                $scope.entregado = function () {
                    $scope.retiroPedido = [];
                    var valorSeleccionado = "";
                    $("#listSeleccionado li").each(function (index) {
                        valorSeleccionado = $.trim($(this).text());
                        valorSeleccionado = valorSeleccionado.trim();
                        var arr = valorSeleccionado.split('-');
//                        console.log("NUMERO: " + $.trim($(this).text()) + " IS ACTIVE? : " + $(this).hasClass('active'))
                        if ($(this).hasClass('active') === true) {
//                            console.log("ENTREGADO -->> " + valorSeleccionado + " ID: " + $("#dato" + arr[0]).val());
                            RetiroPedidoService.actualizarEntregado($("#dato" + arr[0]).val()).success(function (d) {
                                if (d === true) {
                                    console.log("DATOS ACTUALIZADOS CORRECTAMENTE");
                                } else {
                                    console.log("DATOS SIN ACTUALIZARSE");
                                }
                                $scope.listaBox();
                            }).error(function (e) {
                                console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                            });
                        }
                    });
                };
                $scope.front = function () {
                    var valorSeleccionado = "";
                    $("#listSeleccionado li").each(function () {
                        valorSeleccionado = $.trim($(this).text());
                        valorSeleccionado = valorSeleccionado.trim();
                        var arr = valorSeleccionado.split('-');
//                        console.log("PREPARACION -->> " + valorSeleccionado + " ID: " + $("#dato" + arr[0]).val());
                        RetiroPedidoService.actualizarListo($("#dato" + arr[0]).val()).success(function (d) {
                            if (d === true) {
                                console.log("DATOS ACTUALIZADOS CORRECTAMENTE");
                            } else {
                                console.log("DATOS SIN ACTUALIZARSE");
                            }
                            $scope.listaBoxSinSelecionar();
                        }).error(function (e) {
                            console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                        });
                    });
                };
                var birdAlert = new BirdAlert({
                    position: 'top right'
                });
                $scope.listaBox = function () {
                    var dato = false;
                    RetiroPedidoService.listarFullListo().success(function (d) {
                        $scope.listaDeSeleccionados = "";
                        angular.forEach(d, function (value, key) {
                            $scope.listaDeSeleccionados += "<li class=\"list-group-item ng-binding\"><b style=\"color: red; font-size: 22px; line-height: 1.4em;\">" + value.numero + " </b><b style=\"font-size: 20px;\"> - " + value.hora +
                                    "</b><input type=\"hidden\" id=\"dato" + value.numero.replace(" ", "_") + "\" value=\"" + value.idRetiro
                                    + "\"></li>";
                            dato = true;
                        });
                        $("#listSeleccionado").html($scope.listaDeSeleccionados);
                        if (dato === false) {
                            $("#listBox").hide();
                            $scope.listaBoxSinSelecionar();
                        } else {
                            $("#listBox").show();
                            $scope.listaBoxSinSelecionar();
                        }
                    });
                };
            }])
        .controller('mainMenuCtrl', ['$state', '$compile', '$scope', 'config', '$cookies', '$interval', 'RetiroPedidoService', 'ClienteService', 'EmpresaService', 'SeccionService', 'ArticuloService', 'ServPendienteService', 'ClientePendienteService', 'SupervisorService', function ($state, $compile, $scope, config, $cookies, $interval, RetiroPedidoService, ClienteService, EmpresaService, SeccionService, ArticuloService, ServPendienteService, ClientePendienteService, SupervisorService) {
                $scope.srvPendiente = [];
                $scope.totalGral = "";
                $scope.jsonUserLogueado = $cookies.getObject("usuarioLogueado");
                $scope.nomEmpresa = "";
                $scope.nomEmpresa2 = "";
                $scope.telEmpresa = "";
                $scope.emailEmpresa = "";
                $scope.nomSeccion = "";
                $scope.descripcion = "";
                $scope.precio = "";
                $scope.observacion = "";
                var myMap = new Map();
//                document.getElementById('simple_prompt').addEventListener('click', function () {
//                    popup.prompt(
//                            {
//                                content: 'Ingrese código de Supervisor para eliminar'
//                            },
//                            function (config) {
//                                if (config.input_value && config.proceed) {
//                                    popup.alert({
//                                        content: 'Hi, ' + config.input_value
//                                    });
//                                } else if (!config.proceed) {
//                                    popup.alert({
//                                        content: 'You clicked cancel.'
//                                    });
//                                }
//                            }
//                    );
//                });

//                $scope.format = function (input) {
//                    alert(input);
//                    var num = input.value.replace(/\./g, '');
//                    if (!isNaN(num)) {
//                        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
//                        num = num.split('').reverse().join('').replace(/^[\.]/, '');
//                        input.value = num;
//                    } else {
//                        alert('Solo se permiten numeros');
//                        input.value = input.value.replace(/[^\d\.]*/g, '');
//                    }
//                }

                $scope.openModalPrecio = function () {
                    $("#valor").val(false);
                    $scope.cargarCarrito(true);
                };
                $scope.eliminar = function (rl) {
                    $("#exampleModalLong").modal("hide");
//                    alert(rl.descripcion + " " + rl.idServPendiente);
                    popup.prompt(
                            {
                                content: 'Ingrese código de Supervisor para eliminar ' + rl.descripcion
                            },
                            function (config) {
                                if (config.input_value && config.proceed) {
                                    SupervisorService.listarPorCod(config.input_value).success(function (d) {
                                        if (d.idSupervisor === null) {
                                            birdAlert.notify({
                                                msg: 'Código ingresado no existe, verifíquelo.',
                                                title: 'Mensaje del Sistema',
                                                className: 'error'
                                            });
                                            $("#exampleModalLong").modal("show");
                                        } else {
                                            console.log("-->> " + rl.idServPendiente);
                                            ServPendienteService.eliminarPorId(rl.idServPendiente).success(function (d) {
                                                if (d === true) {
                                                    $("#valor").val(true);
                                                    birdAlert.notify({
                                                        msg: 'Datos eliminados correctamente.',
                                                        title: 'Mensaje del Sistema',
                                                        className: 'success'
                                                    });
//                                                    $("#exampleModalLong").modal("show");aaaaaaaaaa
                                                    $scope.cargarCarrito(true);
                                                } else {
                                                    birdAlert.notify({
                                                        msg: 'Datos no eliminados verifíquelos.',
                                                        title: 'Mensaje del Sistema',
                                                        className: 'error'
                                                    });
                                                }
                                            }).error(function (e) {
                                                birdAlert.notify({
                                                    msg: 'NO SE PUDO CONECTAR CON EL SERVIDOR...',
                                                    title: 'Mensaje del Sistema',
                                                    className: 'error'
                                                });
                                            });
                                        }
                                    }).error(function (e) {
                                        birdAlert.notify({
                                            msg: 'NO SE PUDO CONECTAR CON EL SERVIDOR...',
                                            title: 'Mensaje del Sistema',
                                            className: 'error'
                                        });
                                    });
//                                    popup.alert({
//                                        content: 'Datos eliminados correctamente'
//                                    });

                                } else if (!config.proceed) {
//                                    popup.alert({
//                                        content: 'You clicked cancel.'
//                                    });
                                    $("#exampleModalLong").modal("show");
                                }
                            }
                    );
                }
                var birdAlert = new BirdAlert({
                    position: 'bottom right'
                });
//                $('#btnBasic').on('click', function () {
//                    birdAlert.notify({
//                        msg: 'Basic mensage',
//                        title: 'Success',
//                        className: 'success'
//                    });
//                });
                $scope.cargarArticulo = function (articulo) {
                    var id = $("#da" + articulo).val();
//                    alert("ID ARTICULO: " + id + " - ");
                    var x = 0;
                    var estado = false;
                    if ($scope.srvPendiente.length === 0) {
                        ArticuloService.listarPorCodigo(id).success(function (d) {
                            var idArticulo = d.idArticulo;
                            var montoSrv = d.precioMin;
                            var montoComisio = 0;
                            var comisionPorc = false;
                            var porIva = d.iva.poriva;
                            var descripcion = d.descripcion;
                            var codArticulo = d.codArticulo;
                            var porc = 0;
                            var cantidad = 1;
                            ClientePendienteService.listarPorCi($scope.jsonUserLogueado.ruc).success(function (data) {
                                var idClientePendiente = data.idClientePendiente;
                                var idFuncionario = 0;
                                $scope.pendientes = {};
                                $scope.pendientes.articulo = {};
                                $scope.pendientes.clientePendiente = {};
                                $scope.pendientes.funcionario = {};
                                $scope.pendientes.articulo.idArticulo = idArticulo;
                                $scope.pendientes.montoServ = montoSrv;
                                $scope.pendientes.montoComision = montoComisio;
                                $scope.pendientes.comisionPorc = comisionPorc;
                                $scope.pendientes.poriva = porIva;
                                $scope.pendientes.descripcion = descripcion;
                                $scope.pendientes.codArticulo = codArticulo;
                                $scope.pendientes.porc = porc;
                                $scope.pendientes.cantidad = cantidad;
                                $scope.pendientes.cantidad = cantidad;
                                $scope.pendientes.clientePendiente.idClientePendiente = idClientePendiente;
                                $scope.pendientes.funcionario.idFuncionario = idFuncionario;
                                ServPendienteService.crearRecuperarObj($scope.pendientes).success(function (data) {
                                    if (data === true) {
                                        var num = 0;
                                        var i = 1;
                                        if ($scope.srvPendiente.length === 0) {
                                            num = parseInt(cantidad) * parseInt(montoSrv);
                                            birdAlert.notify({
                                                msg: 'Subtotal: ' + formatNumber.new(num) + " Gs.",
                                                title: 'Datos Registrados Correctamente',
                                                className: 'success'
                                            });
                                            $scope.cargarCarrito(false);
                                        } else {
                                            angular.forEach($scope.srvPendiente, function (dato, key) {
//                                            if (data.idServPendiente === dato.idServPendiente) {
//                                                num += parseInt(cantidad) * parseInt(dato.montoServ);
//                                            } else {
                                                num += parseInt(dato.cantidad) * parseInt(dato.montoServ);
//                                            }
                                                if (i === $scope.srvPendiente.length) {
                                                    num += parseInt(cantidad) * parseInt(montoSrv);
                                                    birdAlert.notify({
                                                        msg: 'Subtotal: ' + formatNumber.new(num) + " Gs.",
                                                        title: 'Datos Registrados Correctamente',
                                                        className: 'success'
                                                    });
//                                                    $("#exampleModalLong").modal("show");aaaaaaaaaa
                                                    $scope.cargarCarrito(false);
                                                }
                                                i++;
                                            });
                                        }

//                                        $scope.cargarCarrito(true);
                                    }
                                }).error(function (e) {
                                });
                            }).error(function (e) {
                            });
                        }).error(function (e) {
                        });
                    } else {
                        angular.forEach($scope.srvPendiente, function (data, key) {
                            if (parseInt(data.codArticulo) === parseInt(id)) {
                                estado = true;
                                var canti = parseInt(data.cantidad) + 1;
                                ServPendienteService.actualizarCantidad(data.idServPendiente, canti).success(function (d) {
                                    if (d === true) {
                                        var num = 0;
                                        var i = 1;
                                        angular.forEach($scope.srvPendiente, function (dato, key) {
                                            if (data.idServPendiente === dato.idServPendiente) {
                                                num += parseInt(canti) * parseInt(dato.montoServ);
                                            } else {
                                                num += parseInt(dato.cantidad) * parseInt(dato.montoServ);
                                            }
                                            if (i === $scope.srvPendiente.length) {
                                                birdAlert.notify({
                                                    msg: 'Subtotal: ' + formatNumber.new(num) + " Gs.",
                                                    title: 'Datos Registrados Correctamente',
                                                    className: 'success'
                                                });
//                                                    $("#exampleModalLong").modal("show");aaaaaaaaaa
                                                $scope.cargarCarrito(false);
                                            }
                                            i++;
                                        });
                                    }
                                }).error(function (e) {
                                });
                            }
                            x++;
                            if (parseInt(x) === parseInt($scope.srvPendiente.length)) {
                                if (!estado) {
                                    ArticuloService.listarPorCodigo(id).success(function (d) {
                                        var idArticulo = d.idArticulo;
                                        var montoSrv = d.precioMin;
                                        var montoComisio = 0;
                                        var comisionPorc = false;
                                        var porIva = d.iva.poriva;
                                        var descripcion = d.descripcion;
                                        var codArticulo = d.codArticulo;
                                        var porc = 0;
                                        var cantidad = 1;
                                        ClientePendienteService.listarPorCi($scope.jsonUserLogueado.ruc).success(function (data) {
                                            var idClientePendiente = data.idClientePendiente;
                                            var idFuncionario = 0;
                                            $scope.pendientes = {};
                                            $scope.pendientes.articulo = {};
                                            $scope.pendientes.clientePendiente = {};
                                            $scope.pendientes.funcionario = {};
                                            $scope.pendientes.articulo.idArticulo = idArticulo;
                                            $scope.pendientes.montoServ = montoSrv;
                                            $scope.pendientes.montoComision = montoComisio;
                                            $scope.pendientes.comisionPorc = comisionPorc;
                                            $scope.pendientes.poriva = porIva;
                                            $scope.pendientes.descripcion = descripcion;
                                            $scope.pendientes.codArticulo = codArticulo;
                                            $scope.pendientes.porc = porc;
                                            $scope.pendientes.cantidad = cantidad;
                                            $scope.pendientes.cantidad = cantidad;
                                            $scope.pendientes.clientePendiente.idClientePendiente = idClientePendiente;
                                            $scope.pendientes.funcionario.idFuncionario = idFuncionario;
                                            ServPendienteService.crearRecuperarObj($scope.pendientes).success(function (data) {
                                                if (data === true) {
//                                                    birdAlert.notify({
//                                                        msg: 'Datos registrados correctamente.',
//                                                        title: 'Mensaje del Sistema',
//                                                        className: 'success'
//                                                    });
//                                                    $scope.cargarCarrito(true);
                                                    var num = 0;
                                                    var i = 1;
                                                    if ($scope.srvPendiente.length === 0) {
                                                        num = parseInt(cantidad) * parseInt(montoSrv);
                                                        birdAlert.notify({
                                                            msg: 'Subtotal: ' + formatNumber.new(num) + " Gs.",
                                                            title: 'Datos Registrados Correctamente',
                                                            className: 'success'
                                                        });
                                                        $scope.cargarCarrito(false);
                                                    } else {
                                                        angular.forEach($scope.srvPendiente, function (dato, key) {
                                                            num += parseInt(dato.cantidad) * parseInt(dato.montoServ);
                                                            if (i === $scope.srvPendiente.length) {

                                                                num += parseInt(cantidad) * parseInt(montoSrv);
                                                                birdAlert.notify({
                                                                    msg: 'Subtotal: ' + formatNumber.new(num) + " Gs.",
                                                                    title: 'Datos Registrados Correctamente',
                                                                    className: 'success'
                                                                });
//                                                    $("#exampleModalLong").modal("show");aaaaaaaaaa
                                                                $scope.cargarCarrito(false);
                                                            }
                                                            i++;
                                                        });
                                                    }
                                                }
                                            }).error(function (e) {
                                            });
                                        }).error(function (e) {
                                        });
                                    }).error(function (e) {
                                    });
                                }
                            }
                        });
                    }
                };
                $interval(function () {
                    ClientePendienteService.listarPorCi($scope.jsonUserLogueado.ruc).success(function (data) {
                        if (data.procesado === true) {
                            location.href = "login.html";
                        }
                    }).error(function (e) {
                    });
                }, 3000);
                $scope.salir = function () {
                    location.href = "./login.html";
                    $cookies.remove("usuarioLogueado");
                    $cookies.remove("estado");
                }
                $scope.confirmar = function (rl) {
                    $("#exampleModalLong").modal("hide");
//                    alert("ESTO ES: " + $("#valor").val());
                    if ($("#valor").val() === "true") {
                        popup.prompt(
                                {
                                    content: 'Ingrese código de Supervisor para actualizar los datos '
                                },
                                function (config) {
                                    if (config.input_value && config.proceed) {
                                        SupervisorService.listarPorCod(config.input_value).success(function (d) {
                                            if (d.idSupervisor === null) {
                                                birdAlert.notify({
                                                    msg: 'Código ingresado no existe, verifíquelo.',
                                                    title: 'Mensaje del Sistema',
                                                    className: 'error'
                                                });
//                                            $("#exampleModalLong").modal("show");
                                            } else {
//                                            console.log("-->> " + rl.idServPendiente);
                                                var valor = false;
                                                var num = $scope.srvPendiente.length;
                                                var i = 0;
                                                angular.forEach($scope.srvPendiente, function (data, key) {
                                                    data.cantidad = $("#data" + data.idServPendiente).val();
                                                    ServPendienteService.actualizarByEstado(data).success(function (d) {
                                                        if (data === true) {
                                                            valor = true;
                                                        }
                                                        i++;
                                                        console.log("i: " + i + " num: " + num);
                                                        if (i === num) {
                                                            birdAlert.notify({
                                                                msg: 'Datos actualizados correctamente.',
                                                                title: 'Mensaje del Sistema',
                                                                className: 'success'
                                                            });
//                                                    $("#exampleModalLong").modal("show");aaaaaaaaaa
                                                            $scope.cargarCarrito(true);
                                                        }
                                                    }).error(function (e) {
                                                    });
                                                });
//                                            if (i === num && valor) {
//                                                birdAlert.notify({
//                                                    msg: 'Datos actualizados correctamente.',
//                                                    title: 'Mensaje del Sistema',
//                                                    className: 'success'
//                                                });
////                                                    $("#exampleModalLong").modal("show");aaaaaaaaaa
//                                                $scope.cargarCarrito(true);
//                                            } 
//                                            else {
//                                                birdAlert.notify({
//                                                    msg: 'Datos no actualizados verifíquelos.',
//                                                    title: 'Mensaje del Sistema',
//                                                    className: 'error'
//                                                });
//                                            }
                                            }
                                        }).error(function (e) {
                                            birdAlert.notify({
                                                msg: 'NO SE PUDO CONECTAR CON EL SERVIDOR...',
                                                title: 'Mensaje del Sistema',
                                                className: 'error'
                                            });
                                        });
//                                    popup.alert({
//                                        content: 'Datos eliminados correctamente'
//                                    });

                                    } else if (!config.proceed) {
//                                    popup.alert({
//                                        content: 'You clicked cancel.'
//                                    });
                                        $("#exampleModalLong").modal("show");
                                    }
                                }
                        );
                    }

//                    angular.forEach($scope.srvPendiente, function (data, key) {
//                        console.log("-> " + data.idServPendiente + " - " + data.descripcion + " - " + $("#data" + data.idServPendiente).val());
//                    });
                };

                $scope.detalleProducto = function (id) {
                    $("#imagenProd").html("");
                    ArticuloService.listarPorId(id).success(function (response) {
//                        alert("DESCRIPCION: " + response.idArticulo + " - OBSERVACION: " + response.observacion);
                        $scope.descripcion = response.descripcion;
                        $scope.observacion = response.observacion;
                        $scope.precio = formatNumber.new(response.precioMin, 'Gs.');
                        var datoForm = "";
                        if (response.imagen === null) {
                            datoForm = '<img title=" " alt=" " src="img/sin_imagen.png" style="width: 110px; height: 110px" id="photo-id" />';
                        } else {
                            datoForm = '<img title=" " alt=" " ng-src="data:image/jpeg;base64,' + response.imagen + '" style="width: 110px; height: 110px" id="photo-id" />';
                        }
                        var $el = $(datoForm).appendTo('#imagenProd');
                        $compile($el)($scope);
                        $("#modal2").modal("show");
                    }).error(function (e) {
                        console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                    });
                };
                $scope.cargarCarrito = function (value) {
                    var idCP = myMap.get($scope.nombreUsuario.toUpperCase());
                    $("#valor").val(false);
                    if (idCP === undefined) {
                        ClientePendienteService.listarPorCi($scope.jsonUserLogueado.ruc).success(function (d) {
                            ClientePendienteService.actualizarEstado(d.idClientePendiente, false).success(function (data) {
                                if (data === true) {
                                    $scope.listarClientePendientes();
                                    $scope.totalGral = formatNumber.new("0");
//                                    alert("CERO")
//                                    $("#exampleModalLong").modal("show");
                                }
                            }).error(function (e) {
                            });
                        }).error(function (e) {
                        });
//                        birdAlert.notify({
//                            msg: 'EL CLIENTE DEBE SER AGREGADO AL SISTEMA',
//                            title: 'Mensaje del Sistema',
//                            className: 'error'
//                        });

//                        location.href = "login.html";
                    } else {
                        $scope.srvPendiente = [];
                        ServPendienteService.buscandoServicios(idCP, 0).success(function (d) {
                            var sumTotal = 0;
                            $scope.totalGral = formatNumber.new("0");
                            var x = 0;
                            angular.forEach(d, function (data, key) {
//                            $("#data" + data.idServPendiente).val(data.cantidad)
                                sumTotal += parseInt(data.cantidad) * parseInt(data.montoServ);
                                console.log("ESTO --> " + $("#data" + data.idServPendiente).val() + " - " + data.descripcion + " - " + data.montoServ);
//                            console.log("-> " + (parseInt(data.cantidad) * parseInt(data.montoServ)));
                                console.log("-> " + x + " - " + d.length);
                                x++;
                                if (parseInt(x) === parseInt(d.length)) {
                                    $scope.totalGral = formatNumber.new(sumTotal);
                                }
                            });
                            $scope.srvPendiente = d;
                            if (value) {
//                                alert("ZERO")
                                $("#exampleModalLong").modal("show");
                            }
                        }).error(function (e) {
                            console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                        });
                    }
                }
                $scope.changeVal = function (index) {
                    var sumTotal = 0;
                    var x = 1;
                    angular.forEach($scope.srvPendiente, function (data, key) {
                        console.log("-> " + parseInt(data.cantidad) + " X " + parseInt(data.montoServ) + " = " + (parseInt(data.cantidad) * parseInt(data.montoServ)));
                        sumTotal += parseInt(data.cantidad) * parseInt(data.montoServ);
                        if (parseInt(x) === parseInt($scope.srvPendiente.length)) {
                            $scope.totalGral = formatNumber.new(sumTotal);
                            $("#valor").val(true);
                            console.log("TOTAL: " + $scope.totalGral);
                        }
                        x++;
                    });
                }
                $scope.consultarDatosEmpresa = function () {
//EmpresaService.lis
                    EmpresaService.listar().success(function (d) {
                        var i = 0;
                        angular.forEach(d, function (value, key) {
                            if (i === 0) {
                                $scope.emailEmpresa = value.email;
                                $("#emailEmpresa").html($scope.emailEmpresa);
                                $("#emailEmpresa").fadeIn("slow");
                                $scope.telEmpresa = value.telefono;
                                $("#telEmpresa").html($scope.telEmpresa);
                                $("#telEmpresa").fadeIn("slow");
                                var datoString = value.descripcionEmpresa.split(" ");
                                var tam = parseInt(datoString.length + "");
                                if (tam > 1) {
                                    $scope.nomEmpresa = datoString[0];
                                    $("#nomEmpresa").html($scope.nomEmpresa);
                                    $("#nomEmpresa").fadeIn("slow")
                                    for (var y = 1; y < tam; y++) {
                                        $scope.nomEmpresa2 += datoString[y] + " ";
                                        $("#nomEmpresa2").html($scope.nomEmpresa2);
                                        $("#nomEmpresa2").fadeIn("slow")
                                    }
                                } else {
                                    $scope.nomEmpresa = "";
                                    $("#nomEmpresa").fadeIn("slow")
                                    $("#nomEmpresa").html($scope.nomEmpresa);
                                    $scope.nomEmpresa2 = value.descripcionEmpresa;
                                    $("#nomEmpresa2").html($scope.nomEmpresa2);
                                    $("#nomEmpresa2").fadeIn("slow")
                                }

                                SeccionService.listarActivos().success(function (datus) {
                                    var datoForm = '';
                                    var y = 0;
                                    angular.forEach(datus, function (dati, key) {
                                        if (y === 0) {
                                            $scope.nomSeccion = dati.descripcion;
                                            $("#nomSeccion").html($scope.nomSeccion);
                                            $("#nomSeccion").fadeIn("slow")
                                            $scope.mostrarPorSeccion(dati.idSeccion);
                                        }
                                        datoForm += '<li><a href="#" ng-click="mostrarPorSeccion(' + dati.idSeccion + ')">' + dati.descripcion.toUpperCase() + '</a></li>';
                                        y++;
                                    });
                                    var $el = $(datoForm).appendTo('#secciones');
                                    $compile($el)($scope);
//                                    $scope.nombreUsuario = $scope.nombreUsuario.substring(0, 17) + " - " + $scope.jsonUserLogueado.ruc;
                                    $scope.nombreUsuario += " - " + $scope.jsonUserLogueado.ruc;
                                    $scope.cargarCarrito(false);
                                }).error(function (e) {
                                    console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                                });
                            }
                        });
                        if (d.nombre === undefined) {
//                            alert("USUARIO INGRESADO NO EXISTE");
                        } else {
//                            alert("BIENVENIDO -> " + d.nombre + " " + d.apellido);
                            location.href = "./menu.html";
                            $cookies.putObject("usuarioLogueado", d);
                            $cookies.put("estado", true);
                        }
//                        $scope.listaBox();
                    }).error(function (e) {
                        console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                    });
                };

                $scope.mostrarPorSeccion = function (id) {
//                    alert("ID SECCION: " + id);
                    $('#productos').html("");
                    $("#productos").fadeOut("fast");
                    SeccionService.listarPorId(id).success(function (response) {
                        $scope.nomSeccion = response.descripcion.toUpperCase();
                        $("#nomSeccion").html($scope.nomSeccion);
                        $("#nomSeccion").fadeIn("slow")
                    }).error(function (e) {
                        console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                    });
                    ArticuloService.listarPorSeccion(id).success(function (datus) {
                        var datoForm = '';
                        angular.forEach(datus, function (value, key) {
                            datoForm += '<div class="col-md-3 top_brand_left">';
                            datoForm += '<div class="hover14 column">';
                            datoForm += '<div class="agile_top_brand_left_grid">';
                            datoForm += '<div class="tag"></div>';
                            datoForm += '<div class="agile_top_brand_left_grid1">';
                            datoForm += '<figure>';
                            datoForm += '<div class="snipcart-item block" >';
                            datoForm += '<div class="snipcart-thumb">';
//                            datoForm += '<a href="single.html"><img title=" " alt=" " src="grocery-folder/images/1.png" /></a>
//                            console.log("-> " + );
                            if (value.imagen === null) {
                                datoForm += '<a href="#" ng-click="detalleProducto(' + value.idArticulo + ')"><img src="img/sin_imagen.png" style="width: 110px; height: 110px" alt=""/></a>';
                            } else {
                                datoForm += '<a href="#" ng-click="detalleProducto(' + value.idArticulo + ')"><img title=" " alt=" " ng-src="data:image/jpeg;base64,' + value.imagen + '" style="width: 110px; height: 110px" id="photo-id" /></a>';
                            }
                            datoForm += '<a href="#">';
//                            datoForm += '<img class="imagem_artigo" src="data:image/png;base64,' + value.imagen + '" alt="IMG DESC">';
                            datoForm += '</a>';
                            datoForm += '<p><center>' + value.descripcion + '</center></p>';
                            datoForm += '<p><center><input type="hidden" id="da' + value.idArticulo + '" value="' + value.codArticulo + '"></center></p>';
                            datoForm += '<h4><center>Gs. ' + formatNumber.new(value.precioMin) + ' </center></h4>';
                            datoForm += '</div>';
                            datoForm += '<div class="snipcart-details top_brand_home_details">';
                            datoForm += '<input type="button" name="submit" value="Agregar al carrito" class="button" ng-click="cargarArticulo(' + value.idArticulo + ')" />';
                            datoForm += '</div></div></figure></div></div></div></div>';
                        });
                        var $el = $(datoForm).appendTo('#productos');
                        $compile($el)($scope);
                        $("#productos").fadeIn("fast");
                    }).error(function (e) {
                        console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                    });
                }

                var formatNumber = {
                    separador: ".", // separador para los miles
                    sepDecimal: ',', // separador para los decimales
                    formatear: function (num) {
                        num += '';
                        var splitStr = num.split('.');
                        var splitLeft = splitStr[0];
                        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                        var regx = /(\d+)(\d{3})/;
                        while (regx.test(splitLeft)) {
                            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                        }
                        return this.simbol + splitLeft + splitRight;
                    },
                    new : function (num, simbol) {
                        this.simbol = simbol || '';
                        return this.formatear(num);
                    }
                }

                $scope.listarClientePendientes = function () {
                    ClientePendienteService.listarPendiente().success(function (datus) {
                        angular.forEach(datus, function (value, key) {
                            var cliente = "";
                            if (value.cliente.nombre !== "") {
                                cliente = value.cliente.nombre + " ";
                            }
                            if (value.cliente.apellido !== "") {
                                cliente = cliente + value.cliente.apellido + " - ";
                            }
                            if (value.cliente.ruc !== "") {
                                cliente = cliente + value.cliente.ruc;
                            }
//            comboBoxClientes.getItems().add(cliente.toUpperCase());
                            myMap.set(cliente.toUpperCase(), value.idClientePendiente);
                        });
                    }).error(function (e) {
                        console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                    });
                }

                if ($cookies.get("estado") === "true") {
                    $scope.listarClientePendientes();
                    $scope.nombreUsuario = $scope.jsonUserLogueado.nombre + " " + $scope.jsonUserLogueado.apellido;
                    $("#nombreUsuario").html($scope.nombreUsuario);
                    $("#nombreUsuario").fadeIn("slow");
                    $scope.consultarDatosEmpresa();
                } else {
                    $cookies.remove("estado");
                    $cookies.remove("usuarioLogueado");
                    location.href = "./login.html";
                }
            }
        ])
//        .filter('myCurrency', ['$filter', function ($filter) {
//                return function (input, symbol, fractionSize) {
//                    input = $filter('currency')(input, symbol, fractionSize);
//                    if (symbol === '\u20AC') {
//                        var tempString = "###";
//                        input = input.replace(",", tempString).replace(".", ",").replace(tempString, ".");
//                    }
//                    return input;
//                }
//            }])
//        .config([
//            '$compileProvider',
//            function ($compileProvider)
//            {
//                $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ftp|blob):|data:image\//);
//                // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
//            }
//        ]);
        