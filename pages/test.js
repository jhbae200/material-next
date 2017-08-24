import * as React from 'react';
import {AppBar, Grid, IconButton, Toolbar, Typography} from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';
import withRoot from '../components/withRoot';

const code = `CREATE PROCEDURE spAcApiPurchaseItem(IN \`__user_idx\` BIGINT, IN \`__item_idx\` VARCHAR(10))
  BEGIN
DECLARE _price MEDIUMINT(9);
DECLARE _has_money MEDIUMINT(9);
DECLARE _item_idx VARCHAR(10);

	SELECT price INTO _price FROM tbAcItem WHERE item_idx = __item_idx;
    SELECT has_money INTO _has_money FROM tbAcUser WHERE user_idx = __user_idx;

IF _price IS NULL THEN
    SELECT -1 AS dberr, _has_money AS money;
ELSEIF _price > _has_money THEN
	SELECT -2 AS dberr, _has_money AS money;
ELSE
	SELECT item_idx INTO _item_idx FROM tbAcPurchaseItem WHERE user_idx = __user_idx AND item_idx = __item_idx;
    IF _item_idx IS NOT NULL THEN
		SELECT -3 AS dberr, _has_money AS money;
    ELSE
		START TRANSACTION;
		UPDATE tbAcUser SET has_money = (has_money - _price)  WHERE user_idx = __user_idx;
		INSERT INTO tbAcPurchaseItem(user_idx, item_idx, price) VALUES(__user_idx, __item_idx, _price);
        INSERT INTO tbAcUserOwn(user_idx, own_idx) VALUES(__user_idx, __item_idx);
		COMMIT;
		SELECT 1 AS dberr, (_has_money - _price) AS money;
	END IF;
END IF;
END;
`;
const Editor = (props) => {
    if (typeof window !== 'undefined') {
        const AceEditor = require('react-ace').default;
        require('brace/mode/mysql');
        require('brace/snippets/mysql');
        require('brace/theme/monokai');
        require('brace/ext/language_tools');
        require('brace/ext/searchbox');
        return <AceEditor {...props} />;
    }
    return null;
};

class Test extends React.Component {
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
            <div>
                <AppBar>
                    <Toolbar>
                        <IconButton color="contrast" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography type="title" color="inherit">
                            Title
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container style={{marginTop: 64}}>
                    <Grid item>
                        {this.state.editorMounted ? <Editor mode="mysql"
                            theme="monokai"
                            name="code"
                            width="1200px"
                            setOptions={{
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: true,
                                enableSnippets: true,
                                showLineNumbers: true,
                                maxLines: 30
                            }}
                            defaultValue={code}
                        /> : null}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withRoot(Test);
