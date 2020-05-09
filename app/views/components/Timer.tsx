import React from 'react';
import { secondsToMs } from '../utils/helper'
import { Link } from 'react-router-dom';
import {ExtendedTheme} from "../styles/muiProvider";
import {createStyles, WithStyles, withStyles} from "@material-ui/core";
interface ITimerProps extends WithStyles{
    time: number
}
const useStyles = (theme: ExtendedTheme) =>
    createStyles({
        timer:{
            bottom:'12px',
            left:'12px',
            fontSize: '35px',
            color: 'black',
            fontWeight: 'bold',
            transition: 'all 0.3 ease'
        },
        time:{
            marginLeft:' 65px',
            animation: 'beat 0.47s infinite alternate',
            transition: 'all ease 0.2s',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 999
        },
        timerLoader:{
            transition: 'all ease 0.2s',
            height: '50px',
            width: '100%',
            position: 'absolute',
            background: '#40c331',
            left: 0,
            top: 0
        },
        link:{
            marginLeft: 10,
            textDecoration: 'none',
            fontSize: 25,
            color: 'green'
        }
    })

const Timer=(props: ITimerProps) => {
    const {classes}= props
    let time = secondsToMs(props.time);
    // timing loader below time
    let width = (1 / 120) * props.time * 100;
    return (
        <>
            <div className={classes.timer}>
                <div className={classes.time}>{props.time>0?`${time.min} : ${time.sec}`:(
                    <>
                        <Link to='/'>Go to home</Link>
                    </>
                )}</div>
                <div className={classes.timerLoader} style={
                    {
                        width: width + "%",
                        background: width > 20 ? "#40c331" : "red"
                    }}>

                </div>
            </div>
        </>
    )
}

export default withStyles(useStyles)(Timer);
