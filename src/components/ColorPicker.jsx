import { SketchPicker } from 'react-color';

import { useSnapshot } from 'valtio';
import { state } from '../store';

const ColorPicker = () => {

    const snap = useSnapshot(state);

    return (
        <div
            className="tab-content"
        >
            <SketchPicker
                color={snap.color}
                disableAlpha
                onChange={(color) => state.color = color.hex}
                presetColors={[
                    "#222831", 
                    "#1976d2", 
                    "#e94560", 
                    "#43a047", 
                    "#f9d923", 
                    "#ffb6b9", 
                    "#6c3483",
                    "#ff9800",
                    "#aaaaaa",
                    "#009988",
                    "#795548",
                    "#6c7948" 
                ]}
            />
        </div>
    );
};

export default ColorPicker;