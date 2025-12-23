'use client'
import { useQuery } from "@tanstack/react-query"
import css from "./NoteDetail.module.css"
import { getSingleNote } from "@/lib/api/clientApi"
import { Note } from "@/types/note"

interface NoteDetailProps {
    noteId: string
}

export default function NoteDetailClient({ noteId }: NoteDetailProps) {

    const { data: note, error, isLoading } = useQuery<Note, Error>({
        queryKey: ["note", noteId],
        queryFn: () => getSingleNote(noteId),
        refetchOnMount: false
    })
    if (isLoading) {
        return <p>Loading, please wait...</p>;
    }
    if (error || !note) {
        return <p>Something went wrong.</p>;
    }

    return (
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{note.title}</h2>
                </div>
                <p className={css.content}>{note.content}</p>
                <p className={css.date}>Created date: {new Date(note.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    )

}