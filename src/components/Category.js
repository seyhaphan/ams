import React, { Component } from 'react'
import { strings } from '../react-localizationp-string/LocalizedString'
import { Form, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCategorys, addCategory, deleteCategory, updateCategory } from '../redux/actions/categorys/categoryAction'
import swal from 'sweetalert'


class Category extends Component {
   state = {
      category: '',
      categoryError: '',
      isUpdate: false
   }
   validatorForm = () => {

      if (this.state.category === '') {
         this.setState({ categoryError: '* The category can not be blank' })
      } else {
         this.setState({ categoryError: '' })
      }

      if (this.state.category !== '') {
         return true;
      }

      return false;
   }

   handleChange = e => {
      this.setState({
         categoryError: '',
         category: e.target.value
      })
   }
   clearText = () => {
      this.setState({
         category: '',
      })
   }
   handleSubmit = e => {
      e.preventDefault();

      if (this.validatorForm()) {

         const category = {
            name: this.state.category
         }

         if (this.state.isUpdate) {

            this.props.updateCategory(this.state.updateId, category, res => {
               swal("success", res, "success")
               this.clearText();
               this.setState({ isUpdate: false })
            })

         } else {

            this.props.addCategory(category, res => {
               swal("success", res, "success")
               this.clearText();
            })

         }
      }
   }
   handleDelete = catId => {
      swal({
         title: "Are you sure?",
         text: "Once deleted, you will not be able to recover this imaginary file!",
         icon: "warning",
         buttons: true,
         dangerMode: true,
      }).then((willDelete) => {
         if (willDelete)
            this.props.deleteCategory(catId);
      });

   }

   handleEdit = catId => {
      const categoryName = this.props.categorys.find(cat => cat._id === catId)
      this.setState({
         isUpdate: true,
         categoryError: '',
         category: categoryName.name,
         updateId: catId
      })
   }
   componentWillMount() {
      this.props.getCategorys();
   }

   render() {
      const categorys = this.props.categorys.map((category, index) => (
         <tr key={index}>
            <td>{++index}</td>
            <td className="text-center">{category.name}</td>
            <td className="text-center">
               <button onClick={() => this.handleEdit(category._id)} className="btn btn-primary mx-2">edit</button>
               <button onClick={() => this.handleDelete(category._id)} className="btn btn-danger">delete</button>
            </td>
         </tr>
      ))
      return (
         <div className="container" >
            <h2>{strings.CATEGORY}</h2>
            <Form onSubmit={this.handleSubmit}>
               <Form.Label>{strings.NAME}</Form.Label>
               <Form.Group className="d-flex mb-0" >
                  <Form.Control
                     className="w-25"
                     type="text"
                     placeholder="input category name"
                     name="category"
                     value={this.state.category}
                     onChange={this.handleChange} />
                  <button type="submit" className="btn btn-sm btn-secondary mx-3">
                     {this.state.isUpdate ? strings.SAVE : strings.ADD_CATEGORY}
                  </button>
               </Form.Group>
               <small className="text-danger">{this.state.categoryError}</small>
            </Form>

            <Table className="mt-3" striped bordered hover>
               <thead>
                  <tr>
                     <th>#</th>
                     <th className="text-center">{strings.NAME}</th>
                     <th className="text-center">{strings.ACTION}</th>
                  </tr>
               </thead>
               <tbody>
                  {categorys}
               </tbody>
            </Table>
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      categorys: state.categoryReducer.categorys
   }
}
const mapDispatchToProps = dispatch => {
   return bindActionCreators({
      getCategorys,
      addCategory,
      deleteCategory,
      updateCategory
   }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)