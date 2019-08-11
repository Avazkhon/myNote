import {
	CREATE_NEW_NOTE,
	SAVE_NOTE,
	SELECT_NOTE,
} from '../constants/index';

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

export function selectNote(node) {
	return ({
		type: SELECT_NOTE,
		activeNote: node,
	})
}
