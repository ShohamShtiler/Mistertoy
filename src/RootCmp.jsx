import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'

// import { AppHeader } from './cmps/AppHeader' // optional

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          {/* <AppHeader /> */}
          <main className="main-layout">
            <Routes>
              <Route path="/" element={<ToyIndex />} />
              <Route path="/toy" element={<ToyIndex />} />
              <Route path="/toy/:toyId" element={<ToyDetails />} />
              <Route path="/toy/edit" element={<ToyEdit />} />
              <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutUs />} />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}