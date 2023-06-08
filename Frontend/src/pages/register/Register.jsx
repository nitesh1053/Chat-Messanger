import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";
import { api } from "../../apiCalls";

export default function Register() {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const phone = useRef();
  const passwordAgain = useRef();
  const isPrivate = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        name: name.current.value,
        email: email.current.value,
        phone: phone.current.value,
        password: password.current.value,
        isPrivate: isPrivate.current.checked
      };
      console.log(user);
      try {
        await api.post("/api/auth/signup", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MessagerChat</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on MessagerChat.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Name"
              required
              ref={name}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Phone"
              required
              ref={phone}
              className="loginInput"
              pattern="[6789][0-9]{9}"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <div>
              <input type="checkbox" id="isPrivate" name="isPrivate" ref={isPrivate} />
              <label htmlFor="isPrivate">Private Account</label>
            </div>
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton" type="button">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
