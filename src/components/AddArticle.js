import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { getCategorys } from '../redux/actions/categorys/categoryAction'
import { connect } from 'react-redux'
import { uploadFile } from '../redux/actions/fileUplaod/fileUploadAction'
import { postArticle } from '../redux/actions/articles/articleAction'
import swal from 'sweetalert'
import { getArticles, getArticleById, updateArticle } from '../redux/actions/articles/articleAction';
import { strings } from '../react-localizationp-string/LocalizedString';

class AddArticle extends Component {
   state = {
      title: '',
      description: '',
      categoryId: '',
      cat: 0,
      imageUrl: '',
      fileImage: '',
      titleError: '',
      descriptionError: '',
      isUpdate: this.props.isUpdate
   }

   handleChange = ({ target }) => {
      this.setState({
         [target.name]: target.value
      })
   }

   handleChangeOption = ({ target }) => {
      this.setState({
         categoryId: target.id,
      })
   }

   handleChangeImage = ({ target }) => {
      const file = target.files[0];
      this.setState({ fileImage: file })

      const fileReder = new FileReader();

      fileReder.addEventListener('load', (e) => {
         this.setState({
            imageUrl: e.target.result
         })
      })

      fileReder.readAsDataURL(file)

   }

   validatorForm = () => {

      if (this.state.title === '') {
         this.setState({ titleError: '* The title can not be blank' })
      } else {
         this.setState({ titleError: '' })
      }

      if (this.state.description === '') {
         this.setState({ descriptionError: '* The description can not be blank' })
      } else {
         this.setState({ descriptionError: '' })
      }

      if (this.state.title !== '' && this.state.description !== '') {
         return true;
      }

      return false;
   }

   articleRequest = () => {
      const article = {
         title: this.state.title,
         description: this.state.description,
         published: true,
      }

      const category = {
         _id: this.state.categoryId
      }

      let articleRequest;

      if (this.state.categoryId !== '') {
         articleRequest = {
            ...article,
            category
         }
      } else {
         articleRequest = {
            ...article
         }
      }
      return articleRequest;
   }

   handleSubmit = async (e) => {
      e.preventDefault();

      let articleRequest = this.articleRequest();

      if (this.validatorForm()) {
         if (this.state.fileImage) {
            const formData = new FormData();
            formData.append(`image`, this.state.fileImage)

            await this.props.uploadFile(formData)
            const image = this.props.imageUrlRes;

            const article = {
               ...articleRequest,
               image,
            }
            if (this.state.isUpdate) {
               const updateId = this.props.match.params.updateId;
               this.props.updateArticle(updateId, article, (res) => {
                  swal("success", res, "success")
                     .then(() => {
                        this.props.history.push('/')
                     })

               })
            } else {
               this.props.postArticle(article, (res) => {
                  swal("success", res, "success")
                     .then(() => {
                        this.props.history.push('/')
                     })
               })
            }


         } else {

            const article = {
               ...articleRequest,
            }
            if (this.state.isUpdate) {
               const updateId = this.props.match.params.updateId;
               this.props.updateArticle(updateId, article, (res) => {
                  swal("success", res, "success")
                     .then(() => {
                        this.props.history.push('/')
                     })
               })
            } else {
               this.props.postArticle(article, (res) => {
                  swal("success", res, "success")
                     .then(() => {
                        this.props.history.push('/')
                     })
               })
            }
         }
      }
   }

   componentWillMount() {
      this.props.getCategorys();
      this.props.getArticles();

      if (this.state.isUpdate) {
         const updateId = this.props.match.params.updateId;

         this.props.getArticleById(updateId, (res) => {
            let categoryId;

            if (res.category) {
               categoryId = res.category._id
            } else {
               categoryId = 0
            }

            this.setState({
               title: res.title,
               description: res.description,
               imageUrl: res.image,
               categoryId
            })
         })
      }
   }

   render() {

      const categoryList = this.props.categorys.map(category => {
         const isChecked = category._id === this.state.categoryId

         return <Form.Check key={category._id}
            className="mx-2"
            type="radio"
            label={category.name}
            name="category"
            checked={this.state.isUpdate ? isChecked : null}
            id={category._id}
            onChange={this.handleChangeOption}
         />
      });

      return (
         <div className="container">
            <h1>{this.state.isUpdate ? strings.UPDATE_ARTICLE : strings.ADD_ARTICLE}</h1>
            <div className="row">
               <div className="col-md-7">
                  <Form onSubmit={this.handleSubmit}>
                     <Form.Group>
                        <label>{strings.TITLE}</label>
                        <Form.Control
                           type="text"
                           placeholder="input title"
                           name="title"
                           value={this.state.title}
                           onChange={this.handleChange} />
                        <small className="text-danger">{this.state.titleError}</small>
                     </Form.Group>
                     <Form.Group className="d-flex flex-wrap">
                        <Form.Label>
                           {strings.CATEGORY} :
                        </Form.Label>
                        {categoryList}
                     </Form.Group>

                     <Form.Group>
                        <Form.Label>{strings.DESCRIPTION}</Form.Label>
                        <Form.Control
                           type="text"
                           placeholder="input description"
                           name="description"
                           value={this.state.description}
                           onChange={this.handleChange} />
                        <small className="text-danger">{this.state.descriptionError}</small>
                     </Form.Group>

                     <label>{strings.THUMBNAIL}</label>
                     <Form.File
                        id="file-image"
                        label="Custom file input"
                        custom
                        onChange={this.handleChangeImage}
                     />

                     <Button variant="primary my-3" type="submit">
                        {this.state.isUpdate ? strings.SAVE : strings.SAVE}
                     </Button>
                  </Form>
               </div>
               <div className="col-md-5">
                  <img width={300} src={this.state.imageUrl || "https://iwfstaff.com.au/wp-content/uploads/2017/12/placeholder-image.png"} alt="Thumbnail" />
               </div>
            </div>
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      articles: state.articleReducer.articles,
      categorys: state.categoryReducer.categorys,
      imageUrlRes: state.fileUploadReducer.imageUrl
   }
}

const mapDispatchToProps = dispatch => {
   return bindActionCreators({
      getArticles,
      getCategorys,
      uploadFile,
      postArticle,
      getArticleById,
      updateArticle
   }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddArticle)