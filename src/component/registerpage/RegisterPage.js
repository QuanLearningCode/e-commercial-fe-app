import "./RegisterPage.css";

import { Form, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState(null);

  const buttonClickHandler = () => {
    const registerInfor = {
      fullName: fullName,
      email: email,
      password: password,
      phone: phone,
    };
    if (
      !registerInfor.fullName ||
      !registerInfor.email ||
      !registerInfor.password ||
      !registerInfor.phone
    ) {
      setError("Inputs required");
    } else if (
      isNaN(registerInfor.phone) ||
      registerInfor.phone.length < 10 ||
      registerInfor.phone.length > 10
    ) {
      setError("Please enter a valid phone");
    } else {
      axios({
        url: "https://e-commercial.onrender.com/register",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: registerInfor,
        withCredentials: true,
      })
        .then((res) => {
          if (res.status === 200) {
            navigate("/login");
          } else {
            throw new Error("Something's wrong!");
          }
        })
        .catch((err) => {
          if (err.response.status === 500) {
            //....
          } else if (err.response.status === 400) {
            setError(err.response.data[0].msg);
          } else {
            console.log(err);
          }
        });
    }
  };

  return (
    <div className="RegisterPage_background">
      <div className="RegisterPage_container">
        <div>
          <h4 className="RegisterPage_sign-up">Sign Up</h4>
          <Form>
            {error ? <p className="form_error">{error}</p> : ""}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                spellCheck="false"
                onChange={(e) => {
                  setError(null);
                  setFullName(e.target.value.trim());
                }}
              />
              <input
                type="email"
                placeholder="Email"
                spellCheck="false"
                onChange={(e) => {
                  setError(null);
                  setEmail(e.target.value.trim());
                }}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setError(null);
                  setPassword(e.target.value.trim());
                }}
              />
              <input
                type="text"
                placeholder="Phone"
                onChange={(e) => {
                  setError(null);
                  setPhone(e.target.value.trim());
                }}
              />
            </div>
            <button onClick={buttonClickHandler}>SIGN UP</button>

            {/*Điều hướng đến trang login nến người dùng đã có tài khoản */}
            <p>
              <span>Login? </span>
              <span className="RegisterPage_login-click">
                <Link to={"/login"}>Click</Link>
              </span>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
