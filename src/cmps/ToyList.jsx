import { Link } from 'react-router-dom'
import { ToyPreview } from './ToyPreview.jsx'

import '../assets/style/cmps/ToyList.css'

export function ToyList({ onRemoveToy, toys }) {
  return (
    <section className="toy-list container">
      <ul>
        {toys.map(toy => (
          <li key={toy._id}>
            <ToyPreview toy={toy} />
            <div className="toy-actions">
              <Link to={`/toy/edit/${toy._id}`}>
                <button>Edit</button>
              </Link>

              <Link to={`/toy/${toy._id}`}>
                <button>Details</button>
              </Link>

              <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}