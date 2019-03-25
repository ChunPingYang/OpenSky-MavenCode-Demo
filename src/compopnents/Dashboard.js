import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    maxWidth: 300,
    maxHeight: 300,
    margin: 10
  },
  media: {
    objectFit: 'cover',
  },
});

function dashboard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography component="p">
              {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={props.clicked}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(dashboard);