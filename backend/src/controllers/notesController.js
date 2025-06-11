export function getAllNotes(req, res) {
  res.status(200).send("15 notes")
}

export function createNote(req, res) {
  res.status(201).json({message:"post created successfully"})
}

export function updateNote(req, res) {
  res.status(200).json({message:"post updated successfully"})
}

export function deleteNote(req, res) {
  res.status(200).json({message:"post deleted successfully"})
}