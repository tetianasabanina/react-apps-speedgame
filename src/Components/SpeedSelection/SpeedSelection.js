import React, {Component} from 'react';
import './SpeedSelection.css';

class SpeedSelection extends Component  {

    buttons = [
        { name: 'slow', label: 'SLOW', pace: 3000},
        { name: 'fast', label: 'FAST', pace: 1500},
    ];

    render() {
        const { onSpeedSelect } = this.props;
        const buttons = this.buttons.map(({name, label, pace}) =>  {
            return (
                <button type="button" 
                key={name} 
                className="speedButton"
                onClick={() => onSpeedSelect(label, pace)}>
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