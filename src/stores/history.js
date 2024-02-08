import {defineStore} from 'pinia'

export const useHistory = defineStore('history', {
    state: () => ({
        history: [],
    }),
    actions: {
        updateHistory(square) {
            const squareIndex = this.history.indexOf(square);
            if (squareIndex > -1) {
                this.history.splice(squareIndex, 1);
            } else {
                this.history.push(square);
            }
        },
    },
})