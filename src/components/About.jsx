import React, {Component} from 'react';

import './About.css';

import './Pure.css';

class About extends Component {
  render() {
    return (
    <div>
      <header className='gradient'>
      <img id='logo' src='/images/about/mourgos-logo-white.png' alt="logo"/>
      <h1>
        <span id='title'>Mourgos</span>
        <span id='subtitle'>Το delivery όπως θα έπρεπε να είναι.</span>
      </h1>
      </header>

      <div id='layout main'>
        <div className="pure-g">
          <div className="pure-u-lg-4-24"></div>
          <div className="pure-u-1 pure-u-lg-16-24">
            <div className="l-box center">
              <h2>Έχεις εστιατόριο;</h2>
              <p>To Mourgos είναι μια <strong>ενοποιημένη πλατφόρμα παράδοσης φαγητού</strong>, που σας γλιτώνει χρήματα και κάνει τη ζωή σας πιο εύκολη.
                <br/>
                <br/>
                Το Mourgos, εκτός απο το να ψηφιοποιεί τον κατάλογο σας, να τον προβάλει ηλεκτρονικά, και να κάνει όλα όσα κάνουν τα υπόλοιπα delivery sites, <strong>διαθέτει τον δικό του στόλο διανομέων</strong> και αναλαμβάνει να φτάσει η παραγγελία από το κατάστημά σας στην πόρτα του πελάτη.
              </p>
            </div>
          </div>
          <div className="pure-u-lg-4-24"></div>
        </div>

        <div className="pure-g">
          <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <div className='l-box'>
              <div className='center'>
                <img className='feature-icon' alt='concentrate on what matters' src='/images/about/food.png' />
                <h3>Κάντε αυτό που ξέρετε να κάνετε καλύτερα</h3>
              </div>
              <p className="feature"><strong>Καλό φαγητό</strong>, και αφήστε τα υπόλοιπα σε εμάς. Διαθέτουμε τον δικό μας στόλο από διανομείς και τον διαχειριζόματε με την μέγιστη δυνατή αποδοτικότητα, ώστε να μη χρειάζεται να το κάνετε εσείς. Έτσι, όταν λαμβάνετε μία παραγγελία, δεν έχετε παρά να την ετοιμάσετε και να την παραδώσετε στον Mourgo που θα τη μεταφέρει από το κατάστημα σας στον πελάτη. <strong>Τόσο απλά</strong>.
              </p>
            </div>
          </div>
          <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <div className='l-box'>
              <div className='center'>
                <img className='feature-icon' alt='save money' src='/images/about/profit.png'/>
                <h3>Γλιτώστε χρήματα, κερδίστε πελάτες</h3>
              </div>
              <p className="feature">Το delivery με το Mourgos είναι <strong>φτηνότερο</strong> από το να δέχεστε παραγγελίες απο άλλα sites και να αναλαμβάνετε την διανομή μόνοι σας. Καθώς εξυπηρετούμε πολλά καταστήματα ταυτόχρονα, χρειαζόμαστε λιγότερο προσωπικό συνολικά. <strong>Όλοι βγαίνουν κερδισμένοι</strong>.</p>
            </div>
          </div>
          <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <div className='l-box'>
              <div className='center'>
                <img className='feature-icon' alt='no risk' src='/images/about/no-risk.png'/>
                <h3>Μηδενικό αρχικό κόστος και ρίσκο</h3>
              </div>
              <p className="feature">Ξεκινήστε να κάνετε delivery από την μία μέρα στην άλλη, χωρίς δεσμεύσεις. Χρεώνεστε μόνο ένα μικρό ποσοστό στον επιπρόσθετο τζίρο που σας φέρνουν οι παραγγελίες από το Mourgos. To Mourgos θα φέρει <strong>καθαρή αύξηση στο εισόδημά σας</strong>.</p>
            </div>
          </div>
          <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <div className='l-box'>
              <div className='center'>
                <img className='feature-icon' alt='fair employment' src='/images/about/fair.png'/>
                <h3>Δίκαιη εργοδοσία</h3>
              </div>
              <p className="feature">Δεν στηρίζουμε ένα σαθρό σύστημα που βασίζεται σε ανασφάλιστους διανομείς που δουλεύουν για παράνομα χαμηλές αμοιβές. Όλο μας το προσωπικό <strong>αμοίβεται δίκαια</strong> και είναι ασφαλισμένο κανονικά.</p>
            </div>
          </div>

        </div>
        <div id='contact' className='pure-g'>
          <div className='pure-u-1'>
            <div className='l-box center'>
              <h2>Επικοινώνησε τώρα μαζί μας!</h2>
              <p>Αναζητούμε <strong>συνεργαζόμενα καταστήματα</strong> στο κέντρο της <strong>Θεσσαλονίκης</strong>.
                <br/>
                Τηλεφωνήστε μας (10:00 - 17:00 καθημερινά) ή στείλτε μας e-mail, και θα επικοινωνήσουμε μαζί σας μέσα σε μία εργάσιμη ημέρα.</p>
            </div>
          </div>
          <div className='pure-u-1 pure-u-md-1-2 pure-u-lg-1-2'>
            <div className='l-box center'>
              <a className='call-to-action' href='mailto:hello@mourgos.gr'>
                <img className='feature-icon' alt='send us an email' src='/images/about/mail.png'/>
                <h3>hello@mourgos.gr</h3>
              </a>
            </div>
          </div>
          <div className='pure-u-1 pure-u-md-1-2 pure-u-lg-1-2'>
            <div className='l-box center'>
              <a className='call-to-action' href='tel:+306942081718'>
                <img className='feature-icon' alt='call us' src='/images/about/phone.png'/>
                <h3>+30 694 2081718</h3>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
export default About;

