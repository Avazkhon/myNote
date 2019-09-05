export default (initState) => {
  if (!initState || !initState.note) {
  	const id = Date.now();
  	return {
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
  			},
  			navMenu: {
  				isContentSetting: false,
  				itemsSetting: [
  					{
  						id: 1,
  						title: 'Create chapter',
  						name: 'isShowCreateNewChapter'
  					},
  				]
  			}
  		}
  	};
  }else {
    return initState;
  }
}
