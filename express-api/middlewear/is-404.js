import { apiError } from '../helpers/apiResponses.js';

export default (req, res) => {
    return res.status(404).json(apiError(404, { message: "404, route doesn't exist." }));
};
