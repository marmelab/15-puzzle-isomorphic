import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { puzzleSize } from '../../config';
import FloatingButton from '../ui/FloatingButton';
import Item from '../ui/Item';
import List from '../ui/List';

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
        maxWidth: '900px',
        overflowY: 'auto',
        padding: 0,
        position: 'fixed',
        right: 0,
        top: '10%',
        width: '90%',
    },
};

export default class ChangeSizeModal extends Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        size: PropTypes.number.isRequired,
    };

    state = {
        isOpen: false,
    };

    openModal = () => {
        this.setState({ isOpen: true });
    };

    closeModal = () => {
        this.setState({ isOpen: false });
    };

    handleOnClickCancel = () => {
        this.closeModal();
        this.props.onClose();
    };

    handleOnClickItem = value => {
        this.closeModal();
        this.props.onClose(parseInt(value, 10));
    };

    componentWillMount() {
        const items = [];
        for (let i = puzzleSize.min; i <= puzzleSize.max; i++) {
            items.push({
                label: `${i}x${i}`,
                value: i,
            });
        }
        this.setState({ items });
    }

    render() {
        const { items, isOpen } = this.state;
        const { size } = this.props;

        return (
            <span>
                <FloatingButton
                    icon="grid_on"
                    color="blue"
                    onClick={this.openModal}
                />
                <Modal ariaHideApp={false} isOpen={isOpen} style={style}>
                    <div className="modal-content">
                        <div>
                            <h4 id="heading">Choose the grid size</h4>
                            <div className="input-field col s12">
                                <List
                                    items={items}
                                    onClickItem={this.handleOnClickItem}
                                    selectedItem={{ value: size }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
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
