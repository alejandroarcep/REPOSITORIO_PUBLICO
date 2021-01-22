module.exports.mostrarPlaneta = (event, context, callback) => {
	const request = require('request');
	
	let response = {
		statusCode: 200,
		body: {"Error":"error"}
    };
	
	let param_planeta = {
		"sname": "traer_planeta",
		"svalues": {
			"pnombre": ''
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
				callback(null, response);
			}
			else{
				response.body = JSON.stringify(body[0].vdata);
				callback(null, response);
			}
		}
	);
};