import React from 'react';
import ModalComponent from './ModalComponent';
import { Button } from 'semantic-ui-react';

const DeleteModalComponent = ({ open, title, icon, content, onAccept, onCancel, onClose }) => {
    return (
        <ModalComponent  open={open} onClose={onClose} title={title} icon={icon} onCancel={onCancel}>
            <div>
                {  content }
                <Button size="small" type='button' floated='right' onClick={onAccept}>Accept</Button>
                <Button size="small" type='button' floated='right' onClick={onCancel}>Cancel</Button>  
            </div>
        </ModalComponent>
    );
}

export default DeleteModalComponent;