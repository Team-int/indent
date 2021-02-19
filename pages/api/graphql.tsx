import { ApolloServer, gql } from 'apollo-server-micro'

const typeDefs = gql`
    type Query {
        hello: String!
    }
`

const resolvers = {
    Query: {
        hello: () => 'Hello!',
    },
}

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        return {}
    },
})

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export const config = {
    api: {
        bodyParser: false,
    },
}

export default handler
