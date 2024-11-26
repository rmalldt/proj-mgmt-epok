import Modal from "@/components/Modal";
import useOutsideClick from "@/hooks/useOutsideClick";
import { Authenticator, useTheme, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

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
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;
  return createPortal(
    <Authenticator
      formFields={formFields}
      components={{
        Header() {
          return (
            <div className="flex justify-end rounded-se-md rounded-ss-md bg-black p-3">
              <button
                className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-600 text-white hover:bg-blue-600"
                onClick={() => onClose()}
              >
                <X size={18} />
              </button>
            </div>
          );
        },
      }}
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 p-4 backdrop-blur-sm"
    />,
    document.body,
  );
};

export default AuthProvider;
