import React, { Component } from 'react';

class Like extends Component {
    render() {
        let classes = "fa fa-heart";
        let styles = "";
        if (this.props.liked) styles += "red";
        if (!this.props.liked) classes += "-o";
        return (<i className={classes} style={{ "color": styles, "cursor": "pointer" }} aria-hidden="true" onClick={this.props.onClick}></i>);
    }
}

export default Like;