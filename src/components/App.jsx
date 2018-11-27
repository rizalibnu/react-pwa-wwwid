// @flow
import * as React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

import Routes from './Routes';
import globalStyles from '../globalStyles';
import Sidebar from './Sidebar';
import SidebarContent from './Sidebar/SidebarContent';

type Props = {
  classes: Object,
};

type State = {
  sidebarOpen: boolean,
};

const styles = theme => ({
  ...globalStyles,
  container: {
    maxWidth: 1000,
    margin: [[0, 'auto']],
  },
  header: {
    top: 0,
    width: '100%',
    position: 'fixed',
    left: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 65,
  },
  logo: {
    width: 45,
    height: 45,
  },
  menuButton: {
    border: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    padding: [[0, 18]],
  },
  menuIcon: {
    width: 20,
    height: 20,
  },
  leftHeader: {
    display: 'flex',
    padding: [[15, 0, 15, 0]],
    flexGrow: 1,
    textAlign: 'center',
    maxHeight: 50,
  },
  github: {
    display: 'flex',
    padding: [[15, 18]],
    flexGrow: 1,
    textAlign: 'center',
    maxHeight: 50,
    justifyContent: 'center',
  },
  githubIcon: {
    height: '1em',
    marginRight: 8,
    display: 'inline-block',
  },
  githubTitle: {
    color: theme.baseColor,
  },
  content: {
    marginTop: 65,
  },
  footer: {
    width: '100%',
  },
  footerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    padding: [[0, 18]],
    color: theme.textMuted,
    fontSize: 14,
    borderTop: '1px solid rgba(0,0,0,.15)',
    '@media (min-width: 860px)': {
      padding: 0,
    },
    '& a': {
      color: theme.textMuted,
    },
  },
});

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sidebarOpen: false,
    };
  }

  componentDidMount() {
    const elem = document.getElementById('startingLoader');
    window.onload = () => {
      if (elem) {
        elem.remove();
      }
    };
  }

  onSetSidebarOpen = (open) => {
    this.setState({ sidebarOpen: open });
  }

  handleCallbackCloseSidebar = (newState) => {
    this.setState({ sidebarOpen: !newState });
  }

  menuButtonClick = () => {
    this.onSetSidebarOpen(!this.state.sidebarOpen);
  }

  render() {
    const { classes } = this.props;
    const sidebarContent = (
      <SidebarContent
        callbackCloseSidebar={newState => this.handleCallbackCloseSidebar(newState)}
      />
    );

    return (
      <div className="App">
        <Sidebar
          sidebar={sidebarContent}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
        >
          <header className={classes.header}>
            <div className={classes.container}>
              <div className={classes.headerWrapper}>
                <div className={classes.leftHeader}>
                  <button className={classes.menuButton} onClick={this.menuButtonClick} type="button">
                    <svg className={classes.menuIcon} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 101">
                      <title>hamburger menu</title>
                      <line x1="5" y1="5" x2="125" y2="5" fill="none" stroke="#171717" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10" />
                      <line x1="5" y1="50.5" x2="125" y2="50.5" fill="none" stroke="#171717" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10" />
                      <line x1="5" y1="96" x2="125" y2="96" fill="none" stroke="#171717" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10" />
                    </svg>
                  </button>
                  <Link to="/">
                    <svg className={classes.logo} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
                      <title>react logo</title>
                      <g fill="#61DAFB">
                        <path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z" />
                        <circle cx="420.9" cy="296.5" r="45.7" />
                        <path d="M520.5 78.1z" />
                      </g>
                    </svg>
                  </Link>
                </div>
                <div className={classes.rightHeader}>
                  <a href="https://github.com/rizalibnu/react-pwawwwid" target="_blank" rel="noopener noreferrer">
                    <span className={classes.github}>
                      <svg className={classes.githubIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <title>github logo</title>
                        <path d="M9.999 0C4.478 0 0 4.59 0 10.254c0 4.53 2.865 8.373 6.839 9.729.5.094.683-.223.683-.494 0-.243-.009-.888-.014-1.744-2.782.619-3.368-1.375-3.368-1.375-.455-1.184-1.11-1.5-1.11-1.5-.908-.636.069-.623.069-.623 1.004.073 1.532 1.057 1.532 1.057.892 1.567 2.34 1.114 2.91.852.091-.663.349-1.114.635-1.371-2.222-.259-4.556-1.139-4.556-5.068 0-1.119.39-2.035 1.029-2.751-.103-.26-.446-1.302.098-2.714 0 0 .84-.276 2.75 1.051a9.377 9.377 0 0 1 2.504-.345 9.394 9.394 0 0 1 2.504.345c1.909-1.327 2.747-1.051 2.747-1.051.546 1.412.202 2.454.1 2.713.641.717 1.028 1.632 1.028 2.751 0 3.939-2.338 4.806-4.566 5.059.359.317.679.942.679 1.899 0 1.371-.012 2.477-.012 2.813 0 .274.18.593.688.493C17.137 18.623 20 14.782 20 10.254 20 4.59 15.522 0 9.999 0z" />
                      </svg>
                      <span className={classes.githubTitle}>
                        GitHub
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </header>
          <div className={classes.content}>
            <div className={classes.container}>
              <Routes />
            </div>
          </div>
          <footer className={classes.footer}>
            <div className={classes.container}>
              <div className={classes.footerWrapper}>
                <span>Built with &hearts; in Jakarta & Cilacap</span>
                <a href="http://rizalibnu.com" target="_blank" rel="noopener noreferrer">
                  rizalibnu.com
                </a>
              </div>
            </div>
          </footer>
        </Sidebar>
      </div>
    );
  }
}

export default injectSheet(styles)(App);
