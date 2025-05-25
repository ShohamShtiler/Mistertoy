
import Lottie from 'lottie-react'
import stars from '../assets/style/animations/stars.json'

export function HomePage() {
  return (
    <section className="home-page main-layout">
      <h1 className="animate__animated animate__fadeInDown">Welcome</h1>
      <Lottie className='stars' animationData={stars} loop={true} />
    </section>
  )
}