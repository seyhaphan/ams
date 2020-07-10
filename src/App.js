import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu'
import ViewArticle from './components/ViewArticle';
import AddArticle from './components/AddArticle'
import ListArticle from './components/ListArticle';
import { strings } from './react-localizationp-string/LocalizedString';
import Category from './components/Category';
import { connect } from 'react-redux';

class App extends Component {

  componentWillMount() {
    if (localStorage.lang) {
      const lang = localStorage.getItem("lang")
      strings.setLanguage(lang)
      this.setState({})
    } else {
      strings.setLanguage(this.props.lang);
      this.setState({})
    }
  }

  render() {

    return (
      <Router>
        <Menu />
        <Switch>
          <Route exact path="/" component={ListArticle} />
          <Route path='/view/:id' component={ViewArticle} />
          <Route path="/new-article" component={AddArticle} />
          <Route path="/update-article/:updateId" render={(props) => <AddArticle {...props} isUpdate={true} />} />
          <Route path="/category" component={Category} />
          <Route path="*" render={() => <h1 className="container">404 ERROR</h1>} />
        </Switch>
      </Router>
    )
  }
}

// export default App;

const mapStateToProps = state => {
  return {
    lang: state.articleReducer.lang
  }
}
export default connect(mapStateToProps, null)(App)