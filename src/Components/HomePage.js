import React, { Component } from "react";
import { getPostsList } from "../api.js";
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import { Link } from "react-router-dom";
import renderHTML from 'react-render-html';

import "./HomePage.css"
const MAX_LENGTH = 40
function getPostAddress(post) {
  return `/post-details/${post.id}`;
}


class HomePage extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			loading : false,
			posts: [],
			error: ''
		};
	}

componentDidMount() {
  // get data from our Express API (localhost:5555)
  getPostsList().then(response => {
    // ALWAYS console.log() response.data to see what the API gave you
    console.log("Recent Phones", response.data);
    // save the JSON data from the API into the state
    this.setState({ posts: response.data });
  });
}


  render() {
    const {  posts,  } = this.state;
    console.log(MAX_LENGTH )
    return (
      <section className="HomePage">
        
          <Container>
            {/* <h1> {posts[0].author}</h1> */}
          { posts.map( post =>{
            return (
              
              <Card className="mt-1" key={post.id}>
                <Card.Header as="h5">
                  <Link to={getPostAddress(post)}>
                         {renderHTML(post.title.rendered )}
                  </Link>
                </Card.Header>
                <Card.Body>
                  post
                  {  post.excerpt.rendered.length > MAX_LENGTH ?
                  (
                    <Card.Text>
                      {`${post.excerpt.rendered.substring(3, MAX_LENGTH)}...`}<Link to={getPostAddress(post)}>Read more</Link>
                      </Card.Text>
                  ):
                  <Card.Text>{renderHTML(post.excerpt.rendered)}</Card.Text>
                  }
                  
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
              
            )
          })
        }
         </Container>
        )
       
        
 
      </section>
    );
  }
}

export default HomePage;
