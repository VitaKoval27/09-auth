import NoteForm from "@/components/NoteForm/NoteForm"
import css from "./CreateNote.module.css"
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Create Note",
    description: "Make New Note",
    openGraph: {
        title: "Create Note",
        description: "Make New Note",
        images: [{ url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" }],
        url: "https://08-zustand-7ugr.vercel.app/notes/action/create"
    }
};



export default function NoteCreatePage() {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm />
            </div>
        </main>


    )
}