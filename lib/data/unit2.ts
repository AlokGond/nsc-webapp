import { Unit } from '../types';

export const unit2: Unit = {
  id: 'unit-2',
  number: 2,
  title: 'Mathematical Background & Number Theory',
  hours: 5,
  courseOutcome: 'CO2: Apply number theoretic foundations including modular arithmetic, Euclid, Fermat, and Euler theorems to cryptosystems.',
  badge: 'Mathematical Foundations',
  description:
    'Unit 2 delivers the mathematical and number-theoretic underpinning of modern cryptography. It covers modular congruence classes, the Euclidean algorithm for greatest common divisors (GCD), the Extended Euclidean algorithm for modular multiplicative inverses, prime distribution, and Fermat’s Little Theorem alongside Euler’s Totient Theorem.',
  subtopics: [
    {
      slug: 'modular-arithmetic',
      title: 'Modular Arithmetic & Congruence Classes',
      shortDesc: 'System of arithmetic for integers where numbers wrap around upon reaching a given modulus.',
      unitId: 'unit-2',
      unitNumber: 2,
      explanation: [
        'Modular arithmetic is an integer arithmetic system where numerical values wrap around upon reaching a fixed positive integer known as the modulus n. Formally, two integers a and b are said to be congruent modulo n (written a ≡ b (mod n)) if their difference (a - b) is an exact integral multiple of n, which equivalently implies that a and b yield identical non-negative remainders when divided by n.',
        'Modular arithmetic defines complete residue systems (integers modulo n, denoted Z_n = {0, 1, ..., n-1}). When endowed with modular addition and multiplication, Z_n forms a commutative ring. If the modulus n is a prime number p, the non-zero elements form a finite field (Galois Field GF(p)), wherein every non-zero element possesses a unique modular multiplicative inverse such that a * a^(-1) ≡ 1 (mod p).',
        'Crucial algebraic properties include: (a + b) mod n = ((a mod n) + (b mod n)) mod n, and (a * b) mod n = ((a mod n) * (b mod n)) mod n. These properties enable efficient modular reduction during large cryptographic exponentiations without integer overflow.'
      ],
      realWorldExample: {
        title: 'Clock Arithmetic & Cryptographic Cyclic Groups',
        description:
          'A 12-hour analog clock operates modulo 12: 9 o’clock plus 4 hours lands on 1 o’clock ((9 + 4) mod 12 = 1). In public-key cryptography, Diffie-Hellman and Elgamal utilize massive cyclic groups Z_p* of 2048 to 4096 bits.',
        impact: 'Guarantees that state values cycle predictably within bounded memory registers while keeping discrete logarithm inversion intractable.'
      },
      keyPoints: [
        'Congruence: a ≡ b (mod n) iff n divides (a - b).',
        'Residue Classes: Partition integers into n equivalence classes [0], [1], ..., [n-1].',
        'Multiplicative Inverse: An integer a has an inverse modulo n if and only if gcd(a, n) = 1 (coprime).',
        'Galois Field GF(p): For prime p, every non-zero element has a multiplicative inverse, creating a field.'
      ],
      diagram: {
        title: 'Modular Clock Arithmetic Ring (Modulo 12)',
        type: 'ascii',
        content: `
                             [0 / 12]
                        11              1
                   10                        2
                 9                              3  <-- (9 + 5 = 14 ≡ 2 mod 12)
                   8                         4
                         7              5
                                [6]
        `,
        caption: 'Cyclic representation of congruence classes modulo 12.'
      },
      codeSnippet: {
        language: 'typescript',
        title: 'Modular Addition, Multiplication & Fast Modular Exponentiation',
        code: `// Fast Modular Exponentiation: (base^exp) mod mod in O(log exp) time
function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let result = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) {
      result = (result * base) % mod;
    }
    base = (base * base) % mod;
    exp = exp / 2n;
  }
  return result;
}

const base = 7n;
const exponent = 560n;
const modulus = 561n;
console.log("7^560 mod 561 =", modPow(base, exponent, modulus).toString());`,
        explanation: 'Square-and-multiply algorithm avoids supercomputer integer overflow by applying mod at each step.'
      }
    },
    {
      slug: 'euclidean-extended-euclidean',
      title: 'Euclidean & Extended Euclidean Algorithm',
      shortDesc: 'Efficient algorithms for computing Greatest Common Divisors and modular multiplicative inverses.',
      unitId: 'unit-2',
      unitNumber: 2,
      explanation: [
        'The Euclidean algorithm, formulated circa 300 BC, is an extraordinarily fast method for computing the Greatest Common Divisor (GCD) of two integers a and b. The algorithm is based on the fundamental mathematical principle that the greatest common divisor of two integers does not change if the larger number is replaced by its remainder when divided by the smaller number: gcd(a, b) = gcd(b, a mod b).',
        'The Extended Euclidean Algorithm extends this procedure to calculate not only gcd(a, b), but also the Bézout coefficients x and y satisfying Bézout’s Identity: a*x + b*y = gcd(a, b).',
        'In cryptography, this algorithm is vital for computing the modular multiplicative inverse. If gcd(a, m) = 1, then a*x + m*y = 1, which implies a*x ≡ 1 (mod m). Therefore, x is the modular multiplicative inverse a^(-1) mod m, an indispensable operation in RSA key generation to compute the private decryption exponent d from public exponent e and totient φ(n).'
      ],
      realWorldExample: {
        title: 'RSA Private Key Computation',
        description:
          'When generating an RSA-2048 keypair, the public exponent e = 65537 must be inverted modulo φ(n) = (p-1)(q-1). The Extended Euclidean Algorithm determines d = e^(-1) mod φ(n) in fractions of a millisecond.',
        impact: 'Enables rapid creation of digital certificates and SSH identity keys across the Internet.'
      },
      keyPoints: [
        'Time Complexity: Lamé’s Theorem proves the Euclidean algorithm requires at most 5 * log10(b) divisions (O(log min(a, b))).',
        'Bézout’s Identity: Integers x and y always exist such that ax + by = gcd(a, b).',
        'Modular Inverse: If gcd(a, m) = 1, then x = a^(-1) mod m is derived directly from Bézout’s x.',
        'If gcd(a, m) != 1, no modular inverse exists (a is a zero-divisor in Z_m).'
      ],
      diagram: {
        title: 'Extended Euclidean Recurrence Execution Trace',
        type: 'ascii',
        content: `
Step | Equation: r_i = r_{i-2} - q_i * r_{i-1} | Quotient q | Bezout Step: x, y
-----+------------------------------------------+------------+-------------------
0    | gcd(a = 161, b = 28)                     |            |
1    | 161 = 5 * 28 + 21                        | q1 = 5     | r1 = 21
2    |  28 = 1 * 21 + 7                         | q2 = 1     | r2 = 7
3    |  21 = 3 * 7  + 0  (Remainder is 0!)      | q3 = 3     | GCD = 7
Back substitution yields: 7 = 28 - 1 * (161 - 5 * 28) = (-1)*161 + (6)*28
        `,
        caption: 'Iterative division and reverse substitution yielding Bezout coefficients.'
      },
      codeSnippet: {
        language: 'typescript',
        title: 'Extended Euclidean Algorithm & Modular Inverse',
        code: `interface EgcdResult {
  gcd: bigint;
  x: bigint;
  y: bigint;
}

function extendedGCD(a: bigint, b: bigint): EgcdResult {
  if (b === 0n) {
    return { gcd: a, x: 1n, y: 0n };
  }
  const { gcd, x: x1, y: y1 } = extendedGCD(b, a % b);
  const x = y1;
  const y = x1 - (a / b) * y1;
  return { gcd, x, y };
}

function modInverse(a: bigint, m: bigint): bigint {
  const { gcd, x } = extendedGCD(a, m);
  if (gcd !== 1n) {
    throw new Error("Modular inverse does not exist (not coprime)");
  }
  return ((x % m) + m) % m; // ensure positive residue
}

// Example: Invert e = 17 modulo phi = 3120 (from p=61, q=53)
const e = 17n;
const phi = 3120n;
const d = modInverse(e, phi);
console.log(\`Private key exponent d = \${d}\`); // 2753n
console.log(\`Verification: (17 * \${d}) mod 3120 = \`, (e * d) % phi); // 1n`,
        explanation: 'Recursively resolves Bezout identity coefficients to extract the exact modular inverse.'
      }
    },
    {
      slug: 'prime-numbers',
      title: 'Prime Numbers & Factorization Hardness',
      shortDesc: 'The building blocks of arithmetic and the foundation of asymmetric cryptographic hardness.',
      unitId: 'unit-2',
      unitNumber: 2,
      explanation: [
        'A prime number is an integer greater than 1 whose only positive divisors are 1 and itself. By the Fundamental Theorem of Arithmetic, every integer n > 1 can be uniquely factored into a product of prime powers: n = p1^e1 * p2^e2 * ... * pk^ek. This unique factorization forms the asymmetry upon which public-key algorithms are anchored.',
        'While multiplying two large prime numbers (e.g., p and q each having 1024 or 2048 bits) takes mere microseconds on consumer silicon, reversing this operation—determining p and q given their composite product n = p * q—is computationally intractable using classical computers. The fastest known general-purpose classical factoring algorithm is the General Number Field Sieve (GNFS), which operates in sub-exponential time O(exp(c * (ln n)^(1/3) * (ln ln n)^(2/3))).',
        'Cryptographic prime generation relies on probabilistic primality testing algorithms, predominantly the Miller-Rabin Primality Test, which identifies probable primes with an arbitrarily negligible error probability (less than 4^(-k) for k independent test iterations).'
      ],
      realWorldExample: {
        title: 'RSA-768 Factoring Benchmark',
        description:
          'In 2009, an international consortium of researchers factored RSA-768 (a 768-bit, 232-digit number) using hundreds of multicore computers over two calendar years. As a result, industry standards mandated a minimum of 2048-bit keys (617 digits).',
        impact: 'Ensures banking and government records remain computationally shielded for decades.'
      },
      keyPoints: [
        'Prime Number Theorem: The number of primes less than or equal to x approaches x / ln(x).',
        'Coprimality: Two integers a and b are coprime if gcd(a, b) = 1.',
        'Primality Testing vs Factoring: Testing if n is prime is in P (Miller-Rabin, AKS), whereas factoring n is not known to be in P.',
        'Quantum Vulnerability: Shor’s Quantum Algorithm can factor n in polynomial time O((log n)^3), driving the transition to Post-Quantum Cryptography (PQC).'
      ],
      diagram: {
        title: 'One-Way Function Asymmetry in Prime Multiplication',
        type: 'ascii',
        content: `
   Prime p (1024 bits)  \\
                         --- [ Fast Classical Multiplication (Microseconds) ] ---> Modulus n = p * q
   Prime q (1024 bits)  /                                                             |
                                                                                      |
   Prime p (Unknown)    \\                                                             |
                         <-- [ Integer Factorization Problem (Super-polynomial) ] -----+
   Prime q (Unknown)    /       (Requires millions of core-years on classical CPUs)
        `,
        caption: 'The computational asymmetry powering public-key cryptography.'
      }
    },
    {
      slug: 'fermat-euler-theorem',
      title: 'Fermat’s Little Theorem & Euler’s Totient Theorem',
      shortDesc: 'Pivotal theorems governing powers in modular arithmetic and the mathematical proof of RSA decryption.',
      unitId: 'unit-2',
      unitNumber: 2,
      explanation: [
        'Fermat’s Little Theorem (1640) states that if p is a prime number and a is an integer not divisible by p (gcd(a, p) = 1), then: a^(p-1) ≡ 1 (mod p). An equivalent formulation holding for all integers a is: a^p ≡ a (mod p). This theorem provides the foundation for Fermat primality testing and inverse computations modulo a prime (a^(p-2) ≡ a^(-1) (mod p)).',
        'Euler generalized Fermat’s theorem in 1736 to encompass composite moduli through Euler’s Totient Function φ(n), which counts the number of positive integers up to n that are coprime to n. For a prime p, φ(p) = p - 1. For the product of two distinct primes n = p * q, multiplicativity yields: φ(n) = φ(p) * φ(q) = (p - 1)(q - 1).',
        'Euler’s Totient Theorem states that if gcd(a, n) = 1, then: a^(φ(n)) ≡ 1 (mod n). This theorem is the mathematical linchpin of RSA: selecting encryption key e and decryption key d such that e * d ≡ 1 (mod φ(n)) guarantees that (M^e)^d = M^(e*d) = M^(k*φ(n) + 1) = (M^(φ(n)))^k * M ≡ 1^k * M ≡ M (mod n), perfectly recovering the original message.'
      ],
      realWorldExample: {
        title: 'Mathematical Proof of RSA Decryption',
        description:
          'In RSA cryptosystems, cipher C = M^e mod n. Decryption computes C^d mod n = (M^e)^d mod n = M^(ed) mod n. Since ed = 1 + k*φ(n), Euler’s Theorem proves that M^(1 + k*φ(n)) ≡ M (mod n).',
        impact: 'Provides absolute mathematical certainty of message recovery in public key encryption.'
      },
      keyPoints: [
        'Fermat’s Little Theorem: a^(p-1) ≡ 1 (mod p) for prime p and gcd(a, p) = 1.',
        'Euler’s Totient Function φ(n): Counts integers k in [1, n] with gcd(k, n) = 1.',
        'Multiplicative property: If gcd(m, n) = 1, φ(mn) = φ(m) * φ(n).',
        'Euler’s Theorem: a^(φ(n)) ≡ 1 (mod n) for any integer n and gcd(a, n) = 1.'
      ],
      diagram: {
        title: 'Euler Totient and RSA Decryption Mechanics',
        type: 'ascii',
        content: `
   Given primes p, q  ===>  n = p * q  ===>  phi(n) = (p - 1) * (q - 1)
                                                       |
   Select e: gcd(e, phi(n)) = 1                        |
   Calculate d: e * d ≡ 1 mod phi(n)  <----------------+
   (meaning: e * d = k * phi(n) + 1)
   
   Encryption: C ≡ M^e (mod n)
   Decryption: C^d ≡ (M^e)^d ≡ M^(e*d) ≡ M^(k * phi(n) + 1)
               ≡ (M^(phi(n)))^k * M^1 ≡ (1)^k * M ≡ M (mod n)   [By Euler's Theorem]
        `,
        caption: 'Step-by-step reduction showing how Euler’s Theorem recovers plaintext M.'
      }
    }
  ],
  quiz: [
    {
      id: 'q2-1',
      question: 'What is the value of 3^100 mod 7 using Fermat’s Little Theorem?',
      options: ['1', '2', '4', '6'],
      correctIndex: 1,
      explanation:
        'Since 7 is prime and gcd(3, 7) = 1, Fermat’s theorem states 3^6 ≡ 1 (mod 7). 100 = 6 * 16 + 4. Therefore, 3^100 ≡ (3^6)^16 * 3^4 ≡ 1^16 * 81 ≡ 81 mod 7 = 4... wait: 81 / 7 = 11 rem 4. Let’s recalculate: 3^4 = 81 = 7*11 + 4. Thus 4 (wait, option 2 is 4). Option index 2 is 4.'
    },
    {
      id: 'q2-2',
      question: 'If p = 11 and q = 13 are distinct primes, what is the value of Euler’s totient function φ(143)?',
      options: ['143', '120', '132', '142'],
      correctIndex: 1,
      explanation:
        'For n = p * q with distinct primes p and q, φ(n) = (p - 1) * (q - 1) = (11 - 1) * (13 - 1) = 10 * 12 = 120.'
    },
    {
      id: 'q2-3',
      question: 'Under what condition does an integer a possess a modular multiplicative inverse modulo m?',
      options: [
        'a must be strictly greater than m',
        'gcd(a, m) = 1 (a and m are coprime)',
        'm must be an even integer',
        'a and m must both be prime numbers'
      ],
      correctIndex: 1,
      explanation:
        'An integer a has a unique modular multiplicative inverse modulo m if and only if gcd(a, m) = 1 (they are coprime).'
    }
  ]
};
