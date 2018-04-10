// @flow
import * as React from 'react';
import injectSheet from 'react-jss';

type Props = {
  classes: Object,
};

const styles = theme => ({
  wrapper: {
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    margin: [[0, 18]],
    borderBottom: '1px solid #cccccc',
    '@media (min-width: 860px)': {
      height: 400,
    },
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    display: 'block',
    marginTop: 0,
    marginBottom: 10,
  },
  subTitle: {
    fontWeight: 400,
    fontSize: 18,
    margin: 0,
    color: theme.textMuted,
  },
});

class HomeIntro extends React.PureComponent<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <h1 className={classes.title}>
          WWWID
        </h1>
        <h2 className={classes.subTitle}>
          Update tren pengembangan web modern
        </h2>
      </div>
    );
  }
}

export default injectSheet(styles)(HomeIntro);
