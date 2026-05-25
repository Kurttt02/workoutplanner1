import { useState } from "react"

function Coach() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  function sendMessage() {
    if (!message.trim()) return

    const userMessage = {
      sender: "user",
      text: message
    }

    setMessages(prev => [...prev, userMessage])

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
          sender: "ai",
          text: data.reply
        }

        setMessages(prev => [...prev, aiMessage])
      })

    setMessage("")
  }

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>AI Fitness Coach</h1>

      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={
              msg.sender === "user"
                ? styles.userMessage
                : styles.aiMessage
            }
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={styles.inputRow}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask your coach..."
          style={styles.input}
        />

        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </main>
  )
}

const styles = {
  page: {
    padding: "30px",
    color: "white"
  },

  title: {
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
  padding: "14px",
  borderRadius: "12px",
  marginBottom: "14px",
  marginLeft: "auto",
  maxWidth: "80%"
},

 aiMessage: {
  backgroundColor: "#181818",
  padding: "14px",
  borderRadius: "12px",
  marginBottom: "14px",
  maxWidth: "80%",
  whiteSpace: "pre-wrap",
  lineHeight: "1.6"
},

  inputRow: {
    display: "flex",
    gap: "10px"
  },

  input: {
    flex: 1,
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #333",
    backgroundColor: "#111",
    color: "white"
  },

  button: {
    padding: "14px 18px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#222",
    color: "white",
    cursor: "pointer"
  }
}

export default Coach