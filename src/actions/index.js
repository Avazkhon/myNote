import {
	CREATE_NEW_NOTE,
	SAVE_NOTE,
	SELECT_NOTE,
	SELECT_SETTING,
} from '../constants/index';

export function selectSetting(nameSetting) {
	return (
		{
			type: SELECT_SETTING,
			nameSetting
		}
	)
};

export function createNewNote(id, text, title) {
	return (
		{
			type: CREATE_NEW_NOTE,
			id,
			text,
			title,
		}
	)
};

export function saveNote(id, text) {
	return (
		{
			type: SAVE_NOTE,
			id,
			text,
		}
	)
};

export function selectNote(id) {
	return ({
		type: SELECT_NOTE,
		activeNote: id,
	})
}
