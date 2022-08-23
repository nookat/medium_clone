import {useState, useEffect, useContext} from 'react'
import {Redirect, useParams} from 'react-router-dom'

import ArticleForm from 'components/articleForm'

import {CurrentUserContext} from 'contexts/currentUser'
import useFetch from 'hooks/useFetch'

const EditArticle = () => {
  const { slug } = useParams()
  const [currentUserState] = useContext(CurrentUserContext)
  const apiUrl = `/articles/${slug}`
  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl)
  const [{ response: updateArticleResponse, erorr: updateArticleError }, doUpdateArticle] = useFetch(apiUrl)
  const [initialValues, setInitialValues] = useState(null)
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)

  const handleSubmit = article => {
    console.log('handleSubmit', article)
    doUpdateArticle({
      method: 'put',
      data: {
        article
      }
    })
  }

  useEffect(() => {
    doFetchArticle()
  }, [doFetchArticle])

  useEffect(() => {
    if (!fetchArticleResponse) return

    setInitialValues({
      title: fetchArticleResponse.article.title,
      description: fetchArticleResponse.article.description,
      body: fetchArticleResponse.article.body,
      tagList: fetchArticleResponse.article.tagList
    })
  }, [fetchArticleResponse])

  useEffect(() => {
    if (!updateArticleResponse) return
    setIsSuccessfullSubmit(true)
  }, [updateArticleResponse])

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to="/"/>
  }

  if (isSuccessfullSubmit) {
    return <Redirect to={`/articles/${slug}`}/>
  }

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      errors={(updateArticleError && updateArticleError.errors) || {}}
      initialValues={initialValues}
    />
  )
}

export default EditArticle