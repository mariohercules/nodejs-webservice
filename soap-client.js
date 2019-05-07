var soap = require('soap');
var url = 'http://localhost:8001/wsdl?wsdl'; 
var args = {id: '1'};
soap.createClient(url, function(err, client) {
    client.course(args, function(err, result) {
        console.log(result);
    });
});