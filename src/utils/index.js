function getLengthTextNote (activeNote) {
		let size = activeNote.chapters.map((chapter) => {
			if (chapter.text.length === 0) {
				return 0
			}

			return Number(chapter.text.split(' ').length);
		})

	size[0] += (activeNote.text.length > 0)  ? Number(activeNote.text.split(' ').length) : 0;
	return size[0] ? size[0] - 0 : 0;
}

function findText (note, textFind) {
	let item = note.activeNote.chapters.filter((item) => item.text.match(textFind))
	let text2 = item.filter((chapter) => {
		if (chapter.text.match(textFind)) {
			return chapter.id;
		}
		return null;
	})
	return text2;
}
export {
	getLengthTextNote,
	findText,
}
