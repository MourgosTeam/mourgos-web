import React, {Component} from 'react';

import './Coming.css'

class Coming extends Component {
  
  constructor(props) {
    super(props);

    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var oneHour = 60*60*1000;
    var oneMinute = 60*1000;
    this.aftermath = new Date(2018, 0, 8, 11, 0, 0, 0);

    var diffDays = Math.floor(Math.abs((Date.now() - this.aftermath.getTime())/(oneDay)));
    var diffHours = Math.floor(Math.abs((Date.now() - this.aftermath.getTime())/(oneHour))) - diffDays * 24;
    var diffMinutes = Math.floor(Math.abs((Date.now() - this.aftermath.getTime())/(oneMinute))) - diffDays * 24 * 60 - diffHours * 60;
    var diffSeconds = Math.floor(Math.abs((Date.now() - this.aftermath.getTime())/(1000))) - diffDays * 24 * 60 * 60 - diffHours * 60 * 60 - diffMinutes * 60;
    this.state = {
      days: diffDays,
      hours: diffHours,
      mins: diffMinutes,
      seconds: diffSeconds
    };
  }

  componentDidMount(){
    this.interval = setInterval(this.fixTime , 1000);
  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }

  fixTime = () => {
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var oneHour = 60*60*1000;
    var oneMinute = 60*1000;
    this.aftermath = new Date(2018, 0, 8, 11, 0, 0, 0);
    var diffDays = Math.floor(Math.abs((Date.now() - this.aftermath.getTime())/(oneDay)));
    var diffHours = Math.floor(Math.abs((Date.now() - this.aftermath.getTime())/(oneHour))) - diffDays * 24;
    var diffMinutes = Math.floor(Math.abs((Date.now() - this.aftermath.getTime())/(oneMinute))) - diffDays * 24 * 60 - diffHours * 60;
    var diffSeconds = Math.floor(Math.abs((Date.now() - this.aftermath.getTime())/(1000))) - diffDays * 24 * 60 * 60 - diffHours * 60 * 60 - diffMinutes * 60;
    this.setState({
      days: diffDays,
      hours: diffHours,
      mins: diffMinutes,
      seconds: diffSeconds
    });
  }

  render() {
    return (
      <div className="mourgosiscoming">
        <img src={'/images/mourgos-logo-white.png'} alt={'logo'}/>
        <div className="countdown">
          <span className="cd days">{this.state.days} <br /> Ημέρες</span>
          <span className="cd hours">{this.state.hours} <br /> Ώρες</span>
          <span className="cd minutes">{this.state.mins} <br /> Λεπτά</span>
          <span className="cd minutes">{this.state.seconds} <br />  Δευτερόλεπτα</span>
        </div>
        <span>Ο ΜΟΥΡΓΟΣ ΕΡΧΕΤΑΙ...</span>
      </div>
    );
  }
}
export default Coming;
