module.exports.mostrarPlaneta = (event, context, callback) => {
	
	const request = require('request');
	
	let v_planeta = event.pathParameters.planeta;
	v_planeta = decodeURI(v_planeta);
	
	const urlPlan = 'https://swapi.py4e.com/api/planets/' + v_planeta;
	
	let response = {
        statusCode: 200,
        body: {"Error":"error"}
    };
	
	request.get(
		{
			url: urlPlan,
			headers: {'content-type' : 'application/json'}
		},
		function(errPost, httpResponse, result) {
			if (errPost) {
				callback(null, response);
			}
			else{
				response.body = result;
				callback(null, response);
			}
		}
	);
};