/**
 * Import the global LESS files. Imports for component LESS files are added by
 * babel-plugin-transform-semantic-ui-react-imports depending on which components from semantic-ui-react are used.
 */

/* Global */

// // eslint-disable-next-line import/no-webpack-loader-syntax
// import 'style-loader!css-loader!semantic-ui-less-module-loader?siteFolder=src/semantic-ui-theme&themeConfigPath=src/semantic-ui-theme!semantic-ui-less/definitions/globals/reset.less';

// // eslint-disable-next-line import/no-webpack-loader-syntax
// import 'style-loader!css-loader!semantic-ui-less-module-loader?siteFolder=src/semantic-ui-theme&themeConfigPath=src/semantic-ui-theme!semantic-ui-less/definitions/globals/site.less';

// eslint-disable-next-line import/no-webpack-loader-syntax
import "semantic-ui-less/definitions/globals/reset.less";

// eslint-disable-next-line import/no-webpack-loader-syntax
import "semantic-ui-less/definitions/globals/site.less";
