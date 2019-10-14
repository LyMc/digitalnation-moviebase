import React from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

class Modal extends React.Component {
	renderModal() {
		const {title, action, children, onClose, onAction} = this.props;
		return (
			<div className="modal-shadow">
				<article className="modal-container">
					<h2 className="modal-title">{title}</h2>
					<section className="modal-body">{children}</section>
					<div className="modal-actions">
						{action && <button className="modal-action" onClick={onAction}>{action}</button>}
						<button className="modal-close" onClick={onClose}>Close</button>
					</div>
				</article>
			</div>
		);
	}
	render() {
		if (!this.props.open) {
			return null;
		}
		return createPortal(this.renderModal(), document.querySelector('#modal'));
	}
}

export default Modal;
