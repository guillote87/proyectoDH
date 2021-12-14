import React, { useEffect, useState } from 'react';
import LastProductInDb from './LastProductInDb';
import CategoriesInDb from './CategoriesInDb';



function ContentRowCenter(){
    const [categories, setCategories] = useState([]);
    const [prod, setProducts] = useState([]);

    useEffect(()=>{
    const url = "http://localhost:3003/api/products";
    fetch( url )
    .then( response => response.json() )
    .then( data => {
        console.log(data)
        setCategories(data.countByCategory);
        
    });
},[]);
useEffect(()=>{
    const url = "http://localhost:3003/api/products";
    fetch( url )
    .then( response => response.json() )
    .then( products => {
        console.log(products)
         setProducts(products.data);
        
    });
},[]);

let lastProduct = prod[prod.length-1]

    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastProductInDb products={lastProduct}/>
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Categories in DB -->*/}
            <CategoriesInDb categories={categories}/>

        </div>
    )
}

export default ContentRowCenter;