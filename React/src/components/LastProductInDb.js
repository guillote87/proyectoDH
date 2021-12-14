import React from 'react';


function LastProductInDb({products}){
     return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Ultimo Producto Creado</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={"http://localhost:3003/images/productos/"+ products?.image || "Cargando..."} />
                    </div>
                    <p>{products?.name || "Cargando..."}</p>
                    <p>{products?.description|| "Cargando..."}</p>
                    <p>{products?.price|| "Cargando..."}</p>
                </div>
            </div>
        </div>
    )
}

export default LastProductInDb;
