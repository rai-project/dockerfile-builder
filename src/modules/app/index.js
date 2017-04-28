import codeEditorButtonClicked from './signals/codeEditorButtonClicked';

export default {
	state: {
		name: 'RAI Dockerfile Builder',
		isLoading: true,
		isSaving: false,
		isBuilding: false,
	},
	signals: {
		codeEditorButtonClicked,
	},
};
