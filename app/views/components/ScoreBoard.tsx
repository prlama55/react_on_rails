import React from 'react';
import { IScore } from '../components/Game';
import {ExtendedTheme} from "../styles/muiProvider";
import {createStyles, WithStyles, withStyles} from "@material-ui/core";
import styled from 'styled-components'

interface IScoreBoardProps extends WithStyles{
    scores: Array<IScore>;
}
const useStyles = (theme: ExtendedTheme) =>
    createStyles({
        scoreDiv:{
            background: 'linear-gradient(to bottom, #3a404d, #181c26)',
            borderRadius: '5px',
            boxShadow: '0 7px 30px rgba(62, 9, 11, 0.3)',
            width: '100%'
        },
        totalScore:{
            fontSize: '35px !important'
        },
        ul:{
            listStyle: 'none',
padding:0
        },
        li:{
            position: 'relative',
zIndex: 1,
fontSize: '14px',
marginBottom: '8px',
cursor: 'pointer',
'-webkit-backface-visibility': 'hidden',
color: '#fff',
backfaceVisibility: 'hidden',
'-webkit-transform': 'translateZ(0) scale(1, 1)',
transform: 'translateZ(0) scale(1, 1)',
display: 'flex',
justifyContent: 'space-around'
        }
    })
export const Title = styled.h2`
  text-align: center;
  font-size: 18px;
  color: #e1e1e1;
  padding: 10px 13px 0;
  margin: 0;
`
Title.displayName = 'Title'

interface State {
    totalScore: number
}
class ScoreBoard extends React.PureComponent<IScoreBoardProps, State>{
    state={
        totalScore: 0
    }
    render() {
        const { scores, classes } = this.props;
        let totalScore: number = 0;
        return (
            <div className={classes.scoreDiv}>
            <Title>Score</Title>
            <ul className={classes.ul}>
                {
                    scores.length > 0 && scores.map((score: IScore, idx: number) => {
                        totalScore += score.score
                        return <li key={`score-${idx}`} className={classes.li}><span>{score.word}</span> <span> {score.score}</span></li>
                    })
                }
                <li className={`${classes.totalScore} ${classes.li}`}>{totalScore}</li>
            </ul>
            </div>
        )
    }
}

export default withStyles(useStyles)(ScoreBoard)
