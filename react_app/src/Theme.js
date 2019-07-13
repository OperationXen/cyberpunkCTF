import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const cyberpunkTheme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

export default cyberpunkTheme