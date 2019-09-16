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
  					},
            {
              id: 3,
              title: 'Select backgroundImage',
              name: 'selectBackgroundImage'
            },
            {
              id: 4,
              title: 'Clear data',
              name: 'clearData'
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
  			},
        chapterSetting: {
          isContentSetting: false,
          itemsSetting: [
            {
              id: 1,
              title: 'Delete chapter',
              name: 'deleteChapter'
            },
          ]
        },
        backgroundImage: {
          activeImg: null,
          image: [
            {
              id: 1,
              title: 'Golden autumn',
              url: 'http://danlik.ru/wp-content/uploads/2014/01/Zolotaya-osen.jpg',
            },
            {
              id: 2,
              title: 'Line',
              url: 'https://w-dog.ru/wallpapers/12/13/452112797392758.jpg',
            },
            {
              id: 3,
              title: 'A. S. Pushkin',
              url: 'https://imgtest.mir24.tv/uploaded/images/crops/2018/April/870x489_0x424_detail_crop_b8259ece499b91595106ed19b50e2ccf7baa3abae8e9d1358a56fa0290d60995.jpg',
            },
            {
              id: 4,
              title: 'Red circles',
              url: 'http://luxfon.com/images/201503/luxfon.com_35034.jpg',
            },
            {
              id: 10,
              title: 'Not background',
              url: null,
            }
          ]
        }
  		}
  	};
  }else {
    return initState;
  }
}
