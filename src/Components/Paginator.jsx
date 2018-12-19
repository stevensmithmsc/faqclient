import React from 'react';
import { Pagination, PaginationItem } from 'reactstrap';


function Paginator(props) {

    let pages = [];
    const totPage = props.maxPage > 5 ? 5 : props.maxPage;
    const topPage = props.current + 2 > props.maxPage ? props.maxPage : props.current + 2;
    const strt = topPage - 4 < 1 ? 1 : topPage - 4;
    for (let i = 0; i < totPage; i++) {
        if (strt + i === props.current) {
            pages.push(
                <PaginationItem key={i} active>
                    <span className="page-link" >
                        {props.current}<span className="sr-only">(current)</span>
                    </span>
                </PaginationItem>
            );
        } else {
            pages.push(
                <PaginationItem key={i}>
                    <span className="page-link" onClick={() => props.goToPage(i + strt)}>
                        {i + strt}
                    </span>
                </PaginationItem>
            );
        }
    }
    return (
        <div className="float-right" >
            <Pagination aria-label="Page navigation">
                {props.current <= 1 ? <PaginationItem disabled>
                    <span className="page-link">
                        <span aria-label="Previous" aria-hidden="true">&laquo;</span>
                    </span>
                </PaginationItem> : <PaginationItem>
                    <span className="page-link" onClick={() => props.goToPage(props.current - 1)}>
                        <span aria-label="Previous" aria-hidden="true">&laquo;</span>
                    </span>
                </PaginationItem>}
                
                {pages}

                {props.current >= props.maxPage ? <PaginationItem disabled>
                    <span className="page-link">
                        <span aria-label="Next" aria-hidden="true">&raquo;</span>
                    </span>
                </PaginationItem> : <PaginationItem>
                    <span className="page-link" onClick={() => props.goToPage(props.current + 1)}>
                        <span aria-label="Next" aria-hidden="true">&raquo;</span>
                    </span>
                </PaginationItem>}
                
            </Pagination>
        </div>
        );
}

export default Paginator;