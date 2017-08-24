import * as React from 'react';
import {Grid, Typography} from 'material-ui';
import withRoot from '../components/withRoot';
import MyLayout from '../components/myLayout';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorMounted: false
        };
    }

    componentDidMount() {
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({editorMounted: true});
    }

    render() {
        return (
            <MyLayout>
                <Typography>
                    test
                </Typography>
            </MyLayout>
        );
    }
}

export default withRoot(Index);
