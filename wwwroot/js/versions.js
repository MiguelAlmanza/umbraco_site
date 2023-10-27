'use strict';
(function(window) {
    var _self; // corresponde a la referencia al objeto mismo, es como un this que siempre apunta al objeto mayor
    var api_subaru = window.api_subaru;
    var modelos = {
        // acá van las variables que se usarán de forma global
        vars: {
            datos: null,
            datosUsuario: null,

        },
        init: function() {
            _self = this; // guardamos la referencia al this
            _self.ui.getElements(); // obtenemos los objetos relativos a la implementación
            _self.ui.setEvents(); // seteamos los eventos que sean necesarios
            
        },
        ui: { 
            /**
             * Objeto encargado de manejar los elementos graficos de la vista.
             */
            elements: {
                datosModelo: undefined,
                divSeguridad: undefined,
                divMotor: undefined,
                divTransmision: undefined,
                divUpgrade: undefined,
                divEquipamiento: undefined,
                btnComparar: undefined,
                formFicha: undefined,
                inputEmail: undefined,
                nombreModelo: undefined,
                btnModal: undefined,
                versionButton:undefined,
                liColor:undefined,
                iframeDiv:undefined,
                colorText:undefined,
                external:undefined,
                internal:undefined,
                iframeIcons:undefined,
            },
            getElements: function() {
                _self.ui.elements.datosModelo = $(".ficha_auto");
                _self.ui.elements.divSeguridad = $(".seguridad_rdo");
                _self.ui.elements.divMotor = $(".motor_rdo");
                _self.ui.elements.divTransmision = $(".transmision_rdo");
                _self.ui.elements.divUpgrade = $(".upgrade_rdo");
                _self.ui.elements.divEquipamiento = $(".equipamiento_rdo");
                _self.ui.elements.btnComparar = $(".btn_comparar");
                _self.ui.elements.formFicha = $(".form_descarga");
                _self.ui.elements.fromFicha = $("input[name=from]");
                _self.ui.elements.inputEmail = $("input[name=user_email]");
                _self.ui.elements.inputNombre = $("input[name=nombres_contacto]");
                _self.ui.elements.inputApellido = $("input[name=apellidos_contacto]");
                _self.ui.elements.formBrochure = $(".form_brochure");
                _self.ui.elements.fromBrochure = $(".form_descarga input[name=from]");
                _self.ui.elements.inputEmail = $(".form_descarga input[name=user_email]");
                _self.ui.elements.inputNombre = $(".form_descarga input[name=nombres_contacto]");
                _self.ui.elements.inputApellido = $(".form_descarga input[name=apellidos_contacto]");
                _self.ui.elements.inputEmailBrochure = $(".form_brochure input[name=user_email]");
                _self.ui.elements.inputNombreBrochure = $(".form_brochure input[name=nombres_contacto]");
                _self.ui.elements.inputApellidoBrochure = $(".form_brochure input[name=apellidos_contacto]");
                _self.ui.elements.paso1 = $(".step_1");
                _self.ui.elements.paso2 = $(".step_2");
                _self.ui.elements.paso3 = $(".step_3");
                _self.ui.elements.paso4 = $(".step_4");
                _self.ui.elements.nombreModelo = $("#contenido-ppal");  
                _self.ui.elements.btnModal = $(".btn_close");
                _self.ui.elements.versionButton = $("*#version-button");
                _self.ui.elements.liColorExterior = $(".color-selector #list_exterior li");
                _self.ui.elements.liColorInterior = $(".color-selector #list_interior li");
                _self.ui.elements.iframeDiv = $("#iframe-container");
                _self.ui.elements.colorText = $(".color-text");
                _self.ui.elements.external = $("#external");
                _self.ui.elements.internal = $("#internal");
                _self.ui.elements.iframeIcons = $("#iframe-icons button");
                _self.actions.isMobile();
            },
            setEvents: function() {
                _self.ui.elements.divSeguridad.on("change",_self.actions.comprobarDatos);
                _self.ui.elements.divMotor.on("change",_self.actions.comprobarDatos);
                _self.ui.elements.divTransmision.on("change",_self.actions.comprobarDatos);
                _self.ui.elements.divUpgrade.on("change",_self.actions.comprobarDatos);
                _self.ui.elements.divEquipamiento.on("change",_self.actions.comprobarDatos);
                //_self.ui.elements.btnComparar.on("click", function(e) {_self.actions.agregarAuto(this,e)});
                _self.ui.elements.formFicha.on("submit", function(e) {_self.actions.enviarFicha(this,e)});
                _self.ui.elements.formBrochure.on("submit", function(e) {_self.actions.enviarBrochure(this,e)});
                _self.ui.elements.btnModal.on("click", _self.actions.swapPasos);
                _self.ui.elements.liColorExterior.on("click", function(e) {_self.actions.selectIconExternal($(this), e, 'ex')});
                _self.ui.elements.liColorInterior.on("click", function(e) {_self.actions.selectIconInternal($(this), e, 'in')});
                _self.ui.elements.versionButton.on("click", function(e) {_self.actions.showVersionElements($(this), e)});
                _self.ui.elements.external.on("click", function(e) {_self.actions.cargarIframeVersion($(this), e, 'ex')});
                _self.ui.elements.internal.on("click", function(e) {_self.actions.cargarIframeVersion($(this), e, 'in')});
                _self.actions.setActives();
                //_self.vars.datos = JSON.parse(localStorage.getItem('user'));

                /*if (_self.vars.datos != null) {
                    
                    var email = _self.vars.datos.email;
                    var nombre_completo = _self.vars.datos.complete_name.split(" ");

                    if (_self.vars.datos.first_name != undefined) {
                        var nombre = _self.vars.datos.first_name
                    }
                    else {
                        var nombre = nombre_completo[0];
                    }
                    if (_self.vars.datos.last_name != undefined) {
                        var apellido = _self.vars.datos.last_name;
                    }
                    else {
                        var apellido = nombre_completo[1];
                    }
                    _self.vars.datosUsuario = {
                        "nombre" : nombre,
                        "apellido" : apellido,
                        "email" : email
                    };
                    _self.ui.elements.inputEmail.val(email);
                }*/
                var boton = _self.ui.elements.datosModelo;
                    var dataObj = {
                        "ts_art" : boton.attr('data-ts'),
                };

                if(typeof dataObj['ts_art'] != 'undefined'){
                    api_subaru.actions.cargarVersionUno(dataObj);
                }
                

            }
        },
        actions:{
            comprobarDatos: function(){
                var contador = 0;
                if($("input[name=seguridad]:checked").val()!= undefined){
                    contador++;
                }
                if($("input[name=upgrade]:checked").val()!= undefined){
                    contador++;   
                }
                if($("input[name=equipamiento]:checked").val()!= undefined){
                    contador++;
                }
                if($("input[name=transmision]:checked").val()!= undefined){
                    contador++;
                }
                if($("input[name=motor]:checked").val()!= undefined){
                    contador++;
                }

                if (contador == 3) {
                    var boton = _self.ui.elements.datosModelo;
                    var dataObj = {
                        "ts_art" : boton.attr('data-ts'),
                        "motor" : $("input[name=motor]:checked").val(),
                        "seguridad" : $("input[name=seguridad]:checked").val(),
                        "upgrade" : $("input[name=upgrade]:checked").val(),
                        "equipamiento" : $("input[name=equipamiento]:checked").val(),
                        "transmision" : $("input[name=transmision]:checked").val(),
                    };
                    api_subaru.actions.cargarVersionesFiltradas(dataObj);
                }
            },
            agregarAuto: function(elem,event) {
                event.preventDefault();
                if ($(elem).data('tsversion') != "") {
                    var dataObj = {
                        "ts":  $(elem).data('tsversion'),
                        "id": $(elem).data('idversion')
                    };
                    api_subaru.actions.apiPost(dataObj,"versiones/addVersion", "cbAgregarAutoModelo");
                    /*if (_self.vars.datosUsuario != null) {
                        _self.vars.datosUsuario.modelos_comparados = _self.ui.elements.datosModelo.data("nombre");
                        api_subaru.actions.envioMailcenter(_self.vars.datosUsuario);
                    }*/
                }
                

                return false;
            },
            enviarFicha: function(elem,event) {
                event.preventDefault();
                var boton = _self.ui.elements.datosModelo;
                if(boton.hasClass('ficha_auto')){
                    var dataObj = {
                        "ts_art" : boton.attr('data-ts'),
                        "user_email" : _self.ui.elements.inputEmail.val(),
                        "modelo" : _self.ui.elements.nombreModelo.html(),
                        "id_modelo": $(".form_descarga input[name=modelo]").val(),
                        "nombre": _self.ui.elements.inputNombre.val(),
                        "apellido": _self.ui.elements.inputApellido.val(),
                        "formulario": "ficha",
                        "from": _self.ui.elements.fromFicha.val()

                    };
                    
                    if (!_self.actions.validateInputs(dataObj,elem)) {
                        return false;
                    }

                    if($('#terminos_condiciones').length > 0){
                        if (!$(".form_descarga input[name=suscribirse]").is(":checked")) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error',
                                text: 'Debe aceptar los Terminos y Condiciones.'
                              })
                              return false;
                        }
                    } else if($(".form_descarga").find(".answer.si").length > 0) {
                        if ($(".form_descarga").find(".answer.si").siblings("[name='radio']:checked").val() != "on") {
                            Swal.fire({
                                type: 'error',
                                title: 'Error',
                                text: 'Debe aceptar los Terminos y Condiciones.'
                              })
                              return false;
                        }
                    }

                    if (!_self.actions.emailValidate(_self.ui.elements.inputEmail.val())) {
                        $(elem).find("#user_email").css('border','2px solid red');
                        Swal.fire({
                            type: 'error',
                            title: 'Error',
                            text: 'Correo Inválido.'
                        })
                        return false;
                    }
                    api_subaru.actions.apiPost(dataObj,"modelos/enviar_ficha_tecnica", "cbEnviarFicha");
                        
                    
                }
                return false;
            },
            enviarBrochure: function(elem,event) {
                event.preventDefault();
                console.log(elem);
                var boton = _self.ui.elements.datosModelo;
                if(boton.hasClass('ficha_auto')){
                    var dataObj = {
                        "ts_art" : boton.attr('data-ts'),
                        "user_email" : _self.ui.elements.inputEmailBrochure.val(),
                        "modelo" : _self.ui.elements.nombreModelo.html(),
                        "id_modelo": $(".form_brochure input[name=modelo]").val(),
                        "nombre": _self.ui.elements.inputNombreBrochure.val(),
                        "apellido": _self.ui.elements.inputApellidoBrochure.val(),
                        "formulario": "brochure",
                        "from": _self.ui.elements.fromBrochure.val()

                    };
                   
                    if (!_self.actions.validateInputs(dataObj,elem)) {
                        return false;
                    }

                    if($('#terminos_condiciones').length > 0){
                        if (!$(".form_brochure input[name=suscribirse]").is(":checked")) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error',
                                text: 'Debe aceptar los Terminos y Condiciones.'
                              })
                              return false;
                        }
                    } else if($(".form_brochure").find(".answer.si").length > 0) {
                        if ($(".form_brochure").find(".answer.si").siblings("[name='radio']:checked").val() != "on") {
                            Swal.fire({
                                type: 'error',
                                title: 'Error',
                                text: 'Debe aceptar los Terminos y Condiciones.'
                              })
                              return false;
                        }
                    }

                    if (!_self.actions.emailValidate(_self.ui.elements.inputEmailBrochure.val())) {
                        $(elem).find("#user_email").css('border','2px solid red');
                        Swal.fire({
                            type: 'error',
                            title: 'Error',
                            text: 'Correo Inválido.'
                        })
                        return false;
                    }
                    api_subaru.actions.apiPost(dataObj,"modelos/enviar_brochure", "cbEnviarBrochure");
                        
                    
                }
                return false;
            },
            swapPasos: function(){
                _self.ui.elements.paso1.show();
                _self.ui.elements.paso2.hide();
                _self.ui.elements.paso2.find(".modal_tit").html("Envío exitoso");
            },
            validateInputs: function(dataObj,elem){
                var input_keys;
                input_keys = { nombres_contacto : 'nombre', apellidos_contacto: 'apellido', user_email: 'user_email'};
                var return_value = true
                for (var key in input_keys){
                    if (input_keys[key] in dataObj && dataObj[input_keys[key]].trim().length == 0) {
                        $(elem).find("#"+key).css('border','2px solid red');
                        return_value = false;
                    }else{
                        $(elem).find("#"+key).css('border','');
                    }
                }
                return return_value;
            },
            emailValidate: function(email){
                var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                if (filter.test(email)) {
                    return true;
                }
                else {
                    return false;
                }
            },
            cargarIframeVersion: function(element, event, tipo) {
                event.preventDefault();
                for(let i = 1; i <= 10; i++) {
                    let listExternal = document.querySelector(`#colores-${i} #list_exterior`);
                    let listInternal = document.querySelector(`#colores-${i} #list_interior`);
                    let inputValue = document.querySelector(".tablink.active").value;
                    _self.controls.activeElement(_self.ui.elements.iframeIcons, element, "active");
                    if(tipo === "ex") {
                        listInternal.classList.add("hide");
                        listExternal.classList.remove("hide");
                        if(i == inputValue) { $($(`#colores-${i} #list_exterior li`)[0]).click(); }
                    } 
                    if(tipo === "in") {
                        listExternal.classList.add("hide");
                        listInternal.classList.remove("hide");
                        if(i == inputValue) { $($(`#colores-${i} #list_interior li`)[0]).click(); }
                    }
                }
            },
            selectIconExternal: function(element, event, tipo) {
                let listExternal = document.querySelector(`#colores-${i} #list_exterior`);
                let listInternal = document.querySelector(`#colores-${i} #list_interior`);
                event.preventDefault();
                _self.controls.showDiv(_self.ui.elements.external);
                _self.controls.setColorName(`Color seleccionado: <span class="bold">${element.attr("color-text")}</span> `, _self.ui.elements.colorText);
                _self.controls.activeElement(_self.ui.elements.liColorExterior , element, "selected");
                if(element.attr('ex') != "") {
                    // _self.ui.elements.external.click();
                    (element.attr('in') == "") ? _self.controls.hideDiv(_self.ui.elements.internal) :'';
                } 
                if(tipo === "ex") {
                    _self.controls.loadIframe($("#list_exterior li.selected").attr(`${tipo}`), _self.ui.elements.iframeDiv);
                }
            },
            selectIconInternal: function(element, event, tipo) { 
                event.preventDefault();
                let listExternal = document.querySelector(`#colores-${i} #list_exterior`);
                let listInternal = document.querySelector(`#colores-${i} #list_interior`);
                
                _self.controls.showDiv(_self.ui.elements.internal);
                _self.controls.setColorName(`Color seleccionado: <span class="bold">${element.attr("color-text")}</span> `, _self.ui.elements.colorText);
                _self.controls.activeElement(_self.ui.elements.liColorInterior , element, "selected");
                if(tipo === "in") {
                    _self.controls.loadIframe($("#list_interior li.selected").attr(`${tipo}`), _self.ui.elements.iframeDiv);
                    
                }
                 
            },
            setActives: function() {
                //Seteamos el elemento activo para las versiones
                let version = $("#version-button")
                _self.controls.activeElement(_self.ui.elements.versionButton, version, "active");
                document.querySelector('#versiones .tabs-main button').click();
                // Seteamos elementos activos en el iframe
                for (let i = 1; i <= 10; i++) {
                    if($(`#colores-${i}`).length > 0) {
                        $($(`#colores-${i} #list_interior li`)[0]).click();
                        if($(`#colores-${i} #list_exterior li`).attr('ex') != "") {
                            _self.ui.elements.external.click();
                        } else {
                            _self.ui.elements.internal.click();
                        }
                        _self.controls.showDiv($(`#colores-${i}`));
                        _self.controls.showDiv($(`#model-${i}`));
                        _self.controls.showDiv($(`#detail-${i}`));
                        break;
                    }
                }
                // let listInternal = document.getElementById("list_interior");
                // listInternal.classList.add("hide");
                if($(`#colores-${i} #list_exterior li`).attr('ex') != "") {
                    _self.ui.elements.external.click();
                    // (element.attr('in') == "") ? _self.controls.hideDiv(_self.ui.elements.internal) :'';
                } else {
                    _self.ui.elements.internal.click();
                }
            },
            showVersionElements: function(element, event) {
                _self.controls.activeElement(_self.ui.elements.versionButton , element, "active");
                // document.querySelector('#versiones .tabs-main button').click();
                for (let i = 1; i <= 10; i++) {
                    _self.controls.hideDiv($(`#colores-${i}`));
                    _self.controls.hideDiv($(`#model-${i}`));
                    _self.controls.hideDiv($(`#detail-${i}`));
                    _self.controls.hideDiv($(`#version${i}`));
                    _self.controls.hideDiv($(`#acordeon-${i}`));
                    _self.controls.hideDiv($(`#logo_360-${i}`));
                    console.log(element.attr('value'));
                    if(i == element.attr('value') ) {
                        _self.controls.showDiv($(`#colores-${i}`));
                        _self.controls.showDiv($(`#model-${i}`));
                        _self.controls.showDiv($(`#detail-${i}`));
                        _self.controls.showDiv($(`#acordeon-${i}`));
                        _self.controls.showDiv($(`#version${i}`));
                        // _self.controls.showDiv($(`#detail-${i}`));
                    }
                }
                $($(`#colores-${element.attr('value')} #list_exterior li`)[0]).click();
                _self.ui.elements.external.click();
                // dinamic_scroll();
                get_inner_width();
            },
            isMobile: function() {
                let check = false;
                (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
                _self.vars.isMobile = check;
            },
        },
        callbacks:{
            cbFichaTecnica: function(response){
                if(response.status != 200) {
                    switch(response.status) {
                        case 400:
                        break;
                        case 402:
                            _self.ui.elements.paso2.find(".modal_tit").html("Error");
                            _self.ui.elements.paso2.find(".bajada").html(response.msg[0]);
                            _self.ui.elements.paso1.hide();
                            _self.ui.elements.paso2.show();
                        break;
                        case 403:
                            _self.ui.elements.paso2.find(".modal_tit").html("Error");
                            _self.ui.elements.paso2.find(".bajada").html(response.msg[0]);
                            _self.ui.elements.paso1.hide();
                            _self.ui.elements.paso2.show();
                        break;
                    }

                    return;
                }
                _self.ui.elements.paso2.find(".bajada").html(response.msg[0]);
                _self.ui.elements.paso1.hide();
                _self.ui.elements.paso2.show();
            },
            cbBrochure: function(response){
                if(response.status != 200) {
                    switch(response.status) {
                        case 400:
                        break;
                        case 402:
                            _self.ui.elements.paso4.find(".modal_tit").html("Error");
                            _self.ui.elements.paso4.find(".bajada").html(response.msg[0]);
                            _self.ui.elements.paso3.hide();
                            _self.ui.elements.paso4.show();
                        break;
                        case 403:
                            _self.ui.elements.paso4.find(".modal_tit").html("Error");
                            _self.ui.elements.paso4.find(".bajada").html(response.msg[0]);
                            _self.ui.elements.paso3.hide();
                            _self.ui.elements.paso4.show();
                        break;
                    }
    
                    return;
                }
                _self.ui.elements.paso4.find(".bajada").html(response.msg[0]);
                _self.ui.elements.paso3.hide();
                _self.ui.elements.paso4.show();
            }
        },
        
        controls:{
            reloadComparar: function(){
                _self.ui.elements.btnComparar = $(".btn_comparar");
                $(_self.ui.elements.btnComparar).unbind( "click");
                for (var i = 0; i < _self.ui.elements.btnComparar.length; i++) {
                    $(_self.ui.elements.btnComparar[i]).on("click", function(e) {_self.actions.agregarAuto(this,e)});
                }
            },
            showDiv: function(div){
                div.removeClass("hide");
            },
            hideDiv: function(div){
                div.addClass("hide");
            },
            activeElement: function(array, element, class_name) {
                array.each(function(index, currentValue) {
                    $(this).removeClass(class_name);
                })
                element.addClass(class_name);
            },
            loadIframe: function(url, element) {
                element.empty();
                let height, width;
                _self.vars.isMobile=false;
                if($(window).width()<767){
                _self.vars.isMobile=true;
                }
                if(_self.vars.isMobile) {
                    height = ($("#height-iframe").html()) ? $("#height-iframe").html()*0.42 : 200;
                    width = ($("#width-iframe").html()) ? $("#width-iframe").html()*0.42 : height*1.777;
                } else {
                    height = ($("#height-iframe").html()) ? $("#height-iframe").html() : 472;
                    width = ($("#width-iframe").html()) ? $("#width-iframe").html() : height*1.777;
                }
                let iframe;
                if(url.includes("spin")){iframe = document.createElement('iframe');}
                else{iframe = document.createElement('img');}
                iframe.width = width;
                iframe.height = height;
                iframe.scrolling = "no";
                iframe.style = "overflow:hidden";
                iframe.setAttribute("src", url);
                element.append(iframe);
            },
            setColorName: function(string, element) {
                element.empty();
                element.html(string);
            }
        },
        helper:{
            helper1: function(){

            }
        }
    };
    window.modelos = modelos; // entregamos la referencia al dom principal
})(window); 
// se inicializa el objeto
/*$(window).ready(function(){
    modelos.init();
})*/

