// import {ChevronLeftIcon} from '../../node_modules/@material-ui/icons';
const Pagination = ({itemsPerPage,totalItems,handlePageChange,activePage}) =>{
    const pageNumbers=[];

    for(var i=1;i<=Math.ceil(totalItems/itemsPerPage);i++){
        pageNumbers.push(i)
    }
    return(
        <nav>
            <ul className="pagination" style={{paddingLeft:"48%"}}>
                
            <li key={"prev"} className="page-item"><a href="#" onClick={() => handlePageChange("prev",activePage)} className="page-link">{"<"}</a></li>
            <li key={"next"} className="page-item"><a href="#" onClick={() => handlePageChange("next",activePage)} className="page-link">{">"}</a></li>
            </ul>
        </nav>
    )
}
export default Pagination;