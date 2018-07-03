import { observable } from 'mobx';

class UserStore {
    @observable data = {};
}

const store = new UserStore();

export default store;
