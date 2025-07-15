export function fetchAssignments() {
  return fetch("http://localhost:8000/assignments").then((res) => res.json());
}

export function createAssignment(assignment: any) {
  return fetch("http://localhost:8000/assignments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: assignment }),
  });
}
