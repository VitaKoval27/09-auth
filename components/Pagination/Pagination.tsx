import css from "./Pagination.module.css"
import ReactPaginate from "react-paginate"

interface PaginationProps {
    pageCount: number;
    onPageChange: (selected: number) => void;
    forcePage: number;
}

export default function Pagination({ pageCount, onPageChange, forcePage }: PaginationProps) {


    if (pageCount <= 1) {
        return null;
    }

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel="→"
            onPageChange={({ selected }) => onPageChange(selected)}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="←"
            forcePage={forcePage}
            containerClassName={css.pagination}
            pageLinkClassName={css.pageLink}
            previousLinkClassName={css.pageLink}
            nextLinkClassName={css.pageLink}
            activeClassName={css.active}
            disabledClassName={css.disabled}

        />

    )
}