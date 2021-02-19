import { ReactNode } from 'react'
import Head from 'next/head'
import Header from '../components/header'

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps): JSX.Element => {
  return (
    <div className="  min-h-screen  ">
      <Head>
        <title>{title || 'Indent'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="  min-h-screen dark:bg-gray-900">
        <header className="fixed w-screen z-50">
          <Header />
        </header>
        <div className="w-full text-2xl pt-20 container mx-auto dark:bg-gray-900  dark:text-white p-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
