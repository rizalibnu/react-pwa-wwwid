const styles = {
  '@global': {
    html: {
      padding: 0,
      margin: 0,
    },
    body: {
      margin: 0,
      padding: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    },
    ':focus': {
      outline: 0,
    },
    a: {
      textDecoration: 'none',
    },
    h1: {
      fontSize: 28,
    },
    h2: {
      fontSize: 21,
    },
    h3: {
      fontSize: 18,
    },
    '.heading': {
      letterSpacing: '-0.01em',
      lineHeight: 1.45,
      color: '#171717',
      marginTop: 0,
      paddingTop: 0,
    },
    figure: {
      margin: [[30, 0]],
      '& img': {
        width: '100vw',
        maxWidth: '100vw',
        marginLeft: -18,
        height: 'auto',
        '@media (min-width: 860px)': {
          width: '100%',
          maxWidth: '100%',
          marginLeft: 0,
          height: 'auto',
        },
      },
    },
    figcaption: {
      color: '#707070',
      fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      fontSize: 12,
      textAlign: 'center',
      lineHeight: 1.35,
    },
    '.placeholder': {
      backgroundColor: '#eeeeee',
      height: 10,
      marginBottom: 10,
      '@media (min-width: 860px)': {
        height: 15,
        marginBottom: 15,
      },
    },
  },
};

export default styles;
