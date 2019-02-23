import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
  paper: {
    position:'absolute',
    top:'50%',
    left:'50%',
    transform: 'translate(-50%, -50%)',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

class ModalBox extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, openModal, closeModal, widthClass } = this.props;

    return (
      <div>
        {/* <Typography gutterBottom>Click to get the full Modal experience!</Typography>
        <Button onClick={this.handleOpen}>Open Modal</Button> */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openModal}
          onClose={closeModal}
        >
        <div className={classNames(classes.paper, widthClass)}>{this.props.children}</div>
        </Modal>
      </div>
    );
  }
}

ModalBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModalBox);