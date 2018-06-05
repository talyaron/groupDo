var store = {
    instance: {},
    isInstance: false,
    options: [],
    optionsPositionY: {},
    optionsPositionYNew: {},
    optionsPositionX: {},
    optionsPositionXNew: {},
    user: {
        isAnonymous: true,
        uid: '',
        name: ''
    },
    votersNumber: 0 // count the number of users in invitation
};

export default store
