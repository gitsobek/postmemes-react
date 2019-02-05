import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderNavbarContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href={'/auth/google/start'}>Login with Google</a>
                    </li>
                );
            default:
                return [
                    <li key="3" style={{ margin: '0 10px' }}>
                        <Link to="/posts">My Posts</Link>
                    </li>,
                    <li key="2">
                        <a href={'/auth/logout'}>Logout</a>
                    </li>
                ];
        }
    }

    render() {
        return (
            <nav className="indigo">
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth ? '/posts' : '/'}
                        className="left brand-logo"
                        style={{ marginLeft: "10px" }}
                    >
                    Ya a memer.
                    </Link>
                    <ul className="right">{this.renderNavbarContent()}</ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);