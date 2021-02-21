import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

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
        <div key={post.id} className="border-2 w-full p-4 xl:rounded-md">
          <Link href={'/posts/' + post.id}>
            <a className="text-5xl font-bold my-4">{post.title}</a>
          </Link>

          <ReactMarkdown className="prose prose-sm line-clamp-1">{post.content}</ReactMarkdown>
        </div>
      ))}
    </>
  )
}

const Home: React.FC = () => {
  return (
    <>
      <p className="text-4xl p-2 font-semibold">Posts</p>
      <Feed />
    </>
  )
}
export default Home
