# PROJECT
NodeJS (GraphQL/Rest/Soap) 

* Testing with GRAPHQL, REST AND SOAP Webservice
* Run with nodemon to auto-reload files

## USING

```
$ npm install
```

#### GRAPHQL / REST

* Test GraphQL openning the URL http://localhost:4000/graphql
* Test Rest-API openning the URL http://localhost:4000/api/v1/courses

```
$ npx nodemon server.js
```

#### SOAP

* Test GraphQL openning the URL http://localhost:8001/wsdl?wsdl

* Terminal #1

```
$ npx nodemon soap-server.js
```

* Terminal #2

```
$ node soap-client.js
```
