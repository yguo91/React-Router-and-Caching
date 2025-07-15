import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TAssignment } from "../../interfaces";
import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";
import { fetchAssignments, deleteAssignment, toggleAssignmentCompletion } from "../../helpers/fetcher";

export function Assignments() {
  const queryClient = useQueryClient();

  const {
    data: assignments,
    isPending,
    isError,
  } = useQuery<TAssignment[]>({
    queryKey: ["assignments"],
    queryFn: async () => fetchAssignments(),
  });
  // TODO: Implement the createAssignment, deleteAssignment, and toggleAssignmentCompletion functions
  const deleteMutation = useMutation({
    mutationFn: deleteAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },  
  });
  const handleDeleteButton = (id: string) => {
    deleteMutation.mutate(id);
  };

  const toggleMutation = useMutation({
    mutationFn: ({ id, complete }: { id: string; complete: boolean }) =>
      toggleAssignmentCompletion(id, complete),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });


  const handleCompletedTask = (id: string, complete: boolean) => {
    // // toggle the completion state on the server
    // const updatedAssignmentList = assignments?.map((assignments) =>
    //   assignments.id === id
    //     ? { ...assignments, completed: complete }
    //     : assignments
    // );
    toggleMutation.mutate({ id, complete });
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

      {deleteMutation.isPending && 
        <h3 className={styles.isPending}>
        Deleting assignment...</h3>}

      {toggleMutation.isPending && (
        <h3 className={styles.isPending}>Toggling assignment...</h3>
      )}

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

}//end of Assignments component
