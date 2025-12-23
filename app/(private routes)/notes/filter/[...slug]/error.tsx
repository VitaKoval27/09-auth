"use client";

interface Props {
    error: Error,
    reset: () => void
}

export default function ErrorMessage({ error }: Props) {
    return <p>Could not fetch the list of notes. {error.message}</p>;
}