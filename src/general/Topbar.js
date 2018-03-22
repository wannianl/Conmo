import React, { Component } from 'react';
import './Topbar.css';
import strings from '../localization/strings';

export default class Topbar extends Component {
    render() {
        return (
            <div className="Topbar">
                <div className="topbarBtn clickable" onClick={() => this.props.handlePageChange("home")}>{strings.home}</div>
            </div>
        );
    }
}