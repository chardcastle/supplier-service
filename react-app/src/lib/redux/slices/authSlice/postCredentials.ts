import { type Credentials } from "./thunks"

export const postCredentials = async (
    credentials: Credentials
): Promise<{ data: object }> => {
    const { username, password } = credentials;
    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })

    return response.json()
}
