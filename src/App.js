import React, {Component} from 'react';
import './App.css';
import Circle from './Components/Circle/Circle';
import PopUpWindow from './Components/PopUpWindow/PopUpWindow';
import LevelSection from './Components/Level/Level';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class App extends Component {
    
  state = {
    showPopUp: false,
    score: 0,
    counter: 0,
    result: "hidden",
    current: 0,
    level: "visible",
    speed: undefined,
    game: 'off',
  }

  timer = undefined;
  pace = 0;
  text = "";
  
  levelHandler=(levelButton) => {
    console.log("button ", levelButton);
    if (levelButton === 'slow') {
      this.pace = 3000;
      this.setState({speed: 'SLOW'});
    } else {
      this.pace = 1500;
      this.setState({speed: 'FAST'});
    }
    console.log("pace ", this.pace);
    this.setState({level: 'hidden', result: 'visible'});
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
    if (this.state.result === "visible") {
      
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
    if (this.state.speed !== undefined) {
    this.setState({result: 'visible', level: 'hidden', game: 'on'});
    this.next();
    } else {
      this.text = "Select speed first!";
      this.setState({ showPopUp: true });
    }
  } 

  stopHandler = () => {
    if (this.state.result === "visible" && this.state.game === 'on') {
      console.log("stop");
      console.log("counter" , this.state.counter);
      clearTimeout(this.timer);
      this.text = "Game over! \n You've caught " + this.state.score + ' mice';
      this.setState({ showPopUp: true, score: 0, counter: 0, result: 'hidden', current:0});
    }
  }

  PopUpWindowHandler = () => {
    console.log("popup");
    console.log("counter" , this.state.counter);
    window.location.reload();
  }
    
  render () {
    return (
      <div>
        {this.state.showPopUp && <PopUpWindow click={this.PopUpWindowHandler} text= {this.text} score={this.state.score}/>}
        <h1>Cat & Mouse</h1>
        <div className='levelSection' style={{visibility: this.state.level}}><p>Select speed: </p>
          <LevelSection pace='Slow' click={()=>this.levelHandler('slow')}/>
          <LevelSection pace='Fast' click={()=>this.levelHandler('fast')}/> 
        </div>
        <div className='score' style={{visibility: this.state.result}}>Speed: {this.state.speed} -> Score : {this.state.score}</div>
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
