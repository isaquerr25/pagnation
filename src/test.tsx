/* eslint-disable react/jsx-key */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];



const itemsPerPage = 12;
const ListCap = () => {

    const [cap, setCap] = useState([]);
    const [pageNumber, setPageNumber] = useState(1462);
    const [itemsCount, setItemsCount] = useState(0);
    const pagesTotal = Math.floor(itemsCount/itemsPerPage);

    const previousLast = ((pageNumber-4)<0 ? 0: (pageNumber-4) );
    const nextLast = ((pageNumber+4)>pagesTotal ? pagesTotal: (pageNumber+4) );

    const pages = [];
    for(let i=previousLast;i<=nextLast;i++){
        pages.push(i);
    }
    useEffect( () =>{

        axios.get(`https://kitsu.io/api/edge/anime?page[limit]=${itemsPerPage}&page[offset]=${pageNumber*itemsPerPage}`)
            .then( response => { 

                setItemsCount(response.data.meta.count);
                setCap(response.data.data);  
                               
            })
            .catch(error => console.log(error));
    },[pageNumber]);
    return (
        <div>
            {cap && cap.map((item, index) => (
                <div key={index}>
            
                    <a>{item.attributes.canonicalTitle}</a>
                </div>
            ))
            }
            <div>
                {pageNumber != 0 &&
                    <button onClick={()=>setPageNumber(0)}>first</button>
                }
                {pageNumber>0 && <button onClick={()=>setPageNumber((ags)=>ags-1)}>previous</button> }
                {pages && pages.map((item) => (
                    
                    <button disabled={item==pageNumber} key={item} onClick={()=>setPageNumber(item)}>{item}</button>

                ))}
                {pagesTotal != pageNumber &&
                <button onClick={()=>setPageNumber((ags)=>ags+1)}>next</button>
                }
                {pagesTotal != pageNumber &&
                <button onClick={()=>setPageNumber(pagesTotal)}>last</button>
                }
            </div>
        </div>

    );
};

export default ListCap;