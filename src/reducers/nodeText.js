const initialState = [
  'Встретить майские праздники!',
  'Встретить 9 Мая!'
];

function nodeText( state = initialState, action ) {
  if(action.type === 'ADD_TEXT') {
    return [
	  ...state,
	  action.payload
    ];
  }
  return state;
};

export default nodeText