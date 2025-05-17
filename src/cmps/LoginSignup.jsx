import { useState } from 'react'
import { userService } from '../services/user.service.js'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../services/event-bus.service'



export function LoginSignup({ onClose }) {
    const [isSignup, setIsSignup] = useState(false)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const [formError, setFormError] = useState('')

    function togglePanel() {
        setIsSignup(prev => !prev)
    }

    function handleChange(ev) {
        const { name, value } = ev.target
        setCredentials(prev => ({ ...prev, [name]: value }))
        setFormError('')
    }

    function toggleSignup() {
        setIsSignup(prev => !prev)
    }

    function onSubmit(ev) {
        ev.preventDefault()

        const { username, password, fullname } = credentials
        if (!username || !password || (isSignup && !fullname)) {
            showErrorMsg('All fields are required')
            return
        }

        const action = isSignup
            ? userService.signup({ username, password, fullname })
            : userService.login({ username, password })

        action
            .then(user => {
                if (isSignup) {
                    showSuccessMsg('Signup successful! Please log in.')
                    setIsSignup(false)
                    setCredentials(userService.getEmptyCredentials())
                } else {
                    showSuccessMsg(`Welcome ${user.fullname}`)
                    eventBusService.emit('user-updated', user)
                    onClose?.()
                }
            })
            .catch(() => {
                setFormError('Invalid username or password')
            })
    }

    return (
        <section className="login-signup-modal">
            <div className="backdrop" onClick={onClose}></div>

            <div className={`login-signup container ${isSignup ? 'right-panel-active' : ''}`}>
                <div className="form-container sign-up-container">
                    <form onSubmit={onSubmit}>
                        <h1>Create Account</h1>
                        <input type="text" name="fullname" placeholder="Full Name" onChange={handleChange} value={credentials.fullname} />
                        <input type="text" name="username" placeholder="Username" onChange={handleChange} value={credentials.username} />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} value={credentials.password} />
                        <button type="submit">Sign Up</button>
                    </form>
                    <p className="mobile-toggle only-mobile">
                        {isSignup
                            ? "Already have an account? "
                            : "Don't have an account? "}
                        <span onClick={toggleSignup}>
                            {isSignup ? "Sign In" : "Sign Up"}
                        </span>
                    </p>
                </div>

                <div className="form-container sign-in-container">
                    <form onSubmit={onSubmit}>
                        <h1>Sign in</h1>
                        <input type="text" name="username" placeholder="Username" onChange={handleChange} value={credentials.username} />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} value={credentials.password} />
                        <button type="submit">Sign In</button>
                        {formError && <p className="form-error">{formError}</p>}
                    </form>
                    <p className="mobile-toggle only-mobile">
                        {isSignup
                            ? "Already have an account? "
                            : "Don't have an account? "}
                        <span onClick={toggleSignup}>
                            {isSignup ? "Sign In" : "Sign Up"}
                        </span>
                    </p>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" onClick={togglePanel}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" onClick={togglePanel}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}