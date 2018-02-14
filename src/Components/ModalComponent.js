import React from 'react';
import { Header, Modal } from 'semantic-ui-react';

const ModalComponent = ({ open, onClose, icon, title, children }) => {
    return (
        <Modal open={open} closeIcon onClose={onClose}>
            <Header icon={icon ? icon : 'idea'} content={title ? title : ""} />
            <Modal.Content>
                { children }
            </Modal.Content>
        </Modal>
    );
}
 
export default ModalComponent;