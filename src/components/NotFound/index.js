// @flow
import * as React from 'react';
import injectSheet from 'react-jss';

type Props = {
  classes: Object,
};

const styles = {
  wrapper: {
    height: window.innerHeight - 220,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    display: 'block',
    marginBottom: 20,
  },
};

class NotFound extends React.PureComponent<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.title}>
          404
        </div>
        <div>Halaman tidak ditemukan</div>
      </div>
    );
  }
}

export default injectSheet(styles)(NotFound);
