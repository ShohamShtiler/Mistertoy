// import '../assets/style/scss/'

export function Loader({ isFading }) {
  return (
    <div className={`loader-container ${isFading ? 'fade-out' : ''}`}>
      <div className="loader"></div>
    </div>
  )
}