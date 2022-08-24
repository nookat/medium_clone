import {useEffect} from 'react'
import {NavLink, useParams, useRouteMatch, useLocation} from 'react-router-dom'

import UserArticles from 'pages/userProfile/components/userArticles'

import useFetch from 'hooks/useFetch'

const UserProfile = () => {
  const { slug } = useParams()
  const match = useRouteMatch()
  const location = useLocation()
  console.log(location)
  const isFavorites = location.pathname.includes('favorites')
  const apiUrl = `/profiles/${slug}`
  const [{ response }, doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [doFetch])

  if (!response) {
    return null
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img className="user-img" src={response.profile.image} alt=""/>
              <h4>{response.profile.username}</h4>
              <p>{response.profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink
                    to={`/profiles/${response.profile.username}`}
                    className="nav-link"
                    exact
                  >
                    My Posts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`/profiles/${response.profile.username}/favorites`}
                    className="nav-link"
                  >
                    Favorites Posts
                  </NavLink>
                </li>
              </ul>
            </div>
            <UserArticles
              username={response.profile.username}
              location={location}
              url={match.url}
              isFavorites={isFavorites}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile