import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: "", password: "", cPassword: "" }}
      onSubmit={(values) => {
        console.log(values);

        axios
          .post("http://localhost:3000/user/signup", values)
          .then(() => navigate("/login"))
          .catch((error) => {
            console.error(error);
          });
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        cPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm password is required"),
      })}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label>Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="span" />
          </div>
          <div>
            <label>Password:</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="span" />
          </div>
          <div>
            <label>Confirm Password:</label>
            <Field type="password" name="cPassword" />
            <ErrorMessage name="cPassword" component="span" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Sign Up
          </button>
          <br />
          <p>
            Already a member? <Link to="/login">Login Here</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpPage;
