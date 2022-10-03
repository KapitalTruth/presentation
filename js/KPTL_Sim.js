function KPTL_Sim(){
	this.options = {
		usuNumero:3,
		usuPersonalizar:0,
		preNumero:3,
		prePersonalizar:0,
		monNombre:l('punto'),
		monNombrePlural:l('puntos'),
		monTesoro:100
		};
	this.usuarios = [];
	this.preguntas = [];
	this.tesoro;
	this.valoraciones = [];
	this.transferencias = [];
	this.ciclos = 0;
	this.fechayhora_ultima = '0000-00-00 00:00:00';
	this.n = 0;
	this.timing = 250;
	this.error = '';
	this.AddUsuario = function(nombre){
		nombre = nombre === undefined ? '' : $.trim(nombre);
		if(nombre === ''){
			nombre = this.GetRandomNombre();
		}

		var i = this.usuarios.length;
		this.usuarios[i] = new KPTL_Usuario();
		this.usuarios[i].id = i + 1;
		this.usuarios[i].nombre = nombre;
	};
	this.AddPregunta = function(texto){
		texto = texto === undefined ? '' : $.trim(texto);
		if(texto === ''){
			texto = this.GetRandomTexto();
		}

		var i = this.preguntas.length;
		this.preguntas[i] = new KPTL_Pregunta();
		this.preguntas[i].id = i + 1;
		this.preguntas[i].texto = texto;
	};
	this.RegValoracion = function(deQuien, aQuien, pregunta, valor){
		if(this.valoraciones[deQuien] === undefined){
			this.valoraciones[deQuien] = [];
		}

		if(this.valoraciones[deQuien][aQuien] === undefined){
			this.valoraciones[deQuien][aQuien] = [];
		}

		this.valoraciones[deQuien][aQuien][pregunta] = parseInt(valor);

		return valor;
	};
	this.GetMediaShow = function(){
		var suma = 0;
		for(var c=0; c<this.usuarios.length; c++){
			suma += this.usuarios[c].puntos_show;
		}

		return Math.round(suma / this.usuarios.length);
	};
	this.GetRandomNombre = function(original){
		var nombres = ['Juan', 'María', 'Pepe', 'Jordi', 'Laura', 'Abraham', 'Lucas', 'Lucía', 'Irene', 'Inés', 'Fran', 'Luis', 'Josep', 'Carlos', 'Ruth', 'Paco', 'Daniel', 'Faisal', 'Miguel', 'Paula', 'Michelle', 'Shuang', 'Lei', 'Omar', 'Gica'];
		var i;
		do{
			i = Math.floor((Math.random() * nombres.length));
		}while(original && this.ExistsUsuarioNombre(nombres[i]));
		return nombres[i];
	};
	this.GetRandomTexto = function(original){
		var textos = [
			l('pregunta_A'),
			l('pregunta_B'),
			l('pregunta_C'),
			l('pregunta_D'),
			l('pregunta_E'),
			l('pregunta_F'),
			l('pregunta_G'),
			l('pregunta_H'),
			l('pregunta_I'),
			l('pregunta_J')
			];
		var i;
		do{
			i = Math.floor((Math.random() * textos.length));
		}while(original && this.ExistsPreguntaTexto(textos[i]));
		return textos[i];
	};
	this.ExistsUsuarioNombre = function(nombre){
		for(var c=0; c<this.usuarios.length; c++){
			if(this.usuarios[c].nombre === nombre){
				return true;
			}
		}
		return false;
	};
	this.ExistsPreguntaTexto = function(texto){
		for(var c=0; c<this.preguntas.length; c++){
			if(this.preguntas[c].texto === texto){
				return true;
			}
		}
		return false;
	};
	this.ValoracionAutomatica = function(deQuien, aQuien, pregunta){
		if(!deQuien){
			for(var c=0; c<this.usuarios.length; c++){
				this.ValoracionAutomatica(this.usuarios[c].id, aQuien, pregunta);
			}
		}else{
			if(!aQuien){
				for(var c=0; c<this.usuarios.length; c++){
					this.ValoracionAutomatica(deQuien, this.usuarios[c].id, pregunta);
				}
			}else{
				if(!pregunta){
					for(var c=0; c<this.preguntas.length; c++){
						this.ValoracionAutomatica(deQuien, aQuien, this.preguntas[c].id);
					}
				}
				else if(deQuien !== aQuien){
					var usuario = this.GetUsuarioById(aQuien);
					if(usuario){
						var valor = usuario.perfil_humano;
						if(Math.floor(Math.random() * 9) > 3 + (2 * usuario.perfil_humano)){
							switch(usuario.perfil_humano){
								case 0:
									valor = Math.floor(Math.random() * 5) > 3 ? 2 : 1;
									break;
								case 1:
									valor = Math.floor(Math.random() * 4) > 1 ? 2 : 0;
									break;
								case 2:
									valor = Math.floor(Math.random() * 5) > 3 ? 0 : 1;
									break;
							}
						}

						return this.RegValoracion(deQuien, aQuien, pregunta, valor);
					}

					return false;
				}
			}
		}

		return null;
	};
	this.GetUsuarioIndex = function(id){
		id = id.toString();
		for(var c=0; c<this.usuarios.length; c++){
			if(this.usuarios[c].id.toString() === id){
				return c;
			}
		}
		return false;
	};
	this.GetUsuarioById = function(id){
		id = id.toString();
		for(var c=0; c<this.usuarios.length; c++){
			if(this.usuarios[c].id.toString() === id){
				return this.usuarios[c];
			}
		}
		return false;
	};
	this.GetPreguntaById = function(id){
		id = id.toString();
		for(var c=0; c<this.preguntas.length; c++){
			if(this.preguntas[c].id.toString() === id){
				return this.preguntas[c];
			}
		}
		return false;
	};
	this.Msg = function(texto, clase){
		//alert(clase.toUpperCase()+'\n\n'+texto.replace("'", "\\'"));

		this.n++;

		eval('setTimeout(function(){$(\'#mensajesReparto\').append(\'<div id="msg'+this.n+'" class="'+this.Clase2Bootstrap(clase)+'">'+texto.replace("'", "\\'")+'</div>\'); ScrollTo(\'#msg'+this.n+'\', 0);}, '+(this.n * this.timing)+');');
	};
	this.Clase2Bootstrap = function(clase){
		switch(clase){
			case 'info':
				return 'text-info';
			case 'check':
				return 'text-success';
			case 'aviso':
				return 'text-warning';
			case 'error':
				return 'text-danger';
		}

		return clase;
	};
	this.RepartirPuntos = function(mostrarMensajes){
		if(mostrarMensajes === undefined){
			mostrarMensajes = true;
		}

		this.n = 0;

		var memoria = [];
		var puntosEnElTesoro = this.tesoro.total;

		if(this.usuarios.length > 0){
            if(mostrarMensajes){
				this.Msg(l('Ciclo_')+' '+(this.ciclos + 1), 'info');
				//this.Msg(l('Usuarios_')+' '+this.usuarios.length, 'info');
            }

			for(var c=0; c<this.usuarios.length; c++){
				if(mostrarMensajes){
					this.Msg('----------------------------------------------------------', 'sep');
					this.Msg(l('Usuario')+' '+this.usuarios[c].nombre+' ('+l('Id_')+this.usuarios[c].id+')', 'info');
				}

				memoria[this.usuarios[c].id] = {puntuacion:0, correccion:0, fluctuacion:0};

				var puntosactuales = this.usuarios[c].puntos_show;

				if(mostrarMensajes){
					this.Msg(puntosactuales+' '+this.options.monNombrePlural+' '+l('actuales'), 'info');
				}

				var puntos = 0;

		        //Votaciones
		        for(var k=0; k<this.usuarios.length; k++){
					if(c !== k && this.valoraciones[this.usuarios[k].id] !== undefined && this.valoraciones[this.usuarios[k].id][this.usuarios[c].id] !== undefined){
						for(var q=0; q<this.preguntas.length; q++){
							if(this.valoraciones[this.usuarios[k].id][this.usuarios[c].id][this.preguntas[q].id] !== undefined){
								puntos += this.valoraciones[this.usuarios[k].id][this.usuarios[c].id][this.preguntas[q].id];
							}
						}
					}
		        }

				memoria[this.usuarios[c].id].puntuacion = puntos;
				memoria[this.usuarios[c].id].correccion = 0;

		        if(mostrarMensajes){
		        	this.Msg(puntos+' '+this.options.monNombrePlural+' '+l('totalizados_por_valoraciones'), 'check');
		        }

		        //Transferencias
		        var recibidos = this.usuarios[c].puntos_recibidos;
		        var emitidos = this.usuarios[c].puntos_emitidos;
		        puntos = puntos + recibidos - emitidos;
		        if(mostrarMensajes){
					this.Msg(recibidos+' '+this.options.monNombrePlural+' '+l('recibidos_por_transferencias'), 'check');
					this.Msg(emitidos+' '+this.options.monNombrePlural+' '+l('emitidos_por_transferencias'), 'check');
					this.Msg(puntos+' '+this.options.monNombrePlural+' '+l('de_saldo_tras_transferencias'), 'check');
		        }
				if(puntos < 0){
		        	puntos = 0;
		        	if(mostrarMensajes){
		        		this.Msg(l('Este_saldo_a_cero_por_negativo'), 'aviso');
		        	}
		        }

		        if(puntos > 0){
		        	puntosEnElTesoro -= puntos;
		        }

		        memoria[this.usuarios[c].id].fluctuacion = puntos - puntosactuales;

		        if(mostrarMensajes){
		        	this.Msg(memoria[this.usuarios[c].id].fluctuacion+' '+this.options.monNombrePlural+' '+l('de_fluctuacion'), 'check');
		        }

		        //Actualizar los puntos del usuario
		        if(memoria[this.usuarios[c].id].fluctuacion !== 0){
		        	this.usuarios[c].puntos_show = puntos;
		        }
			}

			if(mostrarMensajes){
				this.Msg('----------------------------------------------------------', 'sep');
				this.Msg(puntosEnElTesoro+' '+this.options.monNombrePlural+' '+l('en_el_tesoro'), 'info');
			}

			//Comprobar si el tesoro ha quedado en negativo
			//(se han repartido más puntos de la cuenta)
			var umbral = 5;
			while(puntosEnElTesoro < 0){
				if(mostrarMensajes){
					this.Msg(l('El_tesoro_en_negativo'), 'aviso');
					this.Msg(l('Realizar_ajuste')+' '+umbral, 'aviso');
				}

				//Cojo los puntos que hay de más
			    var demas = puntosEnElTesoro * (-1);
			    var puntosRepartidos = this.tesoro.total + demas;

			    //A cada usuario le resto el porcentaje de puntos que tiene respecto a ese total
			    //aplicado a la cantidad de puntos que hay de más
			    for(var c=0; c<this.usuarios.length; c++){
			        var puntosactuales = this.usuarios[c].puntos_show;
			    	if(puntosactuales > 0){
			            var pctj = 100 / (puntosRepartidos / puntosactuales);
			            var restar = demas / 100 * pctj;
			            var parteEntera = Math.floor(restar);
			            var parteDecimal = restar - parteEntera;
			            restar = parteDecimal >= umbral ? parteEntera + 1 : parteEntera;

			            if(puntosactuales - restar < 0){
			            	restar = puntosactuales;
			            }

			            if(restar > 0){
							this.usuarios[c].puntos_show = puntosactuales - restar;
							puntosEnElTesoro += restar;

							memoria[this.usuarios[c].id].correccion += restar;
							memoria[this.usuarios[c].id].fluctuacion -= restar;
			            }

			            if(mostrarMensajes){
			            	this.Msg(l('Se_restan')+' '+restar+' '+this.options.monNombrePlural+' '+l('al_usuario')+' '+this.usuarios[c].nombre, 'check');
			            }
			        }
			    }

			    if(mostrarMensajes){
			    	this.Msg(puntosEnElTesoro+' '+this.options.monNombrePlural+' '+l('en_el_tesoro'), 'info');
			    }

			    umbral--;
			}

			//Actualizar tesoro
			this.tesoro.actual = puntosEnElTesoro;

			//Registrar puntuaciones y movimientos
			/*$puntuacion = new KPTL_Puntuacion();
			$movimiento = new KPTL_Movimiento();
			foreach($memoria as $user_id=>$data)
			{
				$puntuacion->Registrar($user_id, $data['puntuacion'], $data['correccion']);

				if($data['fluctuacion'])
				{
					$movimiento->Registrar($user_id, KPTL_TiposMovimiento::VALORACION, $data['fluctuacion'], l('Fluctuación por valoraciones ajenas', 'kapitaltruth'), $puntuacion->id());
				}
			}*/

			this.ciclos++;
			this.fechayhora_ultima = GetAhora();
		}
		else{
			if(mostrarMensajes){
				this.Msg(l('No_se_encontraron_usuarios'), 'aviso');
			}
		}

		this.Msg('<b>'+l('Terminado')+'</b>', 'info');
	};
	this.Transferencia = function(user_from, user_to, puntos, concepto){
		var user_from_obj = this.GetUsuarioById(user_from);
		var user_to_obj = this.GetUsuarioById(user_to);
		puntos = parseInt(puntos);
		if(puntos > 0){
    		if(user_from_obj !== false && user_to_obj !== false){
				if(user_from !== user_to){
					var puntos_from = user_from_obj.puntos_show;
					if(puntos <= puntos_from){
						var i = this.transferencias.length;
						this.transferencias[i] = new KPTL_Transferencia();
						this.transferencias[i].id = i + 1;
						this.transferencias[i].user_from = user_from;
						this.transferencias[i].user_to = user_to;
						this.transferencias[i].puntos_from = puntos_from;
						this.transferencias[i].puntos = puntos;
						this.transferencias[i].concepto = concepto;

						var user_from_index = this.GetUsuarioIndex(user_from);
						var user_to_index = this.GetUsuarioIndex(user_to);

						this.usuarios[user_from_index].puntos_show -= puntos;
						this.usuarios[user_from_index].puntos_emitidos += puntos;
						this.usuarios[user_to_index].puntos_show += puntos;
						this.usuarios[user_to_index].puntos_recibidos += puntos;

						return true;
					}
					else{
						this.error = this.options.monNombrePlural+' '+l('insuficientes');
					}
				}
				else{
					this.error = l('El_usuario_no_puede_ser_el_mismo');
				}
    		}
    		else{
    			this.error = l('Usuario_no_valido');
    		}
    	}
    	else{
    		this.error = l('Valor_no_valido_de')+' '+this.options.monNombrePlural;
    	}

    	return false;
	};
}

