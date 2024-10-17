import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Layout, Landing, About, Register, Login, Dashboard, StreamPage } from './components'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />} >
        <Route path='' element={<Landing />} />
        <Route path='/about' element={<About />} />
        <Route path='/register' element={ <Register /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/dashboard' element={ <Dashboard /> } />
        <Route path='/stream/:streamId' element={ <StreamPage /> } />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
