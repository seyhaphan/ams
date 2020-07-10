import React from "react";
import {
   Button,
   Row,
   Col,
} from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getArticles, updateArticle, deleteArticle, getMoreArticle } from "../redux/actions/articles/articleAction";
import swal from "sweetalert";
import Header from "./Header";
import InfiniteScroll from "react-infinite-scroll-component";
import { strings } from "../react-localizationp-string/LocalizedString";

const defaultImgUrl =
   "https://increasify.com.au/wp-content/uploads/2016/08/default-image.png";

class ListArticle extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         page: 1,
         hasMore: true
      }
   }

   fetchMoreData = () => {

      setTimeout(() => {
         this.setState(prevState => { return { page: prevState.page + 1 } });
         this.props.getMoreArticle(this.state.page, (res) => {
            if (res == 0) {
               this.setState({ hasMore: false })
            }
         });
      }, 1000);
   }

   componentWillMount() {
      this.props.getArticles();
   }

   handleDelete = articleId => {
      swal({
         title: "Are you sure?",
         text: "Once deleted, you will not be able to recover this imaginary file!",
         icon: "warning",
         buttons: true,
         dangerMode: true,
      }).then((willDelete) => {
         if (willDelete)
            this.props.deleteArticle(articleId)
      });
   }

   render() {
      const articles = this.props.articles.map((article) => {
         const date = new Date(article.createdAt).toLocaleDateString();

         return (
            <div className="my-3" key={article._id}>
               <Row >
                  <Col className="col-lg-4 col-md-4 col-sm-12 col-12" >
                     <img src={article.image || defaultImgUrl}
                        className="w-100"
                        max-height="300px"
                        alt="loading"
                     />
                  </Col>
                  <Col className="col-lg-8 col-md-8 col-sm-12 col-12">
                     <h3>{article.title}</h3>
                     <p className="text-muted">
                        {strings.CREATE_DATE} : {date}
                     </p>
                     <p className="text-muted">
                        {strings.CATEGORY} :{" "}
                        {article.category == null
                           ? "No Type"
                           : article.category.name}
                     </p>
                     <p>{article.description}</p>
                     <Link to={`/view/${article._id}`}>
                        <Button variant="primary mx-1">
                           {strings.VIEW}
                        </Button>
                     </Link>
                     <Button as={Link} to={`/update-article/${article._id}`} variant="warning mx-1">
                        {strings.EDIT}
                     </Button>
                     <Button variant="danger mx-1"
                        onClick={() => {
                           this.handleDelete(article._id)
                        }}
                     >
                        {strings.DELETE}
                     </Button>
                  </Col>
               </Row>
               <hr />
            </div>
         );
      })
      return (
         <div className="container">
            <Header />
            <InfiniteScroll
               dataLength={this.props.articles.length}
               next={this.fetchMoreData}
               hasMore={this.state.hasMore}
               loader={<h3 className="container">Loading...</h3>}
               endMessage={
                  <p style={{ textAlign: "center" }}>
                     <b>Yay! You have seen it all</b>
                  </p>
               }>
               <div className="my-4">
                  {articles}
               </div>
            </InfiniteScroll>

         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      articles: state.articleReducer.articles,
   };
};

const mapDispatchToProps = (dispatch) => {
   const boundActionCreators = bindActionCreators({
      getArticles,
      deleteArticle,
      updateArticle,
      getMoreArticle
   }, dispatch);

   return boundActionCreators;
};

export default connect(mapStateToProps, mapDispatchToProps)(ListArticle);
