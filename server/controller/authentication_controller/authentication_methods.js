import jwt from 'jsonwebtoken';
import { promisify } from 'util';
const { sign: _sign, verify: _verify } = jwt;
const sign = promisify(_sign).bind(jwt);
const verify = promisify(_verify).bind(jwt);

export async function generateToken(payload, secretSignature, tokenLife) {
	try {
		return await sign(
			{
				payload,
			},
			secretSignature,
			{
				algorithm: 'HS256',
				expiresIn: tokenLife,
			},
		);
	} catch (error) {
		console.log(`Error in generate access token:  + ${error}`);
		return null;
	}
}
export async function verifyToken(token, secretKey) {
	try {
		return await verify(token, secretKey);
	} catch (error) {
		console.log(`Error in verify access token:  + ${error}`);
		return null;
	}
}

export async function decodeToken(token, secretKey) {
	try {
		return await verify(token, secretKey, {
			ignoreExpiration: true,
		});
	} catch (error) {
		console.log(`Error in decode access token: ${error}`);
		return null;
	}
}