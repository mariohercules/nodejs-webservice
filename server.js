var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

const courseService = require('./services/course.service');

// GraphQL schema
var schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

var getCourse = function(args) {     
    return courseService.filterCourse(args);
}
var getCourses = function() {
    return courseService.getAll();
}

var root = {
    course: getCourse,
    courses: getCourses
};

// Create an express server and a GraphQL endpoint
var app = express();

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

// Create an express server and a REST endpoint
app.get("/api/v1/courses", (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(getCourses());
});

app.get("/api/v1/course/:id", (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    var result = getCourse(req.params);
    res.json(result);
});

app.post('/api/v1/course/:id', (req, res, next) => {
    var message = {message:'The book #ID: ' + req.params.id +' was updated'};
    res.json(message);
});

app.delete('/api/v1/course/:id', (req, res, next) => {
    var message = {message:'The book #ID: ' + req.params.id +' was deleted'};
    res.json(message);
});

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));