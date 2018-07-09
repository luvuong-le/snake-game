import constants from './constants';

const random = (max) => {
    return Math.ceil((Math.random() * Math.floor(max)) / constants.SNAKE_SIZE) * constants.SNAKE_SIZE;
}

const count = (elem, start, end, duration, easing) => {
    let counter = setInterval(function () {
        if (start === end) {
            clearInterval(counter);
        } else {
            if (start < end) {
                if (start > Math.floor(end / 1.05) && easing === false) {
                    clearInterval(counter);
                    count(elem, start, end, easeOut(duration), true);
                }
                start++;
                elem.textContent = `${start}`;
            }
            if (start > end) {
                if (start < Math.floor(end * 1.3) && easing === false) {
                    clearInterval(counter);
                    count(elem, start, end, easeOut(duration), true);
                }
                start--;
                elem.textContent = `${start}`;
            }
        }
    }, duration);
}

const easeOut = (duration) => {
    return duration + 50;
}

export {
    random,
    count,
    easeOut
}