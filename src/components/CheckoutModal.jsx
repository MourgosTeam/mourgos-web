import React, { Component } from 'react';
import './CheckoutModal.css';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CheckoutModal extends Component {
  render() {
    return (
      <div>
        <Modal isOpen={this.props.showModal} toggle={this.props.closeModal} fade={true}>
          <ModalHeader toggle={this.props.closeModal}>
            <div className="modal-title">
              Δεν έχετε ξεπεράσει την ελάχιστη παραγγελία 
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="container-fluid">
              <div className="modal-title-description">
                Μπορείτε να επιλέξετε χρέωση 0.50 <span className="fa fa-euro"></span> ή να επιστρέψετε και να προσθέσετε προϊόντα στο καλάθι.
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.props.closeModal} className="btn btn-light">Επιστροφή</Button>
            <Button onClick={this.props.checkoutNow} className="btn btn-light">Παραγγελία + 0.50 <span className="fa fa-euro"></span></Button>
          </ModalFooter>
        </Modal>
      </div>);
  }

}

export default CheckoutModal;
