import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase, trim } from "../../helpers/stringHelpers";
import { useState } from "react";
import { TAssignment } from "../../interfaces";
import { createAssignment, fetchAssignments } from "../../helpers/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function Header() {
  const queryClient = useQueryClient();
  const [assignment, setAssignment] = useState("");

  const mutation = useMutation({
    mutationFn: createAssignment,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });

  const handleCreateButton = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Use React Query to send a mutation to our backend
    mutation.mutate(assignment);
    setAssignment("");
  };

  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1>
        {uppercase("bcit")} Assignment Tracker{" "}
        {mutation.isPending && <h3>Assignment being created...</h3>}
      </h1>
      <form className={styles.newAssignmentForm} onSubmit={handleCreateButton}>
        <input
          placeholder="Add a new assignment"
          type="text"
          value={assignment}
          onChange={(e) => setAssignment(trim(e.target.value))}
        />
        <button type="submit" disabled={!assignment}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
