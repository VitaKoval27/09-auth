"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css"
import * as Yup from "yup"
import { createNote } from "@/lib/api/clientApi";
import type { newNoteProps } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { useState } from "react";

const NoteSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'Title must be at least 3 characters')
        .max(50, 'Title must be not more than 50 characters')
        .required("'This is a required field'"),
    content: Yup.string()
        .max(500, "Content should be not more than 500 characters")
        .required("This is required field"),
    tag: Yup.string()
        .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], "Please select a valid tag")
        .required("This field is required")
}
)

export default function NoteForm() {
    const queryClient = useQueryClient();
    const { draft, setDraft, clearDraft } = useNoteDraftStore();
    const router = useRouter()
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setDraft({
            ...draft,
            [event.target.name]: event.target.value
        })
    }

    const { mutate } = useMutation({
        mutationFn: (newNote: newNoteProps) => createNote(newNote),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            clearDraft()
            setErrors({})
            router.push('/notes/filter/all')
        }

    })


    async function handleSubmit(formData: FormData) {

        const values: newNoteProps = {
            title: (formData.get("title") || "") as string,
            content: (formData.get("content") || "") as string,
            tag: (formData.get("tag") as
                | "Todo"
                | "Work"
                | "Meeting"
                | "Shopping"
                | "Personal"
            )
        }
        try {
            await NoteSchema.validate(values, { abortEarly: false }
            )
            mutate(values)
        } catch (error: unknown) {
            if (error instanceof Yup.ValidationError) {
                const validationErrors: Record<string, string> = {};
                error.inner.map(err => {
                    if (err.path) {
                        validationErrors[err.path] = err.message;
                    }
                });
                setErrors(validationErrors);
            }
            return
        }
    }

    const handleCancel = () => {
        router.push("/notes/filter/all")
    }


    return (

        <form className={css.form} action={handleSubmit}>
            <div className={css.formGroup} >
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    className={css.input}
                    onChange={handleChange}
                    value={draft?.title}

                />
                {errors.title && <span className={css.error}>{errors.title}</span>}
            </div>

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    rows={8}
                    className={css.textarea}
                    onChange={handleChange}
                    value={draft?.content}

                />
                {errors.content && <span className={css.error}>{errors.content}</span>}
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <select id="tag" name="tag" className={css.select} defaultValue={draft?.tag} onChange={handleChange} >
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
                {errors.tag && <span className={css.error}>{errors.tag}</span>}
            </div>

            <div className={css.actions}>
                <button
                    type="button"
                    className={css.cancelButton}
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <button type="submit" className={css.submitButton}>
                    Create note
                </button>
            </div>
        </form>

    )

}
