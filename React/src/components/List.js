import React, { useEffect, useState } from 'react';
import ListRow from './ListRow';



function List (){
    
    const [productos, setProducts] = useState([]);

    useEffect(()=>{
    const url = "http://localhost:3003/api/products";
    fetch( url )
    .then( response => response.json() )
    .then( data => {
        console.log(data)
        setProducts(data.data);
        
    });
},[]); 

    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Categoria</th>
                                <th>Precios</th>
                            </tr>
                        </thead>
                      
                        <tbody>
                            {
                            productos.map( ( row , i) => {
                                return <ListRow { ...row} key={i}/>
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default List;