import React, {Component} from 'react';

import './Coming.css';

class Problem extends Component {
  render() {
    return (
      <div className="mourgosiscoming container-fluid">
        <img src={'/images/mourgos-logo-white.png'} alt={'logo'}/><br />
        <span>Ο ΜΟΥΡΓΟΣ αντιμετωπίζει τεχνικά προβλήματα.</span><br />
        <span>Σύντομα πάλι κοντά σας</span>
      </div>
    );
  }
}
export default Problem;
