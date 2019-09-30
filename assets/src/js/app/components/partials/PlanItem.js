import React, { Component } from 'react';

class SubscriptionItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            title,
            price,
            label,
            checked,
            value,
            handleSubscriptionChange
        } = this.props;

        return (
            <div className={`subscription-item ${checked ? 'active' : ''}`} onClick={handleSubscriptionChange}>
                <div className="text-container">
                    <p>{title}</p>
                    <span className="price">Kr <strong>{price}</strong> / mnd</span>
                    <i>{label}</i>
                </div>
                <div className="radio">
                    <input type="radio"
                           value={value}
                           checked={checked}
                           readOnly
                           name="subscriptions" />
                    <span></span>
                </div>
            </div>
        )
    }
}

export default SubscriptionItem