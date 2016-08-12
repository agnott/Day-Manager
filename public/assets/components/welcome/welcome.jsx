var LoginBox = React.createClass({
  getInitialState: function(){
    return STATE.user;
  },
  changeUsername: function(text){
    this.setState({
      username: text
    });
  },
  changeKeycode: function(text){
    this.setState({
      keycode: Number(text)
    });
  },
  toggleFullSignIn: function(bool){
    this.setState({
      fullSignIn: bool
    });
  },
  submit: function(){
    console.log(this.state);
  },
  render: function(){
    return (
      <div className="login-box">
        <div style={{textAlign: 'center', fontSize: '25px'}}>Login</div>
        <InputBox placeholder="Username" onChange={this.changeUsername} style={{width: '180px'}}/>
        <br/>
        <InputBox type="password" placeholder="Keycode" onChange={this.changeKeycode} style={{width: '180px'}}/>
        <br/>
        <InputToggleBox label="Full Sign In" onChange={this.toggleFullSignIn} style={{width: '180px'}}/>
        <br/>
        <InputButtonBox label="Go" style={{width: '180px'}} onChange={this.submit}/>
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
