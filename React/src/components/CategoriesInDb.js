import React from "react";
import CategoryCard from "./CategoryCard";

function CategoriesInDb({categories = []}) {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Cantidad de productos por categoria
          </h5>
        </div>
        <div className="card-body">
           
            {Array.isArray(categories) && categories.map( (cat, i) => {

                return <CategoryCard cat={cat} key={i}/>
            
            })}

        </div>
     
        
        </div>
      </div>
    
  );
}

export default CategoriesInDb;
