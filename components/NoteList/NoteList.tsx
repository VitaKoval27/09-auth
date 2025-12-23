import css from "./NoteList.module.css"
import type { Note } from "@/types/note"
import Link from "next/link"
import { deleteNote } from "@/lib/api/clientApi"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

interface NoteListProps {
    notes: Note[],
}




export default function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (noteId: string) => deleteNote(noteId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] })
    })


    const handleDelete = (noteId: string) => {
        mutation.mutate(noteId)
        toast.success(`Note  was succesefull deleted`)
    }



    return (
        <ul className={css.list}>
            {notes.map((note) => (
                <li key={note.id} className={css.listItem}>
                    <Link href={`/notes/${note.id}`} className={css.noteLink}>
                        <h2 className={css.title}>{note.title}</h2>
                        <p className={css.content}>{note.content}</p>
                    </Link>
                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>
                        <Link href={`/notes/${note.id}`} className={css.buttonView}>
                            View details
                        </Link>
                        <button className={css.button} onClick={() => handleDelete(note.id)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    )
}