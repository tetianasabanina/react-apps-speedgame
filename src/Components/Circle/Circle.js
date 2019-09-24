import React from 'react';
import './Circle.css';
//import Cursor from '../../img/cat_paw.jpg';
const Circle = (props) =>  {
    
    return (
            <div className={'circle' + (props.active ? ' active':'')} style={{backgroundColor: props.active ? props.active : props.buttonColor}} onClick={props.click}>
               
            </div>
    );
}

export default Circle;