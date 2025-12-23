import css from "./sidebar.module.css"
import Link from "next/link"


const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"]

export default function sidebar() {
    return (
        <ul className={css.menuList}>
            <li className={css.menuItem}>
                <Link href={`/notes/filter/all`} className={css.menuLink}>
                    All
                </Link>
            </li>
            {tags.map((tag) => {
                return (
                    <li className={css.menuItem} key={tag}>
                        <Link
                            href={`/notes/filter/${tag}`}
                            className={css.menuLink}
                            key={tag}
                        >
                            {tag}
                        </Link>
                    </li>
                );
            })}
        </ul>

    )
}