import codeEditorButtonClicked from "./signals/codeEditorButtonClicked";
import terminalOutputAppended from "./signals/terminalOutputAppended";

export default {
  state: {
    name: "Dockerfile Builder for Power",
    isLoading: true,
    isSaving: false,
    isBuilding: false,
    terminalOutput: []
  },
  signals: {
    codeEditorButtonClicked,
    terminalOutputAppended
  }
};
