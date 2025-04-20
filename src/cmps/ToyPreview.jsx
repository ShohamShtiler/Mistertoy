import { useState } from 'react'
import { Link } from 'react-router-dom'

import '../assets/style/cmps/ToyPreview.css'

export function ToyPreview({ toy }) {
  const [isImgLoading, setImgLoading] = useState(true)

  function handleImageLoad() {
    setImgLoading(false)
  }

  const imgSrc = `/img/${toy.imgUrl || 'fallback.jpg'}`

  console.log('Toy:', toy.name, '| imgUrl:', toy.imgUrl)
  console.log('imgSrc:', imgSrc)
  return (
    <Link to={`/toy/${toy._id}`} className="toy-card">
      <article className="toy-preview">
        <div className="img-container">
          {isImgLoading && <div className="skeleton-loader"></div>}
          <img
            src={imgSrc}
            alt={toy.name}
            onLoad={handleImageLoad}
            style={{ display: isImgLoading ? 'none' : 'block' }}
          />
        </div>

        <div className="toy-info">
          <h2 className="toy-name">{toy.name}</h2>
          <p className="toy-price">Price: ${toy.price}</p>
          <p className={`toy-stock ${toy.inStock ? 'in-stock' : 'out-of-stock'}`}>
            {toy.inStock ? 'In stock' : 'Not in stock'}
          </p>
        </div>
      </article>
    </Link>
  )
}