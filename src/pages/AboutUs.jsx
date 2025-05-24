import { BranchMap } from '../cmps/BranchMap'

export function AboutUs() {
  return (
    <section className="about-page">
      <h1>About Mister Toy</h1>
      <p>Welcome to <strong>Mister Toy</strong> – your one-stop shop for fun, learning, and imagination!</p>
      <h3>What we offer:</h3>
      <ul>
        <li>A curated collection of toys with detailed labels and reviews</li>
        <li>A dynamic dashboard with insights into toy trends</li>
        <li>A user-friendly platform to explore, manage, and review toys</li>
      </ul>
      <p><strong>Built with love by developers</strong></p>
      <p>This project was built as part of a final web development course. It includes MongoDB, React, authentication, messaging, and reviews.</p>
      <h2>Our Global Reach</h2>
      <p>Explore Mister Toy stores and partners around the world. Find us near you!</p>
      <BranchMap />
    </section>
  )
}