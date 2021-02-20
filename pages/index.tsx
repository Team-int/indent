import { gql, useQuery } from '@apollo/client'

const GET_POSTS = gql`
  query {
    feed {
      id
      title
      content
      published
      author {
        id
        name
        email
      }
    }
  }
`

const Feed: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POSTS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error! ${error.message}</p>
  return (
    <>
      {data.feed.map((post) => (
        <div key={post.id} className="border-2 w-80 p-4 rounded-md shadow-sm">
          <p className="text-4xl py-2">{post.title}</p>
          <hr></hr>
          <p className="text-xl py-2 line-clamp-2">{post.content}</p>
        </div>
      ))}
    </>
  )
}

const Home: React.FC = () => {
  return (
    <>
      <p className="text-4xl font-semibold py-4">Posts</p>
      <Feed />
    </>
  )
}
export default Home
