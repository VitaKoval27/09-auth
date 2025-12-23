import css from "./not-found.module.css"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Not Found",
    description: "This page does not exist",
    openGraph: {
        title: "Not Found",
        description: "This page does not exist",
        images: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        url: "https://08-zustand-7ugr.vercel.app/"
    }
};


export default function NotFound() {
    return (
        <>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </>
    )
}