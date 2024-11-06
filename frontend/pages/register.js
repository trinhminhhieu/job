import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import MetaData from "../components/Layout/MetaData";
import Loader from "../components/Layout/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../actions/userAction";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const { name, username, email, password } = user;

  const router = useRouter();
  // const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
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
    const formData = new FormData();
    formData.set("name", name);
    formData.set("username", username);
    formData.set("email", email);
    formData.set("password", password);

    dispatch(register(formData));
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <MetaData title="Register" />
      <section className="pt-100 login-register">
        <div className="container">
          <div className="row login-register-cover">
            <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
              <div className="text-center">
                <p className="font-sm text-brand-2">Register </p>
                <h2 className="mt-10 mb-5 text-brand-1">
                  Start for free Today
                </h2>
                <p className="font-sm text-muted mb-30">
                  Access to all features. No credit card required.
                </p>
                <button className="btn social-login hover-up mb-20">
                  <img
                    src="assets/imgs/template/icons/icon-google.svg"
                    alt="jobbox"
                  />
                  <strong>Sign up with Google</strong>
                </button>
                <div className="divider-text-center">
                  <span>Or continue with</span>
                </div>
              </div>
              <form
                className="login-register text-start mt-20"
                action="#"
                onSubmit={submitHandler}
                enctype="multipart/form-data"
              >
                <div className="form-group">
                  <label className="form-label" htmlFor="input-1">
                    Full Name *
                  </label>
                  <input
                    className="form-control"
                    id="input-1"
                    type="text"
                    required
                    placeholder="Steven Job"
                    name="name"
                    value={name}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="input-2">
                    Email *
                  </label>
                  <input
                    className="form-control"
                    id="input-2"
                    type="email"
                    required
                    placeholder="stevenjob@gmail.com"
                    name="email"
                    value={email}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="input-3">
                    Username *
                  </label>
                  <input
                    className="form-control"
                    id="input-3"
                    type="text"
                    required
                    placeholder="stevenjob"
                    name="username"
                    value={username}
                    onChange={onChange}
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
                    value={password}
                    onChange={onChange}
                    placeholder="************"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="input-5">
                    Re-Password *
                  </label>
                  <input
                    className="form-control"
                    id="input-5"
                    type="password"
                    required
                    name="re-password"
                    placeholder="************"
                  />
                </div>
                <div className="login_footer form-group d-flex justify-content-between">
                  <label className="cb-container">
                    <input type="checkbox" />
                    <span className="text-small">
                      Agree our terms and policy
                    </span>
                    <span className="checkmark" />
                  </label>
                  <Link legacyBehavior href="/page-contact">
                    <a className="text-muted">Lean more</a>
                  </Link>
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-brand-1 hover-up w-100"
                    type="submit"
                    name="login"
                    disabled={loading ? true : false}
                  >
                    Submit &amp; Register
                  </button>
                </div>
                <div className="text-muted text-center">
                  Already have an account?
                  <Link legacyBehavior href="/login">
                    <a>Sign in</a>
                  </Link>
                </div>
              </form>
            </div>
            <div className="img-1 d-none d-lg-block">
              <img
                className="shape-1"
                src="assets/imgs/page/login-register/img-1.svg"
                alt="JobBox"
              />
            </div>
            <div className="img-2">
              <img
                src="assets/imgs/page/login-register/img-2.svg"
                alt="JobBox"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
