import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { SinglePostPage } from './components/posts/SinglePostPage'
import { EditPostForm } from './components/posts/EditPostForm'
import { Home } from './pages/home/home'
import { Login } from './pages/login/login'
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUsername } from './redux/features/auth/authSlice'
import { ReactNode } from 'react'

const routes = [
  {
    path: "/posts",
    element: <Home />
  },
  {
    path: "/posts/:id",
    element: <SinglePostPage />
  },
  {
    path: "/edit-post/:id",
    element: <EditPostForm />
  },
  {
    path: "/login",
    element: <Login />
  }
]

const ProtectedRoute = ({
  children
}: {
  children: ReactNode
}) => {
  const username = useAppSelector(selectCurrentUsername);

  if (!username) {
    return <Navigate to="/" replace />
  }

  return children;
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/*' element={
            <ProtectedRoute>
              <Routes>
                {
                  routes.map(({path, element}) => (
                    <Route key={path} path={path} element={element} />
                  ))
                }
              </Routes>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
