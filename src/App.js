/* eslint-disable default-case */

import React, { useState, useEffect } from 'react';
import fire_b from './fire_b';
import Login from './Login';
import Hero from './Hero';
import "./App.css";

const App = () => {
  //States initiation for various tasks
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [accountStatus, setAccountStatus] = useState(false);

  //Resets the input for email and password
  const handleInputs = () => {
    setEmail('');
    setPassword('');
  }
  //Handles errors while processing email and password inputs
  const handleErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    handleErrors();
    fire_b
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch(err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/incorrect-password":
            setPasswordError(err.message);
            break;            
        }
      });
  }

  const handleSignup = () => {
    handleErrors();
    console.log("Hello");
    fire_b
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch(err.code){
          case "auth/emailID-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;            
        }
      });
  }

  const handleLogout = () => {
    handleErrors();
    fire_b.auth().signOut();
  };

  const authListener = () => {
    fire_b.auth().onAuthStateChanged((user) => {
      if (user) {
        handleInputs();
        setUser(user);
      }else{
        setUser('');
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return(
    <div className='App'>
      {user ? (
        <Hero handleLogout={handleLogout} />
      ) : (
        <Login 
        email={email} 
        setEmail={setEmail} 
        password={password} 
        setPassword={setPassword} 
        handleLogin={handleLogin} 
        handleSignup={handleSignup} 
        accountStatus={accountStatus} 
        setAccountStatus={setAccountStatus} 
        emailError={emailError}  
        passwordError={passwordError} 
        />
        )
      }
    </div>
  );
}

export default App;
