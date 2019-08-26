import { load } from 'redux-localstorage-simple';
import {
	CREATE_NEW_NOTE,
	SAVE_NOTE,
	SELECT_NOTE,
	SELECT_SETTING,
	DELETE_NOTE,
} from '../constants/index';

let initState = load({'namespace': 'reduxState'})

if (!initState || !initState.note) {
	initState = {
		note: {
			activeNote: {id: null},
			noteItems: [
				{
					id: 1,
					text: 'tar tar',
					title: 'tar tar',
				},
			],
			setting: {
				isContentSetting: null,
				itemsSetting: [
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
		}
	};
};

export function note(state = initState.note, action) {
	if (action.type === CREATE_NEW_NOTE) {
		return {
			...state,
			activeNote: {
				id: action.id,
				text: action.text,
				title: action.title,
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

	if (action.type === DELETE_NOTE) {
		return {
			...state,
			activeNote: {id: null},
			noteItems: [
				...state.noteItems.filter( note => note.id !== action.id)
			]
		}
	}

	if (action.type === SELECT_NOTE) {
		return {
			...state,
			activeNote: state.noteItems.find((n) => n.id === Number(action.activeNote))
		}
	}

	if (action.type === SELECT_SETTING) {
		return {
			...state,
			setting:{
				...state.setting,
				isContentSetting: action.nameSetting,
			}
		}
	}

	return state
};
