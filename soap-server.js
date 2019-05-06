var soap = require('soap');
var http = require('http');
var express = require('express');
const bodyParser = require('body-parser');

var coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    { 
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
] 

var getCourse = function(args) { 
    var id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
} 

var getCourses = function(args) {   
    return coursesData;    
}

var myService = {
    wsservice: {
        wsservicePort: {

            courses: function(args) {
                return getCourses(args);
            },
            course: function(args) {
                return getCourse(args);
            }          
        }
    }
};

var xml = require('fs').readFileSync('Courses.wsdl', 'utf8');

var server = http.createServer(function(request,response) {
    response.end('404: Not Found: ' + request.url);
});

var app = express();

app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
app.listen(8001, function(){

    let server = soap.listen(app, {
        path: '/wsdl',
        services: myService,
        xml: xml,
        callback: function (err, res) {
            console.log('===================SOAP SERVER INITIALIZED===================');
        },
        postProcess: () => {
            console.log("===================POSTPROCESS===================")
        }
    });

    server.log = ((type, data) => {
        // console.log(type,"\n")
        if(type == "replied"){
            console.log("\n", "===========================================RESPONSE==========================================");
            console.log(data.replace(new RegExp(">", 'g'),">\n"), "\n=============================================================================================");
        }
    })
    server.on("request", (request, methodName) => {
        console.log("\n", "===========================================REQUEST===========================================");
        console.log(request,'\n');
        console.log("\n", "=============================================================================================" ,'\n');
    });


});