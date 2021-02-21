import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'

import ReactMarkdown from 'react-markdown'
const GET_POST = gql`
  {
    post(where: { id: 2 }) {
      title
      content
      published
      author {
        name
        email
      }
    }
  }
`

const Post: React.FC = () => {
  const router = useRouter()
  const { pid } = router.query
  const { loading, error, data } = useQuery(GET_POST, { variables: pid })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error! ${error.message}</p>

  return (
    <>
      <p className="text-6xl font-bold">{data.post.title}</p>
      <ReactMarkdown className="prose prose-sm line-clamp-1">{data.post.content}</ReactMarkdown>
    </>
  )
}

export default Post
