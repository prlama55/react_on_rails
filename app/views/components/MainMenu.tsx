import React from 'react';
import { Link } from 'react-router-dom';
import { showError } from '../utils/notify';
import { ExtendedTheme } from '../styles/muiProvider'
import {createStyles, WithStyles, withStyles} from "@material-ui/core";

export const styles = (theme: ExtendedTheme) => {
    return createStyles({
        container: {
            width: '100%',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            'ul':{
                textTransform: 'none',
                fontSize: '40px',
                color: '#f5deb3',
                padding: 0,
                margin: '0px 0',
                width: '100%',
                textAlign: 'end',
                marginTop: '90px',
                lineHeight: '90px',
                'li':{
                    'a':{
                        cursor: 'default',
                        color: 'inherit',
                        textDecoration: 'none',
                        '&:hover':{
                            background:' #f5deb326',
                            transition: 'all ease 0.5s'
                        }
                    }
                },
                'a':{
                    transition: 'all ease 0.5s'
                }
            }
        },
        boardContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        },

        board: {
            width: "600px",
            display: 'flex',
            flexWrap: 'wrap',
            zIndex: 999
        },
        blockTitle:{
            flex: '1 0 14%',
            margin: '5px',
            height: '100px',
            backgroundColor: 'wheat',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            borderRadius: '18px',
            transition: 'all ease 0.5s',
            color: 'black',
            '&:hover': {
                color: 'white',
                background: '#40c331',
                fontSize: '30px',
                transition: 'all ease'
            }
        },
        link:{
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            textTransform: 'none',
            textDecoration: 'none'
        }
    })
}
type Props= WithStyles
const MainMenu=(props: Props)=> {

    const {classes} = props
    return (
        <div className={classes.container}>
            <div className={classes.boardContainer}>
                < div className={classes.board} id="board">
                    <Link className={`${classes.link} ${classes.blockTitle}`} to="/game">PLAY</Link>
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(MainMenu)
