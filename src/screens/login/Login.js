import React, { Component } from 'react';
import './Login.css';
import Header from '../../common/header/Header';
class Login extends Component {
    componentDidMount() {
        let data = null
        let url = `http://localhost:8080/owner-info`
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
             console.log(this.responseText)
            }
          }
          xhr.open("GET", url);
          xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
          xhr.setRequestHeader('Cache-control', 'no-cache')
          xhr.send(data)
      }
    render() {
        return (
            <div>
                <Header />
                <h1>Login page</h1>
            </div>
        )
    }
}

export default Login;
