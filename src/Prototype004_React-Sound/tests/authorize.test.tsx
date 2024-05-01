import { exportedGenerateCodeVerifier, exportedGenerateCodeChallenge, redirectToAuthCodeFlow } from "../src/Authorize";
import { TextEncoder, TextDecoder } from 'util';

const generateCodeVerifier = exportedGenerateCodeVerifier;
const generateCodeChallenge = exportedGenerateCodeChallenge;

Object.assign(global, { TextDecoder, TextEncoder });

// Mock digest to create digest of code verifier, convert to Uint8Array
Object.defineProperty(window, 'crypto', {
  value: {
    subtle: {
      digest: jest.fn(async (algoithm, data) => {
        const codeVerifier = new TextDecoder().decode(data);
        const digest = Array.from(new TextEncoder().encode(codeVerifier));
        return new Uint8Array(digest);
      })
    }
  }
});

describe('generateCodeVerifier', () => {
  it('returns code verifier of specified length', () => {
        const length = 128;
        expect(generateCodeVerifier(length)).toHaveLength(length);
  });

  it('returns code verifier if length is 0', () => {
    expect(generateCodeVerifier(0)).toBeDefined();
  });

  it('verifier only contains valid characters', () => {
      const validChars = /^[A-Za-z0-9]+$/;
      expect(generateCodeVerifier(128)).toMatch(validChars);
  })

  it('verifier generated for each call is different', () => {
    const verifier1 = generateCodeVerifier(128);
    const verifier2 = generateCodeVerifier(128);

    expect(verifier1).not.toMatch(verifier2);
  })
});

describe('generateCodeChallenge', () => {
  it('challenge generated is different depending on the verifier', async () =>
  {
    const verifier1 = generateCodeVerifier(128);
    const verifier2 = generateCodeVerifier(128);

    const challenge1 = await generateCodeChallenge(verifier1);
    const challenge1Again = await generateCodeChallenge(verifier1);
    const challenge2 = await generateCodeChallenge(verifier2);
    
    //const c1 = await generateCodeChallenge(verifier1);
    //const c2 = await generateCodeChallenge(verifier1);

    expect(challenge1).not.toMatch(challenge2);
    expect(challenge1).toMatch(challenge1Again);
  })
});
