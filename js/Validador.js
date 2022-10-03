/**
 * Validador v3.0 2014-10-30
 * Requiere jquery
 * @author José Carlos Cruz Parra AKA internia
 * josecarlos@programadorphpfreelance.com
 * http://www.programadorphpfreelance.com
 * 2007-2014
 * This code is released under the GNU General Public License.
 */
function Validador(){
	this.msgPassNoValida = 'Clave de acceso no válida: [*var0*]\n';
	this.msgEmailNoValido = 'Email no válido: [*var0*]\n';
	this.msgNumeroNoValido = 'Número no válido: [*var0*]\n';
	this.msgFechaNoValida = 'Fecha no válida: [*var0*]\n';
	this.msgCIFNIFNIENoValido = 'CIF/NIF/NIE no válido: [*var0*]\n';
	this.msgCIFNoValido = 'CIF no válido: [*var0*]\n';
	this.msgNIFNIENoValido = 'NIF/NIE no válido: [*var0*]\n';
	this.msgCPNoValido = 'Código postal no válido: [*var0*]\n';
	this.msgCCCNoValida = 'Código de cuenta no válido: [*var0*]\n';
	this.msgFaltaElDato = 'Falta el dato: [*var0*]\n';
	this.msgLongitudMinima = 'La longitud mínima para [*var0*] es [*var1*]\n';
	this.msgLongitudMaxima = 'La longitud máxima para [*var0*] es [*var1*]\n';
	this.msgValorMinimo = 'El valor mínimo para [*var0*] es [*var1*]\n';
	this.msgValorMaximo = 'El valor máximo para [*var0*] es [*var1*]\n';
	this.msgValorNoValido = 'Valor no válido: [*var0*]\n';
	this.msgDebeMarcarLaCasilla = 'Debes marcar la casilla [*var0*]\n';
	this.msgDebeSeleccionarUnaOpcion = 'Debe seleccionar una opción de [*var0*]\n';
	this.msgNoHaConfirmado = 'No ha confirmado correctamente [*var0*]\n';
	this.msgExtensionNoadmitida = 'Extensión no admitida para [*var0*]\n';

	this.cfgPassValidChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	this.cfgPassMinLen = 4;
	this.cfgPassMaxLen = 14;
	this.cfgFormatoDeFecha = 'dd/mm/yyyy';
	this.classError = 'validadorError';

	this.ValidarForm = function(form_id, submitOnSuccess){
		var form = document.getElementById(form_id);
		var mensaje = '';
		var elements = form.elements;
		for(var c = 0; c < elements.length; c++){

			this.desmarcarError(elements[c]);

			var vacio = $.trim(elements[c].value) === '';
			var className = elements[c].className;
			if(className.indexOf('requerido') !== -1){
				if(elements[c].type === 'checkbox'){
					if(!elements[c].checked){
						mensaje += this.msgDebeMarcarLaCasilla.replace('[*var0*]', this.getNombreElemento(elements[c]));
						this.marcarError(elements[c]);
					}
				}
				else if(elements[c].type === 'radio'){
					var radioelements = document.getElementsByName(elements[c].name);
					var radiochecked = false;
					for(var k = 0; k < radioelements.length; k++){
						if(radioelements[k].checked){
							radiochecked = true;
							break;
						}
					}
					if(!radiochecked){
						mensaje += this.msgDebeSeleccionarUnaOpcion.replace('[*var0*]', this.getNombreElemento(elements[c]));
						this.marcarError(elements[c]);
					}
				}
				else if(vacio){
					mensaje += this.msgFaltaElDato.replace('[*var0*]', this.getNombreElemento(elements[c]));
					this.marcarError(elements[c]);
				}
			}

			if(className.indexOf('confirm') !== -1){
					var aux = className.substring(className.indexOf('confirm'));
					aux = aux.indexOf(' ') !== -1 ? aux.substring(7, aux.indexOf(' ')) : aux.substring(7);
					aux = document.getElementById(aux);
					if(aux.value !== elements[c].value){
						mensaje += this.msgNoHaConfirmado.replace('[*var0*]', this.getNombreElemento(aux));
						this.marcarError(elements[c]);
					}
				}
			else if(!vacio){
				if(className.indexOf('email') !== -1){
					elements[c].value = elements[c].value.toLowerCase();
					if(!this.validateEmail(elements[c].value, false)){
						mensaje += this.msgEmailNoValido.replace('[*var0*]', this.getNombreElemento(elements[c]));
						this.marcarError(elements[c]);
					}
				}

				if(className.indexOf('pass') !== -1){
					if(!this.validatePass(elements[c].value, false)){
						mensaje += this.msgPassNoValida.replace('[*var0*]', this.getNombreElemento(elements[c]));
						this.marcarError(elements[c]);
					}
				}

				if(className.indexOf('phone') !== -1){
					if(!this.validatePhone(elements[c].value, false, className.indexOf('strict') !== -1 ? '' : ' -')){
						mensaje += this.msgNumeroNoValido.replace('[*var0*]', this.getNombreElemento(elements[c]));
						this.marcarError(elements[c]);
					}
				}

				if(className.indexOf('mobile') !== -1){
					if(!this.validateMobile(elements[c].value, false, className.indexOf('strict') !== -1 ? '' : ' -')){
						mensaje += this.msgNumeroNoValido.replace('[*var0*]', this.getNombreElemento(elements[c]));
						this.marcarError(elements[c]);
					}
				}

				if(className.indexOf('cifnifnie') !== -1){
					if(!this.validateCIFNIFNIE(elements[c].value)){
						mensaje += this.msgCIFNIFNIENoValido.replace('[*var0*]', this.getNombreElemento(elements[c]));
						this.marcarError(elements[c]);
					}
				}
				else
				{
					if(className.indexOf('cif') !== -1){
						if(!this.validateCIF(elements[c].value)){
							mensaje += this.msgCIFNoValido.replace('[*var0*]', this.getNombreElemento(elements[c]));
							this.marcarError(elements[c]);
						}
					}
					if(className.indexOf('nifnie') !== -1){
						if(!this.validateNIFNIE(elements[c].value)){
							mensaje += this.msgNIFNIENoValido.replace('[*var0*]', this.getNombreElemento(elements[c]));
							this.marcarError(elements[c]);
						}
					}
				}

				if(className.indexOf('codigopostal') !== -1){
					if(!this.validateCP(elements[c].value)){
						mensaje += this.msgCPNoValido.replace('[*var0*]', this.getNombreElemento(elements[c]));
						this.marcarError(elements[c]);
					}
				}

				if(className.indexOf('ccc') !== -1){
					if(!this.validateCCC(elements[c].value)){
						mensaje += this.msgCCCNoValida.replace('[*var0*]', this.getNombreElemento(elements[c]));
						this.marcarError(elements[c]);
					}
				}

				if(className.indexOf('date') !== -1){
					if(!this.validateDateStr(elements[c].value)){
						mensaje += this.msgFechaNoValida.replace('[*var0*]', this.getNombreElemento(elements[c]));
						this.marcarError(elements[c]);
					}

					if(className.indexOf('minvalue') !== -1){
						var aux = className.substring(className.indexOf('minvalue'));
						aux = aux.indexOf(' ') !== -1 ? aux.substring(8, aux.indexOf(' ')) : aux.substring(8);
						if(this.difDias($.trim(elements[c].value), aux) > 0){
							mensaje += this.msgValorMinimo.replace('[*var0*]', this.getNombreElemento(elements[c])).replace('[*var1*]', aux);
							this.marcarError(elements[c]);
						}
					}

					if(className.indexOf('maxvalue') !== -1){
						var aux = className.substring(className.indexOf('maxvalue'));
						aux = aux.indexOf(' ') !== -1 ? aux.substring(8, aux.indexOf(' ')) : aux.substring(8);
						if(this.difDias($.trim(elements[c].value), aux) < 0){
							mensaje += this.msgValorMaximo.replace('[*var0*]', this.getNombreElemento(elements[c])).replace('[*var1*]', aux);
							this.marcarError(elements[c]);
						}
					}
				}
				else if(className.indexOf('numeric') !== -1){
					if(!this.validateChars($.trim(elements[c].value), '0123456789,.-')){
					//if(!/^([0-9])*$/.test($.trim(elements[c].value))){
					//if(parseInt($.trim(elements[c].value)) === false){
						mensaje += this.msgValorNoValido.replace('[*var0*]', this.getNombreElemento(elements[c]));
						this.marcarError(elements[c]);
					}

					if(className.indexOf('minvalue') !== -1){
						var aux = className.substring(className.indexOf('minvalue'));
						aux = aux.indexOf(' ') !== -1 ? aux.substring(8, aux.indexOf(' ')) : aux.substring(8);
						if(parseInt($.trim(elements[c].value)) < parseInt(aux)){
							mensaje += this.msgValorMinimo.replace('[*var0*]', this.getNombreElemento(elements[c])).replace('[*var1*]', aux);
							this.marcarError(elements[c]);
						}
					}

					if(className.indexOf('maxvalue') !== -1){
						var aux = className.substring(className.indexOf('maxvalue'));
						aux = aux.indexOf(' ') !== -1 ? aux.substring(8, aux.indexOf(' ')) : aux.substring(8);
						if(parseInt($.trim(elements[c].value)) > parseInt(aux)){
							mensaje += this.msgValorMaximo.replace('[*var0*]', this.getNombreElemento(elements[c])).replace('[*var1*]', aux);
							this.marcarError(elements[c]);
						}
					}
				}
				else{
					if(className.indexOf('minvalue') !== -1){
						var aux = className.substring(className.indexOf('minvalue'));
						aux = aux.indexOf(' ') !== -1 ? aux.substring(8, aux.indexOf(' ')) : aux.substring(8);
						if($.trim(elements[c].value) < aux){
							mensaje += this.msgValorMinimo.replace('[*var0*]', this.getNombreElemento(elements[c])).replace('[*var1*]', aux);
							this.marcarError(elements[c]);
						}
					}

					if(className.indexOf('maxvalue') !== -1){
						var aux = className.substring(className.indexOf('maxvalue'));
						aux = aux.indexOf(' ') !== -1 ? aux.substring(8, aux.indexOf(' ')) : aux.substring(8);
						if($.trim(elements[c].value) > aux){
							mensaje += this.msgValorMaximo.replace('[*var0*]', this.getNombreElemento(elements[c])).replace('[*var1*]', aux);
							this.marcarError(elements[c]);
						}
					}
				}

				if(className.indexOf('minlength') !== -1){
					var aux = className.substring(className.indexOf('minlength'));
					aux = aux.indexOf(' ') !== -1 ? aux.substring(9, aux.indexOf(' ')) : aux.substring(9);
					if($.trim(elements[c].value).length < aux){
						mensaje += this.msgLongitudMinima.replace('[*var0*]', this.getNombreElemento(elements[c])).replace('[*var1*]', aux);
						this.marcarError(elements[c]);
					}
				}

				if(className.indexOf('maxlength') !== -1){
					var aux = className.substring(className.indexOf('maxlength'));
					aux = aux.indexOf(' ') !== -1 ? aux.substring(9, aux.indexOf(' ')) : aux.substring(9);
					if($.trim(elements[c].value).length > aux){
						mensaje += this.msgLongitudMaxima.replace('[*var0*]', this.getNombreElemento(elements[c])).replace('[*var1*]', aux);
						this.marcarError(elements[c]);
					}
				}

				if(className.indexOf('fileext.') !== -1){
					var aux = className.substring(className.indexOf('fileext.'));
					aux = aux.indexOf(' ') !== -1 ? aux.substring(8, aux.indexOf(' ')) : aux.substring(8);
					var ext = $.trim(elements[c].value).substring($.trim(elements[c].value).lastIndexOf('.')+1).toLowerCase();
					if(ext !== aux){
						mensaje += this.msgExtensionNoadmitida.replace('[*var0*]', this.getNombreElemento(elements[c]));
						this.marcarError(elements[c]);
					}
				}
			}
		}

		var ok = true;
		if(mensaje.length > 0){
			alert(mensaje);
			ok = false;
		}

		if(ok && submitOnSuccess){
			form.submit();
		}

		return ok;
	};

	this.validatePhone = function(num, allowblank, extravalidchars)	{
		num = num.replace(' ', '');
		var len = num.length;
		if(len < 9 || len > 20)
			return len === 0 ? allowblank : false;
		if(num.indexOf('+') > 0)
			return false;
		var validChars = '+0123456789' + extravalidchars;
		for(var c=0; c<len; c++)
			if(validChars.indexOf(num.charAt(c)) < 0)
				return false;
		return true;
	};

	this.validateMobile = function(num, allowblank, extravalidchars){
		return num.charAt(0) === 6 && this.validatePhone(num, allowblank, extravalidchars);
	};

	//Valida una clave de acceso
	this.validatePass = function(str){
		var len = str.length;
		if(str === null || len < this.cfgPassMinLen || len > this.cfgPassMaxLen)
			return false;

		for(c=0; c<len; c++)
			if(this.cfgPassValidChars.indexOf(str.charAt(c),0) === -1)
				return false;

		return true;
	};

	this.validateEmail = function(addr, allowblank)	{
		addr = $.trim(addr);
		if(addr.length === 0)
			return allowblank;
		var invalidChars = '\/\'\\ ";:?!()[]\{\}^|';
		for(i=0; i<invalidChars.length; i++)
			if(addr.indexOf(invalidChars.charAt(i),0) > -1)
				return false;
		for(i=0; i<addr.length; i++)
			if(addr.charCodeAt(i)>127)
				return false;
		var atPos = addr.indexOf('@',0);
		if((atPos === -1)||(atPos === 0)||(addr.indexOf('@', atPos + 1) > - 1)||(addr.indexOf('.', atPos) === -1)||(addr.indexOf('@.',0) !== -1)||(addr.indexOf('.@',0) !== -1)||(addr.indexOf('..',0) !== -1))
			return false;
		var suffix = addr.substring(addr.lastIndexOf('.')+1);
		if(suffix.length !== 2 && suffix !== 'cat' && suffix !== 'com' && suffix !== 'net' && suffix !== 'org' && suffix !== 'edu' && suffix !== 'int' && suffix !== 'mil' && suffix !== 'gov' & suffix !== 'arpa' && suffix !== 'biz' && suffix !== 'aero' && suffix !== 'name' && suffix !== 'coop' && suffix !== 'info' && suffix !== 'pro' && suffix !== 'museum')
			return false;
		return true;
	};

	//Valida una hora en formato hh:mm ó h:mm
	this.validateHourStr = function(str){
		var hora;
		var separador;
		var minuto;
		switch(str.length){
			case 4:
				hora = str.substring(0, 1);
				separador = str.substring(1,2);
				minuto = str.substring(2, 4);
				break;
			case 5:
				hora = str.substring(0, 2);
				separador = str.substring(2,3);
				minuto = str.substring(3, 5);
				break;
			default:
				return false;
		}
		if(separador !== ':')
			return false;
		hora = parseInt(hora, 10);
		minuto = parseInt(minuto, 10);
		if(isNaN(hora) || isNaN(minuto))
			return false;

		return (hora >= 0 && hora <= 23 && minuto >= 0 && minuto <= 59);
	};

	// Valida un NIF o tarjeta de residencia
	this.validateNIFNIE = function(dni, allowblank)	{
		if(dni.length === 9)	{
			letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
			dni = dni.toUpperCase();
			switch(dni[0]){
				case 'X':
					num = dni.substring(1,8);
					break;
				case 'Y':
					num = 1 + dni.substring(1,8);
					break;
				case 'Z':
					num = 2 + dni.substring(1,8);
					break;
				default:
					num = dni.substring(0,8);
					break;
			}
			letra = dni.substring(8,9);

			if((num*1 === num) && letras.indexOf(letra) !== -1){
				numcalc = num % 23;
				return letra === letras.substring(numcalc,numcalc+1); //letras[numcalc];
			}
			return false;
		}
		return (allowblank && dni.length === 0);
	};
	//Valida un CIF
	this.validateCIF = function(cif, allowblank){
		if(cif.length === 9)	{
			var pares = 0;
			var impares = 0;
			var suma;
			var ultima;
			var unumero;
			var uletra = new Array('J', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I');
			var xxx;
			cif = cif.toUpperCase();
			var regular = new RegExp(/^[ABCDEFGHJKLMNPQRSUVW]\d\d\d\d\d\d\d[0-9,A-J]$/g);
			if(regular.exec(cif)){
				ultima = cif.substr(8,1);
				for(var cont = 1 ; cont < 7 ; cont ++){
					xxx =(2 * parseInt(cif.substr(cont++,1))).toString() + '0';
					impares += parseInt(xxx.substr(0,1)) + parseInt(xxx.substr(1,1));
					pares += parseInt(cif.substr(cont,1));
				}
				xxx =(2 * parseInt(cif.substr(cont,1))).toString() + '0';
				impares += parseInt(xxx.substr(0,1)) + parseInt(xxx.substr(1,1));
				suma =(pares + impares).toString();
				unumero = parseInt(suma.substr(suma.length - 1, 1));
				unumero =(10 - unumero).toString();
				if(unumero === 10) unumero = 0;
			 	return (ultima === unumero) ||(ultima === uletra[unumero]);
			}
			return false;
		}
		return (allowblank && cif.length === 0);
	};
	//Valida un CIF, NIF o NIE
	this.validateCIFNIFNIE = function(doc, allowblank){
		return this.validateCIF(doc, allowblank) || this.validateNIFNIE(doc, allowblank);
	};

	//Valida(más o menos) un código postal
	this.validateCP = function(cp, allowblank){
		if(cp.length === 5){
			if(isNaN(parseInt(cp)))
			{
				return false;
			}
			var codprov = cp.substr(0,2);
			return (codprov > 0 && codprov < 53);
		}
		return (allowblank && cp.length === 0);
	};

	//Valida una fecha
	this.validateDateStr = function(date, min_ano, max_ano)	{
		if(date.length !== 10)
			return false;

		var ano;
		var mes;
		var dia;
		switch(this.cfgFormatoDeFecha.toLowerCase()){
			default:
			case 'yyyy/mm/dd':
			case 'yyyy-mm-dd':
				ano = date.substring(0, 4);
				mes = date.substring(5, 7);
				dia = date.substring(8, 10);
				break;
			case 'dd/mm/yyyy':
			case 'dd-mm-yyyy':
				ano = date.substring(6, 10);
				mes = date.substring(3, 5);
				dia = date.substring(0, 2);
				break;
		}

		return this.validateDate(ano, mes, dia, min_ano, max_ano);
	};

	//Valida una fecha
	this.validateDate = function(ano, mes, dia, min_ano, max_ano){
		if(this.validateChars(ano, '0123456789') && this.validateChars(mes, '0123456789') && this.validateChars(dia, '0123456789')){
			ano = parseInt(ano, 10);
			mes = parseInt(mes, 10);
			dia = parseInt(dia, 10);

			if(isNaN(ano) || isNaN(mes) || isNaN(dia) || dia < 1 || (min_ano !== null && ano < min_ano) || (max_ano !== null && ano > max_ano))
				return false;

			switch(mes)	{
				case 1:
				case 3:
				case 5:
				case 7:
				case 8:
				case 10:
				case 12:
					return dia <= 31;
				case 4:
				case 6:
				case 9:
				case 11:
					return dia <= 30;
				case 2:
					return dia <= (this.esBisiesto(ano) ? 29 : 28);
				default:
					return false;
			}
		}

		return false;
	};

	//Dice si un año es bisiesto
	this.esBisiesto = function(ano)	{
		return ((ano%4)===0) && ((ano%100)!==0 || (ano%400)===0);
	};

	this.validateChars = function(str, validChars){
		var len = str.length;
		for(c=0; c<len; c++)
			if(validChars.indexOf(str.charAt(c),0) === -1)
				return false;
		return true;
	};

	//Valida una cuenta bancaria
	this.validateCCC = function(str){
		str = this.replaceAll(this.replaceAll(this.replaceAll(str, ' ', ''), '-', ''), '.', '');

		if(str.length === 20 && this.validateChars(str, '0123456789')){
			var pesos = new Array(1, 2, 4, 8, 5, 10, 9, 7, 3, 6);
			var DC1 = 0;
			var DC2 = 0;

			for(var i=0; i<=7; i++)	{
				DC1 += str[i] * pesos[i+2];
			}
			DC1 = 11 - (DC1 % 11);
			if(DC1 === 11){
				DC1 = 0;
			}
			else if(DC1 === 10)	{
				DC1 = 1;
			}

			for(i=10; i<=19; i++){
				DC2 += str[i] * pesos[i-10];
			}
			DC2 = 11 - (DC2 % 11);
			if(DC2 === 11){
				DC2 = 0;
			}
			else if(DC2 === 10){
				DC2 = 1;
			}

			return str[8] === DC1 && str[9] === DC2;
		}

		return false;
	};

	this.replaceAll = function(a, b, c){
		while(a.indexOf(b) > -1){
			a = a.replace(b, c);
		}
		return a;
	};

	this.getNombreElemento = function(elemento){
		return elemento.title === '' ? elemento.name : elemento.title;
	};

	this.difDias = function(fecha1, fecha2){
		switch(this.cfgFormatoDeFecha.toLowerCase()){
			default:
			case 'yyyy/mm/dd':
			case 'yyyy-mm-dd':
				return this.difDiasYMD(fecha1, fecha2);
			case 'dd/mm/yyyy':
			case 'dd-mm-yyyy':
				return this.difDiasDMY(fecha1, fecha2);
		}
	};

	this.difDiasDMY = function(fecha1, fecha2){
		ano1 = parseInt(fecha1.substring(0, 4), 10);
		mes1 = parseInt(fecha1.substring(5, 7), 10);
		dia1 = parseInt(fecha1.substring(8, 10), 10);
		ano2 = parseInt(fecha2.substring(0, 4), 10);
		mes2 = parseInt(fecha2.substring(5, 7), 10);
		dia2 = parseInt(fecha2.substring(8, 10), 10);

		fecha1 = new Date(ano1, mes1-1, dia1);
		fecha2 = new Date(ano2, mes2-1, dia2);

		return (fecha2-fecha1)/1000/3600/24;
	};

	this.difDiasDMY = function(fecha1, fecha2){
		ano1 = parseInt(fecha1.substring(6, 10), 10);
		mes1 = parseInt(fecha1.substring(3, 5), 10);
		dia1 = parseInt(fecha1.substring(0, 2), 10);
		ano2 = parseInt(fecha2.substring(6, 10), 10);
		mes2 = parseInt(fecha2.substring(3, 5), 10);
		dia2 = parseInt(fecha2.substring(0, 2), 10);

		fecha1 = new Date(ano1, mes1-1, dia1);
		fecha2 = new Date(ano2, mes2-1, dia2);

		return (fecha2-fecha1)/1000/3600/24;
	};

	this.marcarError = function(element){
		element.className += (' '+this.classError);
	};

	this.desmarcarError = function(element){
		element.className = element.className.replace(' '+this.classError, '');
	};

	this.DesmarcarErrores = function(form_id){
		var form = document.getElementById(form_id);
		var elements = form.elements;
		for(var c = 0; c < elements.length; c++){
			this.desmarcarError(elements[c]);
		}
	};
}