import React, { Component } from 'react';
import './CheckoutModal.css';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CheckoutModal extends Component {
  constructor(props){
    super(props);
    this.minimumOrder = parseFloat(window.GlobalData.MinimumOrder).toFixed(2);
  }
  render() {
    return (
      <div>
        <Modal isOpen={this.props.showModal} toggle={this.props.closeModal} fade={true}>
          <ModalHeader toggle={this.props.closeModal}>
            <div className="modal-title">
              Δεν έχεις ξεπεράσει την ελάχιστη παραγγελία των {this.minimumOrder} <span className="fa fa-euro"></span>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="container-fluid">
              <div className="modal-title-description">
                Μπορείς να επιλέξεις χρέωση 0.50 <span className="fa fa-euro"></span> ή να επιστρέψεις και να προσθέσεις προϊόντα στο καλάθι.
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.props.closeModal} className="btn btn-light">Επιστροφή</Button>
            <Button onClick={this.props.onCheckoutNow} className="btn btn-light">Παραγγελία + 0.50 <span className="fa fa-euro"></span></Button>
          </ModalFooter>
        </Modal>
      </div>);
  }

}

export default CheckoutModal;
