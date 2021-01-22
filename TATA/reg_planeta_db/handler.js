module.exports.registrarPlaneta = async (event, context, callback) => {
	const request = require('request');
	
	let response = {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true,
		},
		body: JSON.stringify({"Resultado":"error"})
	};
    
   let parametros = JSON.parse(event.body);
   let residentes = parametros.residents;
   let peliculas = parametros.films
    
   const registrarPlanetas = (p_parametros) => new Promise((resolve, reject) => {
		let param_planeta = {
			"sname": "registrar_planeta",
			"svalues": {
				"pclima":  p_parametros.climate,
				"pdiametro":  p_parametros.diameter,
				"pgravedad":  p_parametros.gravity,
				"pnombre":  p_parametros.name,
				"pperiodo_orbital":  p_parametros.orbital_period,
				"ppoblacion":  p_parametros.population,
				"pperiodo_rotacion":  p_parametros.rotation_period,
				"psuperficie_agua":  p_parametros.surface_water,
				"pterreno":  p_parametros.terrain,
				"purl":  p_parametros.url,
				"pcreado":  p_parametros.created,
				"peditado":  p_parametros.edited
			}
		}
		
		request.post(
			{
				url: 'https://0rddnjulb4.execute-api.us-east-1.amazonaws.com/dev/dbcontexto',
				headers: {'content-type' : 'application/json'},
				json:    param_planeta
			},
			function(errPost, httpResponse, body) {
				if (errPost) {
					resolve(null);
				}
				else{
					resolve(body);
				}
			}
		);
	});
	
	const registrarResidentes = (p_residents,p_planeta_id) => new Promise((resolve, reject) => {
		let param_planeta = {
			"sname": "registrar_residente",
			"svalues": {
				"pplaneta_id": p_planeta_id,
				"presidente":  p_residents
			}
		}
		
		request.post(
			{
				url: 'https://0rddnjulb4.execute-api.us-east-1.amazonaws.com/dev/dbcontexto',
				headers: {'content-type' : 'application/json'},
				json:    param_planeta
			},
			function(errPost, httpResponse, body) {
				if (errPost) {
					resolve(null);
				}
				else{
					resolve(body);
				}
			}
		);
	});
	
	const registrarPeliculas = (p_films,p_planeta_id) => new Promise((resolve, reject) => {
		let param_planeta = {
			"sname": "registrar_pelicula",
			"svalues": {
				"pplaneta_id": p_planeta_id,
				"ppelicula":  p_films
			}
		}
		
		request.post(
			{
				url: 'https://0rddnjulb4.execute-api.us-east-1.amazonaws.com/dev/dbcontexto',
				headers: {'content-type' : 'application/json'},
				json:    param_planeta
			},
			function(errPost, httpResponse, body) {
				if (errPost) {
					resolve(null);
				}
				else{
					resolve(body);
				}
			}
		);
	});
   
    let reg_planeta = await registrarPlanetas(parametros);
	
	let rdatosG = reg_planeta[0];
	if(rdatosG != null) {
		let infoUs = rdatosG.vdata[0];
		let planeta_id = infoUs.planeta_id;
		
		for (let x=0; x < residentes.length; x++) {
			await registrarResidentes(residentes[x],planeta_id);
		}

		for (let y=0; y < peliculas.length; y++) {
			await registrarPeliculas(peliculas[y],planeta_id);
		}
		
	}
	
	response.body = JSON.stringify({"Resultado":"Pelicua registrada correctamente."});
    callback(null, response);
};