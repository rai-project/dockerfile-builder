import codeEditorButtonClicked from './signals/codeEditorButtonClicked';

export default {
	state: {
		name: 'Dockerfile Builder for Power',
		isLoading: true,
		isSaving: false,
		isBuilding: false,
	},
	signals: {
		codeEditorButtonClicked,
	},
};
