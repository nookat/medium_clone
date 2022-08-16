import {useState, useEffect, useContext} from 'react'
import {Redirect, Link, useLocation} from 'react-router-dom'

import useFetch from 'hooks/useFetch'
import useLocalStorage from 'hooks/useLocalStorage'
import {CurrentUserContext} from 'contexts/currentUser'
import BackendErrorMessages from 'components/backendErrorMessages'

const Authentication = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const { pathname } = useLocation()

  const isLogin = pathname === '/login'
  const pageTitle = isLogin ? 'Sign in' : 'Sign up'
  const descriptionLink = isLogin ? '/register' : '/login'
  const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'

  const apiUrl = isLogin ? '/users/login' : '/users'
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false)

  const [, setToken] = useLocalStorage('token')
  const [, dispatch] = useContext(CurrentUserContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('data', email, password)
    const user = isLogin ? { email, password } : { email, password, username }

    doFetch({
      method: 'post',
      data: {
        user
      }
    })
  }

  useEffect(() => {
    if (!response) return
    setToken(response.user.token)
    setIsSuccessfulSubmit(true)
    dispatch({
      type: 'SET_AUTHORIZED',
      payload: response.user
    })
  }, [response, setToken, dispatch])

  if (isSuccessfulSubmit) {
    return <Redirect to="/"/>
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{pageTitle}</h1>
            <p className="text-xs-center">
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>
            <form onSubmit={handleSubmit}>
              {error && <BackendErrorMessages backendErrors={error.errors}/>}
              <fieldset>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </fieldset>
                )}
                <fieldset className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={isLoading}
                >
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authentication