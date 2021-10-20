import React , {useState, useEffect} from 'react'

export default function Pagination({data, paginatedData, setCurrentPage, totalPages, currentPage}) {
    

    const pages = []
    for(let i = 1; i<=totalPages; i++){
        pages.push(i);
    }
    
    const getPrevPage = () => {
        currentPage === 1 ? setCurrentPage(1) : setCurrentPage(prev=>prev -1)
    }

    const getNextPage = () => {
        currentPage === totalPages ? setCurrentPage(totalPages) : setCurrentPage(next=>next+1)
    }
    return (
        <>
            <p>showing {paginatedData.length} out of {data.length} data</p>
            
                    {pages.length != 1 && data.length !=0 &&
                    <div className='pagination d-flex'>

                        <button className={`page-link ${currentPage === 1 ? 'disabled' : ''} `} onClick={getPrevPage}>prev</button>
                        {
                    
                            pages.map((page, index)=>{
                                return <button className={`page-link ${currentPage === page ? 'active' : ''} `} onClick={()=>setCurrentPage(page)}>{page}</button>
                            })
                        
                    
                        }
                        <button className={`page-link ${currentPage === totalPages ? 'disabled' : ''} `} onClick={getNextPage}>next</button>
                    </div>}
                    
        </>
    )
}
