import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import FloatingButton from '../ui/FloatingButton';

const style = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#00000066',
        zIndex: '1000',
    },
    content: {
        backgroundColor: '#fafafa',
        border: 0,
        borderRadius: 2,
        bottom: 'auto',
        left: 0,
        margin: 'auto',
        maxHeight: '70%',
        overflowY: 'auto',
        padding: 0,
        position: 'fixed',
        right: 0,
        top: '10%',
        width: '55%',
    },
};

export default class ChangeSizeModal extends Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        initialSize: PropTypes.number,
    };

    state = {
        isOpen: false,
        size: 4,
    };

    openModal = () => {
        this.setState({ isOpen: true });
    };

    handleOnClickAccept = () => {
        this.props.onClose(this.state.size);
        this.setState({ isOpen: false });
    };

    handleOnClickCancel = () => {
        this.props.onClose();
        this.setState({ isOpen: false });
    };

    handleOnChangeSize = event => {
        this.setState({ size: parseInt(event.target.value, 10) });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ size: nextProps.initialSize });
    }

    render() {
        const { isOpen } = this.state;
        return (
            <span>
                <FloatingButton
                    icon="edit"
                    color="blue"
                    onClick={this.openModal}
                />
                <Modal ariaHideApp={false} isOpen={isOpen} style={style}>
                    <div className="modal-content">
                        <div>
                            <h4 id="heading">Edit the content</h4>
                            <p id="full_description">Choose the grid size</p>
                            <div className="input-field col s12">
                                <input
                                    type="number"
                                    name="Size"
                                    autoFocus
                                    min={0}
                                    max={8}
                                    step={1}
                                    value={this.state.size}
                                    onChange={this.handleOnChangeSize}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a
                            onClick={this.handleOnClickAccept}
                            className="modal-action modal-close btn-flat"
                        >
                            Accept
                        </a>
                        <a
                            onClick={this.handleOnClickCancel}
                            className="modal-action modal-close btn-flat"
                        >
                            Cancel
                        </a>
                    </div>
                </Modal>
            </span>
        );
    }
}
