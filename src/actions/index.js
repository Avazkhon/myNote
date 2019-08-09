import { SAVE_NOTE } from '../constants/index';

export function saveNote(id, text, range) {
	return (
		{
			type: SAVE_NOTE,
			id,
			text,
			range,
		}
	)
};
