import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  function register() {
    fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(res => res.json())
      .then(() => {
        navigate("/login")
      })
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Register</h1>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={styles.input}
        />

        <button onClick={register} style={styles.button}>
          Register
        </button>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a0a"
  },

  card: {
    width: "350px",
    padding: "30px",
    borderRadius: "14px",
    backgroundColor: "#151515",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  title: {
    color: "white",
    margin: 0
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #333",
    backgroundColor: "#0f0f0f",
    color: "white"
  },

  button: {
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#222",
    color: "white",
    cursor: "pointer"
  }
}

export default Register