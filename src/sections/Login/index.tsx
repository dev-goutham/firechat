import React from "react";
import { useAuth } from "../../store/Auth";
import { Error } from "@firebase/auth-types";

const LoginError: React.FC<{ error: Error }> = ({ error }) => {
  return (
    <div>
      <p>Oh no! an error occured</p>
      <p
        style={{
          color: "red",
          fontWeight: "bold",
        }}
      >
        {error.message}
      </p>
      <p>Please try again later</p>
    </div>
  );
};

const Login: React.FC = () => {
  const { signinWithGoogle, error } = useAuth();

  return (
    <div className="Login">
      <p>Login</p>
      <button onClick={signinWithGoogle}>Login with google</button>
      {error && <LoginError error={error} />}
    </div>
  );
};

export default Login;
