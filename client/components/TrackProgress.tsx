import {FC} from "react";
import styles from '../styles/TrackProgress.module.scss'
interface TrackProgressProps {
    left: number;
    right: number;
    onChange: (e: any) => void;
}

const TrackProgress: FC<TrackProgressProps> = ({left, right, onChange}) => {
    const getSeconds = (value: number) => {
        return `${Math.round(60*(value/60 % 1))}`.length > 1 ? Math.round(60*(value/60 % 1)) : 0+`${Math.round(60*(value/60 % 1))}`
    }
    return (
        <div className={styles.container}>
            <div>{`${Math.floor(left/60)}:${getSeconds(left)}`}</div>
            <input type="range"
                   min={0}
                   max={right}
                   value={left}
                   onChange={onChange}
                   className={styles.range}/>
            <div>{`${Math.floor(right/60)}:${getSeconds(right)}`}</div>
        </div>
    );
};

export default TrackProgress;