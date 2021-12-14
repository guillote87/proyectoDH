import React from 'react';
import PropTypes from 'prop-types';

function CategoryCard({cat = {}}){
  return(
        
        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="card bg-dark text-white shadow">
              <div className="card-body">{cat.categoría}: {cat.Cantidad}</div>
            </div>
          </div>
          </div>

        
    )
}

/* DEFINICIÓN DE PROPIEDADES POR DEFAULT */

CategoryCard.defaultProps = {
    title: 'No Title',
    color: 'success',
    cuantity: 'No cuatity',
    icon: 'fa-clipboard-list'
}

/* PROPTYPES */

CategoryCard.propTypes = {
    atritutes: PropTypes.shape({
        title: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        cuantity: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        icon: PropTypes.string.isRequired
    })
}



export default CategoryCard;