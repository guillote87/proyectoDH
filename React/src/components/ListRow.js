import React from 'react';


function ListRow(props){
    return (
                <tr>
                     <td> <img style={{width: 5 +'rem'}} src={"http://localhost:3003/images/productos/"+ props.image} /> </td>
                    <td>{props.name}</td>
                    <td>{props.description}</td>
                    <td>{props.categories.description}</td>
                    <td>{props.price}</td>
                </tr>
            )
    }
    
        

export default ListRow;