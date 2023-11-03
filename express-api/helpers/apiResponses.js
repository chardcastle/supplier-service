const apiSuccess = (status, data) => {
    return {
        success: true,
        status,
        data
    };
};

const apiError = (status, data) => {
    return {
        success: false,
        status,
        data
    };
};

const normaliseItemsById = (dataObjectsById) => {
    const normalised = {};

    for (const item of [].concat(dataObjectsById)) {
        const { id } = item;
        normalised[id] = item;
    }
    return normalised;
}

export { apiSuccess, apiError, normaliseItemsById };
