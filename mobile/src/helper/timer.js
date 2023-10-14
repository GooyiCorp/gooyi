 export class Timer {
    constructor(delay) {
        this.id = setTimeout(() => {}, delay);
        this.endTime = new Date().getTime() + delay;
    }
    getID() { return this.id; }
    remainingTime() {
        const remainingTime = this.endTime - new Date().getTime();
        return remainingTime > 0 ? remainingTime : 0;
    }
}