function KPTL_Usuario(){
	this.id = null;
	this.nombre = '';
	this.puntos_show = 0;
	this.puntos_real = 0;
	this.puntos_recibidos = 0;
	this.puntos_emitidos = 0;
	this.perfil_humano = Math.floor(Math.random() * 3) % 2 === 0 ? 1 : (Math.floor(Math.random() * 3) === 0 ? 2 : 0);
}

function KPTL_Pregunta(){
	this.id = null;
	this.texto = '';
}

function KPTL_Tesoro(monTesoro){
	this.total = monTesoro;
	this.actual = monTesoro;
}

function KPTL_Transferencia(){
	this.id = null;
	this.user_from = 0;
	this.user_to = 0;
	this.puntos_from = 0;
	this.puntos = 0;
	this.concepto = '';
}

function GetAhora(){
	var d = new Date();

	return lpad(d.getFullYear(), 4, '0')+'-'+lpad(d.getMonth()+1, 2, '0')+'-'+lpad(d.getDate(), 2, '0')+' '+lpad(d.getHours(), 2, '0')+':'+lpad(d.getMinutes(), 2, '0')+':'+lpad(d.getSeconds(), 2, '0');
}

function lpad(str, n, w){
	str = str.toString();
	while(str.length < n){
		str = w+str;
	}
	return str;
}