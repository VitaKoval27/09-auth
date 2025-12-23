import { getSingleNote } from "@/lib/api/serverApi";
import NoteDetailClient from "./NoteDetails.client";
import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import type { Note } from "@/types/note";
import { Metadata } from "next";

interface NoteDetailProps {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: NoteDetailProps): Promise<Metadata> {
    const { id } = await params
    const note = await getSingleNote(id)

    return {
        title: `Notes:${note.title}`,
        description: `${note.content.slice(0, 30)}`,
        openGraph: {
            title: `Notes:${note.title}`,
            description: `${note.content.slice(0, 30)}`,
            images: [{ url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" }],
            url: `https://08-zustand-7ugr.vercel.app/notes/filter/${id}`
        }
    }
}
export default async function NoteDetail({ params }: NoteDetailProps) {
    const queryClient = new QueryClient()
    const { id } = await params

    await queryClient.prefetchQuery<Note, Error>({
        queryKey: ["notes", id],
        queryFn: () => getSingleNote(id)

    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailClient noteId={id} />
        </HydrationBoundary>
    )

}