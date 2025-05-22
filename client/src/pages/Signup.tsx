import React from "react";

const Signup = () => {
  return (
    <>
      <div id="loginOrSignUp">
        <h1>Welcome to MindSpace</h1>
        <h2>
          Please <a href="/login">Login</a> or <a href="/signUp">Sign Up</a>
        </h2>

        <div>
          <div>
            <h1>Login</h1>
          </div>
          <div>
            <h1>Sign Up</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
