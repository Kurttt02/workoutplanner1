function WorkoutItem({ name }) {
  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "15px"
      }}
    >
      <h3>{name}</h3>
    </div>
  )
}

export default WorkoutItem