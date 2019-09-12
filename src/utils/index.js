export function getLengthTextNote (note) {
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
