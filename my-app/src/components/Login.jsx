import { useState } from "react";

export const Login = ({ setIsAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/user/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isAuthenticated) {
          setIsAuth(data.isAuthenticated);
        }
        localStorage.setItem("token", data.jwtToken);
      })
      .catch((error) => console.log(error));
  };
  return (
    <section className="login">
      <h5> Formulario login</h5>
      <hr></hr>

      <form action="" onSubmit={handleSubmit}>
        <input
          className="controls"
          value={email}
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="controls"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button class="button" type="submit">
          login
        </button>
      </form>
    </section>
  );
};
