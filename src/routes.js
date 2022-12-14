import {Switch, Route} from 'react-router-dom'
import GlobalFeed from 'pages/globalFeed'
import TagFeed from 'pages/tagFeed'
import YourFeed from 'pages/yourFeed'
import Article from 'pages/article'
import CreateArticle from 'pages/createArticle'
import EditArticle from 'pages/editArticle'
import Authentication from 'pages/authentication'
import Settings from 'pages/settings'
import UserProfile from 'pages/userProfile'

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact/>
      <Route path="/profiles/:slug" component={UserProfile}/>
      <Route path="/profiles/:slug/favorites" component={UserProfile}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/articles/new" component={CreateArticle}/>
      <Route path="/articles/:slug/edit" component={EditArticle}/>
      <Route path="/tags/:slug" component={TagFeed}/>
      <Route path="/feed" component={YourFeed}/>
      <Route path="/login" component={Authentication}/>
      <Route path="/register" component={Authentication}/>
      <Route path="/articles/:slug" component={Article}/>
    </Switch>
  )
}

export default Routes