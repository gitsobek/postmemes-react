import React from 'react';
import { Link } from 'react-router-dom';
import PostList from './posts/PostList';

const Dashboard = () => {
    return (
        <div>
            <PostList />
            <div className="fixed-action-btn">
                <Link to="/posts/new" className="btn-floating btn-large-red">
                    <i className="material-icons">add</i>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;