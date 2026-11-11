import { Unit } from '../types';

export const unit3: Unit = {
  id: 'unit-3',
  number: 3,
  title: 'Symmetric & Asymmetric Cryptography Systems',
  hours: 12,
  courseOutcome: 'CO3: Design, implement, and analyze symmetric block ciphers, public-key algorithms, and key exchange protocols.',
  badge: 'Core Cryptography',
  description:
    'Unit 3 constitutes the core body of cryptography covering classical substitution/transposition ciphers, Shannon’s confusion and diffusion, Feistel cipher networks, DES, 3DES, AES architecture, Block Cipher Modes of Operation (ECB, CBC, CFB, OFB, CTR), and asymmetric systems including RSA, Diffie-Hellman, Elgamal, and Elliptic Curve Cryptography (ECC).',
  subtopics: [
    {
      slug: 'dimensions-of-cryptography',
      title: 'Dimensions of Cryptography & Cryptanalysis',
      shortDesc: 'Classification taxonomy of cryptographic systems based on operations, key count, and plaintext processing.',
      unitId: 'unit-3',
      unitNumber: 3,
      explanation: [
        'Cryptographic systems are comprehensively classified along three independent dimensions: (1) The type of operations used for transforming plaintext to ciphertext (Substitution where each element is mapped into another element, Transposition where elements are rearranged, and Product systems combining both), (2) The number of keys used (Symmetric/Single-Key where sender and receiver share the same key, and Asymmetric/Two-Key where distinct public and private keys are employed), and (3) The way in which plaintext is processed (Block ciphers processing fixed-size chunks, and Stream ciphers processing continuous bits/bytes).',
        'Cryptanalysis is the science of deciphering ciphertext without access to the key. Adversarial attack models are rigorously formalized by Kerckhoffs-compliant scenarios: Ciphertext-Only (attacker only has access to a collection of ciphertexts), Known-Plaintext (attacker possesses pairs of plaintext and corresponding ciphertext), Chosen-Plaintext (attacker can obtain ciphertexts for plaintexts of their choice), and Chosen-Ciphertext (attacker can decrypt chosen ciphertexts, excluding the target challenge).'
      ],
      realWorldExample: {
        title: 'Bletchley Park & The Known-Plaintext Attack on Enigma',
        description:
          'During World War II, Alan Turing and the codebreakers exploited stereotypical daily weather forecast phrases ("WETTERVORHERSAGE") at known positions in encrypted German Enigma radio messages (cribs) to execute a devastating Known-Plaintext Attack.',
        impact: 'Decrypted Axis communications, shortening the war by an estimated two to four years.'
      },
      keyPoints: [
        'Three Fundamental Dimensions: Transformation Type, Key Multiplicity, and Processing Mechanism.',
        'Shannon’s Fundamental Properties: Confusion (obscuring relationship between key and ciphertext) and Diffusion (spreading statistical structure of plaintext across ciphertext).',
        'Cryptanalysis Spectrum: Ciphertext-Only < Known-Plaintext < Chosen-Plaintext < Chosen-Ciphertext.',
        'Unconditional Security (One-Time Pad) vs Computational Security (all practical modern ciphers).'
      ],
      diagram: {
        title: 'Cryptographic Classification Taxonomical Dimensions',
        type: 'ascii',
        content: `
                          DIMENSIONS OF CRYPTOSYSTEMS
                                       |
        +------------------------------+------------------------------+
        |                              |                              |
  1. OPERATIONS                 2. NUMBER OF KEYS             3. PROCESSING
        |                              |                              |
  +-----+-----+                  +-----+-----+                  +-----+-----+
  |           |                  |           |                  |           |
Substitution Transposition   Symmetric   Asymmetric          Block       Stream
 (Caesar,     (Rail Fence,   (AES, DES,  (RSA, ECC,         (128-bit    (RC4,
  Polybius)    Columnar)      ChaCha20)   Elgamal)           blocks)     ChaCha)
        `,
        caption: 'The three orthogonal dimensions classifying all cryptosystems.'
      }
    },
    {
      slug: 'classical-cryptographic-techniques',
      title: 'Classical Cryptographic Techniques',
      shortDesc: 'Historical substitution and transposition ciphers vulnerable to statistical letter frequency analysis.',
      unitId: 'unit-3',
      unitNumber: 3,
      explanation: [
        'Classical ciphers operate directly on human alphabets (typically A-Z) using basic pencil-and-paper operations. Substitution techniques replace individual letters or groups of letters with other letters, numbers, or symbols. Monoalphabetic ciphers (Caesar cipher C = (P + 3) mod 26, affine ciphers C = (aP + b) mod 26) maintain a fixed 1:1 mapping throughout the message, leaving them trivially vulnerable to letter frequency analysis (in English, \'E\' occurs ~12.7%, followed by \'T\', \'A\', \'O\').',
        'Polyalphabetic ciphers use multiple substitution alphabets across the text. The Vigenère cipher uses a repeating keyword to shift each letter by differing amounts, smoothing single-letter frequency spikes but succumbing to Kasiski examination and the Friedman Index of Coincidence to deduce key length. Polygraphic ciphers like the Playfair cipher (5x5 matrix encrypting digraphs) and Hill cipher (linear matrix multiplication modulo 26) disguise single-letter frequencies by encrypting pairs or vectors of letters.',
        'Transposition techniques rearrange the order of letters without altering their identity. Methods include the Rail Fence cipher (zigzag diagonal write and row read) and Columnar Transposition ciphers (writing plaintext into rows of a rectangular grid and reading columns according to a permutation key).'
      ],
      realWorldExample: {
        title: 'Zodiac Killer 340-Character Cipher Solution (2020)',
        description:
          'After 51 years, amateur codebreakers solved the infamous 340-character cipher sent by the Zodiac Killer in 1969. The cipher was constructed using a complex diagonal transposition scheme combined with polyalphabetic substitution.',
        impact: 'Demonstrated that complex classical transposition ciphers can withstand unassisted analysis for decades until computational search algorithms crack them.'
      },
      keyPoints: [
        'Monoalphabetic Substitution: Directly preserves single-letter frequencies of natural language.',
        'Playfair Cipher: 5x5 key matrix (I/J combined); encrypts digraphs using row wrap, column wrap, or rectangle corners.',
        'Hill Cipher: C = (K * P) mod 26 where K is an n x n invertible matrix; broken via Known-Plaintext attack.',
        'Transposition Ciphers: Preserve letter frequencies exactly; detected via standard anagramming and digram frequencies.'
      ],
      diagram: {
        title: 'Playfair Cipher 5x5 Grid Digraph Encryption Rules',
        type: 'ascii',
        content: `
   Key = "MONARCHY" (I and J share a cell)
   M  O  N  A  R
   C  H  Y  B  D
   E  F  G  I/J K
   L  P  Q  S  T
   U  V  W  X  Z

   Rule 1 (Same Row):     AR -> RM (shift right, wrap around)
   Rule 2 (Same Column):  MU -> CM (shift down, wrap around)
   Rule 3 (Rectangle):    EA -> IR (opposite corners in same row)
        `,
        caption: 'Digraph permutation matrix eliminating single-letter frequency signatures.'
      },
      codeSnippet: {
        language: 'typescript',
        title: 'Caesar Cipher Encrypt & Decrypt Implementation',
        code: `// Caesar Cipher implementation over uppercase English alphabet (A-Z)
function caesarCipher(text: string, shift: number, decrypt = false): string {
  const s = decrypt ? (26 - (shift % 26)) % 26 : (shift % 26);
  return text
    .toUpperCase()
    .replace(/[A-Z]/g, char => {
      const code = char.charCodeAt(0) - 65;
      return String.fromCharCode(((code + s) % 26) + 65);
    });
}

const plaintext = "CRYPTOGRAPHY";
const shift = 3;
const encrypted = caesarCipher(plaintext, shift);
const decrypted = caesarCipher(encrypted, shift, true);

console.log("Encrypted:", encrypted); // "FUBSWRJUDSKB"
console.log("Decrypted:", decrypted); // "CRYPTOGRAPHY"`,
        explanation: 'Implements modular shift addition modulo 26 for alphabetic substitution.'
      }
    },
    {
      slug: 'block-ciphers-des-aes',
      title: 'Block Ciphers: Architecture & Foundations',
      shortDesc: 'Cryptosystems encrypting fixed-length blocks using iterated rounds of substitution and permutation.',
      unitId: 'unit-3',
      unitNumber: 3,
      explanation: [
        'A block cipher is an encryption algorithm that takes a fixed-length block of plaintext bits (e.g., 64 bits for DES, 128 bits for AES) and transforms it under the control of a secret key into a block of ciphertext bits of identical length. Mathematically, a block cipher acts as a key-dependent reversible permutation on the set of all 2^n possible n-bit vectors.',
        'Claude Shannon’s 1949 seminal paper "Communication Theory of Secrecy Systems" established the twin pillars of secure block cipher design: Diffusion and Confusion. Diffusion dissipates the statistical structure of plaintext across the entire ciphertext (e.g., flipping 1 plaintext bit changes approximately 50% of ciphertext bits—known as the Strict Avalanche Criterion). Confusion obscures the mathematical relationship between the secret key and the resulting ciphertext, typically achieved through non-linear substitution boxes (S-Boxes).',
        'Block ciphers are executed as Iterated Product Ciphers, chaining multiple successive rounds of alternating substitutions (S-Boxes for confusion) and permutations (P-Boxes for diffusion) to defeat linear and differential cryptanalysis.'
      ],
      realWorldExample: {
        title: 'The Avalanche Effect in Financial Transactions',
        description:
          'In EMV chip card payment processing, altering an account balance from $10.00 to $10.01 changes an average of 64 bits in the 128-bit AES cryptogram, completely preventing localized bit-twiddling fraud.',
        impact: 'Guarantees integrity and authenticity in global POS card reader systems.'
      },
      keyPoints: [
        'Block Size (n): DES uses 64 bits; AES uses 128 bits. Larger block sizes resist codebook birthday collisions.',
        'Key Size (k): Governs resistance to brute force; 128 bits requires 2^128 operations, 256 bits requires 2^256 operations.',
        'Confusion: Non-linear mappings that frustrate linear approximation attacks.',
        'Diffusion: Linear mixing that distributes each input bit across all output bits rapidly across rounds.'
      ],
      diagram: {
        title: 'Shannon Iterated Substitution-Permutation Network (SPN)',
        type: 'ascii',
        content: `
Plaintext Block (128 bits) ----+
                               v
                       [ Round Key Addition (⊕ K_0) ]
                               |
         +---------------------+---------------------+
         | Round 1                                   |
         |   [ Non-Linear S-Boxes: Substitution ]    | <-- Confusion
         |                     |                     |
         |   [ Linear P-Box: Permutation/Mixing ]    | <-- Diffusion
         |                     |                     |
         |   [ Round Key Addition (⊕ K_1) ]          |
         +---------------------+---------------------+
                               v
                 ... (Repeated for N Rounds) ...
                               v
                       Ciphertext Block (128 bits)
        `,
        caption: 'Classical Substitution-Permutation Network iterating confusion and diffusion.'
      }
    },
    {
      slug: 'feistel-cipher-structure',
      title: 'Feistel Cipher Structure',
      shortDesc: 'Symmetric design architecture allowing identical encryption and decryption hardware pipelines.',
      unitId: 'unit-3',
      unitNumber: 3,
      explanation: [
        'The Feistel cipher structure, invented by IBM cryptographer Horst Feistel in 1973, is an ingenious architecture for constructing invertible block ciphers from non-invertible round functions. A Feistel network divides the n-bit input block into two equal halves: Left (L) and Right (R). In each round i, the right half R_{i-1} is passed into an arbitrary round function F together with a round subkey K_i.',
        'The output of the round function is XORed with the left half: L_i = R_{i-1}, and R_i = L_{i-1} ⊕ F(R_{i-1}, K_i). The halves are then swapped for the next round. This architecture ensures that decryption is mathematically identical to encryption: feeding the ciphertext into the exact same pipeline with subkeys supplied in reverse order (K_n, K_{n-1}, ..., K_1) perfectly reconstructs the plaintext.',
        'Remarkably, the round function F does NOT need to be mathematically invertible or bijective. F can utilize one-way hashing, lossy compression, or complex non-linear lookups without compromising the invertibility of the overall Feistel cipher.'
      ],
      realWorldExample: {
        title: 'Blowfish & Twofish in Secure Storage Systems',
        description:
          'Bruce Schneier’s Blowfish and Twofish ciphers implement 16-round Feistel structures with key-dependent S-boxes, widely deployed in OpenBSD password hashing and VeraCrypt disk encryption.',
        impact: 'Allows low-memory embedded devices to execute high-performance encryption with a single bidirectional hardware engine.'
      },
      keyPoints: [
        'Bidirectional Hardware Reusability: Same circuit implements both encryption and decryption.',
        'Round Equation: L_i = R_{i-1}; R_i = L_{i-1} ⊕ F(R_{i-1}, K_i).',
        'Decryption Reversal: Running rounds with subkeys in reverse order recovers plaintext.',
        'Security Determinants: Block size, key size, number of rounds, round function complexity, and subkey generation algorithm.'
      ],
      diagram: {
        title: 'Single Feistel Round Execution Diagram',
        type: 'ascii',
        content: `
              L_{i-1}                                R_{i-1}
                 |                                      |
                 |                     Subkey K_i       |
                 |                          |           |
                 |                          v           |
                 |                    +-----------+     |
                 |                    |   F(R,K)  |<----+ (Tapped)
                 |                    +-----------+     |
                 |                          |           |
                 v                          v           |
               ( ⊕ ) <----------------------+           |
                 |                                      |
                 |     \\                          /     |
                 |      \\    [ Cross-Swap ]      /      |
                 |       \\                      /       |
                 v        v                    v        v
                L_i = R_{i-1}             R_i = L_{i-1} ⊕ F(R_{i-1}, K_i)
        `,
        caption: 'Feistel round split-swap topology enabling universal invertibility.'
      },
      codeSnippet: {
        language: 'typescript',
        title: 'Feistel Cipher Round Simulator (8-Bit Toy Model)',
        code: `// Toy 16-bit Feistel network with 8-bit halves
function roundFunction(halfByte: number, subkey: number): number {
  // Non-linear round function F: (R * subkey + 7) mod 256
  return ((halfByte * subkey) + 7) & 0xFF;
}

function feistelRound(L: number, R: number, subkey: number): [number, number] {
  const nextL = R;
  const nextR = (L ^ roundFunction(R, subkey)) & 0xFF;
  return [nextL, nextR];
}

// 2-Round Encryption
const [L0, R0] = [0xAB, 0x12];
const [K1, K2] = [0x5A, 0xC3];

const [L1, R1] = feistelRound(L0, R0, K1);
const [L2, R2] = feistelRound(L1, R1, K2);
console.log(\`Encrypted: L2 = 0x\${L2.toString(16)}, R2 = 0x\${R2.toString(16)}\`);

// 2-Round Decryption (Reversed Subkeys)
const [dL1, dR1] = feistelRound(L2, R2, K2);
const [dL2, dR2] = feistelRound(dL1, dR1, K1);
console.log(\`Decrypted: L0 = 0x\${dL2.toString(16)}, R0 = 0x\${dR2.toString(16)}\`);`,
        explanation: 'Demonstrates reversible Feistel symmetry by passing reversed round subkeys.'
      }
    },
    {
      slug: 'sdes-des-3des',
      title: 'Simplified DES, DES, Double & Triple DES',
      shortDesc: 'Evolution of the Data Encryption Standard from 56-bit single DES to 112/168-bit Triple DES.',
      unitId: 'unit-3',
      unitNumber: 3,
      explanation: [
        'The Data Encryption Standard (DES), adopted by NIST in 1977 based on IBM’s Lucifer project, processes 64-bit plaintext blocks using a 56-bit effective key (derived from 64-bit input with 8 parity bits). DES runs 16 rounds of a Feistel network incorporating an Initial Permutation (IP), an expansion permutation (E-box: 32 bits to 48 bits), key mixing (XOR with 48-bit subkey), eight 6x4 non-linear S-Boxes (S1-S8), a 32-bit permutation (P-box), and a Final Inverse Permutation (IP^(-1)).',
        'Simplified DES (S-DES), developed by Edward Schaefer, is an educational 8-bit block cipher using 10-bit keys, 2 Feistel rounds, two 4x2 S-Boxes, and standard permutations (P10, P8, P4, IP, IP^(-1)), illustrating the core mechanics without industrial complexity.',
        'As computing power grew, DES’s 56-bit key space (2^56 ≈ 7.2 x 10^16) became vulnerable to brute-force crack rigs (EFF Deep Crack broke DES in 56 hours in 1998). Double DES (2DES: C = E_K2(E_K1(P))) was proposed to yield a 112-bit key space, but was immediately defeated by the Meet-in-the-Middle (MitM) attack requiring only 2^57 space/time operations. Triple DES (3DES: C = E_K1(D_K2(E_K3(P)))) was deployed with 168-bit (3 keys) or 112-bit (2 keys, K1=K3) keys, providing legacy backward compatibility with single DES when K1 = K2 = K3.'
      ],
      realWorldExample: {
        title: 'Sweet32 Birthday Collision Attack on 3DES (CVE-2016-2183)',
        description:
          'Because 3DES operates on 64-bit blocks, encrypting 2^32 blocks (~32 GB of data) under the same key results in block collision due to the Birthday Paradox. In 2016, researchers decrypted HTTPS session cookies over persistent 3DES TLS connections.',
        impact: 'Prompted the formal deprecation of 3DES by NIST in 2023 in favor of AES with 128-bit blocks.'
      },
      keyPoints: [
        'DES Parameters: 64-bit block size, 56-bit key size, 16 rounds, 8 S-Boxes.',
        'Meet-in-the-Middle Attack: Renders Double DES security equivalent to 2^57 rather than 2^112 by matching forward E_K1(P) with reverse D_K2(C).',
        'Triple DES EDE Sequence: Encrypt(K1) -> Decrypt(K2) -> Encrypt(K3). If K1=K2=K3, it degrades gracefully to standard DES.',
        'Retirement: 3DES is deprecated globally due to 64-bit block Sweet32 vulnerability and slow software execution.'
      ],
      diagram: {
        title: 'Meet-in-the-Middle Attack on Double DES',
        type: 'ascii',
        content: `
   Plaintext P ----------------------------> [ Encrypt K1 ] -------------> Intermediate State M
                                                  |                                  |
                                        Try all 2^56 keys K1                         |
                                        Store in Hash Table                          v
                                                                                [ MATCH ? ]
                                                                                     ^
                                        Try all 2^56 keys K2                         |
                                                  |                                  |
   Ciphertext C ---------------------------> [ Decrypt K2 ] -------------> Intermediate State M'
        `,
        caption: 'Meet-in-the-Middle matches intermediate states, reducing 2DES security from 2^112 to 2^57.'
      }
    },
    {
      slug: 'block-cipher-design-principles',
      title: 'Block Cipher Design Principles',
      shortDesc: 'Mathematical design criteria for non-linear S-boxes, key schedules, and avalanche resistance.',
      unitId: 'unit-3',
      unitNumber: 3,
      explanation: [
        'Modern block cipher design balances cryptographic security margins, hardware gate efficiency, software latency, and memory footprint. Key design principles focus heavily on the S-Boxes (Substitution Boxes), which provide the sole non-linear element in symmetric ciphers. If a cipher lacks non-linear transformations, the entire system collapses into a set of linear equations solvable via Gaussian elimination in polynomial time.',
        'S-Box design criteria demand: (1) Non-linearity (maximum Hamming distance from affine functions), (2) Strict Avalanche Criterion (SAC: flipping any input bit inverts each output bit with exactly 50% probability), (3) Bit Independence Criterion (BIC: output bits change independently when any single input bit is inverted), and (4) Resistance to Differential and Linear Cryptanalysis (minimizing maximum input/output difference XOR probabilities).',
        'Key schedule algorithms must ensure complete key diffusion across all subkeys, guarantee that no two distinct master keys produce identical subkey streams (eliminating equivalent keys), and prevent weak keys where repeated subkeys cause the cipher to self-invert or collapse.'
      ],
      realWorldExample: {
        title: 'NSA S-Box Tampering Suspicions & Differential Cryptanalysis',
        description:
          'When IBM submitted Lucifer to NIST for DES in 1974, the NSA modified the S-Box constants. Academics feared a hidden backdoor until Biham and Shamir discovered Differential Cryptanalysis in 1990—revealing the NSA had actually hardened DES against differential attacks 16 years prior.',
        impact: 'Established differential and linear cryptanalysis as formal mandatory benchmarks for all block cipher standards.'
      },
      keyPoints: [
        'Non-Linearity: Essential to defeat linear approximation attacks (Matsui’s linear cryptanalysis).',
        'Strict Avalanche Criterion (SAC): Each output bit changes with probability p = 0.5 when any input bit is complemented.',
        'Bit Independence Criterion (BIC): Output bit pairs change independently.',
        'Weak Keys: Specific keys in DES (e.g., all 0s or all 1s) where subkeys in all 16 rounds are identical.'
      ],
      diagram: {
        title: 'Strict Avalanche Criterion (SAC) Verification',
        type: 'ascii',
        content: `
   Input Vector A:   [ 1 0 1 1 0 0 1 0 ] ----> [ Cipher / S-Box ] ----> [ 1 1 0 1 0 0 1 1 ]
                                                                             |
   Flip 1 bit (LSB)                                                          v (XOR Difference)
   Input Vector B:   [ 1 0 1 1 0 0 1 1 ] ----> [ Cipher / S-Box ] ----> [ 0 1 1 0 1 0 1 0 ]
                                                                             |
   Difference ΔOut = Out_A ⊕ Out_B = [ 1 0 1 1 1 0 0 1 ]  (5 out of 8 bits flipped ~ 50% SAC)
        `,
        caption: 'Single input bit perturbation triggers 50% output bit inversion.'
      }
    },
    {
      slug: 'advanced-encryption-standard-aes',
      title: 'Advanced Encryption Standard (AES - Rijndael)',
      shortDesc: 'The global standard symmetric cipher utilizing finite field arithmetic over GF(2^8).',
      unitId: 'unit-3',
      unitNumber: 3,
      explanation: [
        'The Advanced Encryption Standard (AES) was selected by NIST in 2001 following a 5-year international competition won by Belgian cryptographers Joan Daemen and Vincent Rijndael. AES is a non-Feistel Substitution-Permutation Network processing 128-bit plaintext blocks organized as a 4x4 matrix of bytes called the State. It supports three key lengths: 128 bits (10 rounds), 192 bits (12 rounds), and 256 bits (14 rounds).',
        'Each standard AES round executes four algebraic transformations: (1) SubBytes (non-linear byte substitution using an S-Box based on multiplicative inversion in Galois Field GF(2^8) modulo irreducible polynomial x^8 + x^4 + x^3 + x + 1 followed by an affine transformation), (2) ShiftRows (cyclically shifting the rows of the State matrix to the left by offsets of 0, 1, 2, and 3 bytes), (3) MixColumns (matrix multiplication treating each 4-byte column as a polynomial over GF(2^8) multiplied modulo x^4 + 1 by a fixed MDS matrix c(x) = {03}x^3 + {01}x^2 + {01}x + {02}), and (4) AddRoundKey (bitwise XORing the State with the round subkey).',
        'In the final round, the MixColumns transformation is omitted. AES decryption applies the inverses of these transformations in reverse order (InvShiftRows, InvSubBytes, InvMixColumns, AddRoundKey). Hardware AES-NI instructions in modern Intel/AMD/ARM CPUs provide side-channel-resistant execution at over 3 GB/s per core.'
      ],
      realWorldExample: {
        title: 'AES-NI Hardware Acceleration & Cloud Encryption',
        description:
          'Modern cloud hypervisors (AWS Nitro, Google Cloud Shielded VMs) execute AES-GCM line-rate encryption for petabytes of network traffic and NVMe storage using dedicated CPU instruction sets (AESENC, AESDEC) with zero software cache-timing leakage.',
        impact: 'Standardizes bulletproof, high-speed encryption across the global digital economy.'
      },
      keyPoints: [
        'State Matrix: 4x4 array of 16 bytes representing the 128-bit block.',
        'SubBytes: Multiplicative inverse in GF(2^8) followed by affine mapping; provides algebraic confusion.',
        'ShiftRows + MixColumns: Diffusion layers ensuring full 128-bit avalanche within two rounds.',
        'Key Expansion: Generates Nb * (Nr + 1) 32-bit round words using RotWord, SubWord, and Round Constants (Rcon).'
      ],
      diagram: {
        title: 'AES Single Round 4-Step Pipeline',
        type: 'ascii',
        content: `
   Input State (4x4 Matrix)
           |
           v
   [ 1. SubBytes ]      <--- Non-linear S-Box substitution over GF(2^8)
           |
           v
   [ 2. ShiftRows ]     <--- Row 0: shift 0; Row 1: shift 1; Row 2: shift 2; Row 3: shift 3
           |
           v
   [ 3. MixColumns ]    <--- Column matrix multiplication over GF(2^8) (Omitted in final round)
           |
           v
   [ 4. AddRoundKey ]   <--- Bitwise XOR with 128-bit Round Subkey K_i
           |
           v
   Output State to Next Round
        `,
        caption: 'The four sequential algebraic transformations comprising each AES round.'
      }
    },
    {
      slug: 'modes-of-operation',
      title: 'Block Cipher Modes of Operation',
      shortDesc: 'Techniques for applying block ciphers to plaintext sequences of arbitrary length (ECB, CBC, CFB, OFB, CTR).',
      unitId: 'unit-3',
      unitNumber: 3,
      explanation: [
        'A block cipher encrypts a single fixed-length block (e.g., 128 bits). To securely encrypt arbitrary-length files and network streams, NIST SP 800-38A defines five classic confidentiality Modes of Operation: ECB, CBC, CFB, OFB, and CTR.',
        'Electronic Codebook (ECB) encrypts each plaintext block independently: C_i = E_K(P_i). ECB is fundamentally insecure because identical plaintext blocks always produce identical ciphertext blocks under the same key, entirely preserving statistical patterns (illustrated by the infamous ECB Tux penguin silhouette).',
        'Cipher Block Chaining (CBC) XORs each plaintext block with the preceding ciphertext block prior to encryption: C_i = E_K(P_i ⊕ C_{i-1}), using an unpredictable Initialization Vector (IV = C_0). Cipher Feedback (CFB) and Output Feedback (OFB) convert the block cipher into a stream cipher. Counter (CTR) mode encrypts sequential counters (Nonce || Counter) and XORs the output with plaintext: C_i = P_i ⊕ E_K(Nonce || i). CTR permits arbitrary parallel processing, random access decryption, and never requires padding.'
      ],
      realWorldExample: {
        title: 'The Insecure ECB Penguin vs CBC/CTR Randomization',
        description:
          'Encrypting an uncompressed BMP image of the Linux Tux penguin using ECB mode reveals the exact outline of the penguin because large solid-color regions have identical 128-bit blocks that encrypt to identical ciphertext blocks. CBC or CTR mode generates pure pseudo-random white noise.',
        impact: 'Mandates that ECB must never be used for multi-block payloads in production.'
      },
      keyPoints: [
        'ECB: Independent blocks. No IV needed. Insecure; leaks patterns.',
        'CBC: Chained blocks via XOR. Requires unique, random IV. Sequential encryption; parallel decryption possible.',
        'CFB / OFB: Feedback modes converting block cipher to stream cipher. OFB is bit-error resistant in subsequent blocks.',
        'CTR Mode: Highly parallelizable, high performance, random access, requires never reusing a Nonce/Key pair.'
      ],
      diagram: {
        title: 'CBC vs CTR Mode Topologies',
        type: 'ascii',
        content: `
CBC ENCRYPTION (Sequential):
  P_1 --------> ( ⊕ ) --------> [ Encrypt E_K ] --------> C_1 ----+
                 ^                                                |
                 | (IV)                                           v
  P_2 --------> ( ⊕ ) <-------------------------------------------+
                 |
                 v
            [ Encrypt E_K ] --------> C_2

CTR ENCRYPTION (Fully Parallelizable):
  [ Nonce || 0001 ] ---> [ Encrypt E_K ] ---> ( ⊕ ) <--- P_1  ===> C_1
  [ Nonce || 0002 ] ---> [ Encrypt E_K ] ---> ( ⊕ ) <--- P_2  ===> C_2
  [ Nonce || 0003 ] ---> [ Encrypt E_K ] ---> ( ⊕ ) <--- P_3  ===> C_3
        `,
        caption: 'CBC relies on predecessor chaining; CTR operates in parallel on incrementing counters.'
      }
    },
    {
      slug: 'principles-of-public-key-cryptography',
      title: 'Principles of Public-Key Cryptography',
      shortDesc: 'Asymmetric cryptography paradigm utilizing trapdoor one-way functions and public-private keypairs.',
      unitId: 'unit-3',
      unitNumber: 3,
      explanation: [
        'Conceived by Whitfield Diffie and Martin Hellman in their 1976 landmark paper "New Directions in Cryptography", public-key (asymmetric) cryptography resolved the two most intractable dilemmas of classical cryptography: the symmetric key distribution problem and the requirement for legally binding non-repudiation.',
        'In public-key cryptography, each participating entity generates an asymmetric keypair: a Public Key (distributed openly to the world) and a Private Key (guarded with absolute confidentiality by the owner). Encryption and decryption are mathematically asymmetric: if Bob wishes to send a confidential message to Alice, he encrypts it using Alice’s Public Key; only Alice’s Private Key can invert the transformation to recover the plaintext.',
        'Conversely, if Alice signs a hash of a document using her Private Key, anyone possessing her Public Key can verify that the signature was created by her and that the document was not altered, providing digital authentication and non-repudiation. Asymmetric algorithms are anchored in Trapdoor One-Way Functions: functions y = f(x) that are easy to compute in the forward direction, but computationally impossible to invert unless a secret piece of information (the "trapdoor") is known.'
      ],
      realWorldExample: {
        title: 'SSH Keypair Authentication & GitHub Deploy Keys',
        description:
          'Developers authenticate to remote Git repositories and cloud servers using SSH-RSA or Ed25519 keypairs. The developer uploads their public key to GitHub, keeping the private key on their laptop. During authentication, the server challenges the client to sign a random nonce.',
        impact: 'Replaces weak, reusable passwords with cryptographically unforgeable identity verification.'
      },
      keyPoints: [
        'Asymmetry: Public Key encrypts / verifies; Private Key decrypts / signs.',
        'Key Distribution Solved: Eliminates the requirement for out-of-band shared secret exchange.',
        'Trapdoor One-Way Function: Easy forward computation; infeasible backward inversion without trapdoor.',
        'Hybrid Cryptography: Asymmetric ciphers exchange an ephemeral symmetric session key (AES-256), combining public-key distribution with symmetric speed.'
      ],
      diagram: {
        title: 'Asymmetric Public-Key Cryptosystem Workflow',
        type: 'ascii',
        content: `
   Sender Bob                                          Receiver Alice
   +-----------------------+                           +-----------------------+
   | Knows Alice's         |                           | Possesses Secret      |
   | Public Key (PU_Alice) |                           | Private Key (PR_Alice)|
   +-----------------------+                           +-----------------------+
              |                                                    ^
              | Plaintext (M)                                      | Plaintext (M)
              v                                                    |
   +-----------------------+       Ciphertext C = E(PU_A, M)   +-----------------------+
   | Encryption Algorithm  | --------------------------------> | Decryption Algorithm  |
   +-----------------------+      (Insecure Public Channel)    +-----------------------+
        `,
        caption: 'Public key encrypts; only corresponding private trapdoor key decrypts.'
      }
    },
    {
      slug: 'rsa-algorithm',
      title: 'The RSA Algorithm (Rivest, Shamir, Adleman)',
      shortDesc: 'The preeminent public-key cryptosystem grounded in the computational hardness of integer factorization.',
      unitId: 'unit-3',
      unitNumber: 3,
      explanation: [
        'Published in 1977 by Ron Rivest, Adi Shamir, and Leonard Adleman at MIT, the RSA algorithm remains the most widely deployed public-key algorithm in history. RSA derives its security from the mathematical difficulty of factoring the product of two large prime numbers.',
        'RSA Key Generation Algorithm: (1) Select two distinct large prime numbers p and q. (2) Calculate the modulus n = p * q. (3) Calculate Euler’s totient φ(n) = (p - 1)(q - 1). (4) Select an integer e such that 1 < e < φ(n) and gcd(e, φ(n)) = 1 (commonly 65537). (5) Calculate private exponent d such that d ≡ e^(-1) (mod φ(n)) using the Extended Euclidean Algorithm. The Public Key is (e, n); the Private Key is (d, n).',
        'Encryption: Given plaintext M where 0 ≤ M < n, ciphertext C = M^e mod n. Decryption: Plaintext M = C^d mod n. In production systems, RSA must never be used in textbook form; it requires Optimal Asymmetric Encryption Padding (OAEP) to prevent chosen-ciphertext attacks, padding oracle exploits, and Coppersmith’s small root attacks.'
      ],
      realWorldExample: {
        title: 'TLS 1.2 Handshake & Digital Signature Verification',
        description:
          'Over 60% of web certificates utilize 2048-bit or 4096-bit RSA keys. When a browser visits https://google.com, the browser verifies Google’s RSA digital signature issued by a trusted Certificate Authority to validate authentic domain identity.',
        impact: 'Protects billions of web users from malicious DNS poisoning and MITM eavesdropping.'
      },
      keyPoints: [
        'Modulus n: Typically 2048 to 4096 bits long.',
        'Public Exponent e: Standard choice is e = 65537 (2^16 + 1) for fast encryption (only 17 bits with two 1s).',
        'Private Exponent d: Kept secret; acts as the trapdoor modular inverse.',
        'Textbook RSA Vulnerability: Deterministic encryption is vulnerable to chosen-plaintext attacks; OAEP padding is mandatory.'
      ],
      diagram: {
        title: 'RSA Full Cryptographic Lifecycle',
        type: 'ascii',
        content: `
   [ Key Generation ]
   Primes p, q  ===>  n = p * q,  phi(n) = (p-1)*(q-1)
   Choose e (gcd(e, phi)=1)  ===>  Calculate d = e^(-1) mod phi(n)
   Public Key: {e, n}             Private Key: {d, n}
   
   [ Encryption (Sender) ]
   Plaintext M  ===>  C = (M^e) mod n  ===>  Ciphertext C
   
   [ Decryption (Receiver) ]
   Ciphertext C ===>  M = (C^d) mod n  ===>  Original Plaintext M
        `,
        caption: 'RSA pipeline from prime generation to modular exponentiation.'
      },
      codeSnippet: {
        language: 'typescript',
        title: 'Executable RSA Key Generation, Encryption & Decryption',
        code: `// Educational RSA Implementation with small prime numbers
function gcd(a: bigint, b: bigint): bigint {
  return b === 0n ? a : gcd(b, a % b);
}

function modInverse(e: bigint, phi: bigint): bigint {
  let [m0, y, x] = [phi, 0n, 1n];
  while (e > 1n) {
    const q = e / phi;
    [e, phi] = [phi, e % phi];
    [x, y] = [y, x - q * y];
  }
  return x < 0n ? x + m0 : x;
}

function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let res = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp = exp / 2n;
  }
  return res;
}

// 1. Choose primes p=61, q=53
const p = 61n, q = 53n;
const n = p * q; // 3233n
const phi = (p - 1n) * (q - 1n); // 3120n
const e = 17n; // gcd(17, 3120) = 1
const d = modInverse(e, phi); // 2753n

const message = 65n; // Character 'A'
const ciphertext = modPow(message, e, n); // 65^17 mod 3233
const decrypted = modPow(ciphertext, d, n); // C^2753 mod 3233

console.log(\`Plaintext: \${message}\`);
console.log(\`Ciphertext: \${ciphertext}\`); // 2790
console.log(\`Decrypted: \${decrypted}\`);   // 65 (Matches message!)`,
        explanation: 'Complete toy RSA workflow using BigInt modular arithmetic.'
      }
    },
    {
      slug: 'key-management',
      title: 'Key Management & Distribution Principles',
      shortDesc: 'Architectures for securely generating, certifying, storing, revoking, and retiring cryptographic keys.',
      unitId: 'unit-3',
      unitNumber: 3,
      explanation: [
        'Cryptographic algorithms are only as secure as the mechanisms protecting their keys. Key Management encompasses the entire lifecycle of cryptographic keys: generation (using hardware cryptographically secure random number generators - CSPRNGs), secure distribution, verification, storage, rotation, revocation, and destruction.',
        'Symmetric key distribution presents major scalability challenges: for N users, distributing N(N-1)/2 keys requires either direct physical delivery or trusted Key Distribution Centers (KDCs) like Kerberos. Public key distribution eliminates symmetric pairing overhead but introduces the critical vulnerability of Man-in-the-Middle (MITM) impersonation: an adversary can broadcast a bogus public key claiming to be Alice.',
        'Public Key Infrastructure (PKI) counters public-key spoofing through digital certificates formalized by ITU-T X.509. A trusted third-party Certificate Authority (CA) verifies the identity of an applicant and cryptographically signs their public key, binding their real-world identity to their cryptographic credentials.'
      ],
      realWorldExample: {
        title: 'DigiNotar CA Breach (2011)',
        description:
          'Intruders compromised Dutch Certificate Authority DigiNotar and generated over 500 fraudulent rogue wildcard certificates for domains including *.google.com. This allowed state actors to execute MITM interception of Iranian citizens’ Gmail accounts.',
        impact: 'Prompted the revocation of DigiNotar’s root certificates and spurred the creation of Certificate Transparency (CT) logs.'
      },
      keyPoints: [
        'Key Lifecycle Stages: Generation -> Distribution -> Storage -> Rotation -> Revocation -> Destruction.',
        'Public Key Authenticity Problem: Public keys can be freely spoofed without digital certification.',
        'X.509 Digital Certificates: Binds Public Key to Subject Identity via CA signature.',
        'Certificate Revocation: CRLs (Certificate Revocation Lists) and OCSP (Online Certificate Status Protocol) monitor compromised certificates.'
      ],
      diagram: {
        title: 'X.509 Public Key Certificate Architecture',
        type: 'ascii',
        content: `
+-----------------------------------------------------------+
| X.509 DIGITAL CERTIFICATE                                 |
| - Serial Number, Version (v3), Validity Period             |
| - Subject: CN = bank.example.com                          |
| - Subject's Public Key: { e = 65537, n = 2048-bit RSA }   |
| - Issuer: Let's Encrypt Authority X3                      |
|                                                           |
| [ CA's Cryptographic Digital Signature ]                  |
| = Encrypt_PR_CA( SHA-256( Certificate Content ) )        |
+-----------------------------------------------------------+
               ^
               | (Verified using Pre-installed Root CA Public Key)
        [ Browser / Client ]
        `,
        caption: 'Certificate structure binding domain identity to public key via CA signature.'
      }
    },
    {
      slug: 'diffie-hellman-key-exchange',
      title: 'Diffie-Hellman Key Exchange',
      shortDesc: 'Pioneering protocol enabling two parties to establish a shared secret over an untrusted channel.',
      unitId: 'unit-3',
      unitNumber: 3,
      explanation: [
        'Published in 1976 by Whitfield Diffie and Martin Hellman, the Diffie-Hellman (DH) protocol was the first practical method enabling two communicating parties (Alice and Bob) to establish a shared secret key over an unencrypted, fully observed communication channel without any prior shared secrets.',
        'Protocol Steps: (1) Alice and Bob publicly agree on a large prime p and a primitive root g modulo p. (2) Alice chooses a private secret integer a and transmits public value A = g^a mod p. (3) Bob chooses a private secret integer b and transmits public value B = g^b mod p. (4) Alice computes shared secret K = B^a mod p = (g^b)^a mod p = g^(ab) mod p. (5) Bob computes shared secret K = A^b mod p = (g^a)^b mod p = g^(ab) mod p. Both parties now share identical key K.',
        'The security of Diffie-Hellman rests on the intractability of the Discrete Logarithm Problem (DLP): given g, p, and g^a mod p, it is computationally infeasible to extract exponent a. However, unauthenticated Diffie-Hellman is vulnerable to a Man-in-the-Middle (MITM) attack unless authenticated via digital signatures (e.g., Ephemeral Diffie-Hellman with RSA/ECDSA in TLS 1.3, which additionally provides Perfect Forward Secrecy).'
      ],
      realWorldExample: {
        title: 'Perfect Forward Secrecy (PFS) in Signal & WhatsApp',
        description:
          'Signal and WhatsApp employ the Double Ratchet Algorithm combining Ephemeral Diffie-Hellman (ECDH) key exchanges on every message. Even if an adversary compromises a user’s device private identity key in the future, past recorded conversations cannot be decrypted.',
        impact: 'Provides forward secrecy protecting billions of mobile chat messages worldwide.'
      },
      keyPoints: [
        'Shared Secret: K = g^(ab) mod p derived independently without transmitting a or b.',
        'Security Base: Discrete Logarithm Problem (DLP) over finite fields Z_p*.',
        'MITM Vulnerability: DH provides no authentication by itself; Mallory can intercept and negotiate two independent keys with Alice and Bob.',
        'Perfect Forward Secrecy (PFS): Ephemeral DH keys (DHE/ECDHE) discarded after session termination protect historical traffic.'
      ],
      diagram: {
        title: 'Diffie-Hellman Key Exchange Sequence',
        type: 'ascii',
        content: `
   Alice                                                       Bob
   Private: a                                                 Private: b
   Public: A = g^a mod p                                       Public: B = g^b mod p
      |                                                           |
      | ----------------- Public Key A = g^a mod p -------------> |
      |                                                           |
      | <---------------- Public Key B = g^b mod p -------------- |
      |                                                           |
   Compute Secret:                                             Compute Secret:
   K = B^a mod p = (g^b)^a                                     K = A^b mod p = (g^a)^b
                 = g^(ab) mod p                                              = g^(ab) mod p
        `,
        caption: 'Mathematical convergence on identical shared secret g^(ab) mod p.'
      },
      codeSnippet: {
        language: 'typescript',
        title: 'Diffie-Hellman Key Agreement Implementation',
        code: `// Educational Diffie-Hellman with small parameters
function modPow(b: bigint, e: bigint, m: bigint): bigint {
  let r = 1n;
  b = b % m;
  while (e > 0n) {
    if (e % 2n === 1n) r = (r * b) % m;
    b = (b * b) % m;
    e = e / 2n;
  }
  return r;
}

// 1. Public parameters: prime p = 23, primitive root g = 5
const p = 23n;
const g = 5n;

// 2. Alice generates private a=6, public A
const a = 6n;
const A = modPow(g, a, p); // 5^6 mod 23 = 8

// 3. Bob generates private b=15, public B
const b = 15n;
const B = modPow(g, b, p); // 5^15 mod 23 = 19

// 4. Both compute shared secret K
const secretAlice = modPow(B, a, p); // 19^6 mod 23 = 2
const secretBob   = modPow(A, b, p); // 8^15 mod 23 = 2

console.log(\`Alice Public: \${A}, Bob Public: \${B}\`);
console.log(\`Alice Secret: \${secretAlice}\`); // 2n
console.log(\`Bob Secret:   \${secretBob}\`);   // 2n (Identical!)`,
        explanation: 'Simulates the Diffie-Hellman key agreement using modular exponentiation.'
      }
    },
    {
      slug: 'elgamal-algorithm',
      title: 'The Elgamal Cryptosystem',
      shortDesc: 'Asymmetric encryption and digital signature scheme based on the Diffie-Hellman discrete logarithm problem.',
      unitId: 'unit-3',
      unitNumber: 3,
      explanation: [
        'Formulated in 1985 by Taher Elgamal, the Elgamal cryptosystem is a public-key cipher and digital signature algorithm built directly upon the Diffie-Hellman protocol. Unlike RSA, which relies on the difficulty of integer factorization, Elgamal’s security depends on the computational hardness of computing discrete logarithms in a cyclic group Z_p*.',
        'Key Generation: Select a large prime p and generator g. Choose a private key x uniformly from {1, ..., p-2}. Compute the public key component y = g^x mod p. The public key is (p, g, y) and the private key is x.',
        'Encryption: To encrypt plaintext M, choose an ephemeral random integer k coprime to p-1. Compute ephemeral key component C1 = g^k mod p and masked payload C2 = (M * y^k) mod p. The ciphertext is the pair (C1, C2). Decryption: Recover plaintext by computing M = C2 * (C1^x)^(-1) mod p. Notice that because k is randomly refreshed for every encryption, Elgamal is randomized (probabilistic): encrypting the exact same message twice generates distinct ciphertexts, thwarting chosen-plaintext attacks.'
      ],
      realWorldExample: {
        title: 'OpenPGP & GnuPG Key Management',
        description:
          'Historically, GnuPG (GPG) utilized Elgamal keys for asymmetric message encryption alongside DSA for digital signatures, providing cross-platform open-source privacy for journalists and software package signatures.',
        impact: 'Pioneered randomized public-key encryption preventing dictionary-based ciphertext comparison.'
      },
      keyPoints: [
        'Probabilistic Encryption: Re-encrypting identical plaintext yields different ciphertexts due to ephemeral k.',
        'Ciphertext Expansion: Ciphertext (C1, C2) is double the size of the plaintext M.',
        'Ephemeral Key Compromise: If random k is ever reused or leaked, the private key x can be recovered.',
        'Basis for DSA: The Digital Signature Algorithm (DSA) standard is a direct variant of Elgamal signatures.'
      ],
      diagram: {
        title: 'Elgamal Probabilistic Encryption & Decryption Trace',
        type: 'ascii',
        content: `
   [ Encryption with Public Key (p, g, y) ]
   Message M  ---> Pick fresh random k
                     |
                     +---> C1 = g^k mod p
                     +---> C2 = M * (y^k) mod p
                     |
   Transmitted Ciphertext: (C1, C2)
   
   [ Decryption with Private Key x ]
   Ciphertext (C1, C2)  ---> Compute Shared Key: S = (C1)^x = (g^k)^x = g^(kx) mod p
                        ---> Invert S: S^(-1) mod p
                        ---> Plaintext M = (C2 * S^(-1)) mod p = (M * y^k * S^(-1)) mod p = M
        `,
        caption: 'Decryption cancels out the ephemeral blinding factor y^k using private exponent x.'
      }
    },
    {
      slug: 'elliptic-curve-cryptography',
      title: 'Elliptic Curve Cryptography (ECC)',
      shortDesc: 'Next-generation asymmetric cryptography providing equivalent RSA security with dramatically smaller keys.',
      unitId: 'unit-3',
      unitNumber: 3,
      explanation: [
        'Introduced independently by Neal Koblitz and Victor Miller in 1985, Elliptic Curve Cryptography (ECC) represents the cutting edge of contemporary public-key cryptography. ECC is based on the algebraic structure of elliptic curves over finite fields GF(p) or GF(2^m) defined by the Weierstrass equation: y^2 = x^3 + ax + b, where 4a^3 + 27b^2 != 0.',
        'The set of points (x, y) lying on the curve together with an abstract point at infinity O form an abelian group under geometric "Point Addition" and "Point Doubling". Scalar multiplication k * P (adding point P to itself k times) is straightforward to compute via double-and-add. However, given points P and Q = k * P, computing the scalar multiplier k is the Elliptic Curve Discrete Logarithm Problem (ECDLP), which has no known sub-exponential classical attack.',
        'Consequently, ECC achieves equivalent cryptographic strength with substantially smaller key sizes: a 256-bit ECC key (e.g., secp256k1 used in Bitcoin, or Curve25519 used in TLS/Signal) provides comparable security to a 3072-bit RSA key, yielding 90% less bandwidth, faster signatures, and minimal battery consumption on mobile and IoT hardware.'
      ],
      realWorldExample: {
        title: 'Bitcoin, Ethereum & Curve25519 in Modern Protocols',
        description:
          'Bitcoin and Ethereum secure hundreds of billions of dollars of transactions using the ECDSA secp256k1 curve. Modern SSH and WireGuard VPNs mandate Curve25519 (Ed25519) for ultra-fast, side-channel-immune key exchanges.',
        impact: 'Powers mobile devices, IoT sensors, and decentralized ledgers with compact, efficient cryptography.'
      },
      keyPoints: [
        'Weierstrass Equation: y^2 = x^3 + ax + b (mod p).',
        'ECDLP Hardness: No sub-exponential algorithm exists on general curves; Pollard’s rho requires O(sqrt(n)) steps.',
        'Key Size Efficiency: ECC 256-bit ≈ RSA 3072-bit; ECC 384-bit ≈ RSA 7680-bit.',
        'Core ECC Protocols: ECDH (key agreement), ECDSA and EdDSA (digital signatures).'
      ],
      diagram: {
        title: 'Geometric Point Addition and Doubling on Elliptic Curve',
        type: 'ascii',
        content: `
               y
               ^
               |           * (Curve: y^2 = x^3 + ax + b)
               |        *     *
           P   +     *           *
              /|  *                 *
             / |*                     *
          Q +--+-----------------------+---> x
           /   |                        *
          /    |                         *
         /     |                          *
     R' +      |
        |      |
        v      |
        R = P+Q+ (Reflect R' across x-axis to find R = P + Q)
        `,
        caption: 'Secant line through P and Q intersects at R\', reflected to yield P + Q.'
      }
    }
  ],
  quiz: [
    {
      id: 'q3-1',
      question: 'Which block cipher mode of operation permits arbitrary parallel processing of blocks for both encryption and decryption?',
      options: [
        'Cipher Block Chaining (CBC)',
        'Electronic Codebook (ECB)',
        'Counter Mode (CTR)',
        'Output Feedback (OFB)'
      ],
      correctIndex: 2,
      explanation:
        'CTR mode encrypts an independent counter value (Nonce || i) for each block, allowing arbitrary blocks to be encrypted or decrypted simultaneously in parallel.'
    },
    {
      id: 'q3-2',
      question: 'Why was Double DES abandoned in favor of Triple DES?',
      options: [
        'Double DES keys were too large for 16-bit processors',
        'The Meet-in-the-Middle attack reduced its effective complexity from 2^112 to 2^57',
        'It was susceptible to differential cryptanalysis in the first round',
        'It lacked an initial permutation stage'
      ],
      correctIndex: 1,
      explanation:
        'The Meet-in-the-Middle attack computes forward encryption and backward decryption table matches, requiring only 2^57 operations, rendering Double DES barely more secure than single 56-bit DES.'
    },
    {
      id: 'q3-3',
      question: 'A 256-bit Elliptic Curve Cryptography (ECC) key provides cryptographic security roughly equivalent to which RSA key size?',
      options: ['512-bit RSA', '1024-bit RSA', '3072-bit RSA', '16384-bit RSA'],
      correctIndex: 2,
      explanation:
        'Because the fastest known attack on ECDLP is exponential O(sqrt(n)), a 256-bit ECC key offers approximately 128 bits of security level, equivalent to a 3072-bit RSA key.'
    }
  ]
};
