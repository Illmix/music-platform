import styles from "@/styles/TrackProgress.module.scss";
import {VolumeMute, VolumeUp} from "@mui/icons-material";
import {FC} from "react";

interface VolumeRegulationProps {
    left: number;
    right: number;
    onChange: (e: any) => void;
}

const VolumeRegulation: FC<VolumeRegulationProps>  = ({left, right, onChange}) => {
    return (
        <div className={styles.container +' '+ styles.volumeContainer}>
            {left
                ?
            <VolumeUp/>
                :
            <VolumeMute/>
            }
            <input
                min={0}
                max={right}
                type="range"
                value={left}
                className={styles.range}
                onChange={onChange}
            />
        </div>
    );
};

export default VolumeRegulation;