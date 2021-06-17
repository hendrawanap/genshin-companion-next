import LandingLayout from "@/components/layouts/landing";
import Button from "@/components/material/button";
import Input from "@/components/material/input";
import Link from "next/link";
import { useReducer } from "react";

export default function SignIn(props) {
  const INITIAL_FORM_STATES = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const formReducer = (state, action) => {
    switch (action.type) {
      case "email":
        return { ...state, email: action.payload };
      case "password":
        return { ...state, password: action.payload };
    }
  };
  const [formStates, dispatch] = useReducer(formReducer, INITIAL_FORM_STATES);

  return (
    <LandingLayout>
      <h1 className="text-5xl text-primary font-medium">Sign In</h1>
      <h5 className="text-white text-opacity-60 mt-2">
        Sign in to your account
      </h5>
      <form className="mt-6 flex flex-col gap-y-3">
        <Input
          setValue={(payload) => dispatch({ type: "email", payload: payload })}
          type="email"
          isFull={true}
          placeholder="Email Address"
          icon={
            <span className="material-icons text-lg leading-none text-white text-opacity-30">
              email
            </span>
          }
        />
        <Input
          setValue={(payload) =>
            dispatch({ type: "password", payload: payload })
          }
          type="password"
          isFull={true}
          placeholder="Password"
          icon={
            <span className="material-icons text-lg leading-none text-white text-opacity-30">
              lock
            </span>
          }
        />
      </form>
      <div className="mt-6">
        <Button variant="primary" type="default" isFull={true}>
          Sign In
        </Button>
      </div>
      <div className="flex items-center justify-between py-6">
        <div className="w-5/12 border border-dark-15 border-bottom"></div>
        <div className="text-white text-opacity-30">Or</div>
        <div className="w-5/12 border border-dark-15 border-bottom"></div>
      </div>
      <div>
        <Button variant="google" type="outlined" isFull={true}>
          Sign In with Google
        </Button>
      </div>
      <div className="mt-3">
        <Button variant="primary" type="outlined" isFull={true}>
          Sign In with Facebook
        </Button>
      </div>
      <div className="mt-6 text-center text-white text-opacity-30 text-sm">
        Don't have an account?{" "}
        <Link href="/sign-up">
          <a className="text-white text-opacity-80">Sign up</a>
        </Link>
      </div>
    </LandingLayout>
  );
}
