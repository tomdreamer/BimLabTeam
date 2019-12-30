import React, { Component } from "react";
import renderHTML from 'react-render-html';

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
// import { Link } from "react-router-dom";
// import "./PostDetails.css";
import { getPostDetails } from "../api.js";

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postItem: {}
    };
  }

  componentDidMount() {
    // get path params from React Router props
    const { params } = this.props.match;
    // use the ID in path params to get the details from the backend API
    getPostDetails(params.postId).then(response => {
      // ALWAYS console.log() response.data to see what the API gave you
      console.log("Post Details", response.data);
      // save the JSON data from the API into the state
      this.setState({ postItem: response.data });
    });
  }

  render() {
    const { postItem } = this.state;
     console.log(postItem.title)
    return (
      <section className="PostDetails">
        
        
            { Object.keys( postItem ).length ? (
                <Container>
                <Card.Body key={postItem.id}>
                    <Card.Title>{renderHTML( postItem.title.rendered )}</Card.Title>
                    <Card.Text>{ renderHTML( postItem.content.rendered ) }</Card.Text>
                    <Card.Link href="/">Card Link</Card.Link>
                     <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
                </Container>
            ) : '' }
            
      </section>
    );
  }
}

export default PostDetails;
