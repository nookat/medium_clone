import {useEffect} from 'react'
import {stringify} from 'query-string'

import Loading from 'components/loading'
import ErrorMessage from 'components/errorMessage'
import Feed from 'components/feed'
import FeedToggler from 'components/feedToggler'
import Pagination from 'components/pagination'
import PopularTags from 'components/popularTags'
import useFetch from 'hooks/useFetch'
import {getPaginator, limit} from 'utils'

const YourFeed = ({ location, match }) => {
  const { offset, currentPage } = getPaginator(location.search)
  const stringifiedParams = stringify({
    limit,
    offset
  })
  const url = match.url
  const apiUrl = `/articles/feed?${stringifiedParams}`
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [doFetch, currentPage])

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler/>
            {isLoading && <Loading/>}
            {error && <ErrorMessage/>}
            {
              !isLoading && response && (
                <>
                  <Feed articles={response.articles}/>
                  <Pagination
                    total={response.articlesCount}
                    limit={limit}
                    url={url}
                    currentPage={currentPage}/>
                </>
              )
            }
          </div>
          <div className=" col-md-3">
            <PopularTags/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YourFeed