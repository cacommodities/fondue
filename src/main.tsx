import { enableMapSet } from 'immer'
import { StrictMode, createContext, useContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  Outlet,
  RouterProvider
} from 'react-router-dom'

import { enableImmerMapSet } from '@cac/forest-ui'
import { LibrarianClient } from '@cac/librarian-typescript'
import { Root } from './views/Root'
import { initExtraRootContainers } from '@cac/react-utils'
import { Header } from './components/Header'

enableMapSet()
enableImmerMapSet()
initExtraRootContainers()

const librarianUrl = 'https://librarian.backends.cacom.dk'
export const LibrarianContext = createContext<LibrarianClient | null>(null)
export const useSharedLibrarianClient = (): LibrarianClient => {
  const librarianClient = useContext(LibrarianContext)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return librarianClient!
}

// For full page view
const Page = (): JSX.Element => {
  return <div className='flex h-screen flex-col'>
    <Header />
    <div className='flex-1 overflow-y-auto'>
      <Outlet />
    </div>
  </div>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Page />,
    children: [
      {
        path: '/',
        element: <Root />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LibrarianContext.Provider value={new LibrarianClient(librarianUrl, librarianUrl)}>
      <RouterProvider router={router} />
    </LibrarianContext.Provider>
  </StrictMode>
)
