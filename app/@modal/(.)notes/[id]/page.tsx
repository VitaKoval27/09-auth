import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";
import { getSingleNote } from "@/lib/api/serverApi";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function NotePreview({ params }: Props) {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => getSingleNote(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreviewClient />
        </HydrationBoundary>
    );
}