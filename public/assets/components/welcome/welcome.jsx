var LoginBox = React.createClass({
  render: function(){
    return (
      <div className="login-box">
        <div className="username">
          <input type="text"/>
        </div>
      </div>
    )
  }
});

var WelcomeBox = React.createClass({
  render: function() {
    return (
      <div className="welcome-box">
        <LoginBox></LoginBox>
      </div>
    );
  }
});
