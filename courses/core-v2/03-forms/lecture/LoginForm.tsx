import React, { useRef, useReducer } from 'react'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'
import { User } from 'ProjectPlanner/types'
import { Heading } from 'ProjectPlanner/Heading'
import { Notice } from 'ProjectPlanner/Notice'
import { api } from 'ProjectPlanner/api'

type Props = {
  onAuthenticated(user: User): void
}

function useState(defaultState) {
  return useReducer((_, newState) => newState, defaultState)
}

export const LoginForm: React.FC<Props> = ({ onAuthenticated }) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'LOGIN': {
          return { ...state, loading: true }
        }
        case 'LOGIN_FAILED': {
          return { ...state, loading: false, error: action.error }
        }
        case 'TOGGLE_SHOW_PASSWORD': {
          return { ...state, showPassword: !state.showPassword }
        }
        default:
          return state
      }
    },
    {
      error: null,
      loading: false,
      showPassword: false,
    }
  )

  const { error, loading, showPassword } = state

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const usernameRef = useRef<HTMLInputElement>()

  function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    dispatch({ type: 'LOGIN' })

    api.auth
      .login(username, password)
      .then((user: User) => {
        onAuthenticated(user)
        usernameRef.current.focus()
      })
      .catch((error) => {
        dispatch({ type: 'LOGIN_FAILED', error })
      })
  }

  return (
    <div>
      <Heading>Login</Heading>
      <form onSubmit={handleLogin} className="spacing">
        {error && (
          <Notice type="error">
            <FaExclamationCircle />
            <span>{error}</span>
          </Notice>
        )}

        <div>
          <input
            required
            className="form-field"
            aria-label="Username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value)
            }}
            ref={usernameRef}
          />
        </div>
        <div>
          <input
            required
            className="form-field"
            aria-label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
          <label>
            <input
              onChange={() => {
                dispatch({ type: 'TOGGLE_SHOW_PASSWORD' })
              }}
              className="passwordCheckbox"
              type="checkbox"
            />{' '}
            show password
          </label>
        </div>

        <footer>
          <button type="submit" className="button">
            {!loading ? (
              <>
                <FaSignInAlt /> <span>Login</span>
              </>
            ) : (
              <span>Loading ...</span>
            )}
          </button>
        </footer>
      </form>
    </div>
  )
}

export default LoginForm
