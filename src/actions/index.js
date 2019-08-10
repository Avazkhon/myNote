import {
	CREATE_NEW_NOTE,
	SAVE_NOTE,
} from '../constants/index';

export function createNewNote(id, text) {
	return (
		{
			type: CREATE_NEW_NOTE,
			id,
			text,
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
