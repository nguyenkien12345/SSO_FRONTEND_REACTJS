import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import News from './components/News/News'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import CodeSSO from './components/CodeSSO/CodeSSO'
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// Routes
import AppRoute from './routes/AppRoute'
// React Redux
import store from './redux/store'
import  { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          {/* Chúng ta phải đảm bảo tất cả các request gọi lên server phải luôn luôn đính kèm cookie truyền lên server */}
          <Route path='/' element={<AppRoute />}>
            {/* Để sử dụng nested route trong AppRoute bắt buộc phải có Outlet */}
            <Route path='news' element={<News />}/>
            <Route path='contact' element={<Contact />}/>
            <Route path='about' element={<About />}/>
            <Route path='code' element={<CodeSSO />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)

reportWebVitals()
