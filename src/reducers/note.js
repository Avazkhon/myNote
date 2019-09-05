import { load } from 'redux-localstorage-simple';
import {
	CREATE_NEW_NOTE,
	SAVE_NOTE,
	SELECT_NOTE,
	SELECT_SETTING,
	DELETE_NOTE,
	SELECT_CHAPTER,
	CREATE_NEW_CHPATER,
} from '../constants/index';

let initState = load({'namespace': 'reduxState'})

if (!initState || !initState.note) {
	const id = Date.now();
	initState = {
		note: {
			activeNote: {id: null},
			noteItems: [
				{
					id,
					text: 'tar tar',
					title: 'tar tar',
					createDate: Date(Date.now()),
					activeChapter: id,
					chapters: [
						{
							title: 'tar tares',
							text: 'more tar tares',
							id: Date.now() + 27,
						}
					]
				},
			],
			mainSetting: {
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
			activeNote: action.note,
			noteItems: [
			...state.noteItems,
				action.note,
			]
		}
	}

	if (action.type === CREATE_NEW_CHPATER) {
		return {
			...state,
			activeNote:{
				...state.activeNote,
				chapters: [
					...state.activeNote.chapters,
					action.chapter,
				],
			},
			noteItems: [
				...state.noteItems.filter((note) => {
					if (note.id === Number(action.id)) {
						note.chapters = [
							...note.chapters,
							action.chapter,
						]
					}
					return note;
				})
			]
		}
	}

	if (action.type === SAVE_NOTE) {
		console.log(state.activeNote.activeChapter === action.id ? action.text : note.text)
		return {
			...state,
			activeNote: {
				...state.activeNote,
				text: state.activeNote.activeChapter === action.id ? action.text : state.activeNote.text,
				chapters: state.activeNote.chapters.map((chapter) => {
					if (chapter.id === action.activeChapter) {
						return ({
							...chapter,
							text: action.text,
						})
					}
					return chapter;
				}),
				activeChapter: action.activeChapter,
			},
			noteItems: [
				...state.noteItems.map((note)=> {
					if (note.id === Number(action.id)) {
						return {
							...note,
							text: action.activeChapter === action.id ? action.text : note.text,
							chapters: note.chapters.map((chapter) => {
								if (chapter.id === action.activeChapter) {
									return ({
										...chapter,
										text: action.text,
									})
								}
								return chapter;
							})
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

	if (action.type === SELECT_CHAPTER) {
		return {
			...state,
			activeNote: {
				...state.activeNote,
				activeChapter: action.activeChapter,
			}
		}
	}

	if (action.type === SELECT_SETTING) {
		return {
			...state,
			mainSetting:{
				...state.mainSetting,
				isContentSetting: action.nameSetting,
			}
		}
	}

	return state
};
