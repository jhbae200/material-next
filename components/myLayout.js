import * as React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';
import MenuIcon from 'material-ui-icons/Menu';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import withWidth, {isWidthUp} from 'material-ui/utils/withWidth';
import {compose} from 'recompose';

const styles = (theme) => ({
    appBar: {
        width: 'calc(100% - 256px)',
        transition: 'width .2s',
        [theme.breakpoints.down('lg')]: {
            width: '100%'
        },
    },
    nav: {
        width: 256,
    },
    main: {
        marginTop: 64,
        float: 'left'
    }
});

class MyLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        };
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
    }

    handleDrawerToggle() {
        this.setState({drawerOpen: !this.state.drawerOpen});
    }

    handleDrawerClose() {
        this.setState({drawerOpen: false});
    }

    render() {
        let drawerDocked = isWidthUp('md', this.props.width);
        return (
            <div>
                <AppBar className={this.props.classes.appBar}>
                    <Toolbar>
                        <IconButton color="contrast" aria-label="Menu" onClick={this.handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                        <Typography type="title" color="inherit">
                            Title
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer anchor="left" open={drawerDocked || this.state.drawerOpen}
                        onRequestClose={this.handleDrawerClose} docked={drawerDocked}>
                    <div className={this.props.classes.nav}>
                        <List>
                            <ListItem button>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Inbox" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Drafts" />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem button>
                                <ListItemText primary="Trash" />
                            </ListItem>
                            <ListItem button component="a" href="#simple-list">
                                <ListItemText primary="Spam" />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <div className={this.props.classes.main}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

MyLayout.propTypes = {
    width: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
};

export default compose(withStyles(styles), withWidth())(MyLayout);