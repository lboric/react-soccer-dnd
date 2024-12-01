import React, { FC } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import PlayerPortrait from "../components/content/playerPortrait";
import { GoalScoringData } from "../models/goalScoringData";
import { Grid2 as Grid } from "@mui/material";
import { Fonts } from "../enums/fonts";
import DarkLabel from "../components/content/labels/darkLabel";

const useStyles = makeStyles(() =>
    createStyles({
        title: {
            marginBottom: "50px"
        },
        page: {
            padding: "30px",
        }
    })
);

type Props = {
    goalScoringData: GoalScoringData[];
}

const PlayersPage: FC<Props> = (props) => {
    const classes = useStyles();
    const { goalScoringData } = props;

    return (
        <>
            <div className={classes.title}>
                <DarkLabel variant={Fonts.H4}>
                    Players
                </DarkLabel>
            </div>
            <Grid size={12} container spacing={7} direction="row" className={classes.page}>
                {goalScoringData.map((data, index) =>
                    <Grid key={index}>
                        <PlayerPortrait name={data.name} surname={data.surname} />
                    </Grid>
                )}
            </Grid>
        </>
    );
}


export default PlayersPage;
