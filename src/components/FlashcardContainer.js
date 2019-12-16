import React, { Component } from "react";
import axios from 'axios';
import Flashcard from "./Flashcard";
import { CLIENT_URL } from "../constants.js";

class FlashcardContainer extends Component {
  state = {
    flashcards: [],
    currentIndex: 0,
  };

  next = () => {
    // let nextIndex = this.state.currentIndex + 1 === this.state.flashcards.length
    //   ? this.state.currentIndex
    //   : this.state.currentIndex + 1;

      let nextIndex;
      if(this.state.currentIndex + 1 === this.state.flashcards.length){
        nextIndex = this.state.currentIndex;
      } else {
        nextIndex = this.state.currentIndex + 1;
      }

      this.setState({ currentIndex: nextIndex });
  }

  prev = () => {
      let prevIndex;
      if(this.state.currentIndex - 1 < 0){
        prevIndex = 0;
      } else {
        prevIndex = this.state.currentIndex - 1;
      }

      this.setState({ currentIndex: prevIndex });
  }

  handleKeyUp = (event) => {
    console.log(event.keyCode);   
    if(event.keyCode === 37 || event.keyCode === 65) this.prev();
    if(event.keyCode === 39 || event.keyCode === 68) this.next();
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);

    // console.log("This works")
    axios.get(CLIENT_URL)
      .then(res => {
        console.log(res);
        this.setState({
          flashcards: res.data
        });
      })
      .catch(err => console.log(err))
  }

  componentWillUnmount() {
    window.removeEventListener('keyup');
  }

  render() {
    // console.log("This render");
    let detail = this.state.flashcards[this.state.currentIndex];
    let card;

    if(detail) {
      card= <Flashcard detail={detail} next={this.next} />
    }

    return(
      <div>
        {card}
      </div>
    )
  }
}

export default FlashcardContainer;
