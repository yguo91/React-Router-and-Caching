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

export function deleteAssignment(id: string) {
  return fetch(`http://localhost:8000/assignments/${id}`, {
    method: "DELETE",
  });
}

export function toggleAssignmentCompletion(id: string, complete: boolean) {
  return fetch(`http://localhost:8000/assignments/${id}/toggle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: complete }),
  });
}