import React from "react";
import axios from "axios";
import "./style.css";

export default class App extends React.Component {
  state = {
    json: [],
  };
  componentDidMount() {
    axios.get("/api/home").then((response) => {
      this.setState({ json: response.data });
    });
  }

  render() {
    const { json } = this.state;
    return (
      <div>
        <h1>Users</h1>
      </div>
    );
  }
}