import React, { useState, useEffect } from "react";
import { compareTwoArray, visitEveryPossibleDirectionFromPoint, ifArraysObjectKeyContains } from "../utils/helper";
import ScoreBoard from "../components/ScoreBoard";
import Timer from "../components/Timer";
import { initializeBoard, submitWord, initializeGame } from "../service/game";
import { showError, showSuccess } from "../utils/notify";
import Board from "../components/Board";
import { SUCCESS_MESSAGE } from '../constant'
import {Button, createStyles, Paper, WithStyles, withStyles, TextField, Grid} from "@material-ui/core";
import {ExtendedTheme} from "../styles/muiProvider";
import { useHistory } from "react-router-dom";

export interface IScore {
    word: string;
    score: number
}
export interface GameInfo {
    directions: Array<Array<number>>,
    time: number
}

const useStyles = (theme: ExtendedTheme) =>
    createStyles({
        gameContainer:{
            padding: '2%',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between'
        },
        boardContainer:{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        },
        board:{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            zindex: 999
        },
        paper: {
            widrh: '100%',
            margin: '30px',
            display: 'flex',
            border: `2px solid ${theme.palette.divider}`,
            background: '#9e9e9e4f',
            flexWrap: 'wrap',
            borderRadius: '20px 20px 5px 5px'
        },
        paperScoreBoard: {
            margin: '30px',
            display: 'flex',
            border: `1px solid ${theme.palette.divider}`,
            flexWrap: 'wrap'
        },

        divider: {
            alignSelf: 'stretch',
            height: 'auto',
            margin: theme.spacing(1, 0.5),
        },
        scoreContainer:{
            margin:'0px 0px 435px 0px',
            flex: 1
        },
        submitContainer:{
            position: 'relative',
            display: 'flex',
            margin: '10px',
            width: '100%'
        }
    })

type Props= WithStyles
const Game = (props: Props) => {

    const routeHistory = useHistory();

    const [board, setBoard] = useState<Array<Array<string>>>(new Array(2));
    const [canBeVisitedCubes, setCanBeVisitedCubes] = useState<Array<Array<number>>>([]);
    const [historyPositions, setHistoryPositions] = useState<Array<Array<number>>>([]);
    const [isFirstMove, setIsFirstMove] = useState<boolean>(true);
    const [word, setWord] = useState<string>('');
    const [isMouseInsideBoard, setIsMouseInsideBoard] = useState<boolean>(false)
    const [scores, setScores] = useState<Array<IScore>>([]);
    const [gameInfo, setGameInfo] = useState<GameInfo>({
        directions: [[]],
        time: 0
    })

    const [time, setTime] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(true)

    let timerInterval;


    useEffect(() => {

        (async () => {
            await _initializeBoard();
            await _initializeGame();
            await setLoading(false);

            let boardElement: HTMLElement | null = document.getElementById("board") ? document.getElementById("board") : null
            if (boardElement) {
                boardElement.addEventListener("mouseenter", function () {
                    setIsMouseInsideBoard(true);
                });
                boardElement.addEventListener("mouseleave", function () {
                    setIsMouseInsideBoard(false)
                });
            }
        })();
        return () => {

            window.clearInterval(timerInterval);
        };
    }, [])


    function handleClick(row: number, col: number) {
        let newHistoryPositions: Array<Array<number>> = [...historyPositions];
        let possibleDirections;
        let wordFormed;
        setIsFirstMove(false);
        if (compareTwoArray(historyPositions, [row, col]).contains) {
            let indexPositionInHistoryPositions = compareTwoArray(historyPositions, [row, col]).index;

            newHistoryPositions = [...historyPositions].slice(0, indexPositionInHistoryPositions);
            let lenOfHistoryPositions = newHistoryPositions.length

            if (lenOfHistoryPositions === 0) { _resetGameState(); return; }

            possibleDirections = visitEveryPossibleDirectionFromPoint(newHistoryPositions[lenOfHistoryPositions - 1][0], newHistoryPositions[lenOfHistoryPositions - 1][1], gameInfo.directions);
            wordFormed = word.split('').slice(0, indexPositionInHistoryPositions).join('');
        } else {
            possibleDirections = visitEveryPossibleDirectionFromPoint(row, col, gameInfo.directions);
            newHistoryPositions.push([row, col]);
            wordFormed = word + board[row][col]
        }

        setCanBeVisitedCubes(possibleDirections);
        setHistoryPositions(newHistoryPositions); // save to state
        setWord(wordFormed)
    }
    function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
        setWord(e.target.value);
        setIsFirstMove(true);
        setCanBeVisitedCubes([]);
        setHistoryPositions([]);
    }

    function _resetGameState() {
        setIsFirstMove(true);
        setCanBeVisitedCubes([]);
        setHistoryPositions([]);
        setWord('');
    }

    const _initializeBoard = async () => {
        try {
            let initializedBoard = await initializeBoard();
            setBoard(initializedBoard);
        } catch (e) {
            e.response && e.response.data && showError(e.response.data.message)
        }
    }

    async function _initializeGame() {
        try {
            let gameInfo = await initializeGame();
            setGameInfo(gameInfo);
            setTime(gameInfo.time);
            timerInterval = window.setInterval(() => {
                setTime(time => time > 0 ? time - 1 : 0)
            }, 1000);
        } catch (e) {
            e.response && e.response.data && showError(e.response.data.message)
        }
    }

    const _handleButtonClick = async (event) => {
        if(time>0){
            try {
                setLoading(true)
                await _handleSubmit()
            } catch (e) {
                e.response && e.response.data && showError(e.response.data.message)
            } finally {
                setLoading(false)
            }
        }else{
            showError(`Time expired`)
            routeHistory.push('/')
            return
        }
    }

    const _handleSubmit = async () => {

        if (word) {
            try {
                if (word.length >= 3) {
                    if (ifArraysObjectKeyContains(word, scores)) {
                        showError(`${word} is already scored`)
                        return
                    }
                    let submittedWord = await submitWord(board, word);
                    let newScore = [...scores]
                    newScore.push(submittedWord)
                    setScores(newScore);
                    showSuccess(SUCCESS_MESSAGE[Math.floor(Math.random() * SUCCESS_MESSAGE.length)])
                } else {
                    showError('Word too short')
                }
            } catch (e) {
                e.response && e.response.data && showError(e.response.data.message)
            } finally {
                _resetGameState()
            }
        }
    }

    if (loading && time === 0) {
        return (<>LOADING...</>)
    }

    const {classes} =props
    return (
        <Grid container justify='center' className={classes.gameContainer}>
            <Grid item lg={6} className={classes.boardContainer}>
                <Timer time={time}/>
                <Paper className={classes.paper}>
                    <div className={classes.board} id="board">
                        <Board
                            board={board}
                            canBeVisitedCubes={canBeVisitedCubes}
                            historyPositions={historyPositions}
                            isMouseInsideBoard={isMouseInsideBoard}
                            isFirstMove={isFirstMove}
                            handleClick={handleClick}
                        />
                    </div>
                    <div className={classes.submitContainer}>
                        <TextField onChange={handleChangeInput} color='primary' variant='outlined' fullWidth value={word} placeholder="WORD"/>
                        <Button onClick={_handleButtonClick} color='primary' variant='outlined' size='small'>Submit Word</Button>
                    </div>
                </Paper>
            </Grid>
            <Grid  item lg={6}  className={classes.scoreContainer}>
                <Paper className={classes.paperScoreBoard}>
                    <ScoreBoard scores={scores} />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default withStyles(useStyles)(Game)
