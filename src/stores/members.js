import _ from 'lodash';
import { observable, computed } from 'mobx';
import { watchUsers } from '@lib/watchers';

class MembersStore {
    @observable data = {};

    constructor() {
        watchUsers(members => {
            this.data = members;
        });
    }

    @computed
    get dataAsArray() {
        return (
            _.map(this.data, (value, idx) => {
                value.userId = idx;
                return value;
            }) || []
        );
    }
}

const store = new MembersStore();

export default store;
