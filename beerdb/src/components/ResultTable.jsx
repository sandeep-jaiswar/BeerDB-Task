function ResultTable(props){
    return (
        <tr>
            <td><img style={{height : "40px"}} src={props.sendImgSrc(props.index)} alt="beer"></img></td>
            <td>{props.beerDtls.name}</td>
            <td>{props.beerDtls.style}</td>
            <td>{props.beerDtls.abv}</td>
            <td>{props.beerDtls.ibu}</td>
            <td>{props.beerDtls.id}</td>
            <td>{props.beerDtls.ounces}</td>
        </tr>
    )
}

export default ResultTable;