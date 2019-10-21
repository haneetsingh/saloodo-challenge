import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ordersActions, userActions } from '../actions';

class OrderEditPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: '',
      status: null,
      assignee: null,
      submitted: false
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { role, status, assignee } = this.state;
    this.setState({ submitted: true });
    if (role === 'admin') {
      if (assignee && assignee !== 'default') {
        this.props.updateOrderDetail(id, assignee);
      }
    }
    else {
      if (status && status !== 'default') {
        this.props.updateOrderDetail(id, null, status);
      }
    }
  }

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user['role'] === 'biker') {
      this.setState({
        role: user['role'],
        assignee: user['id']
      });
    }
    else {
      this.setState({ role: user['role'] });
    }
    const { id } = this.props.match.params;
    this.props.getBikers();
    this.props.fetchOrderDetail(id);
  }

  render() {
    const { role, status, assignee, submitted } = this.state;
    const { bikers, orderDetail, updateOrderDetail } = this.props;
    let error = orderDetail.error || updateOrderDetail.error;
    let defaultAssignee = orderDetail.fetchedOrderDetail && orderDetail.order.assignee_id ? orderDetail.order.assignee_id : 'DEFAULT';
    let defaultStatus = orderDetail.fetchedOrderDetail && orderDetail.order.status ? orderDetail.order.status : 'DEFAULT';

    return (
      <div className="order-edit-page">
        <h1 className="page-title">Order Details</h1>
        { error && <div className="alert alert-error">{error}</div> }
        { orderDetail.fetchedOrderDetail &&
          <React.Fragment>
            <form id="order-edit-form" onSubmit={this.handleSubmit}>
              <div className="form-item">
                <label htmlFor="origin">Origin</label>
                <input
                  disabled
                  className="form-control"
                  type="text"
                  name="origin"
                  value={orderDetail.order.origin}
                />
              </div>
              <div className="form-item">
                <label htmlFor="destination">Destination</label>
                <input
                  disabled
                  className="form-control"
                  type="text"
                  name="destination"
                  value={orderDetail.order.destination}
                />
              </div>
              { role === 'biker' &&
                <div className={`form-item ${submitted && !status ? 'has-error' : ''}`}>
                  <label htmlFor="status">Status</label>
                  <select
                    className="form-control"
                    name="status"
                    defaultValue={defaultStatus}
                    onChange={this.handleChange}
                  >
                    <option value="default">- Select a value -</option>
                    <option value="picked_up">Picked Up</option>
                    <option value="delivered">Delivered</option>
                  </select>
                  { submitted && !status && <div className="help-block">Status is required</div>}
                </div>
              }
              { role === 'admin' &&
                <div className={`form-item ${submitted && !assignee ? 'has-error' : ''}`}>
                  <label htmlFor="assignee">Assignee</label>
                  <select
                    disabled={orderDetail.order.status === 'delivered'}
                    name="assignee"
                    className="form-control"
                    defaultValue={defaultAssignee}
                    onChange={this.handleChange}
                  >
                    <option value="default">- Select assignee -</option>
                      { bikers.fetchedBikers && bikers.bikersData.map(biker => (
                          <option key={biker.id} value={biker.id}>
                            {biker.full_name}
                          </option>
                        )
                      )}
                  </select>
                  { submitted && !assignee && <div className="help-block">Assignee is required</div>}
                </div>
              }
              <div className="form-actions">
                <button className="btn btn-primary" type="submit">Save</button>
                <Link to="/">Cancel</Link>
              </div>
            </form>
          </React.Fragment>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { bikers, orderDetail, updateOrderDetail } = state;
  return { bikers, orderDetail, updateOrderDetail };
}

const actionCreators = {
  getBikers: userActions.getBikers,
  fetchOrderDetail: ordersActions.fetchOrderDetail,
  updateOrderDetail: ordersActions.updateOrderDetail
}

export default connect(mapStateToProps, actionCreators)(OrderEditPage)
