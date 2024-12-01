import React, { useEffect, useState } from "react";
import { CssBaseline, Divider, Grid2 as Grid } from "@mui/material";
import { createStyles, makeStyles, ThemeProvider } from "@mui/styles";
import { Route, Routes } from "react-router-dom";
import { fetchGoalScoringData } from "./actions/api";
import { createTheme } from "@mui/material/styles";
import { useAppSelector } from "./redux/redux-hooks";
import './App.css';
import TablePage from "./pages/tablePage";
import PlayersPage from "./pages/playersPage";
import TopNav from "./components/structure/topNav";
import SideNav from "./components/structure/sideNav";
import SquadPage from "./pages/squadPage";

const theme = createTheme({
    components: {
        MuiTypography: {
            defaultProps: {
                fontFamily: 'arial',
            }
        }
    }
});

// File specific styling
const useStyles = makeStyles(() =>
    createStyles({
        mainContent: {
            padding: '3%',
            backgroundColor: 'lightblue'
        },
        divider: {
            marginTop: '3%',
            marginBottom: '3%'
        }
    })
);

function App() {
    const classes = useStyles();
    const playerPositions = useAppSelector(state => state.positions).playerPositions;
    const footballPosition = useAppSelector(state => state.positions).footballPosition;
    const [goalScoringData, setGoalScoringData] = useState([]);

    // api call
    useEffect(() => {
        setGoalScoringData(fetchGoalScoringData());
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid container>
                <Grid size={12}>
                    <TopNav />
                </Grid>
                <Grid size={2}>
                    <SideNav />
                </Grid>
                <Grid
                    size={10}
                    container
                    direction="column"
                    spacing={2}
                    className={classes.mainContent}
                >
                    <Grid>
                        <Divider className={classes.divider} />
                    </Grid>
                    <Grid>
                        <Routes>
                            <Route path="/" element={<TablePage goalScoringData={goalScoringData} />} />
                            <Route path="/players" element={<PlayersPage goalScoringData={goalScoringData} />} />
                            <Route path="/squads" element={<SquadPage playerPositions={playerPositions} footballPosition={footballPosition} />} />
                        </Routes>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default App;
