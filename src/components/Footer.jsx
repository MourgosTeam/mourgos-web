import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return <footer className="footer text-center">
            <div className="container">
              <div className="row"> 
                <div className="col-12 d-none col-md-6 d-md-block text-left who-we-are">
                  <div className="title">Τι είναι ο Mούργος;</div>
                  <div>
                  Ο Μούργος είναι η πρώτη ολοκληρωμένη πλατφόρμα delivery στην Ελλάδα. 
                  Παρέχοντας το δικό μας στόλο διανομέων, εξασφαλίζουμε ότι η παραγγελία σου θα φτάσει άμεσα, απαλλάσσοντας παράλληλα τον καταστηματάρχη από τη διαχείριση του delivery.
                  <br />
                  <br />
                  Ο Μούργος είναι... το delivery όπως θα έπρεπε να είναι.
                  </div>
                </div>
                <div className="social col-12 col-md-4 offset-md-2 text-center text-md-right">
                  <div style={{fontWeight:100}}>
                    Ακολούθησε το Μούργο!
                  </div>
                  <div className="">
                  <a href="https://www.facebook.com/mourgos.gr/">
                    <span className="fa fa-facebook-square">
                    </span>
                  </a>
                  </div>
                  <div style={{fontWeight:700, textDecoration: 'none', color: '#CECECE'}}>
                    <a href="/about">Έχεις κατάστημα;</a>
                  </div>
                  <div className="copyright">
                    Copyright © 2017 Mourgos.gr
                  </div>
                </div>
              </div>
            </div>
          </footer>;
  }
}

export default Footer;
