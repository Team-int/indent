import { ReactNode } from 'react'
import Head from 'next/head'
import Header from '../components/header'

type LayoutProps = {
  title?: string
  fixed?: boolean
  children: ReactNode
}

const Layout = ({ title, fixed, children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{title} - Indent </title>
      </Head>
      <div className="  min-h-screen dark:bg-gray-900 bg-gray-100 ">
        <header className="fixed w-screen z-50">
          <Header />
        </header>
        <div
          className={
            'pt-14 lg:pt-20  text-2xl md:px-4 lg:px-80 min-w-full dark:bg-gray-900  dark:text-white ' +
            (fixed ? 'h-screen' : 'min-h-screen')
          }
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout
