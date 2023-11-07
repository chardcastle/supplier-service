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

const formattedValidationErrors = (validationErrors) => {
    const { errors } = validationErrors;

    return [].concat(Object.keys(errors)).map((key) => {
        const errorObj = validationErrors.errors[key];
        return {
            id: key,
            field: key,
            message: errorObj.message,
        };
    });
}

export { apiSuccess, apiError, normaliseItemsById, formattedValidationErrors };
