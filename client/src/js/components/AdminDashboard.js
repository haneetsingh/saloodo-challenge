import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      numberPerPage: 20,
      numberOfPages: 0,
      start: 0,
      end: 0,
      orderList: null,
    }
  }

  nextPage = () => {
    let { currentPage, numberPerPage, start, end } = this.state;
    currentPage += 1;
    start = (currentPage - 1) * numberPerPage;
    end = start + numberPerPage;
    this.setState({
      currentPage: currentPage,
      orderList: this.props.orders.slice(start, end)
    });
  }

  previousPage = () => {
    let { currentPage, numberPerPage, start, end } = this.state;
    currentPage -= 1;
    start = (currentPage - 1) * numberPerPage;
    end = start + numberPerPage;
    this.setState({
      currentPage: currentPage,
      orderList: this.props.orders.slice(start, end)
    });
  }

  firstPage = () => {
    let { currentPage, numberPerPage, start, end } = this.state;
    currentPage = 1;
    start = (currentPage - 1) * numberPerPage;
    end = start + numberPerPage;

    this.setState({
      currentPage: currentPage,
      orderList: this.props.orders.slice(start, end)
    });
  }

  lastPage = () => {
    let { currentPage, numberOfPages, numberPerPage, start, end } = this.state;
    currentPage = numberOfPages;
    start = (currentPage - 1) * numberPerPage;
    end = start + numberPerPage;

    this.setState({
      currentPage: currentPage,
      orderList: this.props.orders.slice(start, end)
    });
  }

  componentDidMount = () => {
    const { orders } = this.props;
    const { currentPage, numberPerPage } = this.state;
    let start = (currentPage - 1) * numberPerPage;
    let end = start + numberPerPage;
    this.setState({
      numberOfPages: Math.ceil(orders.length / this.state.numberPerPage),
      start: start,
      end: end,
      orderList: orders.slice(start, end)
    });
  }

  render() {
    const { error, bikers } = this.props;
    const { orderList, currentPage, numberOfPages } = this.state;

    return (
      <React.Fragment>
        { error && <div className="alert alert-error">Something went wrong, please try again</div> }
        <h1 className="page-title">Order List</h1>
        <div className="admin-dashboard">
          <table className="order-list">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Origin</th>
                <th scope="col">Destination</th>
                <th scope="col">Assignee</th>
                <th scope="col">Status</th>
                <th scope="col">Picked Up</th>
                <th scope="col">Delivered</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              { orderList && orderList.map(order => (
                  <tr className="order-item" key={order.order_id}>
                    <td data-label="Id">{order.order_id}</td>
                    <td data-label="Origin">{order.origin}</td>
                    <td data-label="Destination">{order.destination}</td>
                    <td data-label="Assignee">
                      { bikers.filter(biker => biker.id === order.assignee_id).map(item => item.full_name)}
                    </td>
                    <td data-label="Status">{(order.status === 'picked_up') ? 'PICKED UP' : order.status.toUpperCase()}</td>
                    <td data-label="Picked Up">{order.picked_up_time && new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(order.picked_up_time)}</td>
                    <td data-label="Delivered">{order.delivered_time && new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(order.delivered_time)}</td>
                    <td data-label="Edit"><Link to={`/order/${order.order_id}/edit`}>Edit</Link></td>
                  </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              className="btn btn-primary pager-item"
              onClick={this.firstPage}
            >
              First
            </button>
            <button
              disabled={currentPage === numberOfPages}
              className="btn btn-primary pager-item"
              onClick={this.nextPage}
            >
              Next
            </button>
            <button
              disabled={currentPage === 1}
              className="btn btn-primary pager-item"
              onClick={this.previousPage}
            >
              Previous
            </button>
            <button
              disabled={currentPage === numberOfPages}
              className="btn btn-primary pager-item"
              onClick={this.lastPage}
            >
              Last
            </button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default AdminDashboard
