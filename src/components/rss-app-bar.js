import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ReceiptIcon from '@material-ui/icons/ReceiptTwoTone';
import DescriptionIcon from '@material-ui/icons/DescriptionTwoTone';
import FlightIcon from '@material-ui/icons/FlightTwoTone';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFileTwoTone';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotesTwoTone';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOffTwoTone';
import AssessmentIcon from '@material-ui/icons/AssessmentTwoTone';
import LocalHospitalIcon from '@material-ui/icons/LocalHospitalTwoTone';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActiveTwoTone';

import News from "./news";
import DiscardedNews from "./discarded-news";
import FilterableSourcesTable from "./filterable-sources-table";
import { Dictionary } from "./dictionary";
import { DictionaryCovid } from "./dictionary-covid";
import { DictionaryAirlines } from "./dictionary-airlines";
import { ExclusionTerms } from "./exclusion-terms";
import { Topics } from "./topics";
import { CovidTourism } from "./covid-tourism";
import { AirCompanies } from "./air-companies";
import { blue, green, red } from '@material-ui/core/colors';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState("news");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            RSS INTRANET  
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="news">
            <ListItemIcon><DescriptionIcon /></ListItemIcon>
            <ListItemText primary="Notícies" 
              onClick={() => setContent("news")}
            />
          </ListItem>
          <ListItem button key="discarded">
            <ListItemIcon><InsertDriveFileIcon /></ListItemIcon>
            <ListItemText primary="Descartades"
              onClick={() => setContent("discarded")}
            />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="dictionary">
            <ListItemIcon><SpeakerNotesIcon style={{ color: blue[300] }}/></ListItemIcon>
            <ListItemText primary="Diccionari" 
              onClick={() => setContent("dictionary")}
            />
          </ListItem>
          <ListItem button key="exclusion-terms">
            <ListItemIcon><SpeakerNotesOffIcon style={{ color: blue[300] }}/></ListItemIcon>
            <ListItemText primary="Terminos d'exclusió"
              onClick={() => setContent("exclusion-terms")}
            />
          </ListItem>
          <ListItem button key="dictionary-covid">
            <ListItemIcon><LocalHospitalIcon style={{ color: blue[300] }}/></ListItemIcon>
            <ListItemText primary="Diccionari Covid" 
              onClick={() => setContent("dictionary-covid")}
            />
          </ListItem>
          <ListItem button key="dictionary-airlines">
            <ListItemIcon><FlightIcon style={{ color: blue[300] }}/></ListItemIcon>
            <ListItemText primary="Diccionari Línies Aèries" 
              onClick={() => setContent("dictionary-airlines")}
            />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="sources">
            <ListItemIcon><ReceiptIcon style={{ color: red[300] }}/></ListItemIcon>
            <ListItemText primary="Fonts" 
              onClick={() => setContent("sources")}
            />
          </ListItem>
          <ListItem button key="topics">
            <ListItemIcon><AssessmentIcon style={{ color: red[300] }}/></ListItemIcon>
            <ListItemText primary="Estadístiques" 
              onClick={() => setContent("topics")}
            />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListSubheader component="div" id="nested-list-subheader">
            Informes
          </ListSubheader>
          <ListItem button key="covid-tourism">
            <ListItemIcon><LocalHospitalIcon style={{ color: green[300] }}/></ListItemIcon>
            <ListItemText primary="Covid-Turisme" 
              onClick={() => setContent("covid-tourism")}
            />
          </ListItem>
          <ListItem button key="air-companies">
            <ListItemIcon><AirplanemodeActiveIcon style={{ color: green[300] }}/></ListItemIcon>
            <ListItemText primary="Companyies Aèries" 
              onClick={() => setContent("air-companies")}
            />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
      { content === "news" && <News /> }
      { content === "discarded" && <DiscardedNews /> }
      { content === "dictionary" && <Dictionary /> }
      { content === "exclusion-terms" && <ExclusionTerms /> }
      { content === "dictionary-covid" && <DictionaryCovid /> }
      { content === "dictionary-airlines" && <DictionaryAirlines /> }
      { content === "sources" && <FilterableSourcesTable /> }
      { content === "topics" && <Topics /> }
      { content === "covid-tourism" && <CovidTourism /> }
      { content === "air-companies" && <AirCompanies /> }
      </main>
    </div>
  );
}
