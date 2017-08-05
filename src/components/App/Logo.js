import { connect } from "cerebral/react";
import React from "react";
import Image from "grommet/components/Image";

import logo from "../../assets/logo.svg";

export default connect({}, function Logo(props) {
  return <Image src={logo} {...props} />;
});
