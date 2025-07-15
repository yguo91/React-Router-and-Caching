import { useQuery } from "@tanstack/react-query";
import { TAssignment } from "../../interfaces";
import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";
import { fetchAssignments } from "../../helpers/fetcher";

export function Assignments() {
  const {
    data: assignments,
    isPending,
    isError,
  } = useQuery<TAssignment[]>({
    queryKey: ["assignments"],
    queryFn: async () => fetchAssignments(),
  });
  const handleDeleteButton = async (id: string) => {
    const updatedAssignmentList = assignments?.filter(
      (assignment) => assignment.id !== id
    );
  };
  const handleCompletedTask = (id: string, complete: boolean) => {
    // toggle the completion state on the server
    const updatedAssignmentList = assignments?.map((assignments) =>
      assignments.id === id
        ? { ...assignments, completed: complete }
        : assignments
    );
  };
  const countCompletedTasks = () => {
    return assignments?.filter((assignment) => assignment.completed).length;
  };
  if (isError) return <h1>An error occured....</h1>;
  return (
    <section className={styles.assignments}>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{assignments?.length}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>
            {countCompletedTasks()} of {assignments?.length}
          </span>
        </div>
      </header>

      <div className={styles.list}>
        {isPending ? (
          <p>Loading...</p>
        ) : (
          assignments?.map((assignment, index) => (
            <Assignment
              id={assignment.id}
              assignment={assignment.task}
              completed={assignment.completed}
              handleDeleteButton={handleDeleteButton}
              handleCompletedTask={handleCompletedTask}
              key={index}
            />
          ))
        )}
      </div>
    </section>
  );
}
