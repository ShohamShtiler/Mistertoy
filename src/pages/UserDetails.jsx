import { useEffect, useState } from 'react'
import { reviewService } from '../services/review.service.js'
import { userService } from '../services/user.service.js'

export function UserDetails() {
    const [user, setUser] = useState(userService.getLoggedInUser())
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        if (!user) return
        reviewService.query({ userId: user._id }).then(setReviews)
    }, [user])

    if (!user) return <div>Please login</div>

    return (
        <section className="user-details">
            <h2>{user.fullname}'s Profile</h2>
            <h3>My Reviews:</h3>
            {reviews.length ? (
                <ul className="review-list">
                    {reviews.map((review) => (
                        <li key={review._id}>
                            <span className="review-toy">Toy: {review.toy?.name}</span>
                            <span className="review-txt">"{review.txt}"</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-reviews">You haven't written any reviews yet.</p>
            )}
        </section>
    )
}