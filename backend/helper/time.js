export function isOpening(store) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const now = new Date();
    const currentDay = daysOfWeek[now.getDay()];
    let currentTime = now.getHours() * 60 + now.getMinutes();

    if (store.hasOwnProperty(currentDay)) {
        const [startHour, startMinute, endHour, endMinute] = store[currentDay]
            .split(/[^\d]/)
            .filter(Boolean)
            .map(Number);

        const startTime = startHour * 60 + startMinute;
        let endTime = endHour * 60 + endMinute;

        if (endTime < startTime) {
            endTime += 24 * 60;
        }
        if (currentTime < startTime) {
            currentTime += 24 * 60;
        }

        return currentTime >= startTime && currentTime <= endTime;
    }
    return false
}

export function isNew(dateToCheck) {
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(currentDate.getDate() - 7);
    const targetDate = new Date(dateToCheck);
    return targetDate >= oneWeekAgo;
}