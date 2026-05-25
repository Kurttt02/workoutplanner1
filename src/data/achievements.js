export const ACHIEVEMENTS = [
  {
    name: "First Rep",
    description: "Complete your first exercise",
    check: (stats) => stats.totalExercises >= 1
  },
  {
    name: "Consistency Builder",
    description: "Complete 10 total exercises",
    check: (stats) => stats.totalExercises >= 10
  },
  {
    name: "Iron Discipline",
    description: "Complete 50 total exercises",
    check: (stats) => stats.totalExercises >= 50
  },
  {
    name: "On Fire",
    description: "Reach a 3 day streak",
    
  },
  {
    name: "Week Warrior",
    description: "Reach a 7 day streak",
    
  }
]