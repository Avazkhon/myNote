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
	CLEAR_DATA,
} from '../constants/index';

export function selectSetting(nameSetting) {
	return (
		{
			type: SELECT_SETTING,
			nameSetting
		}
	)
};

export function selectSettingAll(nameSetting, isContentSetting) {
	return (
		{
			type: SELECT_SETTING_ALL,
			nameSetting,
			isContentSetting,
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

export function deleteChapter(idNote, idChapter) {
	return (
		{
			type: DELETE_CHAPTER,
			idNote,
			idChapter,
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

export function changeTitleChapter(idNote, idChapter, title) {
	return ({
		type: CHANGE_TITLE_CHAPTER,
		idNote,
		idChapter,
		title
	})
}

export function changeTitleNote(idNote, title) {
	return ({
		type: CHANGE_TITLE_NOTE,
		idNote,
		title
	})
}

export function selectBackgroundImage(id) {
	return ({
		type: SELECT_BACKGROUND_IMG,
		id,
	})
}
export function clearData(id) {
	return ({
		type: CLEAR_DATA,
	})
}
