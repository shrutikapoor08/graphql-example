const { buildSchema } = require("graphql");
const fetch = require("node-fetch");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
    blogs: [ String ] 
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return "Hello world!";
  },
  blogs: () => {
    //REST API function.

    const username = "shrutikapoor08";
    const API_ENDPOINT = `https://dev.to/api/articles?username=${username}`;

    return fetch(API_ENDPOINT, {
      headers: { Accept: "application/json" }
    })
      .then(data => data.json())
      .then(response => {
        return response.reduce((arr, item) => {
            arr.push(item.title)
            return arr;
        }, []);
      });
  }
};

module.exports = {
  schema,
  root
};
