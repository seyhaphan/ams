import React, { Component } from 'react'
import { getArticleById } from "../redux/actions/articles/articleAction";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap'

const defaultImgUrl = "https://increasify.com.au/wp-content/uploads/2016/08/default-image.png"



class ViewArticle extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        category: '',
        date: '',

    }
    componentWillMount() {
        const articleId = this.props.match.params.id;
        this.props.getArticleById(articleId, (res) => {
            let categoryName;

            if (res.category) {
                categoryName = res.category.name
            } else {
                categoryName = ''
            }
            this.setState({
                title: res.title,
                description: res.description,
                image: res.image,
                date: res.createdAt,
                category: categoryName
            })
        });
    }
    render() {
        const { title, description, image, date, category } = this.state;
        return (
            <div className='container'>
                <div>
                    <Row style={{ padding: "10px" }}>
                        <Col md="4">
                            <img
                                src={image || defaultImgUrl}
                                width="340px"
                                height="260px"
                                alt="loading"
                            />
                        </Col>
                        <Col md="8" style={{ display: "inline" }}>
                            <h3>{title}</h3>
                            <p className="text-muted">
                                Created Date : {date.substring(0, 10)}
                            </p>
                            <p className="text-muted">
                                Category : {category === '' ? "No Type" : category}
                            </p>
                            <p>{description}</p>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    const boundActionCreators = bindActionCreators({
        getArticleById
    }, dispatch);

    return boundActionCreators;
};

export default connect(null, mapDispatchToProps)(ViewArticle);
