import { fetchNotes } from "@/lib/api/serverApi"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import NotesClient from "./Notes.client"
import { Metadata } from "next"


interface NotePageProps {
    params: Promise<{ slug: string[] }>
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
    const { slug } = await params


    return {
        title: `Tag:${slug[0]}`,
        description: `List of notes  by tag:${slug[0]}`,
        openGraph: {
            title: `Tag:${slug[0]}`,
            description: `List of notes  by tag:${slug[0]}`,
            images: [{ url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" }],
            url: `https://08-zustand-7ugr.vercel.app/notes/filter/${slug[0]}`
        }
    }
}

export default async function NotePage({ params }: NotePageProps) {
    const queryClient = new QueryClient()
    const { slug } = await params

    const initialTag = (slug[0] === "all" || !slug[0]) ? undefined : slug[0]

    await queryClient.prefetchQuery({
        queryKey: ["notes", "", 1, initialTag],
        queryFn: () => fetchNotes({
            search: "",
            page: 1,
            perPage: 12,
            tag: initialTag
        })
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={initialTag} />
        </HydrationBoundary>
    )

}