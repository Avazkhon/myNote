import {
	CREATE_NEW_NOTE,
	SAVE_NOTE,
} from '../constants/index';

let initState = [
	{
		id: 0,
		text: 'tar tar',
	},
	{
		id: 1,
		text: 'tar mar',
	},
	{
		id: 2,
		text: 'mar tar',
	},
]

export function note(state = initState, action) {
	if (action.type === CREATE_NEW_NOTE) {
		return [
		...state,
			{
				id: action.id,
				text: action.text,
			}
		]
	}

	if (action.type === SAVE_NOTE) {
		return [
			...state.map((note)=> {
				if (note.id === action.id) {
					return {
						...note,
						text: action.text
					}
				}
				return note
			})
		]
	}

	return state
};
