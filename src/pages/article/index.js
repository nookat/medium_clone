import {useState, useEffect, useContext} from 'react'
import {Link, Redirect, useParams} from 'react-router-dom'

import Loading from 'components/loading'
import ErrorMessage from 'components/errorMessage'
import TagList from 'components/tagList'
import {CurrentUserContext} from 'contexts/currentUser'

import useFetch from 'hooks/useFetch'

const Article = () => {
  const { slug } = useParams()
  const apiUrl = `/articles/${slug}`
  const [{
    response: fetchArticleResponse,
    error: fetchArticleError,
    isLoading: fetchArticleIsLoading
  }, doFetch] = useFetch(apiUrl)
  const [{ response: deleteArticleResponse }, doDeleteArticle] = useFetch(apiUrl)
  const [currentUserState] = useContext(CurrentUserContext)
  const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false)

  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUserState.isLoggedIn) return false

    return fetchArticleResponse.article.author.username === currentUserState.currentUser.username
  }

  const deleteArticle = () => {
    doDeleteArticle({
      method: 'delete'
    })
  }

  console.log('isAuthor', isAuthor())

  useEffect(() => {
    doFetch()
  }, [doFetch])

  useEffect(() => {
    if (!deleteArticleResponse) return

    setIsSuccessfullDelete(true)
  }, [deleteArticleResponse])

  if (isSuccessfullDelete) {
    return <Redirect to="/"/>
  }

  return (
    <div className=" article-page">
      <div className="banner">
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className=" container">
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className=" article-meta">
              <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                <img src={fetchArticleResponse.article.author.image} alt=""/>
              </Link>
              <div className=" info">
                <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className=" date">{fetchArticleResponse.article.createdAt}</span>
              </div>
              {isAuthor() && (
                <span>
                  <Link
                    className=" btn btn-outline-secondary btn-small"
                    to={`/articles/${fetchArticleResponse.article.slug}/edit`}
                  >
                    <i className=" ion-edit"/>
                    Edit Article
                  </Link>
                  <button
                    className=" btn btn-outline-danger btn-small"
                    onClick={deleteArticle}
                  >
                    <i className=" ion-trash-a"/>
                    Delete article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className=" container page">
        {fetchArticleIsLoading && <Loading/>}
        {fetchArticleError && <ErrorMessage/>}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className=" row article-content">
            <div className=" col-xs-12">
              <div>
                <p>{fetchArticleResponse.article.body}</p>
              </div>
              <TagList tags={fetchArticleResponse.article.tagList}/>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Article