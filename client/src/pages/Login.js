import React from "react";
import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import Register from './Register';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());

      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <>
      <div className="form-container ">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Login account</h3>
          <Form.Item label="Email" name="email">
            <Input type="email" placeholder="Email@gmai.com" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input
              type="password"
              placeholder="case sensitive"
              autoComplete="on"
              required
            />
          </Form.Item>
          <div className="center">
            <Link to="/register" className="m-2">
              Create new account
            </Link>
          </div>
          <div className="center">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
