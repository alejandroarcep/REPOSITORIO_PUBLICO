module.exports.dbcontexto = (event, context, callback) => {
	
	const mysql = require("mysql");
	const configdb = require('./dbconfig');

	const conx = mysql.createPool({
	  host : configdb.hostdb,
	  port : configdb.portdb,
	  user : configdb.userdb,
	  database : configdb.databasedb,
	  password : configdb.passworddb
	});
	
	let response = {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true,
		},
		body: JSON.stringify({"Error":"error"})
	};
	
	menejar_en_db();

	function menejar_en_db(){
		let sconsulta = JSON.parse(event.body);
		let snombre_obj = sconsulta.sname.toString();
		let sparametros = [];
		
		let squery = `call dbarce.`+snombre_obj+`(?)`;
		
		//Obtengo los valores de los parametros
		let objPa = JSON.stringify(sconsulta.svalues);
		
		let obj = JSON.parse(objPa);
        for (let key in obj) {
			sparametros.push(obj[key]);
        }
		
		let myData = [];		
		let result = [];
		
		conx.query(squery, [sparametros], function (error, results, fields) {
			if (error) {
				conx.end();
				
				let oerror = {
					vdata : null,
					verror : '1'
				}
				result.push(oerror);
				
				response.body = JSON.stringify(result);
				callback(null,response);
			}else{
				conx.end();
				
				if(results.length != undefined)
				{
					let data = results[0];
					
					for(let x=0; x < data.length; x++){
						let sdatos = data[x]
						myData.push(sdatos);
					};
				}

				let oerror = {
					vdata : myData,
					verror : '0'
				}
				result.push(oerror);
				
				response.body = JSON.stringify(result);
				callback(null,response);
			}
		});
	}
};