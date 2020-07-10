import React from 'react'
import { Form, Button, Nav, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { strings } from '../react-localizationp-string/LocalizedString';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchArticle } from '../redux/actions/articles/articleAction'
import { getCategorys } from '../redux/actions/categorys/categoryAction'
class Header extends React.Component {

   componentWillMount() {
      this.props.getCategorys()
   }

   handleOnChange = ({ target }) => {
      this.props.searchArticle(target.value)
   }

   render() {
      return (
         <div>
            <div className="container my-3">
               <div className="row d-flex justify-content-between">
                  <div >
                     <h1>{strings.ARTICLE_MANAGEMENT}</h1>
                  </div>
                  <div>
                     <Nav className="mr-auto"></Nav>
                     <Form inline>
                        <label style={{ margin: "0 10px" }}>{strings.CATEGORY} : </label>
                        <Form.Control
                           as="select"
                           className="mr-sm-2"
                           id="inlineFormCustomSelect"
                           custom
                        >
                           <option value={null}>All</option>
                           {this.props.category.map((data) => {
                              return (
                                 <option key={data._id} value={data._id}>{data.name}</option>
                              )
                           })}
                        </Form.Control>
                        <FormControl
                           type="text"
                           placeholder="Search"
                           className="mr-sm-2"
                           onChange={this.handleOnChange}
                        />
                        <Button variant="outline-success" >{strings.SEARCH}</Button>
                        <Button as={Link} to="/new-article" variant="primary" style={{ margin: "0 10px" }}>{strings.ADD_ARTICLE}</Button>
                     </Form>
                  </div>
               </div>
            </div>
         </div >
      )
   }
}

const mapStateToProps = (state) => {
   // console.log("=========>", state.categoryReducer.categorys)
   return {
      articles: state.articleReducer.articles,
      category: state.categoryReducer.categorys
   };
};

const mapDispatchToProps = (dispatch) => {
   const boundActionCreators = bindActionCreators({
      searchArticle,
      getCategorys
   }, dispatch);

   return boundActionCreators;
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

