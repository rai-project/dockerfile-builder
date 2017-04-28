import { connect } from 'cerebral/react';
import React from 'react';
import XButton from 'grommet/components/Button';

export default connect({}, function Button(props) {
	return <XButton {...props} />;
});
