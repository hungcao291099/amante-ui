import { useEffect, useState } from "react"
import styles from "./Paginate.module.css"
import { useSearchParams } from "react-router-dom"
import ReactPaginate from "react-paginate"

export default ({ totalPage, rowCount, currentPage, totalItem }) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const handlePageClick = (event) => {
        setSearchParams({...searchParams, page: event.selected + 1})
    }


    return (
        <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPage}
            previousLabel="<"
            pageClassName={styles.page__btn}
            pageLinkClassName=""
            previousClassName={styles.page__btn}
            previousLinkClassName=""
            nextClassName={styles.page__btn}
            nextLinkClassName=""
            breakLabel="..."
            breakClassName=""
            breakLinkClassName=""
            containerClassName={styles.paginate__container}
            activeClassName={styles.active__page}
            renderOnZeroPageCount={null}
            forcePage={currentPage - 1}
        />
    )
}