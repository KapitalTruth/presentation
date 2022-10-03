$(document).ready(function($){
	//Subseccion
	var sub = 'portada';
	var pos = location.href.indexOf('#');
	if(pos !== -1){
		sub = location.href.substr(pos + 1);
	}
	$('#tab_'+sub).click();
	$('#maincontainer').removeClass('hidden');

	//No permitir nombre usuario vacío
	$('#usuPersonalizar input').blur(function(){
		if($(this).val() === ''){
			$(this).val(GetRandomNombre());
		}
	});

	//No permitir texto pregunta vacío
	$('#prePersonalizar input').blur(function(){
		if($(this).val() === ''){
			$(this).val(GetRandomTexto());
		}
	});

	//Permitir sólo letras en nombre usuario y nombre moneda
	$('#monNombre, #usuPersonalizar input').keydown(function(event){//alert(event.which);
		return (event.which >= 65 && event.which <= 90) || event.which === 8  || event.which === 9 || event.which === 46 || (event.which >= 35 && event.which <= 40) || event.which === 16;
	});

	//No permitir nombre moneda vacío
	$('#monNombre').blur(function(){
		if($(this).val() === ''){
			$(this).val(l('punto'));
		}
	});

	//Click número usuarios
	$(document).on('change', 'input[name=usuNumero]', function(event){
		var n = $('input[name="usuNumero"]:checked').val();
		for(var c=1; c<=5; c++){
			if(c > n){
				$('#usu'+c).hide(200);
			}else{
				$('#usu'+c).show(200);
			}
		}
	});

	//Click automatizar o personalizar usuarios
	$(document).on('change', 'input[name=usuPersonalizar]', function(event){
		if($('input[name="usuPersonalizar"]:checked').val() === '1'){
			$('#usuPersonalizar').show(200);
		}else{
			$('#usuPersonalizar').hide(200);
		}
	});

	//Click automatizar usuarios
	$(document).on('change', '#usuPersonalizar_0', function(event){
		for(var c=1; c<=5; c++){
			$('#usu'+c+' input').val(GetRandomNombre());
		}
	});

	//Click número preguntas
	$(document).on('change', 'input[name=preNumero]', function(event){
		var n = $('input[name="preNumero"]:checked').val();
		for(var c=1; c<=5; c++){
			if(c > n){
				$('#pre'+c).hide(200);
			}else{
				$('#pre'+c).show(200);
			}
		}
	});

	//Click automatizar o personalizar preguntas
	$(document).on('change', 'input[name=prePersonalizar]', function(event){
		if($('input[name="prePersonalizar"]:checked').val() === '1'){
			$('#prePersonalizar').show(200);
		}else{
			$('#prePersonalizar').hide(200);
		}
	});

	//Click automatizar preguntas
	$(document).on('change', '#prePersonalizar_0', function(event){
		for(var c=1; c<=3; c++){
			$('#pre'+c+' input').val(GetRandomTexto());
		}
	});

	//Click emoticono valoraciones
	$(document).on('change', '#valoraciones input', function(event){
		$('#valoraciones table button').hide(200);

		var aux = $(this).attr('name');
		var arr = aux.substr(3).split('_');
		KPTL.RegValoracion(arr[0], arr[1], arr[2], $(this).val());

		RecuentoRespondidas();
	});

	$(window).scroll(function(){
		if($(this).scrollTop() > 200){
			jQuery('#footer .right .btn').fadeIn();
		}else{
			jQuery('#footer .right .btn').fadeOut();
		}
	});

	//Valores por defecto
	Resetear();
});

