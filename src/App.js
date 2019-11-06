import React, { Component } from "react";

import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import Loading from "./Loading";

class App extends Component {
  state = {
    currentAuthor: null,
    authors: [],
    loading: true
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      const authors = response.data;
      this.setState({ authors: authors, loading: false });
    } catch (err) {
      console.log("Network error", err);
    }
  }

  selectAuthor = async author => {
    try {
      const response = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/${author.id}`
      );
      const newAuthor = response.data;
      this.setState({ currentAuthor: newAuthor });
    } catch (err) {
      console.log("Error", err);
    }
  };
  unselectAuthor = () => this.setState({ currentAuthor: null });

  getContentView = () => {
    if (this.state.loading) return <Loading />;
    else if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorsList
          authors={this.state.authors}
          selectAuthor={this.selectAuthor}
        />
      );
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
