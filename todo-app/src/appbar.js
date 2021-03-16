import React, { useState, useEffect } from 'react';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import Link from '@material-ui/core/Link';
import {withRouter, useHistory} from "react-router-dom";
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const ButtonAppBar = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const classes = useStyles();
  const [state,setState] = useState(false)
  const history = useHistory()
  const toggleDrawer = (open) => (event) => {
    setState(open)
  }
  const {currentPage} = props


  const list = () => (
    <List style={{width:250}}>
      <ListItem button onClick={()=>{history.push(`/`); setState(false) } } >Home</ListItem>
      <ListItem button onClick={()=>{history.push(`/tags`); setState(false)} } >Tags</ListItem>
      <ListItem button onClick={()=>{history.push(`/finished`); setState(false)} } >Finished Tasks</ListItem>
    </List>
  )

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        { !matches &&
        <div>
          <IconButton edge="start" 
                      className={classes.menuButton} 
                      color="inherit" 
                      aria-label="menu"
                      onClick={toggleDrawer(true)}>
            <MenuIcon />
            </IconButton>
            <Drawer
              anchor={'left'}
              open={state}
              onClose={toggleDrawer(false)}
            >
              {list()}
            </Drawer>
          </div>
          }
          <Typography variant="h6" className={classes.title}>
            {currentPage}
          </Typography>
          {matches &&
            <div>
            <Button color="inherit" onClick={()=>history.push(`/`)}>Tasks</Button>
            <Button color="inherit" onClick={()=>history.push(`/finished`)}>Finished Tasks</Button>
            <Button color="inherit" onClick={()=>history.push(`/tags`)}>Tags</Button>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(ButtonAppBar);