import { useState } from "react"
import { primaryButton } from "../styles/buttons"

function Coach() {
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])
  const [loading, setLoading] = useState(false)

  function sendMessage() {
    if (!message.trim()) return

    const userMessage = { role: "user", text: message }

    setChat(prev => [...prev, userMessage])
    setMessage("")
    setLoading(true)

    fetch("http://localhost:5000/api/coach", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    })
      .then(res => res.json())
      .then(data => {
        const aiMessage = {
          role: "ai",
          text: data.reply
        }

        setChat(prev => [...prev, aiMessage])
      })
      .catch(() => {
        setChat(prev => [
          ...prev,
          {
            role: "ai",
            text: "Error getting response"
          }
        ])
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>AI Coach</h1>

      <div style={styles.chatBox}>
        {chat.map((msg, i) => (
          <div
            key={i}
            style={
              msg.role === "user"
                ? styles.userMessage
                : styles.aiMessage
            }
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div style={styles.aiMessage}>
            Thinking...
          </div>
        )}
      </div>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          value={message}
          onChange={e =>
            setMessage(e.target.value)
          }
          placeholder="Ask your coach..."
        />

        <button
          style={primaryButton}
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </main>
  )
}

const styles = {
  page: {
    padding: "40px",
    maxWidth: "900px",
    margin: "0 auto",
    color: "white"
  },
  title: {
    fontSize: "42px",
    marginBottom: "20px"
  },
  chatBox: {
    backgroundColor: "#111",
    border: "1px solid #222",
    borderRadius: "16px",
    padding: "20px",
    height: "500px",
    overflowY: "auto",
    marginBottom: "20px"
  },
  userMessage: {
    backgroundColor: "#2a2a2a",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "10px",
    marginLeft: "auto",
    maxWidth: "75%",
    textAlign: "right"
  },
  aiMessage: {
    backgroundColor: "#181818",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "10px",
    maxWidth: "75%",
    whiteSpace: "pre-wrap",
    lineHeight: "1.5"
  },
  inputRow: {
    display: "flex",
    gap: "10px"
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #2a2a2a",
    backgroundColor: "#111",
    color: "white"
  }
}

export default Coach