import React, { useEffect } from "react";
import '../index2.css';
import HomePageNavButton from './HomePageNavButton';

import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
const clientId = '569817754455-gefflnacglb4mubcrlp94bqknusirsld.apps.googleusercontent.com';

var wasSuccessful = false;

/**
 * Runs when the OAuth Errors, prints the error to console
 * @function
 * @param {Array} err - String containing the text explaining why the OAuth errored
 */
const onFailure = (err) => {
    console.log('failed:', err);
    wasSuccessful = false;
};

/**
 * Renders the login button and holds all of the OAuth Logic, navigates to "View" screen if login successful
 * @function
 * @return {Component} The Login Button
 */
const LoginPage = () => {
    let navigate = useNavigate();
    const onSuccessOther = async (res) => {
        console.log('success:', res);
        wasSuccessful = true;
        navigate("/View")
        var auth2 = gapi.auth2.getAuthInstance();
        var profile = auth2.currentUser.get().getBasicProfile();
        console.log("NAME-->"+profile.getName());
        console.log("Email-->"+profile.getEmail());
        // var authorizedEmails = fetch("http://localhost:5000/authorized_emails/summary");
        auth2.disconnect();
    };
    useEffect(() => {
        const initClient = () => {
              gapi.client.init({
              clientId: clientId,
              scope: 'email'
            });
         };
         gapi.load('client:auth2', initClient);
         
     });
    return (
      <div class = "HomePageScreen">
            <div class = "homeLogo"></div>
            <GoogleLogin
            clientId={clientId}
            render={renderProps => (
            <button class = "HomePageButton" id = "customer" onClick={renderProps.onClick}>Login</button>
            )}
            buttonText="Manager Settings"
            onSuccess={onSuccessOther}
            onFailure={onFailure}
            cookiePolicy={'none'}
            />
          {/* <div class = "HomePageButton" id = "Login" onClick={() => {navigate("/View")}}><HomePageNavButton Name = "Login" /></div> */}
          <div class = "HomePageButton" id = "Public" onClick={() => {navigate("/CustMainPage")}}><HomePageNavButton Name = "Public View" /></div>
      </div>
      )
  }
  
  export default LoginPage