import React, { useEffect, useState } from 'react';
import SmallCard from './SmallCard';



function ContentRowData(){
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(()=>{
       const url = "http://localhost:3003/api/categories";
       fetch( url )
       .then( response => response.json() )
       .then( categories => {
            setCategories(categories);
           
       });
   },[]);
   useEffect(()=>{
    const url = "http://localhost:3003/api/users";
    fetch( url )
    .then( response => response.json() )
    .then( users => {
         setUsers(users);
        
    });
},[]);
useEffect(()=>{
    const url = "http://localhost:3003/api/products";
    fetch( url )
    .then( response => response.json() )
    .then( products => {
         setProducts(products);
        
    });
},[]);

let totalProductos = {
    title : "Total Productos",
    color: "primary",
    quantity : products.count,
    icon :"fa-tshirt"
}
let totalUsers = {
    title : "Total Usuarios",
    color: "primary",
    quantity : users.count,
    icon :"fa-users"
}
let totalCategories = {
    title : "Total Categorias",
    color: "primary",
    quantity : categories.count,
    icon :"fa-filter"
}


let cartProps =[totalProductos,totalUsers,totalCategories]
    return (
    
        <div className="row">
            
            {Array.isArray(cartProps) && cartProps.map( (props, i) => {

                return <SmallCard props={props} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowData;