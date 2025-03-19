// src/LoginPage.tsx

import React, { useState } from "react";
import "./CSS/LoginPage.css"; // Make sure to create this CSS file
import AuthorizeButton from "./AuthorizeButton";

{
  /*
      The Home Page of our app.
      Contains a authorisation button which uses to link with Spotify account.
      See AuthorizeButton.tsx
    */
}

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <h1 className="title">Album Brackets Game</h1>
      <form className="login-form">
        <AuthorizeButton />
      </form>
    </div>
  );
};

export default LoginPage;
