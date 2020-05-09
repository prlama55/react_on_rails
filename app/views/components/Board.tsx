import React from 'react';
import { compareTwoArray } from '../utils/helper';
import {ExtendedTheme} from "../styles/muiProvider";
import {createStyles, withStyles, WithStyles} from "@material-ui/core";


interface ITimerProps extends WithStyles{
    board: any;
    canBeVisitedCubes: Array<Array<number>>;
    historyPositions: Array<Array<number>>;
    isMouseInsideBoard: boolean;
    isFirstMove: boolean;
    handleClick: (row: number, col: number) => void
}
const useStyles = (theme: ExtendedTheme) =>
    createStyles({
        block:{
            flex: '1 0 21%',
            margin: '5px',
            height: '100px',
            backgroundColor: '#9E9E9E',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            borderRadius: '18px',
            transition: 'all ease 0.5s',
            color: 'black',
            border: '4px solid #47474714',
            '&:hover':{
                color: 'white',
                background: '#9e9e9e4f',
                fontSize: '30px',
                transition: 'all ease'
            }
        },
        can:{
            background: '#90c4a4',
            color: 'black'
        },
        greenColor:{
            background:'#40c331',
            color: 'white'
        },
        cant:{
            '&:hover':{
                background:'#cc4f24',
                color: 'white'
            }
        }
    })

const Board=(props: ITimerProps)=> {
    let { board, canBeVisitedCubes, historyPositions, isMouseInsideBoard, isFirstMove, handleClick, classes} = props;
    return (
        board.map((row, r) => {
            const blockRow = row.map((col, c) => {
                return (
                    <span color="primary" aria-label="Add" className={`
                            ${compareTwoArray(historyPositions, [r, c]).contains ? `${classes.block} ${classes.greenColor}` : classes.block}
                            ${ compareTwoArray(canBeVisitedCubes, [r, c]).contains && isMouseInsideBoard ? classes.can : classes.cant}
                        `}
                          key={`cube-${c}`}
                          onClick={() => {
                              if (isFirstMove ||
                                  compareTwoArray(canBeVisitedCubes, [r, c]).contains ||
                                  compareTwoArray(historyPositions, [r, c]).contains
                              ) {
                                  handleClick(r, c)
                              }
                          }}
                    >
                        {col}
                    </span>
                )
            })
            return <>{blockRow}</>
        })
    )
}

export default withStyles(useStyles)(Board)
