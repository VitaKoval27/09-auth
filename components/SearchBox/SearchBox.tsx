import { ChangeEvent } from "react"
import css from "./SearchBox.module.css"

interface SearchBoxProps {
    onSearch: (value: string) => void

}

export default function SearchBox({ onSearch }: SearchBoxProps) {
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value)
    }

    return (
        <input
            className={css.input}
            placeholder="Search..."

            onChange={handleOnChange}
            type="text"
        />
    )
}