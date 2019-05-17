import React, { Component } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "./Image";

export default class Images extends Component {
  // using count and start, which are passed as query params, to make sure we don't duplicate our pulled in images
  state = {
    images: [],
    count: 30,
    start: 1
  };

  componentDidMount() {
    const { start, count } = this.state;
    axios
      .get(`/api/photos?count=${count}&start=${start}`)
      .then(res => this.setState({ images: res.data }));
  }

  // update the start so we get different images between calls
  fetchImages = () => {
    const { start, count } = this.state;
    this.setState({ start: this.state.start + count });
    axios
      .get(`/api/photos?count=${count}&start=${start}`)
      .then(res =>
        this.setState({ images: this.state.images.concat(res.data) })
      );
  };

  render() {
    return (
      <div className="images">
        <InfiniteScroll
          dataLength={this.state.images.length}
          next={this.fetchImages}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {this.state.images.map(image => (
            <Image key={image.id} image={image} />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}
