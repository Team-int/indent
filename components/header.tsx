import Link from 'next/link'
import React from 'react'

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.

type ShowMenu = {
  showMenu: boolean // like this
}

class Header extends React.Component<Record<string, unknown>, ShowMenu> {
  state: ShowMenu = {
    showMenu: false,
  }

  _showMenu = (bool: boolean): void => {
    this.setState({
      showMenu: bool,
    })
  }

  render(): JSX.Element {
    return (
      <>
        <nav className="bg-white opacity-90 dark:bg-gray-800 z-10 shadow-sm">
          <div className=" lg:px-4 xl:px-80 px-2">
            <div className="flex items-center justify-between h-14">
              <div className=" flex items-center">
                <div className="flex md:hidden">
                  <button
                    className="mr-1 text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                    onClick={
                      this.state.showMenu
                        ? this._showMenu.bind(null, false)
                        : this._showMenu.bind(null, true)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      role="img"
                    >
                      <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"></path>
                    </svg>
                  </button>
                </div>
                <a className="flex-shrink-0 text-2xl tracking-wide dark:text-white">
                  <Link href="/">Indent</Link>
                </a>
                <div className="px-4 hidden md:block ml-4">
                  <div className="flex items-baseline  ">
                    <input
                      className="input border w-96  border-gray-400 rounded-md text-sm  focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
                      placeholder="Search.."
                      type="text"
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <div className="block">
                <div className="ml-4 flex items-center md:ml-6">
                  <div className="ml-3 relative">
                    <div className="relative inline-block text-left">
                      <button className="rounded-md bg-blue-700 text-white py-2 px-4 m-2">
                        Sign up
                      </button>
                      <div className="hidden origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                        <div
                          className="py-1 "
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                            role="menuitem"
                          >
                            <span className="flex flex-col">
                              <span>Settings</span>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {this.state.showMenu && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-200 shadow">
              <a className="text-black hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                <Link href="/">Home</Link>
              </a>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default Header
