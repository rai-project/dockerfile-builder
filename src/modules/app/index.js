import appLoaded from "./signals/appLoaded";
import navbarClicked from "./signals/navbarClicked";
import codeEditorButtonClicked from "./signals/codeEditorButtonClicked";
import terminalOutputAppended from "./signals/terminalOutputAppended";

const defaultEditorDirectory = {
  Dockerfile: {
    content: `FROM rai/nccl:8.0
MAINTAINER Abdul Dakkak <dakkak@illinois.edu>

WORKDIR /usr/local
RUN git clone https://github.com/cuMF/cumf_als && \
    git clone https://github.com/cuMF/cumf_sgd && \
    git clone https://github.com/cuMF/cumf_ccd

WORKDIR /usr/local/cumf_sgd/data/netflix/
RUN curl -fsSL http://www.select.cs.cmu.edu/code/graphlab/datasets/netflix_mme -O
RUN curl -fsSL http://www.select.cs.cmu.edu/code/graphlab/datasets/netflix_mm -O

RUN cd /usr/local/cumf_sgd/data/netflix && \
    make transform && \
    ./transform netflix_mme && \
    ./transform netflix_mm
    `
  }
};

export default {
  state: {
    name: "Dockerfile Builder for Power",
    isLoaded: false,
    isSaving: false,
    isBuilding: false,
    terminalOutput: [],
    editor: {
      currentFile: null,
      mode: "dockerfile",
      files: defaultEditorDirectory
    }
  },
  signals: {
    appLoaded,
    navbarClicked,
    codeEditorButtonClicked,
    terminalOutputAppended
  }
};
