// @flow
// Fork of react-sidebar https://github.com/balloob/react-sidebar
import * as React from 'react';

type Props = {
  // main content to render
  children?: React.Node,

  // styles
  styles: Object,

  // root component optional class
  rootClassName: string,

  // sidebar optional class
  sidebarClassName: string,

  // content optional class
  contentClassName: string,

  // overlay optional class
  overlayClassName: string,

  // sidebar content to render
  sidebar: React.Node,

  // boolean if sidebar should slide open
  open: bool,

  // boolean if transitions should be disabled
  transitions: bool,

  // Place the sidebar on the right
  pullRight: bool,

  // Enable/Disable sidebar shadow
  shadow: bool,

  // callback called when the overlay is clicked
  onSetOpen: Function,

  // Intial sidebar width when page loads
  defaultSidebarWidth: number,
};

const defaultStyles = {
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  sidebar: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    transition: 'transform .3s ease-out',
    WebkitTransition: '-webkit-transform .3s ease-out',
    willChange: 'transform',
    overflowY: 'auto',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
    transition: 'left .3s ease-out, right .3s ease-out',
  },
  overlay: {
    zIndex: 1,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity .3s ease-out, visibility .3s ease-out',
    backgroundColor: 'rgba(0,0,0,.3)',
  },
};

class Sidebar extends React.Component<Props> {
  static defaultProps = {
    open: false,
    transitions: true,
    pullRight: false,
    shadow: true,
    onSetOpen: () => {},
    styles: {},
    defaultSidebarWidth: 0,
    rootClassName: '',
    sidebarClassName: '',
    contentClassName: '',
    overlayClassName: '',
  }

  overlayClicked = () => {
    if (this.props.open) {
      this.props.onSetOpen(false);
    }
  }

  render() {
    const sidebarStyle = { ...defaultStyles.sidebar, ...this.props.styles.sidebar };
    const contentStyle = { ...defaultStyles.content, ...this.props.styles.content };
    const overlayStyle = { ...defaultStyles.overlay, ...this.props.styles.overlay };
    const rootProps = {
      className: this.props.rootClassName,
      style: { ...defaultStyles.root, ...this.props.styles.root },
      role: 'navigation',
    };

    // sidebarStyle right/left
    if (this.props.pullRight) {
      sidebarStyle.right = 0;
      sidebarStyle.transform = 'translateX(100%)';
      sidebarStyle.WebkitTransform = 'translateX(100%)';
      if (this.props.shadow) {
        sidebarStyle.boxShadow = '-2px 2px 4px rgba(0, 0, 0, 0.15)';
      }
    } else {
      sidebarStyle.left = 0;
      sidebarStyle.transform = 'translateX(-100%)';
      sidebarStyle.WebkitTransform = 'translateX(-100%)';
      if (this.props.shadow) {
        sidebarStyle.boxShadow = '2px 2px 4px rgba(0, 0, 0, 0.15)';
      }
    }

    if (this.props.open) {
      // slide open sidebar
      sidebarStyle.transform = 'translateX(0%)';
      sidebarStyle.WebkitTransform = 'translateX(0%)';

      // show overlay
      overlayStyle.opacity = 1;
      overlayStyle.visibility = 'visible';
    }

    return (
      <div {...rootProps}>
        <div className={this.props.sidebarClassName} style={sidebarStyle}>
          {this.props.sidebar}
        </div>
        <div
          className={this.props.overlayClassName}
          style={overlayStyle}
          role="presentation"
          onClick={this.overlayClicked}
        />
        <div className={this.props.contentClassName} style={contentStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Sidebar;