var KTPL;
var pluralizador = new Pluralizador();
var validador = new Validador();
validador.classError = 'alert-danger';
function Comenzar(){
	if(validador.ValidarForm('form_config')){
		//KPTL = new KPTL_Sim();

		KPTL.options.usuNumero = $('input[name="usuNumero"]:checked').val();
		KPTL.options.usuPersonalizar = $('input[name="usuPersonalizar"]:checked').val();
		KPTL.options.preNumero = $('input[name="preNumero"]:checked').val();
		KPTL.options.prePersonalizar = $('input[name="prePersonalizar"]:checked').val();
		KPTL.options.monNombre = $('#monNombre').val();
		KPTL.options.monNombrePlural = pluralizador.Plural(KPTL.options.monNombre, true, lang_isocode);
		KPTL.options.monTesoro = $('#monTesoro').val();

		for(var c=1; c<=KPTL.options.usuNumero; c++){
			KPTL.AddUsuario($('#usu'+c+' input').val());
		}

		for(var c=1; c<=KPTL.options.preNumero; c++){
			KPTL.AddPregunta($('#pre'+c+' input').val());
		}

		KPTL.tesoro = new KPTL_Tesoro(KPTL.options.monTesoro);

		$('span.puntos').html(KPTL.options.monNombrePlural);
		$('#transferencias input[name="puntos"]').attr('title', l('Transfiere')+' ('+KPTL.options.monNombrePlural+')');

		//VALORACIONES
		$('#valoraciones table tbody tr').remove();

		var tr = document.createElement('tr');

		var td = document.createElement('td');
		td.colSpan = 2;
		td.rowSpan = 2;
		td.style.borderTop = 'none';
		td.innerHTML = '<button class="btn btn-sm center-block btn-default" type="button" onclick="RespuestasAutomaticas();">'+l('Respuestas_automaticas')+'</button>';
		tr.appendChild(td);

		var preWidth = ((100 / (KPTL.preguntas.length + 1)) + (6 / KPTL.preguntas.length));

		for(var c=0; c<KPTL.preguntas.length; c++){
			td = document.createElement('td');
			td.colSpan = 3;
			td.className = 'text-center';
			td.style.borderLeft = '1px solid #ccc';
			td.style.borderTop = 'none';
			td.width = preWidth+'%';
			td.innerHTML = KPTL.preguntas[c].texto;
			tr.appendChild(td);
		}

		$('#valoraciones table tbody').append(tr);

		var tr = document.createElement('tr');

		for(var c=0; c<KPTL.preguntas.length; c++){
			td = document.createElement('td');
			td.className = 'text-right small';
			td.innerHTML = '<i>'+l('No')+'</i>';
			td.width = (preWidth / 3)+'%';
			td.style.borderLeft = '1px solid #ccc';
			tr.appendChild(td);

			td = document.createElement('td');
			td.className = 'text-center small';
			td.innerHTML = '<i>'+l('Si')+'</i>';
			td.width = (preWidth / 3)+'%';
			tr.appendChild(td);

			td = document.createElement('td');
			td.className = 'text-left small';
			td.innerHTML = '<i>'+l('Doble')+'</i>';
			td.width = (preWidth / 3)+'%';
			tr.appendChild(td);
		}

		$('#valoraciones table tbody').append(tr);

		var n = 0;
		for(var c=0; c<KPTL.usuarios.length; c++){
			n++;
			var pintarNombre = true;
			for(var k=0; k<KPTL.usuarios.length; k++){
				if(c !== k){
					tr = document.createElement('tr');
					tr.className = n % 2 === 0 ? 'odd' : 'even';

					if(pintarNombre){
						td = document.createElement('td');
						td.rowSpan = KPTL.usuarios.length - 1;
						td.innerHTML = '<b>'+KPTL.usuarios[c].nombre+'</b>';
						tr.appendChild(td);

						pintarNombre = false;
					}

					td = document.createElement('td');
					td.innerHTML = '&#8594; '+KPTL.usuarios[k].nombre;
					tr.appendChild(td);

					for(var q=0; q<KPTL.preguntas.length; q++){
						td = document.createElement('td');
						td.className = 'text-center emoticon';
						td.innerHTML = '<div class="btn-group" data-toggle="buttons">' +
								'<label class="btn btn-default emoticonC">' +
									'<input type="radio" name="val'+KPTL.usuarios[c].id+'_'+KPTL.usuarios[k].id+'_'+KPTL.preguntas[q].id+'" id="val'+KPTL.usuarios[c].id+'_'+KPTL.usuarios[k].id+'_'+KPTL.preguntas[q].id+'_0" value="0"> C' +
								'</label>' +
								'<label class="btn btn-default emoticonA">' +
									'<input type="radio" name="val'+KPTL.usuarios[c].id+'_'+KPTL.usuarios[k].id+'_'+KPTL.preguntas[q].id+'" id="val'+KPTL.usuarios[c].id+'_'+KPTL.usuarios[k].id+'_'+KPTL.preguntas[q].id+'_1" value="1"> A' +
								'</label>' +
								'<label class="btn btn-default emoticonD">' +
									'<input type="radio" name="val'+KPTL.usuarios[c].id+'_'+KPTL.usuarios[k].id+'_'+KPTL.preguntas[q].id+'" id="val'+KPTL.usuarios[c].id+'_'+KPTL.usuarios[k].id+'_'+KPTL.preguntas[q].id+'_2" value="2"> D' +
								'</label>' +
							'</div>';
						td.colSpan = 3;
						td.style.borderLeft = '1px solid #ccc';
						tr.appendChild(td);
					}

					$('#valoraciones table tbody').append(tr);
				}
			}
		}

		RecuentoRespondidas();

		//TRANSFERENCIAS
		$('#transferencias select').children().remove();
		$('#transferencias select').append('<option value="">'+l('Seleccionar')+'</option>');

		for(var c=0; c<KPTL.usuarios.length; c++){
			$('#transferencias select').append('<option value="'+KPTL.usuarios[c].id+'">'+KPTL.usuarios[c].nombre+'</option>');
		}

		$('#transferencias input[name="puntos"]').val('1');
		$('#transferencias input[name="concepto"]').val(l('El_motivo_que_sea'));

		//RESULTADO
		$('#resultado table tbody tr').remove();

		for(var c=0; c<KPTL.usuarios.length; c++){
			tr = document.createElement('tr');

			td = document.createElement('td');
			td.innerHTML = KPTL.usuarios[c].nombre;
			tr.appendChild(td);

			td = document.createElement('td');
			td.id = 'puntosU'+KPTL.usuarios[c].id;
			td.className = 'text-right';
			td.innerHTML = KPTL.usuarios[c].puntos_show;
			tr.appendChild(td);

			td = document.createElement('td');
			td.innerHTML = KPTL.options.monNombrePlural;
			tr.appendChild(td);

			$('#resultado table tbody').append(tr);
		}

		tr = document.createElement('tr');

		td = document.createElement('td');
		td.innerHTML = l('Tesoro');
		td.className = 'info';
		tr.appendChild(td);

		td = document.createElement('td');
		td.id = 'puntosTesoro';
		td.className = 'text-right info';
		td.innerHTML = KPTL.tesoro.actual;
		tr.appendChild(td);

		td = document.createElement('td');
		td.className = 'info';
		td.innerHTML = KPTL.options.monNombrePlural;
		tr.appendChild(td);

		$('#resultado table tbody').append(tr);

		tr = document.createElement('tr');

		var th = document.createElement('th');
		th.innerHTML = l('Total');
		tr.appendChild(th);

		th = document.createElement('th');
		th.className = 'text-right';
		th.innerHTML = KPTL.tesoro.total;
		tr.appendChild(th);

		th = document.createElement('th');
		th.innerHTML = KPTL.options.monNombrePlural;
		tr.appendChild(th);

		$('#resultado table tbody').append(tr);

		ActualizarResultado();

		//OCULTAR CONFIGURACIÓN Y MOSTRAR MODELO REDUCIDO
		$('#configuracion').hide(200);
		$('#modeloreducido').hide().removeClass('hidden').show(200);
	}
}
function Resetear(){
	KPTL = new KPTL_Sim();

	$('#usuNumero_'+KPTL.options.usuNumero).click();
	$('#usuPersonalizar_'+KPTL.options.usuPersonalizar).click();
	$('#preNumero_'+KPTL.options.preNumero).click();
	$('#prePersonalizar_'+KPTL.options.prePersonalizar).click();
	$('#monNombre').val(KPTL.options.monNombre);
	$('#monTesoro').val(KPTL.options.monTesoro);
}
function GetRandomNombre(){
	var usados = '';
	for(var c=1; c<=5; c++){
		usados += '['+$('#usu'+c+' input').val()+']';
	}

	var nombre = '';
	do{
		nombre = KPTL.GetRandomNombre(false);
	}while(usados.indexOf('['+nombre+']') !== -1);

	return nombre;
}
function GetRandomTexto(){
	var usadas = '';
	for(var c=1; c<=5; c++){
		usadas += '['+$('#pre'+c+' input').val()+']';
	}

	var texto = '';
	do{
		texto = KPTL.GetRandomTexto(false);
	}while(usadas.indexOf('['+texto+']') !== -1);

	return texto;
}
function MarcarRespuesta(c, k, q){
	var valor = KPTL.ValoracionAutomatica(KPTL.usuarios[c].id, KPTL.usuarios[k].id, KPTL.preguntas[q].id);
	$('#val'+KPTL.usuarios[c].id+'_'+KPTL.usuarios[k].id+'_'+KPTL.preguntas[q].id+'_'+valor).click();
}
function RespuestasAutomaticas(){
	$('#valoraciones table button').attr('disabled', 'disabled').html('<span class="glyphicon glyphicon-refresh ani-rotate"></span> '+l('Cargando'));

	var n = 0;
	for(var c=0; c<KPTL.usuarios.length; c++){
		for(var k=0; k<KPTL.usuarios.length; k++){
			if(KPTL.usuarios[c].id !== KPTL.usuarios[k].id){
				for(var q=0; q<KPTL.preguntas.length; q++){
					n++;
					eval('setTimeout(function(){MarcarRespuesta('+c+', '+k+', '+q+');}, '+n+'*((KPTL.timing*6)/(KPTL.usuarios.length+KPTL.preguntas.length)));');
				}
			}
		}
	}

	setTimeout(function(){$('#valoraciones table button').hide(200);}, n*((KPTL.timing*6)/(KPTL.usuarios.length+KPTL.preguntas.length)));
}
function RecuentoRespondidas(){
	var n = $('#valoraciones input:checked').length;
	var m = $('#valoraciones input').length / 3;

	$('#crn').html(n);
	$('#crm').html(m);
	var p = ((n * 100) / m);
	$('#valoraciones .progress-bar').css('width', p+'%');
	if(p === 100){
		$('#valoraciones .progress').hide(200);
		$('#valoraciones div.small .glyphicon').removeClass('hidden');
	}
}
function CalculoMedia(){
	$('#media').html(KPTL.GetMediaShow());
}
function EjecutarReparto(){
	$('#resultado .btn-lg').removeClass('btn-primary').addClass('btn-danger').attr('disabled', 'disabled').html('<span class="glyphicon glyphicon-refresh ani-rotate"></span> '+l('Cargando'));
	$('#mensajesReparto').html('');
	KPTL.RepartirPuntos(true);
	setTimeout(function(){
			ActualizarResultado();
			ScrollTo('#resultado', KPTL.n * KPTL.timing / 4);
			$('#resultado .btn-lg').removeClass('btn-danger').addClass('btn-primary').removeAttr('disabled').html(l('Ejecutar_reparto'));
			$('#form_transferencias').removeClass('hidden').show(200);
			if(KPTL.transferencias.length == 0){
				$('#transferencias .historico').text('');
			}
		}, KPTL.n * KPTL.timing);
}
function ReiniciarSimulacion(){
	if(confirm(l('Reiniciar_simulacion')+'\n\n'+l('Reiniciar_simulacion_texto'))){
		KPTL = new KPTL_Sim();

		$('#modeloreducido').hide(200);
		$('#configuracion').show(200);
		
		$('#form_transferencias').hide(200);
		$('#transferencias .historico').text(l('No_transferencias'));
	}
}
function ActualizarResultado(){
	for(var c=0; c<KPTL.usuarios.length; c++){
		$('#puntosU'+KPTL.usuarios[c].id).html(KPTL.usuarios[c].puntos_show);
	}

	$('#puntosTesoro').html(KPTL.tesoro.actual);

	CalculoMedia();
	$('#ciclos').html(KPTL.ciclos);
	$('#ultima').html(KPTL.fechayhora_ultima === '0000-00-00 00:00:00' ? l('nunca') : KPTL.fechayhora_ultima);
}
function ScrollTo(elm, ms){
	$('html, body').animate({scrollTop: $(elm).offset().top}, ms);
}
function Transferencia(){
	if(validador.ValidarForm('form_transferencias')){
		var user_from = $('#form_transferencias select[name="user_from"]').val();
		var user_to = $('#form_transferencias select[name="user_to"]').val();
		var puntos = $('#form_transferencias input[name="puntos"]').val();
		var concepto = $('#form_transferencias input[name="concepto"]').val();
		if(KPTL.Transferencia(user_from, user_to, puntos, concepto)){
			var user_from_obj = KPTL.GetUsuarioById(user_from);
			var user_to_obj = KPTL.GetUsuarioById(user_to);

			$('#puntosU'+user_from_obj.id).html(user_from_obj.puntos_show);
			$('#puntosU'+user_to_obj.id).html(user_to_obj.puntos_show);

			CalculoMedia();

			$('#transferencias .historico').append('<div class="row '+(KPTL.transferencias.length % 2 === 0 ? 'odd' : 'even')+'"><div class="col-md-2">'+user_from_obj.nombre+'</div><div class="col-md-1 text-right">'+puntos+'</div><div class="col-md-2">'+user_to_obj.nombre+'</div><div class="col-md-5">'+concepto+'</div><div class="col-md-2"></div></div>');
			$('#form_transferencias select[name="user_from"]').val('');
			$('#form_transferencias select[name="user_to"]').val('');
			$('#form_transferencias input[name="puntos"]').val(1);
			$('#form_transferencias input[name="concepto"]').val(l('El_motivo_que_sea'));
		}else{
			alert('ERROR\n\n'+KPTL.error);
		}
	}
}
function l(q){
	return eval('typeof(lang_'+q+') != "undefined" ? lang_'+q+' : "'+q+'";');
}