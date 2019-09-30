import React, { Component } from 'react';

class Toggler extends Component {
    render() {
        const { handler } = this.props;

        return (
            <label className="toggler">
                <input type="checkbox" onChange={handler}/>
                <span></span>
            </label>
        )
    }
}

export default Toggler;