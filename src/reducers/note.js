import { ADD_NOTE } from '../constants/index';

let initState = [
	{
		id: 0,
		text: 'tar tar',
		range: 1,
	},
	{
		id: 1,
		text: 'tar mar',
		range: 1,
	},
	{
		id: 2,
		text: 'mar tar',
		range: 1,
	},
]

export function note(state = initState, action) {
	if (action.type === ADD_NOTE) {
		return [
		...state,
			{
				id: action.id,
				text: action.text,
				range: action.range,
			}
		]
	}
	return state
};