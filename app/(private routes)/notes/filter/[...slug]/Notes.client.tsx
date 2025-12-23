'use client'
import css from "./Notes.module.css"
import SearchBox from "@/components/SearchBox/SearchBox"
import Pagination from "@/components/Pagination/Pagination"
// import Modal from "@/components/Modal/Modal"
import NoteList from "@/components/NoteList/NoteList"
// import NoteForm from "@/components/NoteForm/NoteForm"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { fetchNotes } from "@/lib/api/clientApi"
import { Toaster } from "react-hot-toast"
import Loading from "@/app/loading"
import ErrorMessage from "./error"
import { refresh } from "next/cache"
import { useRouter } from "next/navigation"



interface NotesClientProps {
    tag?: string
}

export default function NotesClient({ tag }: NotesClientProps) {

    const [query, setQuery] = useState("")
    const [page, setPage] = useState(1)

    // const [isModalOpen, setIsModalOpen] = useState(false)


    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["notes", query, page, tag],
        queryFn: () => fetchNotes({
            search: query,
            page,
            perPage: 12,
            tag
        }),
        placeholderData: keepPreviousData,
        refetchOnMount: false

    })

    const totalPages = data?.totalPages ?? 0

    const handleSearch = (newValue: string) => {

        setQuery(newValue)
        setPage(1)
    }
    const debouncedSearch = useDebouncedCallback(handleSearch, 1000)

    const handlePageChange = (selectedPage: number) => {
        setPage(selectedPage + 1)
        console.log(selectedPage)
    }
    const router = useRouter();
    const handleCreatingPage = () => {
        router.push("/notes/action/create")
    }


    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox onSearch={debouncedSearch} />
                {totalPages > 1 && (
                    <Pagination
                        pageCount={totalPages}
                        onPageChange={handlePageChange}
                        forcePage={page - 1}
                    />
                )}
                <button className={css.button} onClick={handleCreatingPage}>
                    Create note +
                    {/* /notes/action/create */}
                </button>
            </header>

            {isLoading && <Loading />}

            {isError && (
                <ErrorMessage
                    error={error as Error}
                    reset={() => refresh()}
                />
            )}

            {data && data.notes.length === 0 && !isLoading && !isError && (
                <p>No notes found. Try changing your search or filter.</p>
            )}

            {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

            {/* {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <NoteForm onClose={() => setIsModalOpen(false)} />
                </Modal> */}
            {/* )} */}

            <Toaster position="bottom-right" reverseOrder={false} />
        </div>

    )
}