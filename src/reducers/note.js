import { load } from 'redux-localstorage-simple';
import {
	CREATE_NEW_NOTE,
	SAVE_NOTE,
	SELECT_NOTE,
	SELECT_SETTING,
	DELETE_NOTE,
	SELECT_CHAPTER,
	CREATE_NEW_CHPATER,
	SHOW_NAV_MENU,
	SELECT_SETTING_ALL,
	DELETE_CHAPTER,
	CHANGE_TITLE_CHAPTER,
	CHANGE_TITLE_NOTE,
	SELECT_BACKGROUND_IMG,
} from '../constants/index';

import getInitState from './getInitState';

const initState = getInitState(load({'namespace': 'reduxState'}));

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

	if (action.type === DELETE_CHAPTER) {
		const activeNote = [
			...state.noteItems.filter( note => {
				if (note.id === action.idNote) {
					note.chapters = [
							...note.chapters.filter( chapter => chapter.id !== action.idChapter)
					]
				}
				return note
			})
		];

		return {
			...state,
			activeNote: {
				...state.activeNote,
				chapters: [...state.activeNote.chapters.filter( chapter => chapter.id !== action.idChapter)]
			},

			noteItems: [...activeNote]
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
		const isContentSetting = action.nameSetting ? action.nameSetting : null;
		return {
			...state,
			mainSetting:{
				...state.mainSetting,
				isContentSetting: isContentSetting,
			}
		}
	}

	if (action.type === SELECT_SETTING_ALL) {
		let isContentSetting = action.isContentSetting;
		if (state[action.nameSetting].isContentSetting === action.isContentSetting) {
			isContentSetting = null;
		}

		return {
			...state,
			[action.nameSetting]:{
				...state[action.nameSetting],
				isContentSetting: isContentSetting,
			}
		}
	}

	if (action.type === SHOW_NAV_MENU) {
		return {
			...state,
			navMenu:{
				...state.navMenu,
				isContentSetting: action.name,
			}
		}
	}


	if (action.type === CHANGE_TITLE_CHAPTER) {
		return {
			...state,
			activeNote: {
				...state.activeNote,
				chapters: [...state.activeNote.chapters.map( chapter => {
					if (chapter.id === action.idChapter) {
						chapter.title = action.title
					}
					return chapter
				})]
			},

			noteItems: [
				...state.noteItems.map( note => {
					if (note.id === action.idNote) {

						note.chapters = [
							...note.chapters.map( chapter => {
								if (chapter.id === action.idChapter) {
									chapter.title = action.title
								}
								return chapter
							})
						]
					}

					return note
				})
			],
		}
	}

	if (action.type === CHANGE_TITLE_NOTE) {
		return {
			...state,
			activeNote: {
				...state.activeNote,
				title: action.title,
			},

			noteItems: [
				...state.noteItems.map( note => {
					if (note.id === action.idNote) {
						note.title = action.title
					}

					return note
				})
			],
		}
	}

	if (action.type === SELECT_BACKGROUND_IMG) {
		return {
			...state,
			backgroundImage: {
				...state.backgroundImage,
				activeImg: action.id
			}
		}
	}

	return state
};
