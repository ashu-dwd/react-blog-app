import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePostSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  username: Yup.string().min(5).max(15).required("Username is required"),
});

function CreatePost() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigate();

  const handleSubmit = (data) => {
    setIsSubmitting(true);
    axios
      .post("http://localhost:3000/posts", data)
      .then((Response) => {
        setListOfPosts(Response.data);
        navigation("/");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="container">
      <h1 className="heading">Create Post</h1>
      <Formik
        initialValues={{ title: "", content: "", username: "" }}
        onSubmit={handleSubmit}
        validationSchema={CreatePostSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Title:</label>
              <Field type="text" name="title" />
              <ErrorMessage name="title" component="span" />
            </div>
            <div>
              <label>Content:</label>
              <Field as="textarea" name="content" rows="8" />
              <ErrorMessage name="content" component="span" />
            </div>
            <div>
              <label>Username:</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="span" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreatePost;
