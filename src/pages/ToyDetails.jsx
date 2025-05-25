import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

import { reviewService } from '../services/review.service.js'
import { userService } from '../services/user.service.js'

import Lottie from 'lottie-react'
import DetailsAnimation from '../assets/style/animations/DetailsAnimation.json'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const [newMsg, setNewMsg] = useState('')
  const { toyId } = useParams()
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // Load the toy by ID
    toyService.getById(toyId)
      .then(setToy)
      .catch(err => {
        console.error('Failed to load toy', err)
        showErrorMsg('Cannot load toy')
        navigate('/toy')
      })

    // Load reviews for the toy
    reviewService.query({ toyId })
      .then(setReviews)
      .catch(err => {
        console.error('Failed to load reviews', err)
        showErrorMsg('Cannot load reviews')
      })
  }, [toyId])

  if (!toy) return <div>Loading toy...</div>

  function onAddMsg(ev) {
    ev.preventDefault()
    if (!newMsg.trim()) return

    toyService.addToyMsg(toy._id, { txt: newMsg })
      .then(savedMsg => {
        setToy(prev => ({ ...prev, msgs: [...(prev.msgs || []), savedMsg] }))
        setNewMsg('')
      })
      .catch(err => {
        console.log('Cannot add msg', err)
        showErrorMsg('You must be logged in')
      })
  }

  function onAddReview(ev) {
    ev.preventDefault()

    if (!newReview.trim()) return

    reviewService.add({ txt: newReview, toyId })
      .then(() => reviewService.query({ toyId })) // ✅ Again, filter!
      .then(setReviews)
      .then(() => setNewReview(''))
      .catch(err => {
        console.error('Failed to add review', err)
        showErrorMsg('Cannot add review')
      })
  }

  return (
    <section className="toy-details">
      <h1>{toy.name}</h1>

      <div className="img-container">
        <img src={toy.imgUrl.startsWith('http') ? toy.imgUrl : `/img/${toy.imgUrl}`} alt={toy.name} />
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

      {toy?.msgs && (
        <section className="toy-msgs">
          <h3>Comments</h3>

          {toy?.msgs?.length ? (
            <ul>
              {toy.msgs.map(msg => (
                <li key={msg.id}>
                  <strong>{msg.by.fullname}:</strong> {msg.txt}
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}

          <section className="add-msg">
            <form onSubmit={onAddMsg}>
              <input
                type="text"
                value={newMsg}
                onChange={(ev) => setNewMsg(ev.target.value)}
                placeholder="Write a comment..."
              />
              <button>Add Comment</button>
            </form>
          </section>
        </section>
      )}

      <section className="toy-reviews">
        <h3>Reviews</h3>
        <ul>
          {reviews.map(review => (
            <li key={review._id}>
              <strong>{review.user?.fullname || 'Unknown'}:</strong> {review.txt}
            </li>
          ))}
        </ul>

        <form onSubmit={onAddReview} className="add-review">
          <input
            type="text"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write a review..."
          />
          <button>Add Review</button>
        </form>
      </section>

      <p className='date'>Created at: {new Date(toy.createdAt).toLocaleString()}</p>
      {/* <Lottie animationData={DetailsAnimation} loop={true} style={{ height: 300, width: 600 }} /> */}
    </section>
  )
}