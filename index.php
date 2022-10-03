<?php
/**
 * Presentation of Kapital Truth,
 * educational software for the creation and use of a social electronic currency.
 *
 * @author José Carlos PHP
 * https://josecarlosphp.com
 */

require 'config.php';

define('KPTL_SIM_VERSION', '1.0');

$config['base_url'] = str_replace('http://', 'https://', $config['base_url']);

$lang = array();
$lang_isocode = isset($_GET['lang']) && $_GET['lang'] ? $_GET['lang'] : 'es';
$aux = mb_substr($config['base_url'], mb_strpos($config['base_url'], '://') + 3);
if(mb_substr($aux, 0, mb_strpos($aux, '/')) != $_SERVER['HTTP_HOST'])
{
	header('HTTP/1.1 301 Moved Permanently');
	header('Location: '.$config['base_url'].'presentacion/'.$lang_isocode.'/');
}

include 'lang/es/index.php';

if($lang_isocode != 'es' && is_file('lang/'.$lang_isocode.'/index.php'))
{
	include 'lang/'.$lang_isocode.'/index.php';
}

function l($q)
{
	global $lang;

	return isset($lang[$q]) ? $lang[$q] : $q;
}
?>
<!DOCTYPE html>
<html lang="<?php echo $lang_isocode; ?>">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title><?php echo l('head_title'); ?> - Kapital Truth</title>
		<base href="<?php echo $config['base_url']; ?>presentacion/" />
		<meta name="keywords" content="<?php echo l('head_keywords'); ?>">
		<meta name="description" content="<?php echo l('head_description'); ?>">
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<link rel="shortcut icon" href="img/logo.png">
		<link rel="icon" href="img/logo.png">
		<link href="css/bootstrap.min.css?v=<?php echo KPTL_SIM_VERSION; ?>" rel="stylesheet">
		<link href="css/bootstrap-theme.min.css?v=<?php echo KPTL_SIM_VERSION; ?>" rel="stylesheet">
		<link href="css/kapitaltruth.css?v=<?php echo KPTL_SIM_VERSION; ?>" rel="stylesheet">
		<link rel="canonical" href="<?php echo $config['base_url']; ?>presentacion/<?php echo $lang_isocode; ?>/" />
		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		  <script src="js/html5shiv.min.js?v=<?php echo KPTL_SIM_VERSION; ?>"></script>
		  <script src="js/respond.min.js?v=<?php echo KPTL_SIM_VERSION; ?>"></script>
		<![endif]-->
		<script src="js/jquery.min.js?v=<?php echo KPTL_SIM_VERSION; ?>"></script>
		<script src="js/bootstrap.min.js?v=<?php echo KPTL_SIM_VERSION; ?>"></script>
		<script src="js/Pluralizador.js?v=<?php echo KPTL_SIM_VERSION; ?>"></script>
		<script src="js/Validador.js?v=<?php echo KPTL_SIM_VERSION; ?>"></script>
		<script type="text/javascript">
		var lang_isocode = '<?php echo $lang_isocode; ?>';
		</script>
		<script src="lang/<?php echo $lang_isocode; ?>/index.js?v=<?php echo KPTL_SIM_VERSION; ?>"></script>
		<script src="js/KPTL_Sim.js?v=<?php echo KPTL_SIM_VERSION; ?>"></script>
		<script src="js/kapitaltruth.js?v=<?php echo KPTL_SIM_VERSION; ?>"></script>
	</head>
	<body>
		<div class="page-header" onclick="$('#tab_portada').click();" title="<?php echo l('header_title'); ?>">
			<div id="logobox"><img src="img/logo.png" alt="<?php echo l('header_logo'); ?>"></div>
			<h1>Kapital Truth <small><?php echo l('header_main'); ?></small></h1>
		</div>
		<div class="container hidden" role="main" id="maincontainer">
			<div class="text-right">
				<a href="es/" title="Idioma español"><img src="img/flags/es.jpg" alt="Español" /></a>
				<a href="en/" title="English language"><img src="img/flags/en.jpg" alt="English" /></a>
                <a href="cn/" title="中文"><img src="img/flags/cn.jpg" alt="中文" /></a>
				<a href="ca/" title="Idioma català"><img src="img/flags/ca.jpg" alt="Català" /></a>
			</div>
			<ul class="nav nav-tabs" role="tablist" style="margin-top:-2em">
				<li><a href="<?php echo $lang_isocode; ?>/#portada" role="tab" data-toggle="tab" id="tab_portada"><span class="glyphicon glyphicon-home"></span> <?php echo l('mainmenu_portada'); ?></a></li>
				<li><a href="<?php echo $lang_isocode; ?>/#informacion" role="tab" data-toggle="tab" id="tab_informacion"><span class="glyphicon glyphicon-info-sign"></span> <?php echo l('mainmenu_informacion'); ?></a></li>
				<li><a href="<?php echo $lang_isocode; ?>/#simulador" role="tab" data-toggle="tab" id="tab_simulador"><span class="glyphicon glyphicon-play-circle"></span> <?php echo l('mainmenu_simulador'); ?></a></li>
				<li><a href="<?php echo $lang_isocode; ?>/#ayuda" role="tab" data-toggle="tab" id="tab_ayuda"><span class="glyphicon glyphicon-question-sign"></span> <?php echo l('mainmenu_ayuda'); ?></a></li>
				<li><a href="<?php echo $lang_isocode; ?>/#contacto" role="tab" data-toggle="tab" id="tab_contacto"><span class="glyphicon glyphicon-envelope"></span> <?php echo l('mainmenu_contacto'); ?></a></li>
				<li class="hidden"><a href="<?php echo $lang_isocode; ?>/#aviso-legal" role="tab" data-toggle="tab" id="tab_aviso-legal"><span class="glyphicon glyphicon-envelope"></span> <?php echo l('mainmenu_aviso-legal'); ?></a></li>
			</ul>
			<div class="tab-content">
				<div class="tab-pane fade in active" id="portada">
					<div class="jumbotron">
						<img src="img/comunidad.png" alt="<?php echo l('portada_comunidad'); ?>">
						<h1><?php echo l('portada_main'); ?></h1>
						<p><?php echo l('portada_slogan'); ?></p>
						<p><a class="btn btn-success btn-lg" role="button" onclick="$('#tab_informacion').click();"><?php echo l('portada_more'); ?></a></p>
					</div>
					<p class="clear pull-right"><i><?php echo l('portada_leyenda'); ?></i></p>
				</div>
				<div class="tab-pane fade" id="informacion">
					<div class="panel-body">
						<div class="panel panel-default">
							<div class="panel-heading">
								<h3 class="panel-title"><?php echo l('informacion_que-es'); ?></h3>
							</div>
							<div class="panel-body">
								<p>
									<?php echo l('informacion_que-es_texto'); ?>
								</p>
							</div>
						</div>
						<div class="panel panel-default">
							<div class="panel-heading">
								<h3 class="panel-title"><?php echo l('informacion_como-funciona'); ?></h3>
							</div>
							<div class="panel-body">
								<p>
									<?php echo l('informacion_como-funciona_texto1'); ?>
								</p>
								<p>
									<?php echo l('informacion_como-funciona_texto2'); ?>
								</p>
							</div>
						</div>
						<?php /* <div class="panel panel-default">
							<div class="panel-heading">
								<h3 class="panel-title">¿Cómo obtener el programa?</h3>
							</div>
							<div class="panel-body">
								Lorem ipsum...
							</div>
						</div>
						<div class="panel panel-default">
							<div class="panel-heading">
								<h3 class="panel-title">¿Cómo se instala?</h3>
							</div>
							<div class="panel-body">
								Lorem ipsum...
							</div>
						</div> */ ?>
						<div class="panel panel-success">
							<div class="panel-heading">
								<h3 class="panel-title"><?php echo l('informacion_prueba-el-simulador'); ?></h3>
							</div>
							<div class="panel-body">
								<p>
									<?php echo l('informacion_prueba-el-simulador_texto'); ?>
								</p>
								<?php /*<p>
									El simulador es un modelo reducido de la aplicación Kapital Truth que permite comprender el funcionamiento de la misma, ya que recoge todos los aspectos en una única vista.
								</p> */ ?>
								<p>
									<button class="btn btn-lg btn-primary center-block" type="button" onclick="$('#tab_simulador').click();"><?php echo l('informacion_jugar'); ?></button>
								</p>
							</div>
						</div>
						<?php /* <div class="panel panel-primary">
							<div class="panel-heading">
								<h3 class="panel-title">Notas adicionales</h3>
							</div>
							<div class="panel-body">
								<ul>
									<li>Es una herramienta de alto poder educativo, destinada a pequeñas comunidades donde todos miembros se conocen entre sí.</li>
									<li>La cantidad de moneda total es concreta y limitada, y es establecida en el momento de instalar la aplicación (crear la moneda).</li>
									<li>El montante del Tesoro nunca puede quedar en negativo; si en el momento del reparto el dinero es insuficiente, se aplica un recorte equitativo sobre la cantidad que recibe cada usuario.</li>
									<li>Igualmente, el saldo de un usuario nunca puede quedar en negativo; por ejemplo, no se permite emitir una transferencia por más dinero del que se tiene.</li>
								</ul>
							</div>
						</div> */ ?>
					</div>
				</div>
				<div class="tab-pane fade" id="simulador">
					<div class="panel-body" id="configuracion">
						<div class="panel panel-primary">
							<div class="panel-heading">
								<h3 class="panel-title"><?php echo l('simulador_configuracion'); ?></h3>
							</div>
							<div class="panel-body">
								<form id="form_config" action="index.html" method="get" onsubmit="return false;">
									<div class="form-group">
										<div class="row">
											<div class="col-md-2">
												<h4><?php echo l('simulador_usuarios'); ?></h4>
											</div>
											<div class="col-md-2">
												<div class="btn-group" data-toggle="buttons">
													<label class="btn btn-default">
														<input type="radio" name="usuNumero" id="usuNumero_3" value="3" title="<?php echo l('simulador_usuarios'); ?> (<?php echo l('simulador_numero'); ?>)"> 3
													</label>
													<label class="btn btn-default">
														<input type="radio" name="usuNumero" id="usuNumero_4" value="4"> 4
													</label>
													<label class="btn btn-default">
														<input type="radio" name="usuNumero" id="usuNumero_5" value="5"> 5
													</label>
												</div>
											</div>
											<div class="col-md-8">
												<div class="btn-group" data-toggle="buttons">
													<label class="btn btn-default">
														<input type="radio" name="usuPersonalizar" id="usuPersonalizar_0" value="0"> <?php echo l('simulador_automatico'); ?>
													</label>
													<label class="btn btn-default">
														<input type="radio" name="usuPersonalizar" id="usuPersonalizar_1" value="1"> <?php echo l('simulador_personalizar'); ?>
													</label>
												</div>
											</div>
											<div class="clear" id="usuPersonalizar">
												<div class="col-md-2"></div>
												<div class="col-md-10">
													<div class="input-group" id="usu1">
														<span class="input-group-addon"><?php echo l('simulador_usuario'); ?> #1</span>
														<input type="text" class="form-control text-capitalize" value="" name="usuNombre1" id="usuNombre1" title="<?php echo l('simulador_usuario'); ?> #1 (<?php echo l('simulador_nombre'); ?>)">
													</div>
													<div class="input-group" id="usu2">
														<span class="input-group-addon"><?php echo l('simulador_usuario'); ?> #2</span>
														<input type="text" class="form-control text-capitalize" value="" name="usuNombre2" id="usuNombre2" title="<?php echo l('simulador_usuario'); ?> #2 (<?php echo l('simulador_nombre'); ?>)">
													</div>
													<div class="input-group" id="usu3">
														<span class="input-group-addon"><?php echo l('simulador_usuario'); ?> #3</span>
														<input type="text" class="form-control text-capitalize" value="" name="usuNombre3" id="usuNombre3" title="<?php echo l('simulador_usuario'); ?> #3 (<?php echo l('simulador_nombre'); ?>)">
													</div>
													<div class="input-group" id="usu4">
														<span class="input-group-addon"><?php echo l('simulador_usuario'); ?> #4</span>
														<input type="text" class="form-control text-capitalize" value="" name="usuNombre4" id="usuNombre4" title="<?php echo l('simulador_usuario'); ?> #4 (<?php echo l('simulador_nombre'); ?>)">
													</div>
													<div class="input-group" id="usu5">
														<span class="input-group-addon"><?php echo l('simulador_usuario'); ?> #5</span>
														<input type="text" class="form-control text-capitalize" value="" name="usuNombre4" id="usuNombre5" title="<?php echo l('simulador_usuario'); ?> #5 (<?php echo l('simulador_nombre'); ?>)">
													</div>
												</div>
											</div>
										</div>
										<div class="row">
											<div class="col-md-2">
												<h4><?php echo l('simulador_preguntas'); ?></h4>
											</div>
											<div class="col-md-2">
												<div class="btn-group" data-toggle="buttons">
													<label class="btn btn-default">
														<input type="radio" name="preNumero" id="preNumero_1" value="1" title="<?php echo l('simulador_preguntas'); ?> (<?php echo l('simulador_numero'); ?>)"> 1
													</label>
													<label class="btn btn-default">
														<input type="radio" name="preNumero" id="preNumero_2" value="2"> 2
													</label>
													<label class="btn btn-default">
														<input type="radio" name="preNumero" id="preNumero_3" value="3"> 3
													</label>
												</div>
											</div>
											<div class="col-md-8">
												<div class="btn-group" data-toggle="buttons">
													<label class="btn btn-default">
														<input type="radio" name="prePersonalizar" id="prePersonalizar_0" value="0"> <?php echo l('simulador_automatico'); ?>
													</label>
													<label class="btn btn-default">
														<input type="radio" name="prePersonalizar" id="prePersonalizar_1" value="1"> <?php echo l('simulador_personalizar'); ?>
													</label>
												</div>
											</div>
											<div class="clear" id="prePersonalizar">
												<div class="col-md-2"></div>
												<div class="col-md-10">
													<div class="input-group" id="pre1">
														<span class="input-group-addon"><?php echo l('simulador_pregunta'); ?> #1</span>
														<input type="text" class="form-control" value="" name="preTexto1" id="preTexto1" title="<?php echo l('simulador_pregunta'); ?> #1 (<?php echo l('simulador_texto'); ?>)">
													</div>
													<div class="input-group" id="pre2">
														<span class="input-group-addon"><?php echo l('simulador_pregunta'); ?> #2</span>
														<input type="text" class="form-control" value="" name="preTexto2" id="preTexto2" title="<?php echo l('simulador_pregunta'); ?> #2 (<?php echo l('simulador_texto'); ?>)">
													</div>
													<div class="input-group" id="pre3">
														<span class="input-group-addon"><?php echo l('simulador_pregunta'); ?> #3</span>
														<input type="text" class="form-control" value="" name="preTexto3" id="preTexto3" title="<?php echo l('simulador_pregunta'); ?> #3 (<?php echo l('simulador_texto'); ?>)">
													</div>
												</div>
											</div>
										</div>
										<div class="row">
											<div class="col-md-2">
												<h4><?php echo l('simulador_moneda'); ?></h4>
											</div>
											<div class="col-md-5">
												<div class="btn-group">
													<?php echo l('simulador_nombre-de-la-moneda'); ?> (<?php echo l('simulador_en-singular'); ?>)
													<input type="text" class="form-control text-lowercase" value="" name="monNombre" id="monNombre" title="<?php echo l('simulador_nombre-de-la-moneda'); ?>">
												</div>
											</div>
											<div class="col-md-5">
												<div class="btn-group">
													<?php echo l('simulador_tesoro-inicial'); ?>
													<input type="number" class="form-control minvalue10 text-right" value="" name="monTesoro" id="monTesoro" title="<?php echo l('simulador_tesoro-inicial'); ?>" readonly="readonly">
												</div>
											</div>
										</div>
									</div>
									<div class="text-center">
										<button type="button" class="btn btn-lg btn-default" data-loading-text="Cargando..." onclick="Comenzar();"><?php echo l('simulador_comenzar'); ?></button>
										<button type="button" class="btn btn-link" onclick="Resetear();"><?php echo l('simulador_resetear'); ?></button>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div class="panel-body hidden" id="modeloreducido">
						<div class="panel panel-default" id="valoraciones">
							<div class="panel-heading">
								<h3 class="panel-title"><?php echo l('simulador_valoraciones'); ?></h3>
							</div>
							<div class="panel-body">
								<form id="form_valoraciones" action="index.html" method="get" onsubmit="return false;">
									<table class="table">
										<tbody>
										</tbody>
									</table>
								</form>
								<div class="small"><span id="crn"></span> <?php echo l('simulador_de'); ?> <span id="crm"></span> <?php echo l('simulador_consultas-respondidas'); ?> <span class="glyphicon glyphicon-ok text-success hidden"></span></div>
								<div class="progress">
									<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
								</div>
							</div>
						</div>
						<div class="panel panel-default" id="transferencias">
							<div class="panel-heading">
								<h3 class="panel-title"><?php echo l('simulador_transferencias'); ?></h3>
							</div>
							<div class="panel-body">
								<div class="historico">
									<?php echo l('simulador_no-transferencias'); ?>
								</div>
								<form id="form_transferencias" action="index.html" method="get" onsubmit="return false;" class="hidden">
									<div class="form-group">
										<div class="row">
											<div class="col-md-2">
												<?php echo l('simulador_usuario'); ?>
												<select class="form-control requerido" name="user_from" title="<?php echo l('simulador_usuario'); ?> (<?php echo l('simulador_emisor'); ?>)">
													<option value=""><?php echo l('simulador_seleccionar'); ?></option>
												</select>
											</div>
											<div class="col-md-1">
												<?php echo l('simulador_transfiere'); ?>
												<input type="number" class="form-control minvalue1 requerido text-right" value="" name="puntos" title="<?php echo l('simulador_transfiere'); ?>">
											</div>
											<div class="col-md-2">
												<?php echo l('simulador_a'); ?>
												<select class="form-control requerido" name="user_to" title="<?php echo l('simulador_a'); ?> (<?php echo l('simulador_beneficiario'); ?>)">
													<option value=""><?php echo l('simulador_seleccionar'); ?></option>
												</select>
											</div>
											<div class="col-md-5">
												<?php echo l('simulador_por'); ?>
												<input type="text" class="form-control" value="" name="concepto" title="<?php echo l('simulador_concepto'); ?>">
											</div>
											<div class="col-md-2">
												&nbsp;
												<button type="button" class="form-control btn btn-default" data-loading-text="<?php echo l('simulador_cargando'); ?>" onclick="Transferencia();"><?php echo l('simulador_aceptar'); ?></button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div class="panel panel-primary" id="resultado">
							<div class="panel-heading">
								<h3 class="panel-title"><?php echo l('simulador_resultado'); ?></h3>
							</div>
							<div class="panel-body">
								<div>
									<table class="table table-striped">
										<tbody>
										</tbody>
									</table>
								</div>
								<div class="text-center">
									<br /><br />
									<div><?php echo l('simulador_media:'); ?> <b id="media">0</b> <span class="puntos"></span></div>
									<div><?php echo l('simulador_han-pasado'); ?> <b id="ciclos">0</b> <?php echo l('simulador_ciclos-de-reparto'); ?></div>
									<div><?php echo l('simulador_ultima-actualizacion:'); ?> <b id="ultima"><?php echo l('nunca'); ?></b></div>
									<p>
										<br /><br />
										<button class="btn btn-lg btn-primary" type="button" onclick="EjecutarReparto();"><?php echo l('simulador_ejecutar-reparto'); ?></button>
									</p>
								</div>
								<div class="text-right">
									<button class="btn btn-sm btn-danger" type="button" onclick="ReiniciarSimulacion();"><?php echo l('simulador_reiniciar-simulacion'); ?></button><br /><br />
									<button class="btn btn-default" type="button" onclick="$('#tab_ayuda').click();"><?php echo l('simulador_consultar-ayuda'); ?></button><br /><br />
								</div>
							</div>
							<div class="panel-body">
								<div id="mensajesReparto"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="tab-pane fade" id="ayuda">
					<div class="panel-body">
						<p><?php echo l('ayuda_atiende-a-este-video:'); ?></p>
						<iframe width="840" height="482" src="<?php echo l('ayuda_video-url'); ?>" frameborder="0" allowfullscreen></iframe>
					</div>
				</div>
				<div class="tab-pane fade" id="contacto">
					<div class="panel-body">
						<h3><?php echo l('contacto_envianos'); ?></h3>
						<p>
							<?php echo l('contacto_envianos_texto:'); ?>
						</p>
						<p>
							<script type="text/javascript">
								var kk = 'otl'+'iam'+'"=ferh a<';
								document.write(kk.split('').reverse().join('')+':'+'kapital'+'truth@'+'gm'+'ail.c'+'om">'+'kapital'+'truth@'+'gm'+'ail.c'+'om<'+'/'+'a>');
							</script>
						</p>
						<h3><?php echo l('contacto_visita'); ?></h3>
						<p>
							<?php echo l('contacto_visita_texto:'); ?>
						</p>
						<p>
							<a href="https://www.kapitaltruth.org" title="<?php echo l('contacto_moneda-social-electronica'); ?>">kapitaltruth.org</a>
						</p>
						<p>
							&nbsp;
						</p>
						<div class="alert alert-success" role="alert"><b><?php echo l('contacto_gracias'); ?></b></div>
					</div>
				</div>
				<div class="tab-pane fade" id="aviso-legal">
					<div class="panel-body">
						<h2><?php echo l('aviso-legal_aviso-legal'); ?></h2>
						<h3><?php echo l('aviso-legal_promotor'); ?></h3>
						<p>
							<?php echo l('aviso-legal_promotor_texto'); ?>
						</p>
						<h3><?php echo l('aviso-legal_titularidad'); ?></h3>
						<p>
							<?php echo l('aviso-legal_titularidad_texto'); ?>
						</p>
						<h3><?php echo l('aviso-legal_autor'); ?></h3>
						<p>
							<?php echo l('aviso-legal_autor_texto'); ?>
						</p>
						<h3><?php echo l('aviso-legal_finalidad'); ?></h3>
						<p>
							<?php echo l('aviso-legal_finalidad_texto'); ?>
						</p>
						<h3><?php echo l('aviso-legal_recursos-empleados'); ?></h3>
						<p>
							<?php echo l('aviso-legal_recursos-empleados_texto1'); ?>
						</p>
						<p>
							<?php echo l('aviso-legal_recursos-empleados_texto2'); ?>
						</p>
						<p>
							<?php echo l('aviso-legal_recursos-empleados_texto3'); ?>
						</p>
						<h3><?php echo l('aviso-legal_copia-y-distribucion'); ?></h3>
						<p>
							<?php echo l('aviso-legal_copia-y-distribucion_texto'); ?>
						</p>
						<h3><?php echo l('aviso-legal_politica-de-privacidad'); ?></h3>
						<p>
							<?php echo l('aviso-legal_politica-de-privacidad_texto'); ?>
						</p>
					</div>
				</div>
			</div>
			<div class="clear small" id="footer">
				<div class="left">
					<a onclick="$('#tab_aviso-legal').click();"><span class="glyphicon glyphicon-list-alt"></span> <?php echo l('aviso-legal_aviso-legal'); ?></a>
				</div>
				<div class="right">
					<button class="btn btn-sm btn-default" type="button" onclick="ScrollTo('.page-header', KPTL.timing * 2);"><span class="glyphicon glyphicon-arrow-up"></span> <?php echo l('footer_ir-arriba'); ?></button>
				</div>
				<div class="clear"></div>
			</div>
			<noscript>
				<?php echo l('noscript_texto'); ?>
			</noscript>
		</div>
	</body>
</html>