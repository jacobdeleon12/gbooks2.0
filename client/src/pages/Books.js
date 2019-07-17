import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input,  FormBtn } from "../components/Form";
// import ResultsSeach from "../components/Results-search"
// import { Query } from "mongoose";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: "",
    search:"",
    result:{}
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  seachGbooks = bookTitle =>{
    API.searchBooks(bookTitle)
    .then(res=>{
      this.setState({ result: res.data })
      // console.log(res.data)
      // console.log(this.state.result.items);
      this.state.result.items.forEach(items => {
        // console.log(items.volumeInfo);

        //for titles of book
        console.log(items.volumeInfo.title);
        //for authers
        let info =items.volumeInfo.authors
        for (let i = 0; i < info.length; i++) {
          console.log(info[i]);
        }
        // discription
        console.log(items.volumeInfo.description);
        // thumbnail
        console.log(items.volumeInfo.imageLinks.thumbnail);
        // link to previewLink
        console.log(items.volumeInfo.previewLink);


        
      });

      
    }).catch(err => console.log(err));
  }

  handleFormSubmit = event => {
    // console.log(this.state);
    
    event.preventDefault();
    // this.setState()
    this.seachGbooks(this.state.title)
    
  };



  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title && this.state.author) {
  //     API.saveBook({
  //       title: this.state.title,
  //       author: this.state.author,
  //       synopsis: this.state.synopsis
  //     })
  //       .then(res => this.loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"

              />
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Find Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.result.length ? (
              // <ResultsSeach></ResultsSeach>
              <List>
                {this.state.result.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}

            {/* {this.state.result.length ? (
              <ResultsSeach>
                

              </ResultsSeach>
            ): (
              <h3>No Results to Display</h3>
            )} */}

          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
