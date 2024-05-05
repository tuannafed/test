import { theme } from 'themes';

export const classes = {
  root: {
    display: 'flex',
    borderWidth: 2,
    padding: 4,
    borderRadius: 4,
    borderColor: '#DADADA',
    borderStyle: 'dashed',
    color: '#828282',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    marginTop: '12px',
    minHeight: '136px'
  },
  uploadFormInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%'
  },

  active: {
    borderColor: theme.palette.success.main
  },

  accept: {
    borderColor: '#00e676'
  },

  reject: {
    borderColor: theme.palette.error.main
  },

  btnUpload: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
    marginBottom: '8px',
    color: theme.palette.primary.main,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.palette.primary.main,
    borderStyle: 'solid',
    minHeight: '32px',
    minWidth: '110px'
  },
  thumbsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: '100%'
  },
  thumbItem: {
    padding: 2,
    borderRadius: 4,
    border: '1px solid #eaeaea',
    margin: 4,
    width: 'calc(100% / 5 - 8px)'
  }
};
