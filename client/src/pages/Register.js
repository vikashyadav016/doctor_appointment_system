import React from "react";
import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
// import Register from './Login';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());

      console.log(error);
      message.error("Something Went Wrong");
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
          <h3 className="text-center">Register yourself</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" placeholder="Name" required />
          </Form.Item>
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
            <Link to="/login" className="m-2">
              already have account ?login
            </Link>
          </div>
          <div className="center">
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
