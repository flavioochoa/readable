const getDate = (timestamp) => {
    return new Date(timestamp).toISOString().substring(0, 10);
}

export { getDate };