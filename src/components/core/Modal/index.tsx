import React from 'react';
import { Modal as AntModal, ModalProps as AntMdoalProps } from 'antd';


// interface ModalProps extends 

const Modal: React.FC<AntMdoalProps> = (props) => {


    return (
        <>
            <AntModal title="Basic Modal" {...props}>
                {props?.children}
            </AntModal>
        </>
    );
};

export default Modal;