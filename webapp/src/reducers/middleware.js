import {
	CREATE_NEW_NOTE,
	SAVE_NOTE,
	// SELECT_NOTE,
	// SELECT_SETTING,
	DELETE_NOTE,
	// SELECT_CHAPTER,
	CREATE_NEW_CHPATER,
	// SHOW_NAV_MENU,
	// SELECT_SETTING_ALL,
	DELETE_CHAPTER,
	CHANGE_TITLE_CHAPTER,
	CHANGE_TITLE_NOTE,
	// SELECT_BACKGROUND_IMG,
	CLEAR_DATA,
	// SELECT_BACKGROUND_COLOR,
} from '../constants/index';

 function midlwaire (state, action) {
	 if (
		 action.type === CREATE_NEW_NOTE
		 || action.type === DELETE_NOTE
		 || action.type === CREATE_NEW_CHPATER
		 || action.type === CHANGE_TITLE_CHAPTER
		 || action.type === DELETE_CHAPTER
		 || action.type === CHANGE_TITLE_NOTE
		 || action.type === SAVE_NOTE
		 || action.type === CLEAR_DATA
		 || action.type === "@@INIT"
		) {
			const noteItems = state.noteItems;
			const plainItem = [];
			for (let i = 0; i < noteItems.length; i++) {
				plainItem.push(noteItems[i]);
				if (noteItems[i].chapters.length) {
					for (let j = 0; j < noteItems[i].chapters.length; j++) {
						plainItem.push(noteItems[i].chapters[j]);
					}
				}
			}

			state = {
				...state,
				plainItem,
			}
		}

  return state;
}

export default midlwaire;
