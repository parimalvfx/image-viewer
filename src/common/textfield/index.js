import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});


class TextField extends React.Component {
 

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        
        <TextField
          id="standard-with-placeholder"
          label="With placeholder"
          placeholder="Placeholder"
          className={classes.textField}
          margin="normal"
        />
      </form>
    );
  }
}

TextField.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default withStyles(styles)(TextField);