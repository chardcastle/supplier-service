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

function normaliseItemsById(dataObjectsById) {
    const normalised = {};
    for (const supplier of dataObjectsById) {
        normalised[supplier.id] = supplier;
    }
    return normalised;
}

export { apiSuccess, apiError, normaliseItemsById };
