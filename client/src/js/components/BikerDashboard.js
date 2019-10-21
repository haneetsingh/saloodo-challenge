import React from 'react';
import { Link } from 'react-router-dom';

const BikerDashboard = ({ orders }) => {
  return (
    <React.Fragment>
      <h1 className="page-title">Your orders list</h1>
      <div className="biker-dashboard cards">
        { !orders.length ?
          <div className="no-result">Currently no order is assigned to you</div>
          :
          orders.map(order => (
            <div className="card-item" key={order.order_id}>
              <div className="card-title">
                <h3 className={order.status}>{(order.status === 'picked_up') ? 'PICKED UP' : order.status.toUpperCase()}</h3>
              </div>
              <div className="card-body">
                <p>Order ID: {order.order_id}</p>
                <p>Origin: {order.origin}</p>
                <p>Destination: {order.destination}</p>
                { order.status !== 'delivered' && <Link to={`/order/${order.order_id}/edit`}>Update</Link> }
              </div>
            </div>
          ))
        }
      </div>
    </React.Fragment>
  );
}

export default BikerDashboard
