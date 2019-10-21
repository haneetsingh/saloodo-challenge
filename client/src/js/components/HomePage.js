import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ordersActions, userActions } from '../actions';
import AdminDashboard from './AdminDashboard';
import BikerDashboard from './BikerDashboard';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: '',
      name: ''
    }
  }

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      role: user.role,
      name: user.full_name
    });

    if (user.role === 'admin') {
      this.props.getBikers();
      this.props.fetchOrders();
    }
    else {
      this.props.getUserOrders(user['id']);
    }
  }

  render() {
    const { users, orders, bikers } = this.props;
    const { role, name } = this.state;
    return (
      <div className="home-page">
        <header className="header">
          <div className="welcome-message">{`Welcome, ${name}`}</div>
          <Link to="/login" className="logout-link">Logout</Link>
        </header>
        <div className="main-content">
          { role === 'admin' ?
            <React.Fragment>
              { orders.fetchedOrders && bikers.fetchedBikers && <AdminDashboard orders={orders.data} bikers={bikers.bikersData} error={orders.error} /> }
            </React.Fragment>
            :
            <React.Fragment>
              { users.fetchedUserOrders && <BikerDashboard orders={users.userOrders} /> }
            </React.Fragment>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, orders, bikers } = state;
  return { users, orders, bikers };
}

const actionCreators = {
  getBikers: userActions.getBikers,
  getUserOrders: userActions.getUserOrders,
  fetchOrders: ordersActions.fetchOrdersList
};

export default connect(mapStateToProps, actionCreators)(HomePage)