import * as jose from 'jose';
import { JWTPayload } from 'jose';

const verifyJwt = async (token: string): Promise<JWTPayload | null> => {
    const jwtToken = token.replace(/^Bearer\s*/, '');

    const secretSigningKey = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_JWT_SECRET
    );

    try {
        const { payload } = await jose.jwtVerify(jwtToken, secretSigningKey, {
            issuer: 'supplier_service_api',
            audience: 'supplier_service_app',
        })
        console.log("Payload is", payload);
        return payload;
    } catch (error) {
        console.error('Token verification failed:', error)

        return null;
    }
}

export default verifyJwt;
