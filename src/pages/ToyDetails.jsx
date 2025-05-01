import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

import '../assets/style/cmps/ToyDetails.css'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    toyService.getById(toyId)
      .then(setToy)
      .catch(err => {
        console.error('Failed to load toy', err)
        showErrorMsg('Failed to load toy')
        navigate('/toy')
      })
  }, [toyId])

  if (!toy) return <div>Loading toy...</div>

  return (
    <section className="toy-details main-layout">
      <h1>{toy.name}</h1>

      <div className="img-container">
      <img src={`/img/${toy.imgUrl}`} alt={toy.name} />
      </div>

      <h3>Price: ${toy.price}</h3>
      <p className={toy.inStock ? 'in-stock' : 'out-of-stock'}>
        {toy.inStock ? 'In stock' : 'Out of stock'}
      </p>

      <h4>Labels:</h4>
      <ul>
        {toy.labels.map(label => (
          <li key={label}>{label}</li>
        ))}
      </ul>

      <p>Created at: {new Date(toy.createdAt).toLocaleString()}</p>
    </section>
  )
}