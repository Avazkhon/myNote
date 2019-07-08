import ADD_NOTE from 'constants/index';

export function addNote(id, text, range) {
	return (
		type: ADD_NOTE,
		id,
		text,
		range,
	)
};
