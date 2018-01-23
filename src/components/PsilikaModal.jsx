import React, {Component} from 'react';
import './CheckoutModal.css';

import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class PsilikaModal extends Component {
  render() {
    return (
      <div>
        <Modal isOpen={this.props.showModal} toggle={this.props.closeModal} fade={true}>
          <ModalHeader>
            <div className="modal-title">
              Τώρα μπορείς να παραγγείλεις και ψιλικά από το Μούργο!
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="container-fluid">
              <div className="modal-title-description">

              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.props.onRedirect} className="btn btn-light">Θέλω ψιλικά</Button>
            <Button onClick={this.props.onSubmit} className="btn btn-light">Παραγγελία</Button>
          </ModalFooter>
        </Modal>
      </div>);
  }

}

export default PsilikaModal;
