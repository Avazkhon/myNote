import {
	CREATE_NEW_NOTE,
	SAVE_NOTE,
	SELECT_NOTE,
	SELECT_SETTING,
	DELETE_NOTE,
	SELECT_CHAPTER,
	CREATE_NEW_CHPATER,
	SHOW_NAV_MENU,
} from '../constants/index';

export function selectSetting(nameSetting) {
	return (
		{
			type: SELECT_SETTING,
			nameSetting
		}
	)
};

export function createNewNote(note) {
	return (
		{
			type: CREATE_NEW_NOTE,
			note,
		}
	)
};

export function createNewChapter(id, chapter) {
	return (
		{
			type: CREATE_NEW_CHPATER,
			id,
			chapter,
		}
	)
};

export function saveNote(id, text, activeChapter) {
	return (
		{
			type: SAVE_NOTE,
			id,
			text,
			activeChapter,
		}
	)
};

export function deleteNote(id) {
	return (
		{
			type: DELETE_NOTE,
			id,
		}
	)
};

export function selectNote(id) {
	return ({
		type: SELECT_NOTE,
		activeNote: id,
	})
}

export function selectChapter(id) {
	return ({
		type: SELECT_CHAPTER,
		activeChapter: id,
	})
}

export function showNavMenu(name) {
	return ({
		type: SHOW_NAV_MENU,
		name
	})
}
