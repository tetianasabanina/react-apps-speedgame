import React from 'react';
import './Level.css';

const LevelSection = (props) =>  {
    
    return (
            
                <button className="levelButton" onClick={props.click}>{props.pace}</button>
          
    );
}

export default LevelSection;