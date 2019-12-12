import React, { useState, useEffect, Fragment } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { friendsWannabes, acceptFriendRequest, unfriend } from "./actions";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 20 + "px"
    },
    paper: {
        height: 140,
        width: 100
    },
    buttonSize: {
        width: 100 + "px",
        height: 30 + "px",
        fontSize: 12 + "px",
        textAlign: "center"
    }
}));

export function Friends() {
    const dispatch = useDispatch();
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    const friends = useSelector(state => {
        return (
            state.friends &&
            state.friends.filter(friends => friends.accepted == true)
        );
    });
    const wannaBeFriends = useSelector(state => {
        return (
            state.friends &&
            state.friends.filter(friends => friends.accepted == false)
        );
    });

    useEffect(() => {
        dispatch(friendsWannabes());
    }, []);

    if (!friends) {
        return null;
    }

    return (
        <>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={6}>
                    <Grid container justify="center" spacing={2}>
                        <Grid container>
                            <h3>Your friends are: </h3>
                        </Grid>
                        {friends.map(friend => (
                            <Grid item spacing={2} key={friend.id}>
                                <Link
                                    to={"/user/" + friend.id}
                                    className="link"
                                >
                                    <img src={friend.image_url} />
                                </Link>
                                <p>
                                    {friend.first_name} {friend.last_name}
                                </p>
                                <Button
                                    onClick={e => dispatch(unfriend(friend.id))}
                                    className={classes.buttonSize}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<DeleteIcon />}
                                >
                                    Unfriend
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container justify="center" spacing={2}>
                        <Grid container>
                            <h3>Who wants to be your friend:</h3>
                        </Grid>
                        {wannaBeFriends.map(friend => (
                            <Grid
                                spacing={2}
                                item
                                justify="space-evenly"
                                key={friend.id}
                            >
                                <Link
                                    to={"/user/" + friend.id}
                                    className="link"
                                >
                                    <img src={friend.image_url} />
                                </Link>
                                <p>
                                    {friend.first_name} {friend.last_name}
                                </p>
                                <Button
                                    onClick={e =>
                                        dispatch(acceptFriendRequest(friend.id))
                                    }
                                    className={classes.buttonSize}
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<CheckIcon />}
                                >
                                    Accept
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
