const random = (max) => {
    return Math.ceil((Math.random() * Math.floor(max)) / 20) * 20;
}

export {
    random
}