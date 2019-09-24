import React from 'react';
import './PopUpWindow.css';

/*const closeHandler =() => {
    window.location.reload();
} */
const PopUpWindow = (props) =>  {
    
    return (
            <div className='gameOver'>
                <div className='popUpBox'>
                    <button className="popUpBox_button" onClick={props.click}>X</button>
                    <p className="popUpBox-text">{props.text}</p>
                </div>
            </div>
    );
}

export default PopUpWindow;