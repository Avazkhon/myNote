import {
	CREATE_NEW_NOTE,
	SAVE_NOTE,
	SELECT_NOTE,
} from '../constants/index';

let initState = {
	activeNote: null,
	noteItems: [
		{
			id: 0,
			text: 'tar tar',
			title: 'tar tar',
		},
	],
	setting: [
		{
			id: 1,
			title: 'New note',
			name: 'isShowCreateNewNote'
		},
		{
			id: 2,
			title: 'Select note',
			name: 'isShowSelectNote'
		}
	]
}

export function note(state = initState, action) {
	if (action.type === CREATE_NEW_NOTE) {
		return {
			...state,
			activeNote: {
				id: action.id,
			},
			noteItems: [
			...state.noteItems,
				{
					id: action.id,
					text: action.text,
					title: action.title,
				}
			]
		}
	}

	if (action.type === SAVE_NOTE) {
		return {
			...state,
			noteItems: [
				...state.noteItems.map((note)=> {
					if (note.id === Number(action.id)) {
						return {
							...note,
							text: action.text
						}
					}
					return note
				})
			]
		}
	}

	if (action.type === SELECT_NOTE) {
		return {
			...state,
			activeNote: state.noteItems.find((n) => n.id === Number(action.activeNote))
		}
	}

	return state
};
