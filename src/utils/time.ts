export const formatTimeDifference = (date: Date) => {
    const now = Date.now();
    const difference = now - date.getTime();

    if (difference < 0) {
        return "Now";
    }

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
        return 'Now';
    } else if (minutes < 60) {
        return `${minutes} minute${minutes > 1 ? 's' : ''}  ago`;
    } else if (hours < 24) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (days < 30) {
        return `${days} day${days > 1 ? 's' : ''}  ago`;
    } else {
        return `${years} year${years > 1 ? 's' : ''}  ago`;
    }
}
