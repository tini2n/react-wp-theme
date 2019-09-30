import React, { Component } from 'react';

class CheckboxItem extends Component {

    constructor(props) {
        super(props);

        const { item } = this.props;

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            checked: this.props.checked,
            name: item.name ? item.name : item.slug
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.checked !== prevProps.checked)
            this.setState({ checked: this.props.checked })
    }

    handleChange(e) {
        const { checked } = this.state;
        const { handler } = this.props;

        this.setState({ checked: !checked });

        if (handler)
            handler(e);
    }

    render() {
        const { item, disabled } = this.props;
        const { checked, name } = this.state;

        return (
            <div className="checkbox-item">
                <label>
                    {item.title}
                    <input type="checkbox"
                           disabled={disabled}
                           checked={!!checked}
                           name={name}
                           onChange={this.handleChange} />
                    <span></span>
                </label>
            </div>
        )
    }
}

export default CheckboxItem