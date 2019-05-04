var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

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
    if (args.topic) {
        var topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    } else {
        return coursesData;
    }
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
    res.json(coursesData);
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