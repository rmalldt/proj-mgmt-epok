import { Authenticator, AuthenticatorProps } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { AuthUser } from "aws-amplify/auth";
import React from "react";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
      userPoolClientId:
        process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
    },
  },
});

const formFields = {
  signUp: {
    username: {
      order: 1,
      placeholder: "Choose a username",
      label: "Username",
      inputprops: { required: true },
    },
    email: {
      order: 2,
      placeholder: "Enter your email address",
      label: "Email",
      inputprops: { type: "email", required: true },
    },
    password: {
      order: 3,
      placeholder: "Enter your password",
      label: "Password",
      inputprops: { type: "password", required: true },
    },
    confirm_password: {
      order: 4,
      placeholder: "Confirm your password",
      label: "Confirm Password",
      inputprops: { type: "password", required: true },
    },
  },
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Authenticator
        formFields={formFields}
        className="absolute inset-0 flex items-center justify-center bg-slate-700"
      >
        {({ user }: { user?: AuthUser }) =>
          user ? (
            <div>{children}</div>
          ) : (
            <div>
              <h1>Please sign:</h1>
            </div>
          )
        }
      </Authenticator>
    </div>
  );
};

export default AuthProvider;
