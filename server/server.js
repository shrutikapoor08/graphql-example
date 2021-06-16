const express = require('express');
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const { root, schema } = require('./schema/schema');
const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
    rootValue: root,
    schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Running a GraphQL server at http://localhost:${port}/graphql`)
})


module.exports = app;

