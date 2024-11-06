import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import MetaData from "../components/Layout/MetaData";
import Loader from "../components/Layout/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../actions/userAction";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }

    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }
  }, [
    isAuthenticated,
    error,
    {
      /*alert,*/
    },
    dispatch,
    router,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Login" />

          <section className="pt-100 login-register">
            <div className="container">
              <div className="row login-register-cover">
                <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
                  <div className="text-center">
                    <p className="font-sm text-brand-2">Welcome back! </p>
                    <h2 className="mt-10 mb-5 text-brand-1">Member Login</h2>
                    <p className="font-sm text-muted mb-30">
                      Access to all features. No credit card required.
                    </p>
                    <button className="btn social-login hover-up mb-20">
                      <img
                        src="assets/imgs/template/icons/icon-google.svg"
                        alt="jobbox"
                      />
                      <strong>Sign in with Google</strong>
                    </button>
                    <div className="divider-text-center">
                      <span>Or continue with</span>
                    </div>
                  </div>
                  <form
                    className="login-register text-start mt-20"
                    action="#"
                    onSubmit={submitHandler}
                  >
                    <div className="form-group">
                      <label className="form-label" htmlFor="input-1">
                        Username or Email address *
                      </label>
                      <input
                        className="form-control"
                        id="input-1"
                        type="text"
                        required
                        name="fullname"
                        placeholder="Steven Job"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="input-4">
                        Password *
                      </label>
                      <input
                        className="form-control"
                        id="input-4"
                        type="password"
                        required
                        name="password"
                        placeholder="************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="login_footer form-group d-flex justify-content-between">
                      <label className="cb-container">
                        <input type="checkbox" />
                        <span className="text-small">Remenber me</span>
                        <span className="checkmark" />
                      </label>
                      <Link legacyBehavior href="/page-reset-password">
                        <a className="text-muted">Forgot Password</a>
                      </Link>
                    </div>
                    <div className="form-group">
                      <button
                        className="btn btn-brand-1 hover-up w-100"
                        type="submit"
                        name="login"
                      >
                        Login
                      </button>
                    </div>
                    <div className="text-muted text-center">
                      Don't have an Account?
                      <Link legacyBehavior href="/register">
                        <a>Sign up</a>
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="img-1 d-none d-lg-block">
                  <img
                    className="shape-1"
                    src="assets/imgs/page/login-register/img-4.svg"
                    alt="JobBox"
                  />
                </div>
                <div className="img-2">
                  <img
                    src="assets/imgs/page/login-register/img-3.svg"
                    alt="JobBox"
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
};

export default Login;
