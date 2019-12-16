import React, { Component } from 'react';
import Definition from './Definition';

class Flashcard extends Component {
  state = {
    time: 5,
    timer: null,
    showDef: false,
  }

  toggleShow = () => {
    console.log("toggle");
    this.setState(prevState => ({
      showDef: !prevState.showDef,
    })
    )
  }

  componentDidMount() {
    this.setState({timer: setInterval(this.decrementTime, 1000)});

    // this.myInterval = setInterval(() => {
    //   this.setState(({ count }) => ({
    //     count: count - 1
    //   }))
    // }, 1000)
    // if({count} === 0){
    //   this.state.count = 5
    // }
  }

  decrementTime = () => {
    if(this.state.time === 0){
      console.log('Call Next Card');
      this.props.next();
    } else {
      clearInterval(this.state.timer);
      this.setState(prevState => ({
        time: prevState.time -1,
        timer: setInterval(this.decrementTime, 1000),
      }));
    }
    // this.setState({
    // count: this.state.count - 1
    // })
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.detail !== this.props.detail){
      clearInterval(this.state.timer);
      this.setState({
        time: 5,
        timer: setInterval(this.decrementTime, 1000),
      });
    } if(prevState.time === 0 && this.state.time === 0){
      clearInterval(this.state.timer);
      this.props.next();
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    console.log(this.props);
    const defs = this.props.detail.definitions[0].definitions;
    
    return (
      <>
        <div className="card">
          <div className="card-content">
            <h3>Counter: {this.state.time}</h3>
            <h1>{this.props.detail.word}</h1>
            <div className="card-action">
              <button onClick={this.toggleShow} className="waves-effect waves-light btn">
                {this.state.showDef ? 'Hide Definition' : 'Show Definition'}
              </button>
            </div>
          </div>
        </div>
        <div className="card">
          {this.state.showDef && defs.map((def, index) => <Definition def={def} index={index} key={index}/> )}
        </div>
      </>
    )
  }
}

export default Flashcard;
