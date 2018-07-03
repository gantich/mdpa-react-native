import { observable } from 'mobx';

import { watchMessages } from '@lib/watchers';

class MessagesStore {
    @observable data = {};

    constructor() {
        watchMessages(messages => {
            this.data = messages;
        });
    }
}

const store = new MessagesStore();

export default store;
