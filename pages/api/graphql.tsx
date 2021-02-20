import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server-micro'

const prisma = new PrismaClient()

const typeDefs = `
type User {
  email: String!
  id: ID!
  name: String
  posts: [Post!]!
}
type Post {
  author: User
  content: String
  id: ID!
  published: Boolean!
  title: String!
}
type Query {
  feed: [Post!]!
  filterPosts(searchString: String): [Post!]!
  post(where: PostWhereUniqueInput!): Post
}
type Mutation {
  createDraft(authorEmail: String, content: String, title: String!): Post!
  deleteOnePost(where: PostWhereUniqueInput!): Post
  publish(id: ID): Post
  signupUser(data: UserCreateInput!): User!
}
input PostWhereUniqueInput {
  id: ID
}
input UserCreateInput {
  email: String!
  id: ID
  name: String
  posts: PostCreateManyWithoutPostsInput
}
input PostCreateManyWithoutPostsInput {
  connect: [PostWhereUniqueInput!]
  create: [PostCreateWithoutAuthorInput!]
}
input PostCreateWithoutAuthorInput {
  content: String
  id: ID
  published: Boolean
  title: String!
}
`

const resolvers = {
  Query: {
    feed: (parent, args) => {
      return prisma.post.findMany({
        where: { published: true },
      })
    },
    filterPosts: (parent, args) => {
      return prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: args.searchString } },
            { content: { contains: args.searchString } },
          ],
        },
      })
    },
    post: (parent, args) => {
      return prisma.post.findUnique({
        where: { id: Number(args.where.id) },
      })
    },
  },
  Mutation: {
    createDraft: (parent, args) => {
      return prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          published: false,
          author: args.authorEmail && {
            connect: { email: args.authorEmail },
          },
        },
      })
    },
    deleteOnePost: (parent, args) => {
      return prisma.post.delete({
        where: { id: Number(args.where.id) },
      })
    },
    publish: (parent, args) => {
      return prisma.post.update({
        where: { id: Number(args.id) },
        data: { published: true },
      })
    },
    signupUser: (parent, args) => {
      return prisma.user.create(args)
    },
  },
  User: {
    posts: (parent, args) => {
      return prisma.user
        .findUnique({
          where: { id: parent.id },
        })
        .posts()
    },
  },
  Post: {
    author: (parent, args) => {
      return prisma.post
        .findUnique({
          where: { id: parent.id },
        })
        .author()
    },
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
