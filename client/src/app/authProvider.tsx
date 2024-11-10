import {
  Authenticator,
  AuthenticatorProps,
  useTheme,
  View,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { AuthUser } from "aws-amplify/auth";
import React, { useState } from "react";
import "@aws-amplify/ui-react/styles.css";
import Link from "next/link";
import Image from "next/image";

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

const AuthProvider = ({
  children,
  onHandleIsGuest,
}: {
  children: React.ReactNode;
  onHandleIsGuest: (isGuest: boolean) => void;
}) => {
  return (
    <div>
      <Authenticator
        formFields={formFields}
        components={{
          Header() {
            const { tokens } = useTheme();

            return (
              <View
                textAlign="center"
                padding={tokens.space.large}
                className="ml-40"
              >
                <Image
                  alt="Amplify logo"
                  src="https://evok-s3-images.s3.us-east-1.amazonaws.com/logo.png"
                  width={100}
                  height={50}
                />
              </View>
            );
          },
          Footer() {
            const { tokens } = useTheme();
            return (
              <div>
                <button
                  className="hover:bg-auth-btn-hover bg-dark bottom-[0px] my-5 rounded-[4px] border-none bg-black px-3 py-[8.5px] text-base font-semibold text-white"
                  onClick={() => onHandleIsGuest(true)}
                >
                  Login as Guest
                </button>
              </div>
            );
          },
        }}
        className="absolute left-[50%] top-[5%] translate-x-[-50%]"
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
