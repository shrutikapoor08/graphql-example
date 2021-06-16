const { buildSchema } = require("graphql");
const fetch = require("node-fetch");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
    blogs(username: String!): [ String ] 
    blogsError(username: String!): [ String ] 
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return "Hello world!";
  },
  blogs: (args) => {
      const {username} = args;
    const API_ENDPOINT = `https://dev.to/api/articles?username=${username}`;

    return fetch(API_ENDPOINT)
      .then(data => data.json())
      .then(response => {
           return response.reduce( (arr, item) => {
                arr.push(item.title)
                return arr;
            }, []);
      });
  },
    blogsError: (args) => {
        const {username} = args;
        const API_ENDPOINT = `https://dev.to/api/articles/username=${username}`;

        return fetch(API_ENDPOINT)
            .then(response => {
                const { status } = response;
                throw new Error(`This threw an error, ${status} `);
            });

    }
};

module.exports = {
  schema,
  root
};
