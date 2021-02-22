import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import Head from 'next/head'
import Layout from '../../layouts/layout'

import ReactMarkdown from 'react-markdown'

const GET_POST = gql`
  query($id: ID) {
    post(where: { id: $id }) {
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
  const { loading, error, data } = useQuery(GET_POST, { variables: { id: pid } })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error! ${error.message}</p>

  return (
    <Layout>
      <Head>
        <title>{data.post.title} - Indent</title>
      </Head>
      <div className=" min-w-full flex">
        <div className="px-2 sm:px-4 py-4 md:py-10 lg:max-w-4xl  md:rounded-md bg-white w-full">
          <p className=" sm:px-6 text-3xl  lg:text-7xl font-bold">{data.post.title}</p>
          <div className="sm:px-6 flex items-center pb-10">
            <a className="block relative">
              <img
                alt="profil"
                src="/favicon.ico"
                className="my-4  object-cover border border-gray-300 rounded-full w-8 h-8 lg:h-8 lg:w-8"
              />
            </a>
            <p className="flex flex-col justify-between ml-2 text-base text-gray-700">
              {data.post.author.name}
            </p>
          </div>
          <ReactMarkdown className="sm:px-6 prose prose-lg">{data.post.content}</ReactMarkdown>
        </div>
        <div className="hidden md:block container w-96 mx-4 h-40 rounded-md bg-gray-300">hey</div>
      </div>
    </Layout>
  )
}

export default Post
