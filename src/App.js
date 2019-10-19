import React, {Component} from 'react';
import './App.css';
import Circle from './Components/Circle/Circle';
import PopUpWindow from './Components/PopUpWindow/PopUpWindow';
import SpeedSelection from './Components/SpeedSelection/SpeedSelection';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class App extends Component {
    
  state = {
    showPopUp: false,
    score: 0,
    counter: 0,
    current: 0,
    speed: 0,
    game: 'off',
  }

  timer = undefined;
  pace = 0;
  text = "";
  
  onSpeedSelect = (speed) => {
    console.log("speed ", speed);
    this.setState({speed})
    switch (speed) {
      case ('SLOW'):
        this.pace = 3000;
        break;
      case ('FAST'):
        this.pace = 1500;
        break;
      default:
        console.log("pace is undefined");
    }
    console.log("pace ", this.pace);
    
  }

  next=()=>{
    
    console.log("next");
    console.log("counter" , this.state.counter);
    let nextActive = undefined; // method inside component, needs variable
    
    do {nextActive = getRandomInt(1,4);
    } while (nextActive === this.state.current);
    
    this.setState({current: nextActive, counter: this.state.counter+1});
    console.log("counter +" , this.state.counter);
    
    if (this.state.counter > 5) {
      this.stopHandler();
      return;
    }
    this.pace *= 0.95;  
    this.timer = setTimeout(this.next, this.pace); //if it is not an "arrow" function,  "bind", 

    // console.log("current", this.state.current);
    
  }
  
  clickHandler = (buttonClicked) => {
    console.log("click");
    console.log("counter" , this.state.counter);
    if (this.state.game === 'on') {
      
      console.log("button clicked " + buttonClicked);
      if (buttonClicked !== this.state.current) {
        this.stopHandler();
        return;
      }
      this.setState ({score: this.state.score +1, counter: 0});
    }
  }
  
  startHandler = () => {
    console.log("start");
    console.log("counter" , this.state.counter);
    console.log("speed" , this.state.speed);
    if (this.state.speed !== 0) {
    this.setState({game: 'on'});
    this.next();
    } else {
      this.text = "Select speed first!";
      this.setState({ showPopUp: true });
    }
  } 

  stopHandler = () => {
    if ( this.state.game === 'on') {
      console.log("stop");
      console.log("counter" , this.state.counter);
      clearTimeout(this.timer);
      this.text = "Game over! \n You've caught " + this.state.score + ' mice';
      this.setState({ showPopUp: true, score: 0, counter: 0, current:0, speed: 0});
    }
  }

  PopUpWindowHandler = () => {
    console.log("popup");
    console.log("counter" , this.state.counter);
    window.location.reload();
  }
  
  
  render () {

    const { speed } = this.state;

    const Score = () => {
      return (
    <div className='score'>
      Speed: {this.state.speed} -> Score : {this.state.score}
      </div>
      );
    }

    const stateLine = (speed===0) ? <SpeedSelection onSpeedSelect={this.onSpeedSelect} /> : <Score />;
    
    return (
      <div>
        {this.state.showPopUp && <PopUpWindow click={this.PopUpWindowHandler} text= {this.text} score={this.state.score}/>}
        <h1>Cat & Mouse</h1>
        {stateLine}
        <div className="circles">
          <Circle buttonColor="#D3B1FA" active={this.state.current===1} click={()=>this.clickHandler(1)} />
          <Circle buttonColor="#00C9AA" active={this.state.current===2} click={()=>this.clickHandler(2)} />
          <Circle buttonColor="#FFFADE" active={this.state.current===3} click={()=>this.clickHandler(3)} />
          <Circle buttonColor="#2380A0" active={this.state.current===4} click={()=>this.clickHandler(4)} />
        </div>  
        <div className='buttons'>
          <button className="start" onClick={this.startHandler}>Start</button>
          <button className="stop" onClick={this.stopHandler}>Stop</button>
        </div>
      </div>
    )
  }
}

export default App;
