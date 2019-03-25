import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import axios from 'axios';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 770
  },
  table: {
    minWidth: 300,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class FullWidthTabs extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props.title); // prints out whatever is inside props
}

  state = {
    value: 0,
    min: '',
    arrivals: [],
    departures: [],
    ArrError: false,
    DepartError: false
  };

  subtractMin = (min) => {
    var result = new Date();
    result.setMinutes(result.getMinutes() - min);
    return Math.round(result.getTime()/1000);
}

  handleChangeMin = (event,min) => {
    console.log("pass min: "+min);
    this.setState({ [min]: event.target.value });

    console.log("miniute: "+event.target.value);
    console.log('airport: '+this.props.title);

        const icao = this.props.title;
        const startTime = this.subtractMin(event.target.value);
        const endTime = this.subtractMin(0);
        const arrurl = 'https://opensky-network.org/api/flights/arrival?airport='+icao+'&begin='+startTime+'&end='+endTime+'';
        //const arrurl = "https://opensky-network.org/api/flights/arrival?airport=EDDF&begin=1517227200&end=1517230800";
        axios.get(arrurl)
                    .then(response => {
                        const updateArrivals = response.data;
                        console.log(updateArrivals);
                        this.setState({arrivals:updateArrivals});
                        this.setState({ArrError:false});
                    })
                    .catch(ArrError => {
                        this.setState({ArrError:true});
                    });
        
         const depurl = 'https://opensky-network.org/api/flights/arrival?airport='+icao+'&begin='+startTime+'&end='+endTime+'';
         //const depurl = "https://opensky-network.org/api/flights/departure?airport=EDDF&begin=1517227200&end=1517230800";      
         axios.get(depurl)
                    .then(response => {
                        const updateDeparture = response.data;
                        console.log(updateDeparture);
                        this.setState({departures:updateDeparture});
                        this.setState({DepartError:false});
                    }) 
                    .catch(DepartError => {
                      this.setState({DepartError:true});
                    });  
          
        
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    //Arrival
    let arrList;
     if(!this.state.ArrError){
      arrList = this.state.arrivals.map(row => (
        <TableRow key={row.icao24}>
          <TableCell align="right" component="th" scope="row">
              {row.icao24}
          </TableCell>
          <TableCell align="right">{row.lastSeen}</TableCell>
        </TableRow>
      ))
    }else{
      arrList = 
      <TableRow>
        <TableCell rowSpan={2} align="right" component="th" scope="row">
            No Data
        </TableCell>
      <TableCell align="right"></TableCell>
    </TableRow>
    }

    //Departure
    let departList;
     if(!this.state.ArrError){
      departList = this.state.departures.map(row => (
        <TableRow key={row.icao24}>
          <TableCell align="right" component="th" scope="row">
              {row.icao24}
          </TableCell>
          <TableCell align="right">{row.firstSeen}</TableCell>
        </TableRow>
      ))
    }else{
      departList = 
      <TableRow>
        <TableCell rowSpan={2} align="right" component="th" scope="row">
            No Data
        </TableCell>
      <TableCell align="right"></TableCell>
    </TableRow>
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Arrival"/>
            <Tab label="Departure" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell align="right">ICAO number</TableCell>
                        <TableCell align="right">Arrival Time</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                     {arrList} 
                    </TableBody>
                </Table>
          </TabContainer>
          <TabContainer dir={theme.direction}>
                 <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell align="right">ICAO number</TableCell>
                        <TableCell align="right">Departure Time</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                     {departList}
                    </TableBody>
                </Table>
          </TabContainer>
        </SwipeableViews>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Minute</InputLabel>
          <Select
            native
            value={this.state.min}
            onChange={(event) => this.handleChangeMin(event,'min')}
            inputProps={{
              name: 'age',
              id: 'age-native-simple',
            }}
          >
            <option value="" />
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </Select>
        </FormControl>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);