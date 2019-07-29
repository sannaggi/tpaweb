import React from 'react'

function SearchResult({data, onClick, getLogo} : {data:any, onClick:any, getLogo:any}) {

    return (  
        <li key={data.id} onClick={() => onClick(data)}>{getLogo(data.type)} <div>{data.name} - {data.type}</div></li>            
    )
}

export default SearchResult
