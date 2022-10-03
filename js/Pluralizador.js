/**
 * Clase para poner palabras en plural
 * @author José Carlos Cruz Parra AKA internia
 * josecarlos@programadorphpfreelance.com
 * http://www.programadorphpfreelance.com
 * 2008-2014
 * This code is released under the GNU General Public License.
 */
function Pluralizador(){
	this.Plural = function(que, considerarPalabras, idioma){
		if(considerarPalabras === undefined) considerarPalabras = true;
		if(idioma === undefined) idioma = 'ES';

		switch(idioma.toUpperCase()){
			case 'ES':
				return this.Plural_ES(que, considerarPalabras);
			default:
				return this.Plural_EN(que, considerarPalabras);
		}
	};
	this.Plural_ES = function(que, considerarPalabras){
		if(considerarPalabras === undefined) considerarPalabras = true;

		if(considerarPalabras){
			var nomas = false;
			var r = '';
			var palabras = que.split(' ');
			for(var c=0; c<palabras.length; c++){
				if(c > 0 && palabras[c] === 'de'){
					nomas = true;
				}

				var palabra = nomas ? palabras[c] : this.Plural_ES(palabras[c], false);
				r += palabra;
				if(c < palabras.length-1){
					r += ' ';
				}
			}

			return r;
		}
		else{
			switch(que.substr(que.length-1, 1))
			{
				case 'a':
				case 'e':
				case 'i':
				case 'o':
				case 'u':
				case 'A':
				case 'E':
				case 'I':
				case 'O':
				case 'U':
					return que + ((que.toUpperCase() === que) ? 'S' : 's');
					break;
				case 's':
				case 'S':
					var pos = que.length - 2;
					switch(que.substr(pos, 1))
					{
						case 'á':
							que[pos] = 'a';
							break;
						case 'é':
							que[pos] = 'e';
							break;
						case 'í':
							que[pos] = 'i';
							break;
						case 'ó':
							que[pos] = 'o';
							break;
						case 'ú':
							que[pos] = 'u';
							break;
						case 'Á':
							que[pos] = 'A';
							break;
						case 'É':
							que[pos] = 'E';
							break;
						case 'Í':
							que[pos] = 'I';
							break;
						case 'Ó':
							que[pos] = 'O';
							break;
						case 'Ú':
							que[pos] = 'U';
							break;
						default:
							return que;
					}
					return que + ((que.toUpperCase() === que) ? 'ES' : 'es');
					break;
				default:
					pos = que.length - 2;
					switch(que.substr(pos, 1))
					{
						case 'á':
							que[pos] = 'a';
							break;
						case 'é':
							que[pos] = 'e';
							break;
						case 'í':
							que[pos] = 'i';
							break;
						case 'ó':
							que[pos] = 'o';
							break;
						case 'ú':
							que[pos] = 'u';
							break;
						case 'Á':
							que[pos] = 'A';
							break;
						case 'É':
							que[pos] = 'E';
							break;
						case 'Í':
							que[pos] = 'I';
							break;
						case 'Ó':
							que[pos] = 'O';
							break;
						case 'Ú':
							que[pos] = 'U';
							break;
					}
					return que + ((que.toUpperCase() === que) ? 'ES' : 'es');
					break;
			}
		}
	};
	this.Plural_EN = function(que, considerarPalabras){
		if(considerarPalabras === undefined) considerarPalabras = true;

		if(considerarPalabras){
			var r = '';
			var palabras = que.split(' ');
			for(var c=0; c<palabras.length; c++){
				var palabra = (c < palabras.length-1) ? palabras[c] : this.Plural_EN(palabras[c], false);
				r += palabra;
				if(c < palabras.length-1){
					r += ' ';
				}
			}

			return r;
		}
		else
		{
			//TODO: Esto es básico, falta mucho por hacer
			switch(que.substr(que.length-1, 1))
			{
				case 'a':
				case 'e':
				case 'i':
				case 'o':
				case 'u':
				case 'A':
				case 'E':
				case 'I':
				case 'O':
				case 'U':
				default:
					return que + (que.toUpperCase() === que ? 'S' : 's');
					break;
				case 'y':
				case 'Y':
					return que.substr(0, que.length) + (que.toUpperCase() === que ? 'IES' : 'ies');
					break;
			}
		}
	};
}