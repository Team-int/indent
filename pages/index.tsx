import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import Layout from '../layouts/layout'

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
        <div key={post.id} className="bg-white xl:rounded-md text-gray-900 m-auto block pb-4 mb-4">
          <div className="flex items-center">
            <a className="block relative">
              <img
                alt="profil"
                src="/favicon.ico"
                className="my-4 ml-4 object-cover border border-gray-300 rounded-full w-6 h-6 lg:h-8 lg:w-8"
              />
            </a>
            <p className="flex flex-col justify-between ml-2 text-sm lg:text-base text-gray-700">
              {post.author.name}
            </p>
          </div>
          <div className="px-6 pb-6">
            <Link href={'/posts/' + post.id}>
              <a className="text-3xl xl:text-4xl font-bold my-4">{post.title}</a>
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="flex w-full">
        <div className="w-4/6 pr-4">
          <p className=" lg:px-0 md:text-3xl pb-4 font-semibold ">Posts</p>
          <Feed />
        </div>
        <div className=" p-4 bg-white w-1/4 rounded">hey</div>
      </div>
    </Layout>
  )
}
export default Home
