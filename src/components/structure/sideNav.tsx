import React from "react";
import {
    Divider,
    List,
    ListItem,
    ListItemText
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import {
    ArrowForwardIos,
    TableRows,
    PeopleOutline,
    SportsSoccerOutlined
} from "@mui/icons-material";
import { Colors } from "../../enums/colors";

const useStyles = makeStyles((theme) =>
    createStyles({
        menu: {
            width: '100%',
            height: '100vh',
            backgroundColor: Colors.NAV_BLUE,
            color: "white",
            position: "relative",
        },
        menuIcon: {
            marginRight: '3%'
        }
    })
);

const SideNav: React.FC = () => {
    const classes = useStyles();

    return (
        <List component="nav" aria-labelledby="nested-list-subheader" className={classes.menu}>
            <Divider />
            <ListItem component={Link} to="/squads">
                <SportsSoccerOutlined className={classes.menuIcon}/>
                <ListItemText primary="Squad" />
                <ArrowForwardIos />
            </ListItem>
            <Divider />
            <ListItem component={Link} to="/players">
                <PeopleOutline className={classes.menuIcon}/>
                <ListItemText primary="Players" />
                <ArrowForwardIos />
            </ListItem>
            <Divider />
            <ListItem component={Link} to="/">
                <TableRows className={classes.menuIcon}/>
                <ListItemText primary="Leaderboard" />
                <ArrowForwardIos />
            </ListItem>
            <Divider />
        </List>
    );
}

export default SideNav;
