import { Link, Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const signinClickHandler = () => {
    const loginInfor = {
      email: email,
      password: password,
    };

    if (!loginInfor.email || !loginInfor.password) {
      setError("Inputs required");
    } else {
      axios({
        url: "https://e-commercial.onrender.com/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: loginInfor,
        withCredentials: true,
      })
        .then((res) => {
          if (res.status === 200) {
            navigate("/");
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
          <h4 className="RegisterPage_sign-up">Sign In</h4>
          <Form noValidate>
            {error ? <p className="form_error">{error}</p> : ""}
            <div>
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
            </div>
            <button onClick={signinClickHandler}>SIGN IN</button>

            {/*Phần điều hướng đến trang đăng ký user mới nếu chưa có */}
            <p>
              <span>Create an account? </span>
              <span className="RegisterPage_login-click">
                <Link to={"/register"}>Sign up</Link>
              </span>
            </p>
            <p style={{ marginTop: "10px" }}>
              <span>Back to Home? </span>
              <span className="RegisterPage_login-click">
                <Link to={"/"}>Click</Link>
              </span>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
