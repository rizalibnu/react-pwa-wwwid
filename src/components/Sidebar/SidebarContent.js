// @flow
import * as React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

type Props = {
  classes: Object,
  categories: Array<Object>,
  callbackCloseSidebar: Function,
};

type State = {};

const styles = theme => ({
  wrapper: {
    backgroundColor: 'white',
    width: 256,
    height: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
  },
  logo: {
    width: 100,
    height: 100,
    display: 'block',
  },
  brandTitle: {
    display: 'block',
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.baseColor,
  },
  body: {
    padding: [[30, 18]],
    backgroundColor: 'white',
  },
  menu: {
    display: 'block',
    padding: [[16, 0]],
    color: theme.textMuted,
    textDecoration: 'none',
  },
});

class SidebarContent extends React.PureComponent<Props, State> {
  static defaultProps = {
    categories: [],
  }

  handleClick = () => {
    this.props.callbackCloseSidebar(true);
  }

  render() {
    const { classes, categories } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.body}>
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/categories/${category.slug}`}
              className={classes.menu}
              onClick={this.handleClick}
            >
              {category.title}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.feedReducer.categories,
    isLoading: state.feedReducerIsLoading,
    hasErrored: state.feedReducerHasErrored,
    hasFailed: state.feedReducerHasFailed,
  };
}

export default compose(
  injectSheet(styles),
  connect(mapStateToProps),
)(SidebarContent);
