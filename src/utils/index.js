function getLengthTextNote (note) {
	let size = note.noteItems.map((itm) => {

		let size = itm.chapters.map((chapter) => {
			if (chapter.text.length === 0) {
				return 0
			}

			return Number(chapter.text.split(' ').length);
		})

		size[0] += (itm.text.length > 0) && Number(itm.text.split(' ').length);

		return size
	});

	return size[0] - 0;
}

function findText (note, textFind) {
	let item = note.activeNote.chapters.filter((item) => item.text.match(textFind))
	let text2 = item.filter((chapter) => {
			if (chapter.text.match(textFind)) {
				return chapter.id;
			}
		})
	return text2
}
export {
	getLengthTextNote,
	findText,
}
