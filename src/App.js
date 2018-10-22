import React, { Component } from "react";

import authors from "./data.js";

// Components
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class App extends Component {
  state = {
    currentAuthor: null,
    authors: [],
    loading: true
  };

  componentDidMount() {
    instance
      .get("/api/authors/")
      .then(res => res.data)
      .then(authors =>
        this.setState({
          authors: authors,
          loading: false
        })
      )
      .catch(err => console.error(err));
  }

  selectAuthor = authorID => {
    this.setState({ loading: true });
    instance
      .get(`/api/authors/${authorID}/`)
      .then(res => res.data)
      .then(author =>
        this.setState({
          currentAuthor: author,
          loading: false
        })
      )
      .catch(err => console.error(err));
  };

  unselectAuthor = () => this.setState({ currentAuthor: null });

  getContentView = () => {
    if (this.state.loading) {
      return <Loading />;
    } else if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return <AuthorsList authors={authors} selectAuthor={this.selectAuthor} />;
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
