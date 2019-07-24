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
                    $("#publicidad").fadeIn("slow")
                    $("#publicidad").html('<img style="width: 850px; height: 510px" src="https://media.giphy.com/media/v2YxCO2pwHjji/giphy.gif">')
                    setTimeout($scope.publicidad, 5000);
                }, 10000);
                $scope.publicidad = function () {
                    $("#numRetiro").fadeIn("slow")
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
                        $("#publicidad").fadeIn("slow");
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
//                        $("#publicidad").fadeIn("slow");
//                        $("#publicidad").html('<img style="width: 850px; height: 510px" src="' + $scope.anuncio[posicionPublicidad].link + '">')
//                    } else {
                    $("#publicidad").fadeIn("slow");
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
                        } else
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
        .controller('clienteCtrl', ['$state', '$scope', '$base64', 'config', '$cookies', '$interval', 'RetiroPedidoService', 'ClienteService', 'ClientePendienteService', 'PublicidadService', function ($state, $scope, $base64, config, $cookies, $interval, RetiroPedidoService, ClienteService, ClientePendienteService, PublicidadService) {
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
//                $scope.probarEsto = function () {
//                    var estoa = '<center>LA GALOPA</center><center>CENTRAL - RUC: 80008038-6</center><center>TEL. 0983213492-COMERCIO RAMOS GENERALES</center><center>Antequera c/ Herrera y Azara</center><center>----------------------------------------</center><center>TIMBRADO NRO. 123321456</center><center>INICIO VIGENCIA: 2017-08-01</center><center>FIN VIGENCIA: 2018-08-31</center><center>CAJA INTERNA: 1 FECHA: 28-06-2019 09:58:30</center><center>FACTURA CONTADO: 001-001-1084258</center><center>CAJERO: cajero</center><center>----------------------------------------</center><center>Articulo  Cant.  Precio      Total</center><center>1. 0371967873127 AQUARIUS NARANJA G10 <br>         1  x   7,500 &nbsp;&nbsp;&nbsp;&nbsp;Gs. 7,500</center><center>2. 0461441101261 AQUARIUS PERA G5 <br>         1  x   7,000 &nbsp;&nbsp;&nbsp;&nbsp;Gs. 7,000</center><center>3. 9551379168844 FANTA GUARANA EXE <br>         1  x   5,000 &nbsp;&nbsp;&nbsp;&nbsp;Gs. 5,000</center><center>4. 3585068306676 FANTA NARANJA EXE <br>         1  x   5,000 &nbsp;&nbsp;&nbsp;&nbsp;Gs. 5,000</center><center>---DETALLE FISCAL-----------------------</center><center>GRAVADA 10% :  Gs 7,500</center><center>GRAVADA 5%  :  Gs 7,000</center><center>EXENTA      :  Gs 10,000</center><center>---LIQUIDACION DE IVA-------------------</center><center>10%:  Gs 682</center><center>5%:   Gs 333</center><center>----------------------------------------</center><center>RUC: XXX</center><center>CLIENTE: SIN NOMBRE</center><center>----------------------------------------</center><center>ARTICULOS: 4          TOTAL: 24,500</center><center>DESCUENTO:   0        NETO: 24,500</center><center>----------------------------------------</center><center>EFECTIVO: Gs 24,500</center><center style=\"color: red\">VUELTO: Gs 0</center><center>----------------------------------------</center><center>Verifique su compra antes de retirar</center><center>Cambios hasta 5 dias, no se realizan</center><center>cambios en oferta, liquidacion,</center><center>perfumeria, bijouterie, prendas de </center><center>lenceria, trajes de bano,</center><center>y aseo personal</center><center>----------------------------------------</center><center>!!LAS COSAS, MAS LINDAS</center><center>AL MEJOR PRECIO!!</center><center>VISITA NUESTROS LOCALES Y APROVECHA</center><center>!!!!LAS SUPER OFERTAS!!!!</center><center>----------------------------------------</center><center>****NUMERO DE PEDIDO****</center><center>*************** A1174 *************</center>';
//                    var base64EncodedString = $base64.encode(estoa);
//                    var urlSafeBase64EncodedString = $base64.decode(base64EncodedString);
//                    console.log("PRIMERO -> " + base64EncodedString);
//                    console.log("SEGUNDO -> " + urlSafeBase64EncodedString);
//                };
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
                $scope.atrasLogin = function () {
                    $("#oculta").css("display", "inline");
                    $("#ciCliente").removeAttr("disabled");
                    $("#btnIngresar").css("display", "inline");
                    $("#nombreCliente").css("display", "none");
                    $("#apellidoCliente").css("display", "none");
                    $("#cliRegistrar").css("display", "none");
                    $("#botonAtras").css("display", "none");
                    $("#ciCliente").focus();
                };
                $scope.ingresarEnter = function (keyEvent) {
                    if (keyEvent.keyCode === 13) {
                        $scope.ingresar();
                    }
                }
                $scope.registrarEnter = function (keyEvent) {
                    if (keyEvent.keyCode === 13) {
                        $scope.registrarCli();
                    }
                }
                $scope.ingresar = function () {
                    PublicidadService.aperturaCaja().success(function (result) {
                        if (result === false) {
                            ClienteService.listarPorCI($("#ciCliente").val()).success(function (d) {
                                if (d.nombre === undefined) {
//                            alert("USUARIO INGRESADO NO EXISTE");
//                            birdAlert.notify({
//                                msg: "USUARIO INGRESADO NO EXISTE.",
//                                title: 'Mensaje del Sistema',
//                                className: 'error'
//                            });
                                    $("body").overhang({
                                        type: "error",
                                        message: "USUARIO INGRESADO NO EXISTE.",
                                        duration: 1,
                                        overlay: true
                                    });
                                    $("#oculta").css("display", "none");
                                    $("#ciCliente").attr('disabled', 'disabled');
                                    $("#nombreCliente").css("display", "inline");
                                    $("#apellidoCliente").css("display", "inline");
                                    $("#cliRegistrar").css("display", "inline");
                                    $("#botonAtras").css("display", "inline");
                                    $("#btnIngresar").css("display", "none");
                                    $("#nombreCliente").focus();
                                } else {
                                    ClientePendienteService.listarPorCi($("#ciCliente").val()).success(function (data) {
                                        if (data.cliente === null) {
                                            ClientePendienteService.insertarIdTRUE(d.idCliente).success(function (datosHERE) {
                                                location.href = "./menu.html";
                                                $cookies.putObject("usuarioLogueado", d);
                                                $cookies.put("estado", true);
                                            }).error(function (e) {
                                            });
                                        } else {
                                            location.href = "./menu.html";
                                            $cookies.putObject("usuarioLogueado", d);
                                            $cookies.put("estado", true);
                                        }
                                    }).error(function (e) {
                                    });
                                }
//                        $scope.listaBox();
                            }).error(function (e) {
                                console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                            });
                        } else {
                            $("body").overhang({
                                type: "error",
                                message: "ES NECESARIO HACER LA APERTURA DE CAJA PARA INICIAR SESION.",
                                duration: 1,
                                overlay: true
                            });
                        }
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
//                        birdAlert.notify({
//                            msg: "LOS CAMPOS NO DEBEN QUEDAR VACIOS",
//                            title: 'Mensaje del Sistema',
//                            className: 'error'
//                        });
                        $("body").overhang({
                            type: "error",
                            message: "LOS CAMPOS NOMBRE Y APELLIDO NO DEBEN QUEDAR VACIOS.",
                            duration: 1,
                            overlay: true
                        });
                    } else {
//                    alert("DATOS BD--->>>" + $("#ciCliente").val() + $("#nombreCliente").val() + $("#apellidoCliente").val())
                        ClienteService.crearCliente($("#ciCliente").val(), $("#nombreCliente").val(), $("#apellidoCliente").val()).success(function (d) {
                            if (d.nombre === undefined) {
//                                birdAlert.notify({
//                                    msg: "NO SE PUDO INGRESAR AL SISTEMA, VERIFIQUE DATOS",
//                                    title: 'Mensaje del Sistema',
//                                    className: 'error'
//                                });
                                $("body").overhang({
                                    type: "error",
                                    message: "NO SE PUDO INGRESAR AL SISTEMA, VERIFIQUE DATOS.",
                                    duration: 1,
                                    overlay: true
                                });
//                                alert("NO SE PUDO INGRESAR AL SISTEMA");
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
        .controller('mainMenuCtrl', ['$state', '$base64', '$compile', '$scope', 'config', '$cookies', '$interval', 'RetiroPedidoService', 'ClienteService', 'EmpresaService', 'SeccionService', 'ArticuloService', 'ServPendienteService', 'ClientePendienteService', 'SupervisorService', 'SucursalService', 'TimbradoService', 'CajaService', 'TalonarioSucursalService', 'RangoRetiroPedidoService', 'PublicidadService', function ($state, $base64, $compile, $scope, config, $cookies, $interval, RetiroPedidoService, ClienteService, EmpresaService, SeccionService, ArticuloService, ServPendienteService, ClientePendienteService, SupervisorService, SucursalService, TimbradoService, CajaService, TalonarioSucursalService, RangoRetiroPedidoService, PublicidadService) {
                $scope.srvPendiente = [];
                $scope.formaPago = [];
//                $("#datoNomEmpresa").css("display", "inline");
                $scope.totalGral = "";
                $scope.datosFactura = {};
                $scope.jsonUserLogueado = $cookies.getObject("usuarioLogueado");
                $scope.nomEmpresa = "";
                $scope.nomEmpresa2 = "";
                $scope.telEmpresa = "";
                $scope.emailEmpresa = "";
                $scope.nomSeccion = "";
                $scope.descripcion = "";
                $scope.precio = "";
                $scope.observacion = "";
                $scope.totalPago = "0";
//                $scope.srvPendiente.total = {};
                var myMap = new Map();
                $scope.openModalPrecio = function () {
                    $("#valor").val(false);
                    $scope.cargarCarrito(true);
                };
                $scope.acaNomas = function () {
                    $("body").overhang({
                        type: "warn",
                        message: "Woohoo! Our message works! "
                    });
                };
//                $scope.openModalPrecio = function () {
//                    $("#valor").val(false);
//                    $scope.cargarCarrito(true);
//                };
//                $scope.showcontrol = function () {
//                    if ($("#pago").val() === "1") {
//                        alert("EFECTIVO")
//                    } else if ($("#pago").val() === "2") {
//                        alert("TARJETA")
//                    } else if ($("#pago").val() === "3") {
//                        alert("NOTA DE CREDITO")
//                    }
//                };
                $scope.imprimirFactura = function () {

                    var find = ' ';
                    var re = new RegExp(find, 'g');
                    var str = $scope.nombreUsuario.toUpperCase().replace(re, '');
                    var idCP = myMap.get(str);
                    var nroPedido = "";
                    var sumaEfe = 0;
                    var sumaDeb = 0;
                    var sumaCred = 0;
                    var sumaNota = 0;
                    $scope.xxx = {};
                    $scope.xxx.facturaClienteCab = {};
                    $scope.xxx.facturaClienteDet = [];
                    $scope.xxx.pagos = [];
//                    $scope.xxx.facturaClienteCab = {};
                    $scope.x = $cookies.getObject($scope.jsonUserLogueado.ruc);
//                    $scope.xxx.pagos = $scope.x.pagos;
                    $scope.xxx.facturaClienteCab.tipoComprobante = {};
                    $scope.xxx.facturaClienteCab.cliente = {};
                    $scope.xxx.facturaClienteCab.caja = {};
                    $scope.xxx.facturaClienteCab.estadoFactura = {};
                    $scope.xxx.facturaClienteCab.tipoMoneda = {};
                    $scope.xxx.facturaClienteCab.sucursal = {};
                    $scope.xxx.facturaClienteCab.idFacturaClienteCab = 1;
                    $scope.xxx.facturaClienteCab.nroActual = "1";
                    $scope.xxx.facturaClienteCab.tipoComprobante.idTipoComprobante = 1;
                    $scope.xxx.facturaClienteCab.fechaEmision = null;
                    if ($("#idCli").val() === "") {
                        $scope.xxx.facturaClienteCab.cliente.idCliente = 161168;
                    } else {
                        $scope.xxx.facturaClienteCab.cliente.idCliente = $("#idCli").val();
                    }

                    $scope.xxx.facturaClienteCab.caja.idCaja = config.caja;
                    $scope.xxx.facturaClienteCab.estadoFactura.idEstadoFactura = 1;
                    $scope.xxx.facturaClienteCab.cancelado = true;
                    $scope.xxx.facturaClienteCab.tipoMoneda.idTipoMoneda = 1;
                    $scope.xxx.facturaClienteCab.nroFactura = $scope.x.facturaClienteCab.nroFac;
//                    $scope.xxx.facturaClienteCab.nroFactura = $scope.x.nroFac;
                    $scope.xxx.facturaClienteCab.sucursal.idSucursal = config.sucursal;
                    $scope.xxx.facturaClienteCab.montoFactura = 1000;
                    $scope.xxx.facturaClienteCab.usuAlta = "SISTEMA WEB";
                    $scope.xxx.facturaClienteCab.usuMod = "SISTEMA WEB";
                    $scope.xxx.facturaClienteCab.fechaMod = null;
//                    alert($scope.x.facturaClienteCab.empresa + " - " + $scope.x.facturaClienteCab.sucursal + " - " +
//                            $scope.x.facturaClienteCab.rucEmpresa + " - " + $scope.x.facturaClienteCab.telefono + " - "
//                            + $scope.x.facturaClienteCab.direccion + " - " + $scope.x.facturaClienteCab.timbrado + " - "
//                            + $scope.x.facturaClienteCab.direccion + " - " + $scope.x.facturaClienteCab.horaFecha + " - "
//                            );

//                    alert($scope.xxx.facturaClienteCab.fechaEmision + " - " + $scope.xxx.facturaClienteCab.nroFactura + " - " + $scope.xxx.facturaClienteCab.montoFactura)
                    RangoRetiroPedidoService.actualizarObtenerRangoObjectActual(config.sucursal).success(function (datito) {
                        nroPedido = datito.serie + datito.rangoActual;
                        ClienteService.enviarPrueba($scope.xxx.facturaClienteCab, config.caja, nroPedido).success(function (da) {
//                        alert(da.idFacturaClienteCab);
                            if (da.idFacturaClienteCab !== null) {
                                var xyz = 0;
                                var yz = 0;
                                angular.forEach($scope.x.pagos, function (value, key) {
                                    if (value.descripcion === "EFECTIVO") {
                                        sumaEfe += parseInt(value.monto);
                                        ClienteService.enviarformaPago(da.idFacturaClienteCab, "EFECTIVO", value.monto, "null", "null").success(function (dat) {

                                        });
                                        console.log("Efectivo: " + formatNumber.new(value.monto))
                                    } else if (value.descripcion === "DEBITO") {
                                        sumaDeb += parseInt(value.monto);
                                        ClienteService.enviarformaPago(da.idFacturaClienteCab, "DEBITO", value.monto, value.codigo, "null").success(function (dat) {

                                        });
                                        console.log("Debito: " + formatNumber.new(value.monto) + " cod: " + value.codigo)
                                    } else if (value.descripcion === "CREDITO") {
                                        sumaCred += parseInt(value.monto);
                                        ClienteService.enviarformaPago(da.idFacturaClienteCab, "CREDITO", value.monto, value.codigo, "null").success(function (dat) {

                                        });
                                        console.log("Credito: " + formatNumber.new(value.monto) + " cod: " + value.codigo)
                                    } else if (value.descripcion === "NOTA DE CREDITO") {
                                        sumaNota += parseInt(value.monto);
                                        ClienteService.enviarformaPago(da.idFacturaClienteCab, "NOTA DE CREDITO", value.monto, "null", value.numero).success(function (dat) {

                                        });
                                        console.log("Nota de Credito: " + formatNumber.new(value.monto) + " cod: " + value.numero)
                                    }
                                    xyz++;
//                        alert($scope.x.facturaClienteDet.length + " - " + xyz)
                                    if ($scope.x.pagos.length === xyz) {
                                        console.log("***** DETALLE ARTICULO *****");
                                        var montoTotal = 0;
                                        angular.forEach($scope.x.facturaClienteDet, function (value, key) {
                                            montoTotal += value.total;
                                            yz++;
                                            ClienteService.enviarDetalleFactura(value.indice, value.idArticulo, value.codigo, value.descripcion, value.iva,
                                                    value.cantidad, value.monto, value.total, da.idFacturaClienteCab).success(function (datas) {

                                            });
//                                        console.log("DETALLE-> " + value.codigo + " - " + value.descripcion + " - " + value.iva + " - " + value.cantidad + " - " + formatNumber.new(value.monto) + " - " + formatNumber.new(value.total))
                                            if (yz === $scope.x.facturaClienteDet.length) {
                                                ClienteService.actualizarMontoCabecera(da.idFacturaClienteCab, montoTotal).success(function (abc) {
                                                    if (abc === true) {
                                                        var rucFac = "null";
                                                        var nomFac = "null";
                                                        if ($("#rucFactura").val() !== "" && $("#nombreFactura").val() !== "") {
                                                            rucFac = $("#rucFactura").val();
                                                            nomFac = $("#nombreFactura").val();
                                                        }
                                                        var findf = '/';
                                                        var ref = new RegExp(findf, 'g');
                                                        var strF = $scope.x.facturaClienteCab.direccion.toUpperCase().replace(ref, '');
                                                        ClienteService.insertarCabeceraHistorico(da.idFacturaClienteCab, $scope.x.facturaClienteCab.empresa, $scope.x.facturaClienteCab.sucursal,
                                                                $scope.x.facturaClienteCab.nroCaja, $scope.x.facturaClienteCab.rucEmpresa, $scope.x.facturaClienteCab.telefono, strF,
                                                                $scope.x.facturaClienteCab.timbrado, $scope.x.facturaClienteCab.inicio, $scope.x.facturaClienteCab.fin, $scope.x.facturaClienteCab.iva10,
                                                                $scope.x.facturaClienteCab.iva5, $scope.x.facturaClienteCab.exenta, $scope.x.facturaClienteCab.liq10, $scope.x.facturaClienteCab.liq5, rucFac, nomFac, montoTotal, sumaEfe, sumaCred, sumaDeb, sumaNota, $scope.x.facturaClienteCab.vuelto).success(function (xas) {
                                                            if (xas === true) {
                                                                ClienteService.actualizarClientePendiente(idCP).success(function (def) {
                                                                    if (def === true) {
//                                                                    var message = md5.createHash($("#facturaImpresion").html() || '');
//                                                                    var estoa = '<center>LA GALOPA</center><center>CENTRAL - RUC: 80008038-6</center><center>TEL. 0983213492-COMERCIO RAMOS GENERALES</center><center>Antequera c/ Herrera y Azara</center><center>----------------------------------------</center><center>TIMBRADO NRO. 123321456</center><center>INICIO VIGENCIA: 2017-08-01</center><center>FIN VIGENCIA: 2018-08-31</center><center>CAJA INTERNA: 1 FECHA: 28-06-2019 09:58:30</center><center>FACTURA CONTADO: 001-001-1084258</center><center>CAJERO: cajero</center><center>----------------------------------------</center><center>Articulo  Cant.  Precio      Total</center><center>1. 0371967873127 AQUARIUS NARANJA G10 <br>         1  x   7,500 &nbsp;&nbsp;&nbsp;&nbsp;Gs. 7,500</center><center>2. 0461441101261 AQUARIUS PERA G5 <br>         1  x   7,000 &nbsp;&nbsp;&nbsp;&nbsp;Gs. 7,000</center><center>3. 9551379168844 FANTA GUARANA EXE <br>         1  x   5,000 &nbsp;&nbsp;&nbsp;&nbsp;Gs. 5,000</center><center>4. 3585068306676 FANTA NARANJA EXE <br>         1  x   5,000 &nbsp;&nbsp;&nbsp;&nbsp;Gs. 5,000</center><center>---DETALLE FISCAL-----------------------</center><center>GRAVADA 10% :  Gs 7,500</center><center>GRAVADA 5%  :  Gs 7,000</center><center>EXENTA      :  Gs 10,000</center><center>---LIQUIDACION DE IVA-------------------</center><center>10%:  Gs 682</center><center>5%:   Gs 333</center><center>----------------------------------------</center><center>RUC: XXX</center><center>CLIENTE: SIN NOMBRE</center><center>----------------------------------------</center><center>ARTICULOS: 4          TOTAL: 24,500</center><center>DESCUENTO:   0        NETO: 24,500</center><center>----------------------------------------</center><center>EFECTIVO: Gs 24,500</center><center style=\"color: red\">VUELTO: Gs 0</center><center>----------------------------------------</center><center>Verifique su compra antes de retirar</center><center>Cambios hasta 5 dias, no se realizan</center><center>cambios en oferta, liquidacion,</center><center>perfumeria, bijouterie, prendas de </center><center>lenceria, trajes de bano,</center><center>y aseo personal</center><center>----------------------------------------</center><center>!!LAS COSAS, MAS LINDAS</center><center>AL MEJOR PRECIO!!</center><center>VISITA NUESTROS LOCALES Y APROVECHA</center><center>!!!!LAS SUPER OFERTAS!!!!</center><center>----------------------------------------</center><center>****NUMERO DE PEDIDO****</center><center>*************** A1174 *************</center>';
                                                                        var stringHTML = $("#facturaImpresion").html();
                                                                        var find1 = 'XXXXX';
                                                                        var re1 = new RegExp(find1, 'g');
                                                                        stringHTML = stringHTML.replace(re1, nroPedido);
                                                                        var baseG4Encondig = $base64.encode(stringHTML);
//                                                                    var urlSafeBase64EncodedString = $base64.decode(base64EncodedString);
//                                                                    console.log("PRIMERO -> " + base64EncodedString);
//                                                                    console.log("SEGUNDO -> " + urlSafeBase64EncodedString);

//                                                                    $("#datoImpresion").val("");
//                                                                    $scope.encoding(baseG4Encondig);
                                                                        ClienteService.imprimirTicket(baseG4Encondig).success(function (fgh) {
                                                                            if (fgh === true) {
//                                                                                birdAlert.notify({
//                                                                                    msg: "DATOS IMPRESO CORRECTAMENTE",
//                                                                                    title: 'Mensaje del Sistema',
//                                                                                    className: 'success'
//                                                                                });
//                                                                                $("body").overhang({
//                                                                                    type: "success",
//                                                                                    message: "DATOS IMPRESO CORRECTAMENTE."
//                                                                                });

//                                                                            alert($("#facturaImpresion").html());
                                                                                console.log($("#facturaImpresion").html());
                                                                                $cookies.remove($scope.jsonUserLogueado.ruc);
                                                                                $cookies.remove("usuarioLogueado");
                                                                                $cookies.remove("estado");
                                                                                location.href = "./login.html";
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
//                                            actualizar cabecera, eliminar srvPendiente y true clientePendiente
                                            }
                                        });
                                    }
                                });
                            }
                        }).error(function (e) {
                            console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                        });
                    });
//                    alert($scope.x.facturaClienteCab.empresa + " - " + $scope.x.facturaClienteCab.sucursal);
                };
                $scope.facturarDatos = function () {
                    if ($("#rucFactura").val() === "" || $("#nombreFactura").val() === "") {
                        $scope.realizarFactura();
                        $("#idCli").val("")
                    } else {
//                        ClienteService.listarPorRuc($("#rucFactura").val()).success(function (d) {
//                        if (d.nombre === undefined) {
                        ClienteService.crearClienteData($("#rucFactura").val(), $("#nombreFactura").val(), "NULL").success(function (da) {
//                            if (da.nombre === undefined) {
//                            } else {
                            $("#idCli").val(da.idCliente);
                            $("#rucFactura").val(da.ruc);
                            $scope.realizarFactura();
//                            }
                        }).error(function (e) {
                            console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                        });
//                        } else {
//                            $scope.realizarFactura();
//                        }
//                        }).error(function (e) {
//                            console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
//                        });
                    }
                }
                $scope.realizarFactura = function () {
                    $scope.datosFactura.facturaClienteCab = {}
                    $scope.datosFactura.facturaClienteDet = []
                    $scope.articuloDetalle = []
                    $scope.datosFactura.pagos = []
                    $scope.jsonUserLogueado = $cookies.getObject("usuarioLogueado");
                    $("#backFactura").fadeIn("slow");
                    $("#imprimir").fadeIn("slow");
                    $("#facturar").fadeOut("fast");
                    $("#back").fadeOut("fast");
                    var cliente = $("#nombreFactura").val();
                    if (cliente === "") {
                        cliente = "Sin Nombre";
                    }
                    var value = $scope.totalGral.replace(",", "");
                    value = value.replace(".", "");
//                    alert($scope.totalPago + " - " + value)
                    var vuelto = parseInt($scope.totalPago) - parseInt(value);
//                    birdAlert.notify({
//                        msg: 'CLIENTE: ' + cliente.toUpperCase() + "<br> VUELTO: " + formatNumber.new(vuelto) + " Gs.",
//                        title: 'Mensaje del Sistema',
//                        className: 'success'
//                    });
                    $("body").overhang({
                        type: "success",
                        message: "CLIENTE: " + cliente.toUpperCase() + " | VUELTO: " + formatNumber.new(vuelto) + " Gs.",
                        duration: 2,
//                        overlay: true
                    });
                    $("#pagoPago").fadeOut("fast");
                    $("#clientePago").fadeOut("fast");
                    var val = "<center>empresa</center>";
                    val += "<center>sucursal - RUC: rucEmpresa</center>";
                    val += "<center>TEL. telefono-COMERCIO RAMOS GENERALES</center>";
                    val += "<center>direccion</center>";
                    val += "<center>----------------------------------------</center>";
                    val += "<center>TIMBRADO NRO. timbrado</center>";
                    val += "<center>INICIO VIGENCIA: inicio</center>";
                    val += "<center>FIN VIGENCIA: fin</center>";
                    val += "<center>CAJA INTERNA: nroCaja FECHA: fecha</center>";
                    val += "<center>FACTURA CONTADO: nroFac</center>";
                    val += "<center>CAJERO: CAJA WEB </center>";
                    val += "<center>----------------------------------------</center>";
                    val += "<center>Articulo  Cant.  Precio      Total</center>";
                    val += "detalleArticulo";
                    val += "<center>---DETALLE FISCAL-----------------------</center>";
                    val += "detalleFiscal";
//                    val += "<center>GRAVADA 10% :  Gs 12,000</center>";
//                    val += "<center>GRAVADA 5%  :  Gs 0</center>";
//                    val += "<center>EXENTA      :  Gs 36,000</center>";
                    val += "<center>---LIQUIDACION DE IVA-------------------</center>";
                    val += "<center>10%:  Gs iva10</center>";
                    val += "<center>5%:   Gs iva5</center>";
                    val += "<center>----------------------------------------</center>";
                    val += "<center>RUC: rucCliente</center>";
                    val += "<center>CLIENTE: nombreCliente</center>";
                    val += "<center>----------------------------------------</center>";
                    val += "<center>ARTICULOS: cantArticulo          TOTAL: totalPago</center>";
                    val += "<center>DESCUENTO:   0        NETO: totalPago1</center>";
                    val += "<center>----------------------------------------</center>";
                    val += "formaPago";
                    val += "<center>----------------------------------------</center>";
                    val += "<center>Verifique su compra antes de retirar</center>";
//                    val += "<center>Cambios hasta 5 dias, no se realizan</center>";
//                    val += "<center>cambios en oferta, liquidacion,</center>";
//                    val += "<center>perfumeria, bijouterie, prendas de </center>";
//                    val += "<center>lenceria, trajes de bano,</center>";
//                    val += "<center>y aseo personal</center>";
//                    val += "<center>----------------------------------------</center>";
                    val += "<center>!!LAS COSAS MAS RICAS</center>";
                    val += "<center>AL MEJOR PRECIO!!</center>";
                    val += "<center>VISITA NUESTROS LOCALES Y APROVECHA</center>";
                    val += "<center>!!!!NO TE LO PODES PERDER!!!!</center>";
                    val += "<center>----------------------------------------</center>";
                    val += "<center>****NUMERO DE PEDIDO****</center>";
                    val += "<center>*************** XXXXX *************</center>";
                    var datoString = "";
                    var x = 1;
                    var iva10 = 0;
                    var iva5 = 0;
                    var exenta = 0;
                    angular.forEach($scope.srvPendiente, function (value, key) {
                        $scope.articuloDetalle = {}
                        var total = parseInt(value.cantidad) * parseInt(value.montoServ);
                        var iva = "";
                        if (value.poriva === 0) {
                            iva = "EXE";
                            exenta += total;
                        } else if (value.poriva === 10) {
                            iva10 += total;
                            iva = "G10";
                        } else if (value.poriva === 5) {
                            iva = "G5";
                            iva5 += total;
                        }
                        datoString += "<center>" + x + ". " + value.articulo.codArticulo + " " + value.descripcion.substring(0, 18) + " " + iva + " <br>         " + value.cantidad + "  x   " + formatNumber.new(value.montoServ) + " &nbsp;&nbsp;&nbsp;&nbsp;Gs. " + formatNumber.new(total) + "</center>";
//                        console.log("-> " + x + " - " + $scope.srvPendiente.length + " - " + iva)
                        $scope.articuloDetalle.indice = x;
                        $scope.articuloDetalle.codigo = value.articulo.codArticulo;
                        $scope.articuloDetalle.idArticulo = value.articulo.idArticulo;
                        $scope.articuloDetalle.descripcion = value.descripcion;
                        $scope.articuloDetalle.iva = iva;
                        $scope.articuloDetalle.cantidad = value.cantidad;
                        $scope.articuloDetalle.monto = value.montoServ;
                        $scope.articuloDetalle.total = total;
                        $scope.datosFactura.facturaClienteDet.push($scope.articuloDetalle);
//                        console.log("|-> " + $scope.articuloDetalle.codigo + " - " + $scope.articuloDetalle.descripcion + " - " + $scope.articuloDetalle.cantidad + " - " + $scope.articuloDetalle.monto)

                        if (x === $scope.srvPendiente.length) {
                            var xxx = 0;
                            var efe = 0;
                            var tarjDeb = 0;
                            var tarjCred = 0;
                            var nota = 0;
                            angular.forEach($scope.formaPago, function (value, key) {
                                var mon = value.monto.replace(",", "");
                                mon = mon.replace(".", "");
                                if (value.descripcion.toUpperCase() === "EFECTIVO") {
                                    efe += parseInt(mon);
                                    $scope.datoPago = {};
                                    $scope.datoPago.descripcion = "EFECTIVO";
                                    $scope.datoPago.monto = mon;
                                    $scope.datosFactura.pagos.push($scope.datoPago);
                                } else if (value.descripcion.toUpperCase() === "TARJETA") {
                                    if (value.tipo.toUpperCase() === "DEBITO") {
                                        tarjDeb += parseInt(mon);
                                        $scope.datoPago = {};
                                        $scope.datoPago.descripcion = "DEBITO";
                                        $scope.datoPago.codigo = value.codigo;
                                        $scope.datoPago.monto = mon;
                                        $scope.datosFactura.pagos.push($scope.datoPago);
                                    } else {
                                        tarjCred += parseInt(mon);
                                        $scope.datoPago = {};
                                        $scope.datoPago.descripcion = "CREDITO";
                                        $scope.datoPago.codigo = value.codigo;
                                        $scope.datoPago.monto = mon;
                                        $scope.datosFactura.pagos.push($scope.datoPago);
                                    }
                                } else if (value.descripcion.toUpperCase() === "NOTA DE CREDITO") {
                                    nota += parseInt(mon);
                                    $scope.datoPago = {};
                                    $scope.datoPago.descripcion = "NOTA DE CREDITO";
                                    $scope.datoPago.numero = value.numero;
                                    $scope.datoPago.monto = mon;
                                    $scope.datosFactura.pagos.push($scope.datoPago);
                                }
                                xxx++;
                                if (xxx === $scope.formaPago.length) {
                                    var imp5 = 0;
                                    var imp10 = 0;
                                    if (iva5 !== 0) {
                                        imp5 = iva5 / 21;
                                    }
                                    if (iva10 !== 0) {
                                        imp10 = iva10 / 11;
                                    }

                                    val = val.replace("detalleArticulo", datoString);
                                    var detalleFiscal = "<center>GRAVADA 10% :  Gs " + formatNumber.new(iva10) + "</center>";
                                    detalleFiscal += "<center>GRAVADA 5%  :  Gs " + formatNumber.new(iva5) + "</center>";
                                    detalleFiscal += "<center>EXENTA      :  Gs " + formatNumber.new(exenta) + "</center>";
                                    val = val.replace("detalleFiscal", detalleFiscal);
                                    var rucDato = "XXX";
                                    if (cliente !== "Sin Nombre") {
                                        rucDato = $("#rucFactura").val();
                                    }
                                    val = val.replace("rucCliente", rucDato);
                                    val = val.replace("nombreCliente", cliente.toUpperCase());
                                    val = val.replace("cantArticulo", $("#numCant").html());
                                    val = val.replace("totalPago", formatNumber.new($scope.totalPago));
                                    val = val.replace("totalPago1", formatNumber.new($scope.totalPago));
                                    val = val.replace("iva10", formatNumber.new(Math.round(imp10)));
                                    val = val.replace("iva5", formatNumber.new(Math.round(imp5)));
                                    $scope.datosFactura.facturaClienteCab.liq10 = iva10;
                                    $scope.datosFactura.facturaClienteCab.liq5 = iva5;
                                    $scope.datosFactura.facturaClienteCab.exenta = exenta;
                                    $scope.datosFactura.facturaClienteCab.rucCliente = rucDato;
                                    $scope.datosFactura.facturaClienteCab.nombreCliente = cliente.toUpperCase();
                                    $scope.datosFactura.facturaClienteCab.cantArticulo = $("#numCant").html();
                                    $scope.datosFactura.facturaClienteCab.totalPago = $scope.totalPago;
                                    $scope.datosFactura.facturaClienteCab.iva10 = Math.round(imp10);
                                    $scope.datosFactura.facturaClienteCab.iva5 = Math.round(imp5);
//                                    $scope.datosFactura.facturaClienteDet = []
//                                    $scope.articuloDetalle = []
//                                    $scope.datosFactura.pagos = {}

                                    var formPage = "";
                                    if (efe !== 0) {
                                        formPage += "<center>EFECTIVO: Gs " + formatNumber.new(efe) + "</center>";
                                    }
                                    if (tarjDeb !== 0) {
                                        formPage += "<center>TARJ. DEB: Gs " + formatNumber.new(tarjDeb) + "</center>";
                                    }
                                    if (tarjCred !== 0) {
                                        formPage += "<center>TARJ. CRED: Gs " + formatNumber.new(tarjCred) + "</center>";
                                    }
                                    if (nota !== 0) {
                                        formPage += "<center>NOTA CREDITO: Gs " + formatNumber.new(nota) + "</center>";
                                    }

                                    formPage += "<center style='color: red'>VUELTO: Gs " + formatNumber.new(vuelto) + "</center>";
                                    val = val.replace("formaPago", formPage);
                                    $scope.sucursal = {};
                                    CajaService.listarPorId(config.caja).success(function (dataCaja) {
                                        if (dataCaja.idCaja !== null) {
                                            $scope.x = $cookies.getObject($scope.jsonUserLogueado.ruc);
                                            if ($scope.x === undefined) {
                                                TimbradoService.listarPorId(config.sucursal).success(function (dat) {
                                                    if (dat.idTimbrado !== null) {
                                                        SucursalService.listarPorId(config.sucursal).success(function (d) {
                                                            TalonarioSucursalService.listarPorSucursal(config.sucursal, dat.idTimbrado).success(function (dataTalonario) {
                                                                if (dataTalonario.idTalonariosSucursales !== null) {
                                                                    $scope.sucursal = d;
                                                                    var direccion = "";
                                                                    if ($scope.sucursal.primeraLateral === "" && $scope.sucursal.segundaLateral === "") {
                                                                        direccion = $scope.sucursal.callePrincipal;
                                                                    } else if ($scope.sucursal.primeraLateral !== "" && $scope.sucursal.segundaLateral !== "") {
                                                                        direccion = $scope.sucursal.callePrincipal + " c/ " + $scope.sucursal.primeraLateral + " y " + $scope.sucursal.segundaLateral;
                                                                    } else if ($scope.sucursal.primeraLateral !== "") {
                                                                        direccion = $scope.sucursal.callePrincipal + " c/ " + $scope.sucursal.primeraLateral;
                                                                    } else if ($scope.sucursal.segundaLateral !== "") {
                                                                        direccion = $scope.sucursal.callePrincipal + " c/ " + $scope.sucursal.segundaLateral;
                                                                    }

                                                                    val = val.replace("empresa", $scope.sucursal.empresaDTO.descripcionEmpresa);
                                                                    val = val.replace("sucursal", $scope.sucursal.descripcion);
                                                                    val = val.replace("rucEmpresa", $scope.sucursal.empresaDTO.ruc);
                                                                    val = val.replace("telefono", $scope.sucursal.empresaDTO.telefono);
                                                                    val = val.replace("direccion", direccion);
                                                                    val = val.replace("timbrado", dat.nroTimbrado);
                                                                    val = val.replace("inicio", dat.fecInicial);
                                                                    val = val.replace("fin", dat.fecVencimiento);
                                                                    val = val.replace("nroCaja", dataCaja.nroCaja);
                                                                    val = val.replace("nroFac", "00" + $scope.sucursal.idSucursal + "-00" + dataCaja.nroCaja + "-" + (parseInt(dataTalonario.nroActual) + 1));
                                                                    $scope.datosFactura.facturaClienteCab.empresa = $scope.sucursal.empresaDTO.descripcionEmpresa;
                                                                    $scope.datosFactura.facturaClienteCab.sucursal = $scope.sucursal.descripcion;
                                                                    $scope.datosFactura.facturaClienteCab.rucEmpresa = $scope.sucursal.empresaDTO.ruc;
                                                                    $scope.datosFactura.facturaClienteCab.telefono = $scope.sucursal.empresaDTO.telefono;
                                                                    $scope.datosFactura.facturaClienteCab.direccion = direccion;
                                                                    $scope.datosFactura.facturaClienteCab.timbrado = dat.nroTimbrado;
                                                                    $scope.datosFactura.facturaClienteCab.inicio = dat.fecInicial;
                                                                    $scope.datosFactura.facturaClienteCab.fin = dat.fecVencimiento;
                                                                    $scope.datosFactura.facturaClienteCab.nroCaja = dataCaja.nroCaja;
                                                                    $scope.datosFactura.facturaClienteCab.vuelto = vuelto;
                                                                    $scope.datosFactura.facturaClienteCab.nroFac = "00" + $scope.sucursal.idSucursal + "-00" + dataCaja.nroCaja + "-" + (parseInt(dataTalonario.nroActual) + 1);
                                                                    var fecha = new Date();
                                                                    var fecData = "";
                                                                    if (fecha.getDate().toString().length === 1) {
                                                                        fecData += "0" + fecha.getDate();
                                                                    } else if (fecha.getDate().toString().length === 2) {
                                                                        fecData += fecha.getDate();
                                                                    }
                                                                    if ((fecha.getMonth() + 1).toString().length === 1) {
                                                                        fecData += "-0" + (fecha.getMonth() + 1);
                                                                    } else if ((fecha.getMonth() + 1).toString().length === 2) {
                                                                        fecData += "-" + (fecha.getMonth() + 1);
                                                                    }

                                                                    if (fecha.getFullYear().toString().length === 4) {
                                                                        fecData += "-" + fecha.getFullYear();
                                                                    }

                                                                    var horaData = "";
                                                                    if (fecha.getHours().toString().length === 1) {
                                                                        horaData += "0" + fecha.getHours();
                                                                    } else if (fecha.getHours().toString().length === 2) {
                                                                        horaData += fecha.getHours();
                                                                    }
                                                                    if (fecha.getMinutes().toString().length === 1) {
                                                                        horaData += ":0" + fecha.getMinutes();
                                                                    } else if (fecha.getMinutes().toString().length === 2) {
                                                                        horaData += ":" + fecha.getMinutes();
                                                                    }
                                                                    if (fecha.getSeconds().toString().length === 1) {
                                                                        horaData += ":0" + fecha.getSeconds();
                                                                    } else if (fecha.getSeconds().toString().length === 2) {
                                                                        horaData += ":" + fecha.getSeconds();
                                                                    }

                                                                    val = val.replace("fecha", fecData + "&nbsp;" + horaData);
                                                                    $scope.datosFactura.facturaClienteCab.horaFecha = fecData + " " + horaData;
                                                                    $cookies.putObject($scope.jsonUserLogueado.ruc, $scope.datosFactura);
//                                                                    alert($scope.datosFactura.facturaClienteCab.empresa + " - " + $scope.datosFactura.facturaClienteCab.sucursal + " - " +
//                                                                            $scope.datosFactura.facturaClienteCab.rucEmpresa + " - " + $scope.datosFactura.facturaClienteCab.telefono + " - "
//                                                                            + $scope.datosFactura.facturaClienteCab.direccion + " - " + $scope.datosFactura.facturaClienteCab.timbrado + " - "
//                                                                            + $scope.datosFactura.facturaClienteCab.direccion + " - " + $scope.datosFactura.facturaClienteCab.horaFecha + " - "
//                                                                            );

                                                                    $("#facturaImpresion").html(val);
                                                                    $("#facturaImpresion").fadeIn("slow");
                                                                }
                                                            })
                                                        });
                                                    }
                                                });
                                            } else {
                                                $scope.datosFactura.facturaClienteCab.empresa = $scope.x.facturaClienteCab.empresa;
                                                $scope.datosFactura.facturaClienteCab.sucursal = $scope.x.facturaClienteCab.sucursal;
                                                $scope.datosFactura.facturaClienteCab.rucEmpresa = $scope.x.facturaClienteCab.rucEmpresa;
                                                $scope.datosFactura.facturaClienteCab.telefono = $scope.x.facturaClienteCab.telefono;
                                                $scope.datosFactura.facturaClienteCab.direccion = $scope.x.facturaClienteCab.direccion;
                                                $scope.datosFactura.facturaClienteCab.timbrado = $scope.x.facturaClienteCab.timbrado;
                                                $scope.datosFactura.facturaClienteCab.inicio = $scope.x.facturaClienteCab.inicio;
                                                $scope.datosFactura.facturaClienteCab.fin = $scope.x.facturaClienteCab.fin;
                                                $scope.datosFactura.facturaClienteCab.nroCaja = $scope.x.facturaClienteCab.nroCaja;
                                                $scope.datosFactura.facturaClienteCab.nroFac = $scope.x.facturaClienteCab.nroFac;
                                                $scope.datosFactura.facturaClienteCab.vuelto = vuelto;
                                                $scope.datosFactura.facturaClienteCab.horaFecha = $scope.x.facturaClienteCab.horaFecha;
                                                val = val.replace("empresa", $scope.x.facturaClienteCab.empresa);
                                                val = val.replace("sucursal", $scope.x.facturaClienteCab.sucursal);
                                                val = val.replace("rucEmpresa", $scope.x.facturaClienteCab.rucEmpresa);
                                                val = val.replace("telefono", $scope.x.facturaClienteCab.telefono);
                                                val = val.replace("direccion", $scope.x.facturaClienteCab.direccion);
                                                val = val.replace("timbrado", $scope.x.facturaClienteCab.timbrado);
                                                val = val.replace("inicio", $scope.x.facturaClienteCab.inicio);
                                                val = val.replace("fin", $scope.x.facturaClienteCab.fin);
                                                val = val.replace("nroCaja", $scope.x.facturaClienteCab.nroCaja);
                                                val = val.replace("nroFac", $scope.x.facturaClienteCab.nroFac);
                                                val = val.replace("fecha", $scope.x.facturaClienteCab.horaFecha);
                                                $cookies.putObject($scope.jsonUserLogueado.ruc, $scope.datosFactura);
//                                                alert($scope.x.facturaClienteCab.empresa + " - " + $scope.x.facturaClienteCab.sucursal + " - " +
//                                                        $scope.x.facturaClienteCab.rucEmpresa + " - " + $scope.x.facturaClienteCab.telefono + " - "
//                                                        + $scope.x.facturaClienteCab.direccion + " - " + $scope.x.facturaClienteCab.timbrado + " - "
//                                                        + $scope.x.facturaClienteCab.direccion + " - " + $scope.x.facturaClienteCab.horaFecha + " - "
//                                                        );
                                                $("#facturaImpresion").html(val);
                                                $("#facturaImpresion").fadeIn("slow");
                                            }
                                        }
                                    });
                                }
                            });
                        }
                        x++;
                    })
                }
                $scope.quitarPago = function (rp) {
                    var val = $scope.formaPago;
                    $scope.formaPago = [];
                    $("#detallePago").fadeOut("fast");
                    var x = 0;
                    var totalPagoGeneral = 0;
                    angular.forEach(val, function (value, key) {
                        if (value.descripcion.toUpperCase() === rp.descripcion.toUpperCase() && value.monto === rp.monto) {

                        } else {
                            $scope.formaPago.push(value);
                            var totalPagoGeneralAdmin = value.monto.replace(" Gs.", "");
                            totalPagoGeneralAdmin = totalPagoGeneralAdmin.replace(".", "");
                            totalPagoGeneralAdmin = totalPagoGeneralAdmin.replace(",", "");
                            totalPagoGeneral += parseInt(totalPagoGeneralAdmin);
                        }
                        x++;
                        if (x === val.length) {
                            $("#detallePago").fadeIn("slow");
                            var totalGeneral = $("#totalGeneral").html().replace(" Gs.", "");
                            totalGeneral = totalGeneral.replace(".", "");
                            totalGeneral = totalGeneral.replace(",", "");
//                            alert(totalGeneral + " - " + totalPagoGeneral)
                            if (parseInt(totalGeneral) > parseInt(totalPagoGeneral)) {
                                document.getElementById("facturar").disabled = true;
                            } else {
                                document.getElementById("facturar").disabled = false;
                            }
                        }
                    });
                    var monto = rp.monto.replace(",", "");
                    monto = monto.replace(".", "");
                    var totalPago = $scope.totalPago + "";
                    totalPago = totalPago.replace(",", "");
                    totalPago = totalPago.replace(".", "");
                    var total = parseInt(totalPago) - parseInt(monto);
                    $scope.totalPago = total;
//                    alert(totalPago + " - " + monto + " = " + $scope.totalPago)

                    var montoFac = $("#montoFactura").val().replace(",", "");
                    montoFac = montoFac.replace(".", "");
                    var sum = parseInt(montoFac) + parseInt(monto);
                    $("#montoFactura").val(formatNumber.new(sum));
                }
                $scope.procesarDatos = function () {
//                    alert($scope.totalGral)
                    var totalGeneral = $scope.totalGral.replace(" Gs.", "");
                    totalGeneral = totalGeneral.replace(".", "");
                    totalGeneral = totalGeneral.replace(",", "");
                    if (totalGeneral === "" || parseInt(totalGeneral) <= 0) {
                        $("body").overhang({
                            type: "error",
                            message: "SIN ARTICULOS PARA FACTURAR.",
                            duration: 1,
                            overlay: true
                        });
                    } else {
                        $("#numeroFactura").fadeOut("slow");
                        $("#numModal").fadeOut("slow");
                        $("#codigoFactura").fadeOut("slow");
                        $("#autModal").fadeOut("slow");
                        $("#numeroFacturaLabel").fadeOut("slow");
                        $("#codigoFacturaLabel").fadeOut("slow");
                        $("#credito").fadeOut("slow");
                        $("#debito").fadeOut("slow");
                        $("#tarjModal").fadeOut("slow");
                        $("#creditoLabel").fadeOut("slow");
                        $("#debitoLabel").fadeOut("slow");
                        $("#pagoPago").fadeOut("fast");
                        $("#back").fadeOut("fast");
                        $("#facturar").fadeOut("fast");
                        $("#backFactura").fadeOut("fast");
                        $("#imprimir").fadeOut("fast");
                        $("#facturaImpresion").fadeOut("fast");
                        $("#clientePago").fadeIn("fast");
                        $("#return").fadeIn("fast");
                        $("#next").fadeIn("fast");

                        $("#rucFactura").focus();
//                        if ($("#rucFactura").val() === "") {
//                            $("#rucFactura").val($scope.jsonUserLogueado.ruc);
//                        }
//                    alert()
//                    birdAlert.notify({
//                        msg: 'DATOS PROCESADOS CORRECTAMENTE.',
//                        title: 'Mensaje del Sistema',
//                        className: 'success'
//                    });
                        $("#montoFactura").val($scope.totalGral);
                        $("#advanced").modal("show");
                    }
                };
                $scope.keyPressed = function (keyEvent) {
                    if (keyEvent.keyCode === 13) {
                        if ($("#montoFactura").val() === "" || $("#montoFactura").val() === "0") {

                        } else {
                            $("#detallePago").fadeOut("fast");
                            if ($("#pago").val() === "1") {
                                if ($("#montoFactura").val() !== "") {
//                                alert("DATOS FACTURADO")
                                    $scope.dato = [];
                                    $scope.dato.descripcion = "Efectivo";
                                    $scope.dato.monto = $("#montoFactura").val();
                                    $scope.dato.formPago = "1";
                                    $scope.formaPago.push($scope.dato);
                                    var total = 0;
                                    angular.forEach($scope.formaPago, function (value, key) {
                                        var monto = value.monto.replace(",", "");
                                        monto = monto.replace(".", "");
                                        total += parseInt(monto);
                                        $scope.totalPago = total;
                                        var totalGeneral = $scope.totalGral.replace(",", "");
                                        totalGeneral = totalGeneral.replace(".", "");
                                        document.getElementById("facturar").disabled = true;
                                        var val = parseInt(totalGeneral) - parseInt($scope.totalPago);
                                        $("#montoFactura").val(val);
                                        $("#codigoFactura").val("");
                                        $("#numeroFactura").val("");
                                        if (parseInt($scope.totalPago) >= parseInt(totalGeneral)) {
                                            $("#montoFactura").val("0");
                                            document.getElementById("facturar").disabled = false;
                                        }
                                    });
                                    $("#detallePago").fadeIn("slow");
                                } else {
                                    $("body").overhang({
                                        type: "error",
                                        message: "EL CAMPO MONTO NO DEBE QUEDAR VACIO.",
                                        duration: 1,
                                        overlay: true
                                    });
//                                    alert("EL CAMPO MONTO NO DEBE QUEDAR VACIO")
                                }
                            } else if ($("#pago").val() === "2") {
                                if ($("#montoFactura").val() !== "" && $("#codigoFactura").val() !== "") {
//                                alert("DATOS FACTURADO")
                                    $scope.dato = [];
                                    $scope.dato.monto = $("#montoFactura").val();
                                    $scope.dato.descripcion = "Tarjeta";
                                    $scope.dato.formPago = "2";
                                    $scope.dato.codigo = $("#codigoFactura").val();
                                    if (document.getElementById("debito").checked === true) {
                                        $scope.dato.tipo = "debito";
                                    } else if (document.getElementById("credito").checked === true) {
                                        $scope.dato.tipo = "credito";
                                    }
                                    $scope.formaPago.push($scope.dato);
                                    var total = 0;
                                    angular.forEach($scope.formaPago, function (value, key) {
                                        var monto = value.monto.replace(",", "");
                                        monto = monto.replace(".", "");
                                        total += parseInt(monto);
                                        $scope.totalPago = total;
                                        var totalGeneral = $scope.totalGral.replace(",", "");
                                        totalGeneral = totalGeneral.replace(".", "");
                                        console.log($scope.totalPago + " - " + totalGeneral)
                                        document.getElementById("facturar").disabled = true;
                                        var val = parseInt(totalGeneral) - parseInt($scope.totalPago);
                                        $("#montoFactura").val(val);
                                        $("#codigoFactura").val("");
                                        $("#numeroFactura").val("");
                                        if (parseInt($scope.totalPago) >= parseInt(totalGeneral)) {
                                            $("#montoFactura").val("0");
                                            document.getElementById("facturar").disabled = false;
                                        }
                                    });
                                    $("#detallePago").fadeIn("slow");
                                } else {
                                    $("body").overhang({
                                        type: "error",
                                        message: "EL CAMPO MONTO Y CODIGO NO DEBEN QUEDAR VACIOS.",
                                        duration: 1,
                                        overlay: true
                                    });
//                                    alert("EL CAMPO MONTO Y CODIGO NO DEBEN QUEDAR VACIOS")
                                }
                            } else if ($("#pago").val() === "3") {
                                if ($("#montoFactura").val() !== "" && $("#numeroFactura").val() !== "") {
//                                alert("DATOS FACTURADO")
                                    $scope.dato = [];
                                    $scope.dato.descripcion = "Nota de Credito";
                                    $scope.dato.monto = $("#montoFactura").val();
                                    $scope.dato.formPago = "3";
                                    $scope.dato.numero = $("#numeroFactura").val();
                                    $scope.formaPago.push($scope.dato);
                                    var total = 0;
                                    angular.forEach($scope.formaPago, function (value, key) {
                                        var monto = value.monto.replace(",", "");
                                        monto = monto.replace(".", "");
                                        total += parseInt(monto);
                                        $scope.totalPago = total;
                                        var totalGeneral = $scope.totalGral.replace(",", "");
                                        totalGeneral = totalGeneral.replace(".", "");
                                        document.getElementById("facturar").disabled = true;
                                        var val = parseInt(totalGeneral) - parseInt($scope.totalPago);
                                        $("#montoFactura").val(val);
                                        $("#codigoFactura").val("");
                                        $("#numeroFactura").val("");
                                        if (parseInt($scope.totalPago) >= parseInt(totalGeneral)) {
                                            $("#montoFactura").val("0");
                                            document.getElementById("facturar").disabled = false;
                                        }
                                    });
                                    $("#detallePago").fadeIn("slow");
                                } else {
                                    $("body").overhang({
                                        type: "error",
                                        message: "EL CAMPO MONTO Y NUMERO NO DEBEN QUEDAR VACIOS.",
                                        duration: 1,
                                        overlay: true
                                    });
//                                    alert("EL CAMPO MONTO Y NUMERO NO DEBEN QUEDAR VACIOS")
                                }
                            }
                        }
                    }
                };
                $scope.buscarCliente = function (keyEvent) {
                    if (keyEvent.keyCode === 13) {
                        if ($("#rucFactura").val() === "") {

                        } else {
                            ClienteService.listarPorCI($("#rucFactura").val()).success(function (d) {
                                if (d.nombre === undefined) {
                                    $("body").overhang({
                                        type: "error",
                                        message: "RUC/CI INGRESADO NO SE ENCUNETRA.",
                                        duration: 1,
                                        overlay: true
                                    });
                                    $("#nombreFactura").val("");
                                } else {
                                    $("#rucFactura").val(d.ruc);
                                    $("#nombreFactura").val(d.nombre.toUpperCase() + " " + d.apellido.toUpperCase());
                                }
                            }).error(function (e) {
                                console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                            });
                        }
                    }
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
                                            $("body").overhang({
                                                type: "error",
                                                message: "Código ingresado no existe, verifíquelo.",
                                                duration: 1,
                                                overlay: true
                                            });
                                            $("#exampleModalLong").modal("show");
                                        } else {
                                            console.log("-->> " + rl.idServPendiente);
                                            ServPendienteService.eliminarPorId(rl.idServPendiente).success(function (d) {
                                                if (d === true) {
                                                    $("#valor").val(true);
//                                                    birdAlert.notify({
//                                                        msg: '',
//                                                        title: 'Mensaje del Sistema',
//                                                        className: 'success'
//                                                    });
                                                    $("body").overhang({
                                                        type: "error",
                                                        message: "Datos eliminados correctamente.",
                                                        duration: 1,
                                                        overlay: true
                                                    });
//                                                    $("#exampleModalLong").modal("show");aaaaaaaaaa
                                                    $scope.cargarCarrito(true);
                                                } else {
                                                    $("body").overhang({
                                                        type: "error",
                                                        message: "Datos no eliminados verifíquelos.",
                                                        duration: 1,
                                                        overlay: true
                                                    });
                                                }
                                            }).error(function (e) {
//                                                birdAlert.notify({
//                                                    msg: 'NO SE PUDO CONECTAR CON EL SERVIDOR...',
//                                                    title: 'Mensaje del Sistema',
//                                                    className: 'error'
//                                                });
                                                $("body").overhang({
                                                    type: "error",
                                                    message: "NO SE PUDO CONECTAR CON EL SERVIDOR...",
                                                    duration: 1,
                                                    overlay: true
                                                });
                                            });
                                        }
                                    }).error(function (e) {
//                                        birdAlert.notify({
//                                            msg: 'NO SE PUDO CONECTAR CON EL SERVIDOR...',
//                                            title: 'Mensaje del Sistema',
//                                            className: 'error'
//                                        });
                                        $("body").overhang({
                                            type: "error",
                                            message: "NO SE PUDO CONECTAR CON EL SERVIDOR...",
                                            duration: 1,
                                            overlay: true
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

                function detectmob() {
                    if (navigator.userAgent.match(/Android/i)
                            || navigator.userAgent.match(/webOS/i)
                            || navigator.userAgent.match(/iPhone/i)
                            || navigator.userAgent.match(/iPad/i)
                            || navigator.userAgent.match(/iPod/i)
                            || navigator.userAgent.match(/BlackBerry/i)
                            || navigator.userAgent.match(/Windows Phone/i)
                            ) {
                        return true;
                    } else {
                        return false;
                    }
                }

                if (detectmob()) {
                    var birdAlert = new BirdAlert({
                        position: 'bottom center'
                    });
                } else {
                    var birdAlert = new BirdAlert({
                        position: 'bottom right'
                    });
                }

//                $('#btnBasic').on('click', function () {
//                    birdAlert.notify({
//                        msg: 'Basic mensage',
//                        title: 'Success',
//                        className: 'success'
//                    });
//                });
                $scope.cargarArticulo = function (articulo) {
                    var id = $("#da" + articulo).val();
//                    alert("ID ARTICULO: " + id + " - " + articulo);
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
//                                            birdAlert.notify({
//                                                msg: 'Subtotal: ' + formatNumber.new(num) + " Gs.",
//                                                title: 'Datos Registrados Correctamente',
//                                                className: 'success'
//                                            });
                                            $("body").overhang({
                                                type: "warn",
                                                message: "Se agregó al carrito | Subtotal: " + formatNumber.new(num) + " Gs."
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
//                                                    birdAlert.notify({
//                                                        msg: 'Subtotal: ' + formatNumber.new(num) + " Gs.",
//                                                        title: 'Datos Registrados Correctamente',
//                                                        className: 'success'
//                                                    });
                                                    $("body").overhang({
                                                        type: "warn",
                                                        message: "Se agregó al carrito | Subtotal: " + formatNumber.new(num) + " Gs."
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
                            if ((data.codArticulo) === (id)) {
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
                                                $("body").overhang({
                                                    type: "warn",
                                                    message: "Se agregó al carrito | Subtotal: " + formatNumber.new(num) + " Gs."
                                                });
//                                                birdAlert.notify({
//                                                    msg: 'Subtotal: ' + formatNumber.new(num) + " Gs.",
//                                                    title: 'Datos Registrados Correctamente',
//                                                    className: 'success'
//                                                });
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
                                                        $("body").overhang({
                                                            type: "warn",
                                                            message: "Se agregó al carrito | Subtotal: " + formatNumber.new(num) + " Gs."
                                                        });
//                                                        birdAlert.notify({
//                                                            msg: 'Subtotal: ' + formatNumber.new(num) + " Gs.",
//                                                            title: 'Datos Registrados Correctamente',
//                                                            className: 'success'
//                                                        });
                                                        $scope.cargarCarrito(false);
                                                    } else {
                                                        angular.forEach($scope.srvPendiente, function (dato, key) {
                                                            num += parseInt(dato.cantidad) * parseInt(dato.montoServ);
                                                            if (i === $scope.srvPendiente.length) {

                                                                num += parseInt(cantidad) * parseInt(montoSrv);
                                                                $("body").overhang({
                                                                    type: "warn",
                                                                    message: "Se agregó al carrito | Subtotal: " + formatNumber.new(num) + " Gs."
                                                                });
//                                                                birdAlert.notify({
//                                                                    msg: 'Subtotal: ' + formatNumber.new(num) + " Gs.",
//                                                                    title: 'Datos Registrados Correctamente',
//                                                                    className: 'success'
//                                                                });
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
                $scope.datoCargarArticulo = function (articulo) {
                    var id = $("#da" + articulo).val();
                    var x = 0;
                    angular.forEach($scope.srvPendiente, function (data, key) {
                        if (parseInt(data.codArticulo) === parseInt(id)) {
//                            estado = true;
                            var canti = parseInt(data.cantidad);
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
                                        i++;
                                    });
                                }
                            }).error(function (e) {
                            });
                        }
                        x++;
                    });
                };
                $interval(function () {
                    ClientePendienteService.listarPorCi($scope.jsonUserLogueado.ruc).success(function (data) {
                        if (data.procesado === true) {
                            location.href = "login.html";
                        } else {
                            PublicidadService.aperturaCaja().success(function (result) {
                                if (result === false) {
                                } else {
                                    location.href = "login.html";
                                }
                            });
                        }
                    }).error(function (e) {
                    });
                }, 3000);
                $scope.salir = function () {
                    location.href = "./login.html";
//                    $cookies.remove($scope.jsonUserLogueado.ruc);
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
                                                $("body").overhang({
                                                    type: "error",
                                                    message: "Código ingresado no existe, verifíquelo.",
                                                    duration: 1,
                                                    overlay: true
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
//                                                            birdAlert.notify({
//                                                                msg: 'Datos actualizados correctamente.',
//                                                                title: 'Mensaje del Sistema',
//                                                                className: 'success'
//                                                            });
                                                            $("body").overhang({
                                                                type: "success",
                                                                message: "Datos actualizados correctamente."
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
//                                            birdAlert.notify({
//                                                msg: 'NO SE PUDO CONECTAR CON EL SERVIDOR...',
//                                                title: 'Mensaje del Sistema',
//                                                className: 'error'
//                                            });
                                            $("body").overhang({
                                                type: "error",
                                                message: "NO SE PUDO CONECTAR CON EL SERVIDOR...",
                                                duration: 1,
                                                overlay: true
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
                $scope.verTotales = function () {
                    $("#categoria").fadeOut("fast");
                    $("#productos").fadeOut("fast");
                    $("#tablaDatos").fadeIn("fast");
                }

                $scope.detalleProducto = function (id) {
                    $("#imagenProd").html("");
//                    alert("HOLA")
                    ArticuloService.listarPorId(id).success(function (response) {
//                        alert("DESCRIPCION: " + response.idArticulo + " - OBSERVACION: " + response.observacion);
                        $scope.descripcion = response.descripcion;
                        $scope.observacion = response.observacion;
                        $scope.precio = formatNumber.new(response.precioMin, 'Gs ');
                        var datoForm = "";
                        if (response.imagen === null) {
                            datoForm = '<img title=" " alt=" " src="img/sin_imagen.png" style="width: 300px; height: 200px" id="photo-id" />';
                        } else {
                            datoForm = '<img title=" " alt=" " ng-src="data:image/jpeg;base64,' + response.imagen + '" style="width: 300px; height: 200px" id="photo-id" />';
                        }
                        var $el = $(datoForm).appendTo('#imagenProd');
                        $compile($el)($scope);
                        $("#modal2").modal("show");
                    }).error(function (e) {
                        console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                    });
                };
                $scope.menosCant = function (idServ, cant, monto, cod) {
                    if (cant !== 0) {
                        $("#tablaDatos").fadeOut("fast");
                        var find = ' ';
                        var re = new RegExp(find, 'g');
                        var str = $scope.nombreUsuario.toUpperCase().replace(re, '');
                        var idCP = myMap.get(str);
                        $scope.srvPendiente = [];
                        ServPendienteService.buscandoServicios(idCP, 0).success(function (d) {
                            var sumTotal = 0;
                            $scope.totalGral = formatNumber.new("0");
                            var x = 0;
                            angular.forEach(d, function (data, key) {
                                var total = parseInt(data.cantidad) * parseInt(data.montoServ);
                                if (data.idServPendiente === idServ) {
                                    data.cantidad = parseInt(cant - 1);
                                    data.montoServ = monto;
                                    var total = parseInt(cant - 1) * monto;
                                    data.totalData = total;
                                    if (data.cantidad === 0) {
                                        ServPendienteService.eliminarPorId(data.idServPendiente, data.cantidad).success(function (xas) {
                                            if (xas === true) {
                                                console.log("EXITO!eliminar Cant: " + data.cantidad);
                                            }
                                        });
                                    } else {
                                        ServPendienteService.actualizarCantidad(data.idServPendiente, data.cantidad).success(function (xas) {
                                            if (xas === true) {
                                                console.log("EXITO! Cant: " + data.cantidad);
                                            }
                                        });
                                        $scope.srvPendiente.push(data);
                                    }
                                } else {
                                    data.totalData = parseInt(data.cantidad) * parseInt(data.montoServ);
                                    $scope.srvPendiente.push(data);
                                }
                                sumTotal += parseInt(data.totalData);
//                                $scope.srvPendiente.push(data);
                                console.log(total);
                                x++;
                                if (parseInt(x) === parseInt(d.length)) {
//                                    alert("ONE")
                                    $scope.totalGral = formatNumber.new(sumTotal);
                                    $("#numCant").html(x);
                                    $("#numCant2").html(x);
                                    $("#tablaDatos").fadeIn("fast");
                                    $scope.datoCargarArticulo(cod);
                                }
                            });
                            if (x === d.length) {
                            }
                        }).error(function (e) {
                            console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                        });
                    }
                };
//                ORIGINAL
//                $scope.menosCant = function (idServ, cant, monto, cod) {
//                    if (cant !== 0) {
//                        $("#tablaDatos").fadeOut("fast");
//                        var find = ' ';
//                        var re = new RegExp(find, 'g');
//                        var str = $scope.nombreUsuario.toUpperCase().replace(re, '');
//                        var idCP = myMap.get(str);
//                        $scope.srvPendiente = [];
//                        ServPendienteService.buscandoServicios(idCP, 0).success(function (d) {
//                            var sumTotal = 0;
//                            $scope.totalGral = formatNumber.new("0");
//                            var x = 0;
//                            angular.forEach(d, function (data, key) {
//                                var total = parseInt(data.cantidad) * parseInt(data.montoServ);
//                                if (data.idServPendiente === idServ) {
//                                    data.cantidad = parseInt(cant - 1);
//                                    data.montoServ = monto;
//                                    var total = parseInt(cant - 1) * monto;
//                                    data.totalData = total;
//                                } else {
//                                    data.totalData = parseInt(data.cantidad) * parseInt(data.montoServ);
//                                }
//                                sumTotal += parseInt(data.totalData);
//                                $scope.srvPendiente.push(data);
//                                console.log(total);
//                                x++;
//                                if (parseInt(x) === parseInt(d.length)) {
////                                    alert("ONE")
//                                    $scope.totalGral = formatNumber.new(sumTotal);
//                                    $("#numCant").html(x);
//                                    $("#numCant2").html(x);
//                                    $("#tablaDatos").fadeIn("fast");
//                                    $scope.datoCargarArticulo(cod);
//                                }
//                            });
//                            if (x === d.length) {
//                            }
//                        }).error(function (e) {
//                            console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
//                        });
//                    }
//                };
                $scope.masCant = function (idServ, cant, monto, cod) {
//                    var total = parseInt(cant + 1) * monto;
//                    alert("idServ: " + idServ + " cant: " + (cant + 1) + " monto: " + total);
                    $("#tablaDatos").fadeOut("fast");
//                    alert(cod)
                    var find = ' ';
                    var re = new RegExp(find, 'g');
                    var str = $scope.nombreUsuario.toUpperCase().replace(re, '');
                    var idCP = myMap.get(str);
                    $scope.srvPendiente = [];
                    ServPendienteService.buscandoServicios(idCP, 0).success(function (d) {
                        var sumTotal = 0;
                        $scope.totalGral = formatNumber.new("0");
                        var x = 0;
                        angular.forEach(d, function (data, key) {
//                            sumTotal += (parseInt(data.cantidad) + 1) * parseInt(data.montoServ);
//                            console.log("-> " + x + " - " + d.length);
                            var total = parseInt(data.cantidad) * parseInt(data.montoServ);
                            if (data.idServPendiente === idServ) {
                                data.cantidad = parseInt(cant + 1);
                                data.montoServ = monto;
                                var total = parseInt(cant + 1) * monto;
                                data.totalData = total;
                                ServPendienteService.actualizarCantidad(data.idServPendiente, data.cantidad).success(function (xas) {
                                    if (xas === true) {
                                        console.log("EXITO! Cant: " + data.cantidad);
                                    }
                                });
//                                $scope.cargarArticulo(cod);
//                                $scope.cargarArticulo(data.codArticulo);
                            } else {
                                data.totalData = parseInt(data.cantidad) * parseInt(data.montoServ);
                            }
                            sumTotal += parseInt(data.totalData);
                            $scope.srvPendiente.push(data);
                            console.log(total);
                            x++;
                            if (parseInt(x) === parseInt(d.length)) {
                                $scope.totalGral = formatNumber.new(sumTotal);
//                                console.log("TOTALES: " + $scope.totalGral);
                                $("#numCant").html(x);
                                $("#numCant2").html(x);
                                $("#tablaDatos").fadeIn("fast");
                                $scope.datoCargarArticulo(cod);
                            }
                        });
                        if (x === d.length) {
//                            sleep(30);
                        }
                    }).error(function (e) {
                        console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                    });
                };
                function sleep(milliseconds) {
                    var start = new Date().getTime();
                    for (var i = 0; i < 1e7; i++) {
                        if ((new Date().getTime() - start) > milliseconds) {
                            $("#tablaDatos").fadeIn("fast");
                            break;
                        }
                    }
                }


                $scope.cargarCarrito = function (value) {
                    var find = ' ';
                    var re = new RegExp(find, 'g');
                    var str = $scope.nombreUsuario.toUpperCase().replace(re, '');
                    var idCP = myMap.get(str);
//                    alert(idCP)
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
//                            $scope.srvPendiente = d;
                            angular.forEach(d, function (data, key) {
//                            $("#data" + data.idServPendiente).val(data.cantidad)
                                sumTotal += parseInt(data.cantidad) * parseInt(data.montoServ);
//                                console.log("ESTO --> " + $("#data" + data.idServPendiente).val() + " - " + data.descripcion + " - " + data.montoServ);
//                            console.log("-> " + (parseInt(data.cantidad) * parseInt(data.montoServ)));
//                                console.log("-> " + x + " - " + d.length);

                                var total = parseInt(data.cantidad) * parseInt(data.montoServ);
                                data.totalData = total;
                                $scope.srvPendiente.push(data);
                                console.log(total);
                                x++;
                                if (parseInt(x) === parseInt(d.length)) {
                                    $scope.totalGral = formatNumber.new(sumTotal);
                                    $("#numCant").html(x);
                                    $("#numCant2").html(x);
                                }
                            });
//                            d.total = total;

//                            angular.forEach($scope.srvPendiente, function (data, key) {
//                                var total = parseInt(data.cantidad) * parseInt(data.montoServ);
//                                $scope.srvPendiente.total.push(total);
//                                console.log($scope.srvPendiente.total);
//                            });
//                            var $el = $(y).appendTo('#datoAqui');
//                            $compile($el)($scope);
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
//                        console.log("-> " + parseInt(data.cantidad) + " X " + parseInt(data.montoServ) + " = " + (parseInt(data.cantidad) * parseInt(data.montoServ)));
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
                                    $("#nomEmpresa3").html($scope.nomEmpresa);
                                    $("#nomEmpresa").fadeIn("slow")
                                    $("#nomEmpresa3").fadeIn("slow")
                                    for (var y = 1; y < tam; y++) {
                                        $scope.nomEmpresa2 += datoString[y] + " ";
                                        $("#nomEmpresa2").html($scope.nomEmpresa2);
                                        $("#nomEmpresa2").fadeIn("slow")
                                        $("#nomEmpresa4").html($scope.nomEmpresa2);
                                        $("#nomEmpresa4").fadeIn("slow")
                                    }
//                                    $("#datoNomEmpresa").css("display", "inline");
                                } else {
                                    $scope.nomEmpresa = "";
                                    $("#nomEmpresa").fadeIn("slow")
                                    $("#nomEmpresa").html($scope.nomEmpresa);
                                    $("#nomEmpresa3").fadeIn("slow")
                                    $("#nomEmpresa3").html($scope.nomEmpresa);
                                    $scope.nomEmpresa2 = value.descripcionEmpresa;
                                    $("#nomEmpresa2").html($scope.nomEmpresa2);
                                    $("#nomEmpresa2").fadeIn("slow")
                                    $("#nomEmpresa4").html($scope.nomEmpresa2);
                                    $("#nomEmpresa4").fadeIn("slow")
//                                    $("#datoNomEmpresa").css("display", "inline");
                                }

                                SeccionService.listarActivos().success(function (datus) {
                                    var datoForm = '';
                                    var y = 0;
                                    angular.forEach(datus, function (dati, key) {
                                        if (y === 0) {
                                            $scope.nomSeccion = dati.descripcion;
                                            $("#nomSeccion").html($scope.nomSeccion);
                                            $("#nomSeccion").fadeIn("slow");
                                            $scope.mostrarPorSeccion(dati.idSeccion);
                                        }
                                        datoForm += '<li><a href="#" ng-click="mostrarPorSeccion(' + dati.idSeccion + ')">' + dati.descripcion.toUpperCase() + '&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i></a></li>';
                                        y++;
                                    });
                                    var $el = $(datoForm).appendTo('#secciones');
                                    $compile($el)($scope);
                                    var $el2 = $(datoForm).appendTo('#secciones2');
                                    $compile($el2)($scope);
                                    var $el3 = $(datoForm).appendTo('#secciones3');
                                    $compile($el3)($scope);
//                                    $scope.nombreUsuario = $scope.nombreUsuario.substring(0, 17) + " - " + $scope.jsonUserLogueado.ruc;
                                    $scope.nombreUsuario += " - " + $scope.jsonUserLogueado.ruc;
                                    $scope.rucFinal = $scope.jsonUserLogueado.ruc;
                                    $scope.nombreFinal = $scope.jsonUserLogueado.nombre + " " + $scope.jsonUserLogueado.apellido;
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
                $scope.buscarArticulo = function (keyEvent) {
                    if (keyEvent.keyCode === 13) {
                        if ($("#busquedaArt").val() === "" && $("#busquedaArt2").val() === "") {
//                            alert("VACIO")
                        } else {
                            $('#productos').html("");
                            $("#productos").fadeOut("fast");
                            $("#antePiePagina").fadeOut("fast");
                            $("#iePagina").fadeOut("fast");
                            $("#nomSeccion").html("BUSQUEDA");
                            $("#nomSeccion").fadeIn("slow");
                            var busqueda = "";
                            if ($("#busquedaArt").val() !== "") {
                                busqueda = $("#busquedaArt").val();
                            }
                            if ($("#busquedaArt2").val() !== "") {
                                busqueda = $("#busquedaArt2").val();
                            }
                            ArticuloService.listarPorDescripcion(busqueda).success(function (datus) {
//                        var datoForm = '<div class="products_container grid">';
                                var datoForm = '<section class="card">';
                                datoForm += '<div class="container">';
                                datoForm += '<div class="row">';
                                if (datus.length === 0) {
                                    $("body").overhang({
                                        type: "error",
                                        message: "NO SE ENCONTRARON RESULTADOS DE LA BUSQUEDA.",
//                                        duration: 1,
//                                        overlay: true
                                    });
                                } else {
                                    angular.forEach(datus, function (value, key) {
//                            datoForm += '<div class="products_container grid">';
                                        datoForm += '<div class="col-sm-4">';
                                        datoForm += '<div class="card-section">';
                                        datoForm += '<div class="card-section-image">';
                                        datoForm += '<a href="#">';
                                        if (value.imagen === null) {
                                            datoForm += '<center><a href="#" ng-click="detalleProducto(' + value.idArticulo + ')"><img src="img/sin_imagen.png" style="width: 300px; height: 200px" alt=""/></a></center>';
                                        } else {
                                            datoForm += '<center><a href="#" ng-click="detalleProducto(' + value.idArticulo + ')"><img title=" " alt=" " src="data:image/jpeg;base64,' + value.imagen + '" style="width: 300px; height: 200px" id="photo-id" /></a></center>';
                                        }
//                            datoForm += '<center><a href="#" onclick="detalleProductoJS(' + value.idArticulo + ')"><img src="img/sin_imagen.png" style="width: 300px; height: 200px" alt=""/></a></center>';
//                            datoForm += '<div class="product_tag"></div>';
                                        datoForm += '</a>';
                                        datoForm += '<div class="card-purchase">';
                                        datoForm += '<div class="product_title">';
                                        datoForm += '<a href="#" style="color: #fff">' + formatNumber.new(value.precioMin) + '</a>';
                                        datoForm += '</div></div></div>';
                                        datoForm += '<div class="card-desc">';
                                        datoForm += '<div class="product_title">';
                                        datoForm += '<p><center><input type="hidden" id="da' + value.idArticulo + '" value="' + value.codArticulo + '"></center></p>';
                                        datoForm += '<center><h4 style="color: #414141"><a href="#">' + value.descripcion + '</a></h4></center>';
                                        datoForm += '</div></center>';
                                        datoForm += '<div class="product_title">';
                                        datoForm += '<center><a href="#" ng-click="cargarArticulo(' + value.idArticulo + ')" class="cart_btn btn btn-success" style="color: #fff">Agregar Carrito</a></center>';
                                        datoForm += '</div></center></div></div></div>';
//                            datoForm += '<div class="product_content text-center">';
//                            datoForm += '<div class="product_title"><a href="product.html"><center>' + value.descripcion + '</center></a></div>';
//                            datoForm += '<div class="product_price"><center>Gs. ' + formatNumber.new(value.precioMin) + ' </center></div>';
//                            datoForm += '<div class="product_button ml-auto mr-auto trans_200"><a href="#" ng-click="cargarArticulo(' + value.idArticulo + ')">Agregar carrito</a></div>';
//                            datoForm += '</div></div></div>';
//                            datoForm += '</div>';
                                    });
                                    datoForm += '</div></div></section>';
                                    var $el = $(datoForm).appendTo('#productos');
                                    $compile($el)($scope);
//                        $('#productos').html(datoForm);
//                        console.log(datoForm)
                                    $("#productos").fadeIn("slow");
                                    $("#antePiePagina").fadeIn("fast");
                                    $("#iePagina").fadeIn("fast");
                                    $("#categoria").fadeIn("fast");
                                    $("#tablaDatos").fadeOut("fast");
                                }
                            }).error(function (e) {
                                console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                            });
                        }
//                        );
//                            ArticuloService.listarPorSeccion(id).success(function (datus) {
//                        }
                    }
                }
                $scope.mostrarPorSeccion = function (id) {
//                    alert("ID SECCION: " + id);
                    $('#productos').html("");
                    $("#productos").fadeOut("fast");
                    $("#antePiePagina").fadeOut("fast");
                    $("#iePagina").fadeOut("fast");
                    SeccionService.listarPorId(id).success(function (response) {
                        $scope.nomSeccion = response.descripcion.toUpperCase();
                        $("#nomSeccion").html($scope.nomSeccion);
                        $("#nomSeccion").fadeIn("slow")
                    }).error(function (e) {
                        console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                    });
                    ArticuloService.listarPorSeccion(id).success(function (datus) {
//                        var datoForm = '<div class="products_container grid">';
                        var datoForm = '<section class="card">';
                        datoForm += '<div class="container">';
                        datoForm += '<div class="row">';
                        angular.forEach(datus, function (value, key) {
//                            datoForm += '<div class="products_container grid">';
                            datoForm += '<div class="col-sm-4">';
                            datoForm += '<div class="card-section">';
                            datoForm += '<div class="card-section-image">';
                            datoForm += '<a href="#">';
                            if (value.imagen === null) {
                                datoForm += '<center><a href="#" ng-click="detalleProducto(' + value.idArticulo + ')"><img src="img/sin_imagen.png" style="width: 300px; height: 200px" alt=""/></a></center>';
                            } else {
                                datoForm += '<center><a href="#" ng-click="detalleProducto(' + value.idArticulo + ')"><img title=" " alt=" " src="data:image/jpeg;base64,' + value.imagen + '" style="width: 300px; height: 200px" id="photo-id" /></a></center>';
                            }
//                            datoForm += '<center><a href="#" onclick="detalleProductoJS(' + value.idArticulo + ')"><img src="img/sin_imagen.png" style="width: 300px; height: 200px" alt=""/></a></center>';
//                            datoForm += '<div class="product_tag"></div>';
                            datoForm += '</a>';
                            datoForm += '<div class="card-purchase">';
                            datoForm += '<div class="product_title">';
                            datoForm += '<a href="#" style="color: #fff">' + formatNumber.new(value.precioMin) + '</a>';
                            datoForm += '</div></div></div>';
                            datoForm += '<div class="card-desc">';
                            datoForm += '<div class="product_title">';
                            datoForm += '<p><center><input type="hidden" id="da' + value.idArticulo + '" value="' + value.codArticulo + '"></center></p>';
                            datoForm += '<center><h4 style="color: #414141"><a href="#">' + value.descripcion + '</a></h4></center>';
                            datoForm += '</div></center>';
                            datoForm += '<div class="product_title">';
                            datoForm += '<center><a href="#" ng-click="cargarArticulo(' + value.idArticulo + ')" class="cart_btn btn btn-success" style="color: #fff">Agregar Carrito</a></center>';
                            datoForm += '</div></center></div></div></div>';
//                            datoForm += '<div class="product_content text-center">';
//                            datoForm += '<div class="product_title"><a href="product.html"><center>' + value.descripcion + '</center></a></div>';
//                            datoForm += '<div class="product_price"><center>Gs. ' + formatNumber.new(value.precioMin) + ' </center></div>';
//                            datoForm += '<div class="product_button ml-auto mr-auto trans_200"><a href="#" ng-click="cargarArticulo(' + value.idArticulo + ')">Agregar carrito</a></div>';
//                            datoForm += '</div></div></div>';
//                            datoForm += '</div>';
                        });
                        datoForm += '</div></div></section>';
                        var $el = $(datoForm).appendTo('#productos');
                        $compile($el)($scope);
//                        $('#productos').html(datoForm);
//                        console.log(datoForm)
                        $("#productos").fadeIn("slow");
                        $("#antePiePagina").fadeIn("fast");
                        $("#iePagina").fadeIn("fast");
                        $("#categoria").fadeIn("fast");
                        $("#tablaDatos").fadeOut("fast");
                    }).error(function (e) {
                        console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
                    });
                }

//                ORIGINAL
//                $scope.mostrarPorSeccion = function (id) {
////                    alert("ID SECCION: " + id);
//                    $('#productos').html("");
//                    $("#productos").fadeOut("fast");
//                    SeccionService.listarPorId(id).success(function (response) {
//                        $scope.nomSeccion = response.descripcion.toUpperCase();
//                        $("#nomSeccion").html($scope.nomSeccion);
//                        $("#nomSeccion").fadeIn("slow")
//                    }).error(function (e) {
//                        console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
//                    });
//                    ArticuloService.listarPorSeccion(id).success(function (datus) {
//                        var datoForm = '';
//                        angular.forEach(datus, function (value, key) {
//                            datoForm += '<div class="col-md-3 top_brand_left">';
//                            datoForm += '<div class="hover14 column">';
//                            datoForm += '<div class="agile_top_brand_left_grid">';
//                            datoForm += '<div class="tag"></div>';
//                            datoForm += '<div class="agile_top_brand_left_grid1">';
//                            datoForm += '<figure>';
//                            datoForm += '<div class="snipcart-item block" >';
//                            datoForm += '<div class="snipcart-thumb">';
////                            datoForm += '<a href="single.html"><img title=" " alt=" " src="grocery-folder/images/1.png" /></a>
////                            console.log("-> " + );
//                            if (value.imagen === null) {
//                                datoForm += '<a href="#" ng-click="detalleProducto(' + value.idArticulo + ')"><img src="img/sin_imagen.png" style="width: 110px; height: 110px" alt=""/></a>';
//                            } else {
//                                datoForm += '<a href="#" ng-click="detalleProducto(' + value.idArticulo + ')"><img title=" " alt=" " ng-src="data:image/jpeg;base64,' + value.imagen + '" style="width: 110px; height: 110px" id="photo-id" /></a>';
//                            }
//                            datoForm += '<a href="#">';
////                            datoForm += '<img class="imagem_artigo" src="data:image/png;base64,' + value.imagen + '" alt="IMG DESC">';
//                            datoForm += '</a>';
//                            datoForm += '<p><center>' + value.descripcion + '</center></p>';
//                            datoForm += '<p><center><input type="hidden" id="da' + value.idArticulo + '" value="' + value.codArticulo + '"></center></p>';
//                            datoForm += '<h4><center>Gs. ' + formatNumber.new(value.precioMin) + ' </center></h4>';
//                            datoForm += '</div>';
//                            datoForm += '<div class="snipcart-details top_brand_home_details">';
//                            datoForm += '<input type="button" name="submit" value="Agregar al carrito" class="button" ng-click="cargarArticulo(' + value.idArticulo + ')" />';
//                            datoForm += '</div></div></figure></div></div></div></div>';
//                        });
//                        var $el = $(datoForm).appendTo('#productos');
//                        $compile($el)($scope);
//                        $("#productos").fadeIn("slow");
//                    }).error(function (e) {
//                        console.log("ERROR: SIN CONEXION CON EL SERVIDOR...");
//                    });
//                }

                var formatNumber = {
                    separador: ",", // separador para los miles
                    sepDecimal: '.', // separador para los decimales
                    formatear: function (num) {
                        num += '';
                        var splitStr = num.split(',');
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
                            } else {
                                cliente += "-";
                            }
                            if (value.cliente.ruc !== "") {
                                cliente = cliente + value.cliente.ruc;
                            }
//            comboBoxClientes.getItems().add(cliente.toUpperCase());
                            var find = ' ';
                            var re = new RegExp(find, 'g');
                            var str = cliente.toUpperCase().replace(re, '');
                            myMap.set(str, value.idClientePendiente);
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
        .directive('numbersOnly', function () {
            return {
                require: 'ngModel',
                link: function (scope, element, attr, ngModelCtrl) {
                    function fromUser(text) {
                        if (text) {
                            var transformedInput = text.replace(/[^0-9]/g, '');

                            if (transformedInput !== text) {
                                ngModelCtrl.$setViewValue(transformedInput);
                                ngModelCtrl.$render();
                            }
                            return transformedInput;
                        }
                        return undefined;
                    }
                    ngModelCtrl.$parsers.push(fromUser);
                }
            };
        })
        .directive('rucOnly', function () {
            return {
                require: 'ngModel',
                link: function (scope, element, attr, ngModelCtrl) {
                    function fromUser(text) {
                        if (text) {
                            var transformedInput = text.replace(/[^0-9-]/g, '');

                            if (transformedInput !== text) {
                                ngModelCtrl.$setViewValue(transformedInput);
                                ngModelCtrl.$render();
                            }
                            return transformedInput;
                        }
                        return undefined;
                    }
                    ngModelCtrl.$parsers.push(fromUser);
                }
            };
        });
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
        