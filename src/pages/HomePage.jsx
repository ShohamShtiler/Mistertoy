import '../assets/style/cmps/HomePage.css'
import Lottie from 'lottie-react' 
import welcomeAnimation from '../assets/style/setup/welcomeAnimation.json'

export function HomePage() {
    return (
      <section className="home-page main-layout">
        <h1>Welcome to Mister Toy</h1>
  
        <Lottie animationData={welcomeAnimation} loop={true} style={{ height: 500 }} />
      </section>
    )
  }