import React, {Component} from 'react';
import './SpeedSelection.css';

class SpeedSelection extends Component  {

    buttons = [
        { name: 'slow', label: 'SLOW'},
        { name: 'fast', label: 'FAST'},
    ];

    render() {
        const { onSpeedSelect } = this.props;
        const buttons = this.buttons.map(({name, label}) =>  {
            return (
                <button type="button" 
                key={name} 
                className="speedButton"
                onClick={() => onSpeedSelect(label)}>
                    {label}
                </button>
            );
        });
        return (
            <div className="speedSelectionSection" >
                <span>Select speed: </span>
                {buttons}
            </div>
 
        );
    };
}

export default SpeedSelection;