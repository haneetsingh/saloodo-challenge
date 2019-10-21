import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../actions';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.logout();

    this.state = {
      username: '',
      password: '',
      submitted: false
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      this.props.login(username, password);
    }
  }

  render() {
    const { error } = this.props;
    const { username, password, submitted } = this.state;

    return (
      <div className="login-page">
        <h2 className="page-title">User Login</h2>
        { error && <div className="alert alert-error">{error}</div>}
        <form id="login-form" onSubmit={this.onSubmit}>
          <div className={`form-item form-item-username ${submitted && !username ? 'has-error' : ''}`}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="form-control"
              type="username"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={this.handleChange}
            />
            { submitted && !username && <div className="help-block">Username is required</div> }
          </div>

          <div className={`form-item form-item-password ${submitted && !password ? 'has-error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="form-control"
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={this.handleChange}
            />
            { submitted && !password && <div className="help-block">Password is required</div> }
          </div>

          <div className="form-item form-actions">
            <button className="btn btn-primary" type="submit">Login</button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { loggingIn, error } = state.authentication;
  return { loggingIn, error };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout
};
export default connect(mapStateToProps, actionCreators)(LoginPage)
// const connectedLoginPage = connect(mapStateToProps, actionCreators)(LoginPage);
// export { connectedLoginPage as LoginPage };