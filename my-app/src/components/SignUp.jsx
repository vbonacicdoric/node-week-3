import { useState } from "react";

const SignUp = ({ setIsAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/user/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
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
    <section className="signup">
      <h5> Formulario Sign Up</h5>
      <hr></hr>

      <form action="" onSubmit={handleSubmit}>
        <input
          className="controls"
          value={name}
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
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
          Register
        </button>
      </form>
    </section>
  );
};
export default SignUp;
