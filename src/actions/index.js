import { CREATE_NEW_NOTE } from '../constants/index';

export function createNewNote(id, text, range) {
	return (
		{
			type: CREATE_NEW_NOTE,
			id,
			text,
			range,
		}
	)
};
