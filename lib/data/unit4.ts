import { Unit } from '../types';

export const unit4: Unit = {
  id: 'unit-4',
  number: 4,
  title: 'Cryptographic Hash Functions, MACs & Authentication Protocols',
  hours: 6,
  courseOutcome: 'CO4: Evaluate data integrity mechanisms, hash standards, digital signature algorithms, and Kerberos key distribution.',
  badge: 'Integrity & Authentication',
  description:
    'Unit 4 examines message authentication requirements, Message Authentication Codes (MAC / HMAC), collision-resistant cryptographic hash algorithms (MD5, SHA-1, SHA-2, SHA-3), security bounds against birthday and length-extension attacks, Digital Signature standards (DSA, RSA-PSS), Key Distribution Centers, and the Kerberos authentication architecture.',
  subtopics: [
    {
      slug: 'authentication-requirements-functions',
      title: 'Authentication Requirements & Functions',
      shortDesc: 'Threat taxonomy against message integrity and the structural functions deployed for verification.',
      unitId: 'unit-4',
      unitNumber: 4,
      explanation: [
        'Message authentication is a verification procedure that allows communicating parties to verify that received messages are authentic: that the source is valid, that the content has not been altered, and that the message was delivered in the correct sequence without replay or delay. Security attacks threatening authenticity include: Disclosure, Traffic Analysis, Masquerade, Content Modification, Sequence Modification, Timing Modification, and Source Repudiation.',
        'To counter these attacks, authentication mechanisms are built upon three functional architectures: (1) Message Encryption (where the ciphertext serves as the authenticator), (2) Message Authentication Code (MAC, where a secret key generates a fixed-size cryptographic tag appended to the message), and (3) Hash Function (a public function mapping arbitrary messages into a fixed-length digest without requiring a secret key).',
        'When using symmetric message encryption alone, successful decryption with a shared key implies authentication only if the plaintext contains recognizable structure, valid checksums, or sequence numbers. In modern protocol design, encryption and authentication are decoupled or unified via Authenticated Encryption with Associated Data (AEAD).'
      ],
      realWorldExample: {
        title: 'SWIFT Interbank Financial Messaging Tampering',
        description:
          'In the $81M Bangladesh Bank cyber heist, malware compromised local credentials to generate forged SWIFT payment orders. Robust end-to-end cryptographic authentication functions and hardware token verification stopped further pending fraudulent transfers totaling $850M.',
        impact: 'Underscores why message authentication with strict non-repudiation is vital in financial transaction systems.'
      },
      keyPoints: [
        'Authentication Objectives: Verify source identity, verify message content integrity, and verify timeliness.',
        'Three Authenticator Types: Message Encryption, Message Authentication Code (MAC), and Cryptographic Hash Function.',
        'AEAD (Authenticated Encryption with Associated Data): Modern standard combining AES-GCM or ChaCha20-Poly1305 to eliminate separate encrypt-then-MAC vulnerabilities.',
        'Replay Protection: Uses timestamps, nonces (numbers used once), and monotonic sequence numbers.'
      ],
      diagram: {
        title: 'Three Architectural Models for Message Authentication',
        type: 'ascii',
        content: `
1. MESSAGE ENCRYPTION:
   [ Message M ] ---> [ Encrypt E_K ] ===> [ Ciphertext C ] ===> [ Decrypt D_K ] ---> [ M ]

2. MESSAGE AUTHENTICATION CODE (MAC):
   [ Message M ] -----------------------------------------------> [ M ] (Verify MAC)
         |                                                          ^
         +---> [ MAC Generate (K) ] ===> [ Tag T ] ===> [ Verify ] -+

3. HASH FUNCTION + DIGITAL SIGNATURE:
   [ Message M ] -----------------------------------------------> [ M ]
         |                                                          ^
         +---> [ Hash H(M) ] ---> [ Sign with PR_A ] ===> [ Sig ] --+
        `,
        caption: 'Comparison of authentication pipelines across symmetric and asymmetric primitives.'
      }
    },
    {
      slug: 'message-authentication-code',
      title: 'Message Authentication Code (MAC & HMAC)',
      shortDesc: 'Keyed cryptographic checksums verifying data origin and transmission integrity.',
      unitId: 'unit-4',
      unitNumber: 4,
      explanation: [
        'A Message Authentication Code (MAC), also known as a cryptographic checksum, is an authentication technique involving a shared secret key K between sender and receiver. The sender passes the message M and key K through a MAC function C to generate a fixed-size tag: T = MAC(K, M). The tag is transmitted alongside the plaintext message.',
        'Upon receipt, the receiver executes the same MAC function on the received message using shared key K. If the calculated tag matches the received tag T, the receiver achieves two vital assurances: (1) Data Integrity (the message was not modified in transit), and (2) Data Origin Authenticity (the message genuinely originated from the party possessing secret key K). Note that MACs do not provide non-repudiation, because both sender and receiver possess the shared key K.',
        'HMAC (Keyed-Hash Message Authentication Code), standardized in RFC 2104 and FIPS 198, constructs a cryptographically robust MAC using any iterated hash function H (such as SHA-256). HMAC applies nested hashing with inner pad (ipad = 0x36) and outer pad (opad = 0x5C): HMAC(K, M) = H((K ⊕ opad) || H((K ⊕ ipad) || M)). This nested structure provably prevents length-extension attacks.'
      ],
      realWorldExample: {
        title: 'AWS API Request Signing (Signature Version 4)',
        description:
          'Every REST API request sent to Amazon Web Services (S3, EC2, DynamoDB) must include an Authorization header containing an HMAC-SHA256 signature calculated over the HTTP method, request headers, URI, timestamp, and body using the user’s AWS Secret Access Key.',
        impact: 'Secures billions of cloud API calls daily against unauthorized tampering or credential replay.'
      },
      keyPoints: [
        'Tag Calculation: T = HMAC(K, M). Sender transmits (M || T).',
        'HMAC Formula: H((K ⊕ opad) || H((K ⊕ ipad) || M)) where ipad=0x36, opad=0x5C.',
        'No Non-Repudiation: Because both Alice and Bob share K, Bob cannot prove to a judge that Alice authored the tag.',
        'Speed: Significantly faster than digital signatures because it uses symmetric hashing rather than modular exponentiation.'
      ],
      diagram: {
        title: 'HMAC Internal Nested Processing Pipeline',
        type: 'ascii',
        content: `
   Secret Key K --------------------------------------------+
        |                                                   |
   Pad to b bits (K+)                                  Pad to b bits (K+)
        |                                                   |
     ( ⊕ ipad = 0x36 )                                   ( ⊕ opad = 0x5C )
        |                                                   |
        v                                                   v
   [ K+ ⊕ ipad ]                                       [ K+ ⊕ opad ]
        |                                                   |
        +-----> || Message M                                |
        |            |                                      |
        v            v                                      |
   [ Inner Hash H(...) ]                                    |
        |                                                   |
        v (n-bit digest)                                    |
        +---------------------------------------------------+
        |
        v
   [ Outer Hash H(...) ] ===> HMAC Tag (n bits)
        `,
        caption: 'Dual-pass nested architecture defeating length extension attacks.'
      },
      codeSnippet: {
        language: 'typescript',
        title: 'HMAC-SHA256 Calculation & Signature Verification',
        code: `import { createHmac } from 'crypto';

// Generating an HMAC-SHA256 signature
function generateHMAC(secretKey: string, message: string): string {
  return createHmac('sha256', secretKey)
    .update(message)
    .digest('hex');
}

// Constant-time verification preventing timing side-channels
function verifyHMAC(secretKey: string, message: string, expectedTag: string): boolean {
  const actualTag = generateHMAC(secretKey, message);
  if (actualTag.length !== expectedTag.length) return false;
  
  let mismatch = 0;
  for (let i = 0; i < actualTag.length; i++) {
    mismatch |= actualTag.charCodeAt(i) ^ expectedTag.charCodeAt(i);
  }
  return mismatch === 0;
}

const secretKey = "super-secret-enterprise-key";
const payload = "Transfer:$50,000 to Account #99214";
const tag = generateHMAC(secretKey, payload);

console.log("HMAC-SHA256 Tag:", tag);
console.log("Valid Message Verification:", verifyHMAC(secretKey, payload, tag));
console.log("Tampered Message Verification:", verifyHMAC(secretKey, payload + "!", tag));`,
        explanation: 'Uses HMAC-SHA256 with constant-time XOR comparison to defeat timing attacks.'
      }
    },
    {
      slug: 'hash-functions',
      title: 'Cryptographic Hash Functions',
      shortDesc: 'One-way mathematical algorithms mapping arbitrary data to fixed-length deterministic digests.',
      unitId: 'unit-4',
      unitNumber: 4,
      explanation: [
        'A cryptographic hash function H takes an input message of arbitrary finite length M and compresses it into a fixed-length output digest h = H(M) (e.g., 256 bits for SHA-256). Unlike general-purpose checksums (like CRC32) designed solely to detect accidental transmission noise, cryptographic hash functions are specifically engineered to withstand deliberate mathematical manipulation by intelligent adversaries.',
        'Every secure cryptographic hash function must strictly satisfy three fundamental mathematical properties: (1) Preimage Resistance (One-Way): Given a hash value h, it must be computationally infeasible to find any message m such that H(m) = h (complexity 2^n). (2) Second Preimage Resistance (Weak Collision Resistance): Given an input m1, it must be computationally infeasible to find another distinct input m2 != m1 such that H(m1) = H(m2) (complexity 2^n).',
        '(3) Collision Resistance (Strong Collision Resistance): It must be computationally infeasible to find ANY pair of distinct messages (m1, m2) such that H(m1) = H(m2). Due to the Birthday Paradox, the complexity of finding a collision on an n-bit hash is reduced to O(2^(n/2)). Consequently, a secure hash must produce an output of at least 256 bits to guarantee 128 bits of security.'
      ],
      realWorldExample: {
        title: 'Git Version Control & Merkle Tree Integrity',
        description:
          'Every commit, file tree, and tag in Git is identified by its cryptographic SHA-1/SHA-256 hash. The commit tree forms a Merkle DAG (Directed Acyclic Graph): altering a single character in a source file from 10 years ago alters every subsequent commit hash.',
        impact: 'Prevents covert source code tampering in the Linux kernel and global software repositories.'
      },
      keyPoints: [
        'Arbitrary Input to Fixed Output: Maps {0, 1}* to {0, 1}^n deterministically.',
        'Preimage Resistance (One-Way): Infeasible to invert h to recover m (O(2^n)).',
        'Second Preimage Resistance: Given m1, infeasible to find m2 with H(m1)=H(m2) (O(2^n)).',
        'Collision Resistance: Infeasible to find ANY arbitrary collision (O(2^(n/2)) due to Birthday Attack).'
      ],
      diagram: {
        title: 'Three Cryptographic Hash Hardness Properties',
        type: 'ascii',
        content: `
1. PREIMAGE RESISTANCE (One-Way):
   Given Digest h ===X===> Infeasible to find M such that H(M) = h  [Work: 2^n]

2. SECOND PREIMAGE RESISTANCE:
   Given Message M1 ===> Infeasible to find M2 != M1 such that H(M1) = H(M2)  [Work: 2^n]

3. COLLISION RESISTANCE:
   Find ANY pair (M1, M2) such that M1 != M2 and H(M1) = H(M2)  [Work: 2^(n/2)]
   (Birthday Paradox reduces exponent by half)
        `,
        caption: 'The triad of mathematical hardness properties governing cryptographic hash functions.'
      }
    },
    {
      slug: 'security-hash-functions-macs',
      title: 'Security of Hash Functions & MACs (Birthday & Length Extension)',
      shortDesc: 'Attacking hash constructions via probabilistic collisions and Merkle-Damgård structural flaws.',
      unitId: 'unit-4',
      unitNumber: 4,
      explanation: [
        'Understanding how cryptographic hashes fail is vital for secure engineering. The most prominent attack against collision resistance is the Birthday Attack, derived from the mathematical Birthday Paradox: in a room of just 23 people, the probability that two people share a birthday exceeds 50%. For an n-bit hash function, the total space of possible digests is 2^n. By generating approximately 1.17 * sqrt(2^n) ≈ 2^(n/2) random message variants, an adversary will discover a collision with over 50% probability.',
        'This implies that an 80-bit hash (such as MD4) requires only 2^40 operations to break, which is trivial for modern GPUs. For SHA-1 (160 bits), collision resistance is bounded by 2^80, which Google and CWI shattered in 2017 with the SHAttered attack (generating two distinct PDF documents with identical SHA-1 hashes in 2^63.1 computations).',
        'Another structural attack is the Length Extension Attack, which afflicts hash functions based on the Merkle-Damgård construction (MD5, SHA-1, SHA-256). If an insecure MAC is constructed as MAC(K, M) = H(K || M), an adversary knowing H(K || M) and the length of (K || M) can reconstruct the internal state of the hash engine and append extra malicious data M_extra to generate a valid tag H(K || M || pad || M_extra) without ever knowing secret key K.'
      ],
      realWorldExample: {
        title: 'SHAttered: Collision in SHA-1 (2017)',
        description:
          'Google and CWI researchers successfully generated two distinct PDF files (with different contents and visual appearance) that produced the exact same SHA-1 cryptographic digest, formally invalidating SHA-1 for digital signatures.',
        impact: 'Forced the global retirement of SHA-1 across browsers, Git, and software signing certificates.'
      },
      keyPoints: [
        'Birthday Attack Bound: Collision search complexity is O(2^(n/2)), halving effective security bits.',
        'Merkle-Damgård Length Extension: Simple H(K || M) is vulnerable; HMAC avoids this by nested hashing.',
        'Shattered Attack (2017): Demonstrated practical SHA-1 collisions in 9,000,000 GPU-years (~2^63 operations).',
        'SHA-3 Resistance: SHA-3 uses the Sponge Construction (Keccak), which is inherently immune to length extension.'
      ],
      diagram: {
        title: 'Length Extension Attack on Merkle-Damgård Hash',
        type: 'ascii',
        content: `
   Original Hash State: H(Key || Message) = [ Internal State Registers A, B, C, D ]
                                                     |
   Attacker intercepts Digest H, knows byte length   |
   Attacker initializes Hash Engine directly with this State:
                                                     v
   [ Inject State (A,B,C,D) ] ---> [ Feed Extra Malicious Blocks ] ---> Valid Forged Hash!
   (Secret Key was never known!)
        `,
        caption: 'Re-initializing compression state registers allows appending forged payload extensions.'
      }
    },
    {
      slug: 'md5-message-digest-algorithm',
      title: 'MD5 Message Digest Algorithm',
      shortDesc: 'Historical 128-bit hash algorithm designed by Ronald Rivest, now completely compromised.',
      unitId: 'unit-4',
      unitNumber: 4,
      explanation: [
        'Designed by Ronald Rivest in 1991 to replace MD4, the MD5 Message Digest Algorithm processes input messages in 512-bit blocks (padded using a single 1-bit, zeros, and a 64-bit length counter) to produce a 128-bit hash digest represented by four 32-bit state registers: (A, B, C, D).',
        'MD5 executes 4 rounds per 512-bit block, each round comprising 16 steps (64 total steps). Each step applies a non-linear bitwise function (F, G, H, or I), modular addition modulo 2^32, a fixed sine-derived additive constant T[i], and a variable circular left shift s.',
        'In 2004, Xiaoyun Wang and her research team demonstrated practical analytical collision attacks against MD5, finding collisions in mere minutes. Today, chosen-prefix collisions against MD5 can be generated in seconds on a mobile phone. Consequently, MD5 is strictly prohibited in security protocols, remaining useful only as an informal checksum against unintentional file corruption.'
      ],
      realWorldExample: {
        title: 'Flame Cyber-Weapon MD5 Rogue CA Collision (2012)',
        description:
          'The state-sponsored Flame malware generated a chosen-prefix MD5 collision to forge a Microsoft Terminal Server digital certificate, allowing the malware to spoof Windows Update and propagate across high-security networks.',
        impact: 'Exposed real-world exploitation of MD5 collision attacks by nation-state actors.'
      },
      keyPoints: [
        'Output Size: 128 bits (16 bytes).',
        'Block Size: 512 bits divided into sixteen 32-bit words.',
        'Rounds: 4 rounds of 16 steps each = 64 total compression operations.',
        'Cryptographic Status: Completely broken for collision resistance; prohibited for certificates and signatures.'
      ],
      diagram: {
        title: 'MD5 Single Compression Step (1 of 64)',
        type: 'ascii',
        content: `
             A          B          C          D
             |          |          |          |
             |     +----+----+     |          |
             |     |   F     |<----+          |
             |     +----+----+                |
             |          |                     |
             v          v                     |
           ( ⊕ ) <------+                     |
             |                                |
             v                                |
           ( ⊕ ) <--- M[k] (Message Word)     |
             |                                |
             v                                |
           ( ⊕ ) <--- T[i] (Sine Constant)    |
             |                                |
             v                                |
          <<< s (Circular Left Shift)         |
             |                                |
             v                                |
           ( ⊕ ) <--- B                       |
             |                                |
             v                                v
        New B = result   New C = B  New D = C  New A = D
        `,
        caption: 'Single step updating four 32-bit registers using non-linear boolean functions.'
      }
    },
    {
      slug: 'secure-hash-algorithm',
      title: 'Secure Hash Algorithm Family (SHA-1, SHA-2, SHA-3)',
      shortDesc: 'The evolution of NIST cryptographic hash standards from 160-bit SHA-1 to Sponge-based SHA-3.',
      unitId: 'unit-4',
      unitNumber: 4,
      explanation: [
        'The Secure Hash Algorithm (SHA) family is standardized by NIST under FIPS 180 and FIPS 202. The family spans four major generations: SHA-0 (1993, quickly withdrawn), SHA-1 (1995, 160-bit digest, broken via practical collisions in 2017), SHA-2 (2001), and SHA-3 (2015).',
        'SHA-2 encompasses SHA-224, SHA-256, SHA-384, and SHA-512, all built on the Merkle-Damgård construction. SHA-256 processes 512-bit message blocks through 64 rounds utilizing eight 32-bit state registers (A through H) and two non-linear mixing functions: Ch (Choose: (x AND y) XOR (NOT x AND z)) and Maj (Majority: (x AND y) XOR (x AND z) XOR (y AND z)), alongside circular rotation functions Sigma0 and Sigma1. SHA-2 remains completely unbroken against collision attacks.',
        'SHA-3 represents a revolutionary departure in internal architecture. Selected after an open NIST competition won by the Keccak algorithm, SHA-3 is based on the Sponge Construction. The sponge construction operates on a 1600-bit state permutation f using two phases: Absorbing (input message blocks are XORed into the bitrate r of the state and interleaved with permutations) and Squeezing (output hash bits are extracted from the state). Because SHA-3 does not use Merkle-Damgård, it is completely immune to length extension attacks.'
      ],
      realWorldExample: {
        title: 'Bitcoin Proof-of-Work (PoW) Mining',
        description:
          'Bitcoin consensus relies on Double-SHA256: Hash = SHA256(SHA256(BlockHeader)). Global miners execute over 600 exahashes (600 x 10^18 hashes) per second searching for a nonce that produces a digest with leading zeros.',
        impact: 'Demonstrates the absolute uniformity and unpredictable pseudo-random dispersion of SHA-256.'
      },
      keyPoints: [
        'SHA-1: 160-bit output. Deprecated by NIST due to SHAttered collision attacks.',
        'SHA-2: SHA-256 (32-bit words, 64 rounds) and SHA-512 (64-bit words, 80 rounds). Currently the worldwide workhorse.',
        'SHA-3 (Keccak): Sponge construction with 1600-bit permutation state; immune to length extension.',
        'Bitrate (r) and Capacity (c): In SHA-3, security level is defined by c/2, where state size b = r + c.'
      ],
      diagram: {
        title: 'SHA-3 Sponge Construction (Absorb & Squeeze)',
        type: 'ascii',
        content: `
   Message Blocks P_0, P_1, P_2 ...
          |        |        |
          v        v        v
   State: [r]      [r]      [r]           [r]     [r]  ===> Output Hash Z_0, Z_1
          --- (⊕)  --- (⊕)  --- (⊕)       ---     ---
          [c]      [c]      [c]           [c]     [c]
           |        |        |             |       |
           v        v        v             v       v
         +----+   +----+   +----+        +----+  +----+
         |  f |   |  f |   |  f |        |  f |  |  f |
         +----+   +----+   +----+        +----+  +----+
         <---- ABSORBING PHASE ---->     <-- SQUEEZING PHASE -->
        `,
        caption: 'Sponge permutation pipeline absorbing arbitrary inputs and squeezing arbitrary outputs.'
      }
    },
    {
      slug: 'digital-signatures',
      title: 'Digital Signatures & Standards (DSA, RSA-PSS)',
      shortDesc: 'Asymmetric cryptographic mechanisms providing authentic data origin, integrity, and legal non-repudiation.',
      unitId: 'unit-4',
      unitNumber: 4,
      explanation: [
        'A digital signature is an asymmetric mathematical scheme that achieves three fundamental security services: Data Origin Authentication, Data Integrity, and Non-Repudiation. While a handwritten signature can be forged and is decoupled from the content of a document, a digital signature is a cryptographic function of both the signer’s private key AND the entire bit-exact contents of the document itself.',
        'Digital Signature Procedure: (1) Signing: The sender computes the cryptographic hash of message M: h = H(M). The sender then encrypts or transforms hash h using their Private Key PR_A to generate signature s: s = Sign(PR_A, h). The signature is appended to M. (2) Verification: The receiver recomputes the hash h’ = H(M) and uses the sender’s Public Key PU_A to evaluate Verify(PU_A, s, h’). If the values match, the signature is mathematically valid.',
        'Major standards include: RSA Signatures (RSA-PSS padding per PKCS#1 v2.1), Digital Signature Algorithm (DSA per FIPS 186-4 based on discrete logarithms in sub-groups), and ECDSA (Elliptic Curve DSA) alongside modern Ed25519 (Edwards-curve Digital Signature Algorithm), which provides deterministic signatures free of dangerous random number generator pitfalls.'
      ],
      realWorldExample: {
        title: 'Sony PlayStation 3 ECDSA Private Key Recovery (2010)',
        description:
          'In ECDSA signing, a random ephemeral number k is required. Sony engineers used a static constant k in their PS3 firmware signing implementation. Because k was reused, hackers algebraically extracted Sony’s root private key, allowing unauthorized custom firmware installation.',
        impact: 'Illustrates why deterministic signature algorithms like Ed25519 (RFC 8032) were engineered to eliminate random nonce vulnerabilities.'
      },
      keyPoints: [
        'Core Properties: Authenticity, Integrity, Non-repudiation (cannot deny authoring).',
        'Sign the Digest, Not Plaintext: Signing H(M) preserves efficiency and prevents algebraic homomorphism attacks.',
        'DSA / ECDSA: Rely on discrete logs; reusing ephemeral k instantly reveals private key.',
        'RSA-PSS (Probabilistic Signature Scheme): Provably secure RSA signature padding scheme with random salt.'
      ],
      diagram: {
        title: 'Digital Signature Signing and Verification Workflow',
        type: 'ascii',
        content: `
   [ SENDER ALICE ]                                         [ RECEIVER BOB ]
   Message M ----------------------- Public Channel -------> Message M
       |                                                         |
       v                                                         v
   [ Hash H(M) ]                                             [ Hash H(M) ]
       |                                                         |
       v                                                         v
   [ Sign: Encrypt with Alice's ]                                [ Equals? ] <--- Valid!
   [ Private Key PR_Alice       ]                                ^
       |                                                         |
       v                                                         |
   Signature S --------------------------------------------------+
                                  (Verify with Alice's Public Key PU_Alice)
        `,
        caption: 'Asymmetric signing workflow verifying document digest match.'
      }
    },
    {
      slug: 'key-distribution-techniques',
      title: 'Key Distribution Techniques & Public Key Infrastructure',
      shortDesc: 'Mechanisms for distributing symmetric session keys and validating public key certificates.',
      unitId: 'unit-4',
      unitNumber: 4,
      explanation: [
        'Secure key distribution represents the primary operational challenge in large-scale cryptosystems. For symmetric cryptosystems, two parties must establish a shared secret session key without exposing it to adversaries on the wire. Decentralized manual distribution does not scale (requiring N(N-1)/2 keys for N nodes).',
        'Centralized symmetric distribution uses an automated Key Distribution Center (KDC). Each node shares a unique Master Key with the KDC. When Alice wishes to communicate with Bob, the KDC generates a temporary, one-time Session Key Ks and delivers it wrapped in two tickets encrypted under Alice’s and Bob’s master keys (as formalized by the Needham-Schroeder symmetric protocol).',
        'Public-key distribution eliminates the KDC single-point master-key repository but requires validating public key authenticity. This is achieved via Public Key Infrastructure (PKI), where hierarchical Certificate Authorities (Root CAs, Intermediate CAs) issue X.509 certificates asserting that a specific public key belongs to a named subject.'
      ],
      realWorldExample: {
        title: 'Needham-Schroeder Replay Vulnerability & Denning-Sacco Fix',
        description:
          'The original 1978 Needham-Schroeder symmetric protocol was vulnerable to a replay attack discovered by Denning and Sacco in 1981: if an attacker compromises an old session key, they can replay the old ticket to Bob. Adding timestamps resolved the flaw, forming the core of Kerberos.',
        impact: 'Established the necessity of freshness identifiers (timestamps and nonces) in cryptographic handshake protocols.'
      },
      keyPoints: [
        'Session Key: Ephemeral symmetric key used for a single connection, then discarded.',
        'Master Key: Long-term key shared between an individual entity and the KDC.',
        'Needham-Schroeder Protocol: Foundational symmetric key exchange protocol with KDC.',
        'PKI Certificate Hierarchy: Root CA signs Intermediate CAs, which sign End-Entity certificates.'
      ],
      diagram: {
        title: 'Symmetric Key Distribution Center (KDC) Protocol',
        type: 'ascii',
        content: `
   Alice                                KDC                                 Bob
     |                                   |                                   |
     | --- 1. Request(Alice, Bob, N1) -> |                                   |
     |                                   |                                   |
     | <- 2. E_Ka[ Ks || Bob || N1 || ---+                                   |
     |            E_Kb[ Ks || Alice ] ]  |                                   |
     |                                   |                                   |
     | ---------------- 3. E_Kb[ Ks || Alice ] ----------------------------> |
     |                                                                       |
     | <--------------- 4. E_Ks[ Nonce N2 ] -------------------------------- |
     |                                                                       |
     | ---------------- 5. E_Ks[ f(Nonce N2) ] ----------------------------> |
        `,
        caption: 'Classic Needham-Schroeder symmetric session key distribution handshake.'
      }
    },
    {
      slug: 'kerberos-protocol',
      title: 'The Kerberos Authentication Service',
      shortDesc: 'Trusted third-party authentication protocol providing single sign-on over insecure networks.',
      unitId: 'unit-4',
      unitNumber: 4,
      explanation: [
        'Developed at MIT Project Athena in the 1980s and formalized in RFC 4120 (Kerberos Version 5), Kerberos is a trusted third-party network authentication protocol designed to allow users to authenticate to distributed network services (file shares, databases, mail servers) across untrusted networks without sending passwords in the clear.',
        'A Kerberos Realm consists of three primary architectural components: (1) Clients, (2) Application Servers, and (3) The Key Distribution Center (KDC), which houses two sub-services: the Authentication Server (AS) and the Ticket Granting Server (TGS).',
        'Kerberos Authentication Sequence: (1) Client requests a Ticket Granting Ticket (TGT) from the AS by sending user identity. The AS returns a TGT encrypted with the secret key of the TGS, plus a session key encrypted with the user\'s hashed password. (2) Client sends the TGT and an Authenticator (timestamp) to the TGS requesting access to a specific Application Server. (3) TGS verifies the TGT, generates a Service Ticket encrypted with the Server’s secret key, and returns it to the Client. (4) Client presents the Service Ticket to the Application Server for mutual authentication.'
      ],
      realWorldExample: {
        title: 'Microsoft Active Directory Single Sign-On (SSO)',
        description:
          'When an employee logs into a Windows enterprise laptop joined to a corporate domain, Active Directory uses Kerberos v5 to issue tickets, enabling seamless single sign-on access to Outlook, SharePoint, and internal intranets without re-prompting for credentials.',
        impact: 'Protects enterprise identity and access across 90% of Fortune 500 corporate IT infrastructures.'
      },
      keyPoints: [
        'Single Sign-On (SSO): User enters password once at login; passwords are never sent across the network.',
        'Ticket-Granting Ticket (TGT): Reusable credential issued by AS allowing client to obtain specific service tickets from TGS.',
        'Mutual Authentication: Client authenticates to server, and server authenticates back to client.',
        'Replay Protection via Clock Synchronization: Requires Kerberos nodes to be synchronized within 5 minutes (via NTP) to enforce timestamp validity windows.'
      ],
      diagram: {
        title: 'Kerberos v5 Detailed 3-Phase Handshake',
        type: 'ascii',
        content: `
   +-------------------------------------------------------------+
   | Key Distribution Center (KDC)                               |
   |   [ Authentication Server (AS) ]   [ Ticket Granting (TGS) ] |
   +-------------------------------------------------------------+
             ^          |                     ^          |
       Step 1|    Step 2| (TGT)         Step 3|    Step 4| (Service Ticket)
             |          v                     |          v
          +----------------+               +-------------------+
          |     CLIENT     | ------------> | APPLICATION SERVER|
          +----------------+    Step 5     +-------------------+
                             (Ticket + Auth)
                             <------------ (Mutual Auth Step 6)
        `,
        caption: 'Three-phase ticket exchange providing mutual single sign-on authentication.'
      }
    }
  ],
  quiz: [
    {
      id: 'q4-1',
      question: 'Why does HMAC employ a nested hashing architecture H((K ⊕ opad) || H((K ⊕ ipad) || M)) rather than a simple H(K || M)?',
      options: [
        'To speed up CPU clock cycles',
        'To mathematically prevent Merkle-Damgård length-extension attacks',
        'To allow the key to be publicly published without risk',
        'To compress the output tag down to 32 bits'
      ],
      correctIndex: 1,
      explanation:
        'Simple hash constructions like H(K || M) are vulnerable to length-extension attacks where adversaries append data to the state. HMAC’s inner and outer padding layers eliminate this vulnerability completely.'
    },
    {
      id: 'q4-2',
      question: 'What is the theoretical search space complexity to discover a hash collision on an n-bit cryptographic hash function via a Birthday Attack?',
      options: ['O(n)', 'O(2^n)', 'O(2^(n/2))', 'O(n^2)'],
      correctIndex: 2,
      explanation:
        'By the Birthday Paradox, the expected number of random hash trials to find ANY collision among outputs is O(sqrt(2^n)) = O(2^(n/2)).'
    },
    {
      id: 'q4-3',
      question: 'In the Kerberos authentication architecture, which entity issues the Ticket Granting Ticket (TGT)?',
      options: [
        'The Application Server',
        'The Ticket Granting Server (TGS)',
        'The Authentication Server (AS)',
        'The Client Operating System'
      ],
      correctIndex: 2,
      explanation:
        'The Authentication Server (AS) verifies the user’s initial identity upon logon and issues the Ticket Granting Ticket (TGT).'
    }
  ]
};
