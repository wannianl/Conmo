import React, { Component } from 'react';
import './Topbar.css';

export default class Topbar extends Component {
    render() {
        return (
            <div className="Topbar">
                <div className="topbarBtn clickable" onClick={() => this.props.handlePageChange("home")}>Home</div>
            </div>
        );
    }
}