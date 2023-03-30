import React from "react";
import axios from "axios";
import "./style.css";
import config from "./config.json";

export default class App extends React.Component {
  // get api data then add to variable
  state = {
    json: []
  };
  componentDidMount() {
    axios.get(config.server + "/api/home").then((res) => {
      this.setState({ json: res.data.result });
    });
  }

  render() {
    return (
      <div>
        <h1>asd</h1>
      </div>
    );


  }
}