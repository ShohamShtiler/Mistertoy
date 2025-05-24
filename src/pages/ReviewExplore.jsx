import { useEffect, useState } from 'react'
import { reviewService } from '../services/review.service.js'

export function ReviewExplore() {
  const [reviews, setReviews] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    loadReviews()
  }, [filter])

  function loadReviews() {
    const filterBy = {}
    if (filter) filterBy.txt = filter
    reviewService.query(filterBy).then(setReviews)
  }

  return (
    <section className="review-explore main-layout">
      <h1>Explore Reviews</h1>

      <input
        type="text"
        placeholder="Search by text..."
        value={filter}
        onChange={ev => setFilter(ev.target.value)}
      />

      <ul className="review-list">
        {reviews.map(review => (
          <li key={review._id}>
            <strong>{review.user?.fullname || 'Unknown'}:</strong> {review.txt}
            <p>On toy: {review.toy?.name} (${review.toy?.price})</p>
          </li>
        ))}
      </ul>
    </section>
  )
}