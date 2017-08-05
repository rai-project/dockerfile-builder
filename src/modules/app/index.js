import appLoaded from "./signals/appLoaded";
import navbarClicked from "./signals/navbarClicked";
import codeEditorButtonClicked from "./signals/codeEditorButtonClicked";
import terminalOutputAppended from "./signals/terminalOutputAppended";

export default {
  state: {
    name: "Dockerfile Builder for Power",
    isLoaded: false,
    isLoading: true,
    isSaving: false,
    isBuilding: false,
    terminalOutput: []
  },
  signals: {
    appLoaded,
    navbarClicked,
    codeEditorButtonClicked,
    terminalOutputAppended
  }
};
