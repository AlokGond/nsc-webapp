import { Unit } from '../types';

export const unit5: Unit = {
  id: 'unit-5',
  number: 5,
  title: 'Network Security Controls, Protocols & Infrastructure Defense',
  hours: 7,
  courseOutcome: 'CO5: Architect network perimeter defenses, configure firewalls/IDS, wireless security protocols, and secure email systems.',
  badge: 'Network Defense',
  description:
    'Unit 5 synthesizes cryptography with practical computer network defense. It covers network threat models (spoofing, sniffing, hijacking, DoS/DDoS), layered defense-in-depth architecture, IPsec and TLS/SSL protocols, enterprise access controls (AAA/Radius), 802.11 wireless security evolution (WEP to WPA3), honeypots, traffic analysis countermeasures, packet-filtering and stateful firewalls, Intrusion Detection/Prevention Systems (IDS/IPS), and PGP/S-MIME email security.',
  subtopics: [
    {
      slug: 'threats-in-networks',
      title: 'Network Threat Landscape & Attack Vectors',
      shortDesc: 'Taxonomy of packet sniffing, IP/DNS/ARP spoofing, session hijacking, and volumetric DDoS attacks.',
      unitId: 'unit-5',
      unitNumber: 5,
      explanation: [
        'Computer networks are exposed to adversaries because fundamental Internet protocols (IPv4, ARP, DNS, BGP) were designed without built-in security or cryptographic origin authentication. Adversaries exploit these protocol deficiencies to intercept, redirect, forge, or disable network traffic.',
        'Primary network attack vectors include: (1) Packet Sniffing (capturing raw frame data over promiscuous network interfaces), (2) ARP Spoofing/Poisoning (broadcasting fraudulent ARP replies to poison switch ARP caches and redirect local LAN traffic through an adversary node), (3) IP Spoofing (forging source IP headers to bypass packet filters or amplify DDoS attacks), (4) DNS Cache Poisoning (injecting bogus recursive DNS records to redirect web users to malicious phishing mirrors), and (5) TCP Session Hijacking (guessing TCP sequence numbers or intercepting session cookies to seize authenticated client sessions).',
        'Volumetric and Distributed Denial of Service (DDoS) attacks harness botnets to saturate transit links via UDP reflection/amplification (using open DNS, NTP, or Memcached reflectors) or exhaust application server pools via slow-rate HTTP attacks (Slowloris).'
      ],
      realWorldExample: {
        title: 'Dyn DNS Mirai Botnet Attack (2016)',
        description:
          'The Mirai botnet enslaved hundreds of thousands of default-credential IoT cameras and DVRs to unleash a 1.2 Tbps DNS amplification DDoS attack against Dyn Managed DNS, knocking Twitter, Netflix, GitHub, and Spotify offline across North America and Europe.',
        impact: 'Exposed the critical fragility of centralized Internet core routing and unauthenticated IoT devices.'
      },
      keyPoints: [
        'Eavesdropping: Promiscuous mode packet capture on unencrypted WiFi/Ethernet.',
        'ARP Cache Poisoning: Man-in-the-Middle attack on Layer 2 Ethernet segments.',
        'DNS Cache Poisoning (Kaminsky Attack): Corrupts recursive resolvers with forged IP mappings.',
        'TCP SYN Flood: Exhausts kernel TCP connection queues (SYN_RECV state); mitigated via SYN Cookies.'
      ],
      diagram: {
        title: 'ARP Poisoning Man-in-the-Middle on Local LAN',
        type: 'ascii',
        content: `
   [ Client PC (IP: 192.168.1.50) ]                 [ Default Gateway Router ]
               \\                                              /
                \\                                            /
                 v                                          v
              +------------------------------------------------+
              | Attacker (192.168.1.100)                       |
              | Sends gratuitous ARP to PC: "Router is at MAC-Attacker"
              | Sends gratuitous ARP to Router: "PC is at MAC-Attacker"
              +------------------------------------------------+
                                       |
                   (All LAN packets transit through Attacker)
        `,
        caption: 'Layer 2 ARP table corruption forcing bi-directional packet redirection.'
      }
    },
    {
      slug: 'network-security-controls-architecture',
      title: 'Network Security Controls Architecture & Defense in Depth',
      shortDesc: 'Layered defense models, Demilitarized Zones (DMZ), and boundary control strategies.',
      unitId: 'unit-5',
      unitNumber: 5,
      explanation: [
        'An enterprise network security architecture operationalizes the principle of Defense-in-Depth: deploying concentric layers of defense such that the failure of any single barrier (e.g., edge firewall) does not expose internal core assets to compromise.',
        'The architecture segments enterprise networks into discrete security zones of varying trust levels: (1) Untrusted Public Internet, (2) Demilitarized Zone (DMZ - hosting public-facing web, mail, and DNS servers isolated from the intranet), (3) Internal Corporate Intranet (user workstations, internal services), and (4) High-Security Data Center / Management Zone (domain controllers, database clusters, backup archives).',
        'Perimeter firewalls, Network Access Control (NAC), Intrusion Prevention Systems (IPS), Web Application Firewalls (WAF), and Zero Trust Network Access (ZTNA) enforce boundary rules at each zone transition, enforcing the Principle of Least Privilege.'
      ],
      realWorldExample: {
        title: 'Target Retail Breach & Network Micro-segmentation (2013)',
        description:
          'Attackers breached Target’s corporate network using stolen vendor HVAC credentials. Because internal network segments were not isolated, attackers pivoted effortlessly from HVAC maintenance subnets to the Point-of-Sale (POS) payment card database, stealing 40M credit cards.',
        impact: 'Demonstrated why flat network architectures must be replaced with strict DMZ segmentation and micro-segmentation.'
      },
      keyPoints: [
        'Defense in Depth: Multi-layered defense covering perimeter, network, host, application, and data.',
        'DMZ (Demilitarized Zone): Semi-trusted buffer zone isolating public servers from internal core networks.',
        'Zero Trust Architecture: "Never trust, always verify"; removes implicit trust based on network location.',
        'Micro-segmentation: Granular security policies restricting lateral east-west traffic between workloads.'
      ],
      diagram: {
        title: 'Enterprise Perimeter DMZ Multi-Tier Topology',
        type: 'ascii',
        content: `
   [ UNTRUSTED INTERNET ]
            |
            v [ External Border Firewall ]
   +-----------------------------------------------------------+
   | DEMILITARIZED ZONE (DMZ)                                  |
   |   [ Web Server ]       [ Mail Server ]     [ Reverse Proxy]|
   +-----------------------------------------------------------+
            |
            v [ Internal Choke Firewall ]
   +-----------------------------------------------------------+
   | INTERNAL CORPORATE NETWORK                                |
   |   [ User Workstations ]   [ Active Directory / DB Cluster ]|
   +-----------------------------------------------------------+
        `,
        caption: 'Dual-firewall perimeter design isolating public servers from internal database stores.'
      }
    },
    {
      slug: 'encryption-content-integrity',
      title: 'Encryption & Content Integrity (IPsec & TLS/SSL)',
      shortDesc: 'Cryptographic encapsulation at Network (Layer 3 IPsec) and Transport (Layer 4 TLS) layers.',
      unitId: 'unit-5',
      unitNumber: 5,
      explanation: [
        'Network security protocols protect transit data by embedding encryption and cryptographic integrity verification into standard network stack layers.',
        'IPsec (Internet Protocol Security) operates at Layer 3 (Network Layer), providing transparent security for all IP traffic without requiring application modifications. IPsec provides two primary protocols: (1) Authentication Header (AH - provides data integrity and origin authentication without confidentiality by hashing the packet including immutable IP header fields), and (2) Encapsulating Security Payload (ESP - provides confidentiality, origin authentication, and integrity). IPsec operates in two modes: Transport Mode (encrypts only IP payload, preserving original IP header; used for host-to-host) and Tunnel Mode (encrypts entire original IP packet and prepends a new IP header; used for site-to-site VPNs). Key exchange is negotiated via IKE (Internet Key Exchange).',
        'TLS (Transport Layer Security, RFC 8446 for TLS 1.3) operates above TCP (Layer 4), providing end-to-end security for applications (HTTPS, IMAPS). TLS establishes security via the TLS Handshake Protocol (authenticating server via X.509 certificate and negotiating ephemeral ECDHE keys) followed by the TLS Record Protocol (encrypting streams with authenticated symmetric ciphers like AES-GCM or ChaCha20-Poly1305).'
      ],
      realWorldExample: {
        title: 'Site-to-Site Corporate IPsec VPN Tunnels',
        description:
          'Multinational enterprises link branch offices across the world to headquarters data centers using IPsec Tunnel Mode with AES-256-GCM. Remote branch employees access internal CRM servers as if physically patched into the corporate switch.',
        impact: 'Provides secure, ubiquitous enterprise WAN connectivity over untrusted public transit.'
      },
      keyPoints: [
        'IPsec AH vs ESP: AH provides integrity without encryption; ESP provides encryption + integrity.',
        'IPsec Modes: Transport mode (Host-to-Host, payload only) vs Tunnel mode (Gateway-to-Gateway, full encapsulation).',
        'TLS 1.3 Overhaul: Eliminated RSA key exchange in favor of mandatory Ephemeral Diffie-Hellman (ECDHE for Perfect Forward Secrecy) and reduced handshake to 1-RTT.',
        'Security Association (SA): One-way cryptographic parameter contract identified by SPI (Security Parameter Index).'
      ],
      diagram: {
        title: 'IPsec Tunnel Mode vs Transport Mode Packet Framing',
        type: 'ascii',
        content: `
ORIGINAL IP PACKET:
   [ Orig IP Header ] [ TCP / UDP Header ] [ Data Payload ]

IPsec TRANSPORT MODE (ESP):
   [ Orig IP Header ] [ ESP Header ] [ TCP / UDP ] [ Data ] [ ESP Trailer ] [ ESP Auth ]
                      |<------------- Encrypted ----------->|
                      |<---------------- Authenticated ---->|

IPsec TUNNEL MODE (Site-to-Site VPN):
   [ New IP Header ] [ ESP Header ] [ Orig IP Hdr ] [ TCP ] [ Data ] [ ESP Trailer ] [ ESP Auth ]
                     |<-------------------- Encrypted ------------->|
                     |<------------------------- Authenticated ---->|
        `,
        caption: 'Full packet encapsulation in tunnel mode vs payload-only encryption in transport mode.'
      }
    },
    {
      slug: 'strong-authentication-access-controls',
      title: 'Strong Authentication & Access Controls (AAA, RADIUS, MFA)',
      shortDesc: 'Enterprise identity verification, authorization frameworks, and multi-factor authentication.',
      unitId: 'unit-5',
      unitNumber: 5,
      explanation: [
        'Access control dictates which authenticated users or devices are permitted to perform specific operations on protected resources. The foundation of network access control is the AAA Framework: (1) Authentication (confirming claimed identity), (2) Authorization (granting granular permissions), and (3) Accounting (auditing resource consumption and session duration).',
        'Centralized AAA protocols include RADIUS (Remote Authentication Dial-In User Service, RFC 2865 - uses UDP, encrypts only the password field) and TACACS+ (Terminal Access Controller Access-Control System Plus - Cisco proprietary, uses TCP, encrypts the entire packet payload, and completely decouples authentication from authorization).',
        'Strong Authentication demands Multi-Factor Authentication (MFA), requiring at least two independent factors: Something You Know (password/PIN), Something You Have (hardware FIDO2 security key, TOTP authenticator token, smartcard), and Something You Are (biometrics: fingerprint, facial scan). Modern FIDO2/WebAuthn standards leverage public-key cryptography over USB/NFC, making MFA completely immune to adversary phishing mirrors.'
      ],
      realWorldExample: {
        title: 'FIDO2 / YubiKey Hardware Token Rollout at Google (2017)',
        description:
          'Google mandated hardware FIDO security keys (YubiKeys) for all 85,000+ employees. Following implementation, Google reported zero account takeovers from phishing attacks across the entire enterprise workforce.',
        impact: 'Established hardware-bound public-key MFA as the definitive standard defeating reverse-proxy phishing (Evilginx).'
      },
      keyPoints: [
        'AAA Model: Authentication (Who are you?), Authorization (What can you do?), Accounting (What did you do?).',
        'RADIUS vs TACACS+: RADIUS combines AuthN/AuthZ over UDP; TACACS+ separates them and encrypts all traffic over TCP.',
        'MFA Factors: Knowledge (password), Possession (hardware token), Inherence (biometrics).',
        'FIDO2 / WebAuthn: Hardware cryptographic authentication eliminating shared secrets and phishing vectors.'
      ],
      diagram: {
        title: 'Centralized RADIUS Enterprise AAA Architecture',
        type: 'ascii',
        content: `
   [ User / Laptop ] 
           |
           | 1. 802.1X EAP Request
           v
   [ Network Switch / VPN Concentrator ]  <--- (Network Access Server - NAS)
           |
           | 2. RADIUS Access-Request (UDP 1812)
           v
   [ Central RADIUS Server ] ------------> [ LDAP / Active Directory ]
           |                                     (Validates Credentials)
           | 3. RADIUS Access-Accept / Reject
           v
   [ NAS opens port for User ]
        `,
        caption: 'Centralized policy enforcement via Network Access Server and RADIUS backend.'
      }
    },
    {
      slug: 'wireless-security',
      title: 'Wireless Network Security (WEP, WPA, WPA2, WPA3)',
      shortDesc: 'Cryptographic security evolution across IEEE 802.11 standards from broken RC4 to SAE.',
      unitId: 'unit-5',
      unitNumber: 5,
      explanation: [
        'Wireless communications (IEEE 802.11 Wi-Fi) broadcast radio frequency signals omnidirectionally, enabling any proximate adversary to capture frames without physical tap access. Consequently, wireless link security relies entirely on cryptographic link-layer protocols.',
        'WEP (Wired Equivalent Privacy, 1997) was catastrophically flawed: it used the RC4 stream cipher with a 24-bit Initialization Vector (IV). The tiny IV space forced IV reuse every few hours, and Fluhrer, Mantin, and Shamir (FMS) proved that RC4 weak keys allowed passive eavesdroppers to crack 128-bit WEP keys in under 60 seconds (demonstrated by aircrack-ng).',
        'WPA (Wi-Fi Protected Access) was an emergency software patch introducing TKIP (Temporal Key Integrity Protocol) with 48-bit IVs and Michael integrity checks. WPA2 (802.11i, 2004) replaced RC4 with robust AES-CCMP (Counter Mode with CBC-MAC). However, WPA2 remains vulnerable to offline 4-way handshake dictionary attacks and the KRACK (Key Reinstallation Attack) replay flaw.',
        'WPA3 (2018) obsoleted pre-shared keys in favor of SAE (Simultaneous Authentication of Equals, the Dragonfly handshake based on zero-knowledge proofs). WPA3 guarantees forward secrecy, renders offline dictionary cracking impossible, and mandates 192-bit cryptographic suites for enterprise deployments.'
      ],
      realWorldExample: {
        title: 'KRACK (Key Reinstallation Attack) on WPA2 (CVE-2017-13077)',
        description:
          'Security researcher Mathy Vanhoef discovered that attackers could trick Wi-Fi clients into reinstalling an already-in-use encryption key by replaying Message 3 of the 4-way handshake, resetting nonce counters and enabling traffic decryption without cracking the Wi-Fi password.',
        impact: 'Drove the global specification and adoption of WPA3 with hardened cryptographic handshake state machines.'
      },
      keyPoints: [
        'WEP: Broken 24-bit IV + RC4; cracked in seconds via FMS attack.',
        'WPA (TKIP): Interim stopgap for legacy hardware; 48-bit IV and per-packet key mixing.',
        'WPA2 (AES-CCMP): Enterprise standard based on AES-128; vulnerable to offline 4-way handshake dictionary capture.',
        'WPA3 (SAE): Dragonfly handshake; immune to offline password cracking; provides forward secrecy.'
      ],
      diagram: {
        title: 'Chronological Evolution of 802.11 Wi-Fi Security',
        type: 'ascii',
        content: `
   +----------+--------------------+-----------------------+-------------------------+
   | Standard | Encryption Cipher  | Integrity Check       | Key Exchange / Handshake|
   +----------+--------------------+-----------------------+-------------------------+
   | WEP      | RC4 (24-bit IV)    | CRC-32 (Non-crypto)   | Static Shared Key       |
   | WPA      | RC4 / TKIP (48-bit)| Michael (Weak MAC)    | 4-Way Handshake (PSK)   |
   | WPA2     | AES-CCMP (128-bit) | CBC-MAC               | 4-Way Handshake (PSK)   |
   | WPA3     | AES-GCMP (256-bit) | GMAC (Galois MAC)     | SAE (Dragonfly / ZKP)   |
   +----------+--------------------+-----------------------+-------------------------+
        `,
        caption: 'Comparison of cryptographic primitives across four generations of Wi-Fi security.'
      }
    },
    {
      slug: 'honeypots',
      title: 'Honeypots & Deception Technologies',
      shortDesc: 'Decoy resources deployed to detect, deflect, and study unauthorized adversarial activities.',
      unitId: 'unit-5',
      unitNumber: 5,
      explanation: [
        'A honeypot is an intentionally vulnerable or enticing information system resource whose value lies in unauthorized or illicit use of that resource. Because a honeypot has no legitimate operational production traffic, ANY interaction with a honeypot (connection attempt, port probe, authentication request) is treated with high confidence as hostile scanning or unauthorized intrusion activity.',
        'Honeypots are classified by their level of interaction: (1) Low-Interaction Honeypots (e.g., Honeyd, Cowrie) simulate only network services and daemon banners (such as an SSH or FTP login prompt). They pose minimal risk to the hosting organization and consume minimal resources, but capture only basic scanning activity. (2) High-Interaction Honeypots deploy real operating systems, databases, and applications on isolated physical or virtual machines, allowing attackers to upload real rootkits and execute zero-day payloads, capturing complete adversarial tradecraft at higher operational containment risk.',
        'Honeynet systems deploy distributed networks of honeypots combined with Honeytokens (fake canary credentials, bogus database records, or decoy API keys that trigger instantaneous SIEM security alerts when queried).'
      ],
      realWorldExample: {
        title: 'Honeytokens in AWS CloudTrail Detection',
        description:
          'Security teams place Canary AWS IAM API keys in publicly accessible GitHub repositories or internal wiki pages. If an attacker scrapes the credential and attempts an API call (e.g., DescribeInstances), AWS CloudTrail triggers instant alarms identifying the attacker IP and compromised repository.',
        impact: 'Delivers zero false-positive alerts alerting security operations centers to live perimeter breaches.'
      },
      keyPoints: [
        'Zero Legitimate Traffic Principle: Every connection to a honeypot represents a potential threat or misconfiguration.',
        'Low-Interaction: Emulates services; low risk; captures scans and automated botnet propagation.',
        'High-Interaction: Real OS / applications; high risk; captures advanced persistent threat (APT) zero-days and manual attacker movement.',
        'Honeytokens: Canary database records, fake files, and dormant credentials providing instant tripwires.'
      ],
      diagram: {
        title: 'Enterprise Honeypot Deception & Containment Architecture',
        type: 'ascii',
        content: `
   [ Attacker ] 
       |
       | (Probing Network Subnets)
       v
   [ Production Router ] 
       |
       +---------> [ REAL Production Database ] (Shielded behind strict ACLs)
       |
       +---------> [ DECOY Honeypot Server ] 
                        |
                        | (Logs Keystrokes, Malware Payloads, Shell Commands)
                        v
                   [ Data Capture & SIEM Alert Engine ]
        `,
        caption: 'Diverting adversarial activity away from production databases into monitored containment.'
      }
    },
    {
      slug: 'traffic-flow-security',
      title: 'Traffic Flow Security & Covert Channel Defense',
      shortDesc: 'Countering traffic analysis, timing attacks, and covert communications across network boundaries.',
      unitId: 'unit-5',
      unitNumber: 5,
      explanation: [
        'Even when end-to-end payload traffic is encrypted with unbreakable ciphers (e.g., AES-256), adversaries can deduce critical operational intelligence by analyzing traffic metadata—message frequency, transmission timing, packet length distributions, and communication burst patterns. In military command systems, an unexpected surge in encrypted traffic between headquarters and an airstrip directly signals an imminent tactical strike.',
        'Traffic Flow Security implements countermeasures designed to mask these metadata signatures: (1) Traffic Padding (continuously injecting dummy packets of random lengths into the link so total transmission volume remains constant regardless of actual data throughput), (2) Constant Bit-Rate (CBR) Encoding, and (3) Onion Routing (Tor), where packets are nested in multiple layers of asymmetric encryption and routed through intermediate relay nodes, preventing any single router from learning both source and destination.',
        'Covert Channels are communication paths that violate security policies by exploiting shared system resources not intended for communication (e.g., modulating TCP initial sequence numbers, manipulating IP packet identification fields, or exfiltrating data via inter-packet arrival jitter).'
      ],
      realWorldExample: {
        title: 'Onion Routing (Tor) & Whistleblower Protection',
        description:
          'The Tor network routes web traffic through three volunteer relays (Guard, Middle, Exit). Each relay peels away one cryptographic layer. The Guard node knows the user\'s real IP but not the destination; the Exit node knows the destination but not the user\'s IP, preventing ISP traffic analysis.',
        impact: 'Shields dissidents, investigative journalists, and corporate whistleblowers from state surveillance.'
      },
      keyPoints: [
        'Traffic Analysis Threat: Deduces communication relationships, activity spikes, and roles from encrypted flows.',
        'Traffic Padding: Floods link with pseudo-random dummy frames to maintain invariant traffic volume.',
        'Onion Routing: Multi-hop layered encryption hiding source and destination linkages.',
        'Covert Channels: Covert Storage (modulating packet headers) vs Covert Timing (modulating inter-packet delay).'
      ],
      diagram: {
        title: 'Traffic Padding Invariant Transmission Volume',
        type: 'ascii',
        content: `
UNPROTECTED (Vulnerable to burst analysis):
Traffic Volume:    __/\_/\__________/\/\/\/\/\____________
                   (Idle)  (Burst: Attack Planned!) (Idle)

PROTECTED WITH TRAFFIC PADDING:
Traffic Volume:    ======================================= (Constant Flow)
Data vs Dummy:     [Payload] [Dummy] [Payload] [Dummy] ...
                   (Adversary cannot distinguish payload from dummy data)
        `,
        caption: 'Continuous dummy data injection equalizing bandwidth consumption.'
      }
    },
    {
      slug: 'firewalls-design-types',
      title: 'Firewalls: Design & Architectural Types',
      shortDesc: 'Network barrier systems enforcing access policies across packet, stateful, and application layers.',
      unitId: 'unit-5',
      unitNumber: 5,
      explanation: [
        'A firewall is a dedicated network security barrier inserted between two or more network segments (typically an internal protected network and an untrusted external network) that controls transit packet flow according to an established security rule base. The primary firewall rule design philosophies are: Default Deny / Whitelist (that which is not explicitly permitted is forbidden) and Default Allow / Blacklist (that which is not explicitly forbidden is permitted; strongly discouraged in security practice).',
        'Firewalls are categorized into four architectural generations: (1) Packet Filtering Firewalls (stateless inspection of individual IP headers, TCP/UDP port numbers, and flags; fast but blind to connection state and payload contents), (2) Stateful Inspection Firewalls (tracks the active state of TCP/UDP connections via dynamic state tables; automatically permits return traffic for established outbound sessions), (3) Application-Level Gateways / Proxy Firewalls (terminates connections at Layer 7, deeply inspecting protocol commands like HTTP GET/POST or FTP and sanitizing payloads), and (4) Next-Generation Firewalls (NGFW - integrates stateful filtering, deep packet inspection, TLS decryption, intrusion prevention, and user identity awareness).',
        'Common deployment topologies include Bastion Hosts, Screened Subnets (dual-homed firewalls framing a DMZ), and Internal Segmentation Firewalls.'
      ],
      realWorldExample: {
        title: 'Enterprise WAF Stopping SQL Injection on E-Commerce Portals',
        description:
          'A Web Application Firewall (WAF) inspects incoming HTTPS POST parameters for an e-commerce platform. When an attacker submits \' OR 1=1 -- in a login field, the WAF detects the SQL injection signature at Layer 7 and resets the TCP connection before the query touches the database.',
        impact: 'Protects critical databases from application-layer zero-day exploits and SQL injection.'
      },
      keyPoints: [
        'Default Deny Stance: Standard architectural baseline; blocks all traffic unless matched by an explicit permit rule.',
        'Stateless vs Stateful: Stateful tracking inspects TCP flags (SYN, ACK, FIN) and sequence numbers in an active state table.',
        'Application Proxy: Acts as an intermediary; client never connects directly to destination server.',
        'Next-Gen Firewall (NGFW): Blends L7 application control, SSL/TLS inspection, sandboxing, and threat feeds.'
      ],
      diagram: {
        title: 'Stateless vs Stateful vs Application Proxy Firewall Inspection',
        type: 'ascii',
        content: `
1. STATELESS PACKET FILTER:
   Inspects each packet in isolation: [Src IP | Dst IP | Protocol | Src Port | Dst Port]

2. STATEFUL INSPECTION:
   Inspects packet + verifies against Dynamic State Table:
   State Table: [TCP 192.168.1.10:49152 <-> 142.250.190.46:443 | State: ESTABLISHED]
   (Permits valid returning ACK packets without opening arbitrary inbound ports)

3. APPLICATION LEVEL PROXY (Layer 7):
   [ Client ] <--- Connection 1 ---> [ Proxy Engine (Inspects HTTP/FTP) ] <--- Connection 2 ---> [ Server ]
   (Complete protocol termination and payload reconstruction)
        `,
        caption: 'Comparison of inspection depth across firewall generations.'
      },
      codeSnippet: {
        language: 'typescript',
        title: 'Stateless vs Stateful Firewall Rule Evaluation Simulator',
        code: `interface Packet {
  srcIp: string;
  dstIp: string;
  protocol: 'TCP' | 'UDP';
  dstPort: number;
  tcpFlags: { syn: boolean; ack: boolean };
}

interface StateTableEntry {
  clientIp: string;
  serverIp: string;
  serverPort: number;
}

const stateTable: StateTableEntry[] = [];

// Stateful firewall logic for inbound packets
function evaluateInboundPacket(packet: Packet): 'PERMIT' | 'DENY' {
  // 1. Check if packet belongs to an established outbound session
  const match = stateTable.some(
    s => s.serverIp === packet.srcIp && s.clientIp === packet.dstIp && s.serverPort === packet.dstPort
  );
  
  if (match && packet.tcpFlags.ack) {
    return 'PERMIT'; // Valid return traffic!
  }

  // 2. Allow only explicit public inbound web servers (HTTP/HTTPS)
  if (packet.dstIp === "203.0.113.10" && (packet.dstPort === 80 || packet.dstPort === 443)) {
    return 'PERMIT';
  }

  return 'DENY'; // Default Deny stance
}

const outboundSession = { clientIp: "192.168.1.50", serverIp: "93.184.216.34", serverPort: 443 };
stateTable.push(outboundSession);

const validReturn = {
  srcIp: "93.184.216.34", dstIp: "192.168.1.50", protocol: "TCP" as const,
  dstPort: 443, tcpFlags: { syn: false, ack: true }
};
const rogueInbound = {
  srcIp: "198.51.100.22", dstIp: "192.168.1.50", protocol: "TCP" as const,
  dstPort: 22, tcpFlags: { syn: true, ack: false }
};

console.log("Established Return Traffic:", evaluateInboundPacket(validReturn)); // PERMIT
console.log("Rogue SSH Probe:", evaluateInboundPacket(rogueInbound));           // DENY`,
        explanation: 'Simulates state table lookup and default deny rule evaluation.'
      }
    },
    {
      slug: 'personal-firewalls',
      title: 'Personal Firewalls & Host-Based Defenses',
      shortDesc: 'Software security controls deployed directly on endpoints to regulate application traffic.',
      unitId: 'unit-5',
      unitNumber: 5,
      explanation: [
        'A Personal Firewall (Host-Based Firewall) is a specialized software application running on an individual endpoint (desktop, laptop, mobile device, or server) that monitors and controls all incoming and outgoing network traffic to and from that specific machine.',
        'While network perimeter firewalls defend the enterprise boundary, personal firewalls protect endpoints when connected to hostile untrusted networks (such as public coffee shop Wi-Fi). Crucially, personal firewalls possess Application Awareness: they link socket connections directly to specific OS process executable binaries (e.g., distinguishing between chrome.exe and an unrecognized reverse_shell.exe attempting outbound connections on port 443).',
        'Prominent implementations include Windows Defender Firewall with Advanced Security (WDFAS), Linux iptables / nftables / ufw, and macOS pf (Packet Filter). Host firewalls enforce granular ingress/egress rules, terminate local port scans, and block malware beaconing.'
      ],
      realWorldExample: {
        title: 'Blocking WannaCry Lateral Propagation via Host Firewall (2017)',
        description:
          'The WannaCry ransomware scanned internal networks for vulnerable SMB port 445 (EternalBlue). Workstations with enabled personal firewalls blocking incoming port 445 rejected the exploit packets, stopping lateral spread across internal subnets even after the perimeter was breached.',
        impact: 'Saved thousands of enterprise hospital endpoints from catastrophic ransomware encryption.'
      },
      keyPoints: [
        'Host-Level Protection: Secures individual endpoints even on hostile or untrusted LANs.',
        'Process & Application Awareness: Can permit or deny connections based on the executable file path and code signature.',
        'Egress Filtering: Prevents compromised endpoints from beaconing out to adversary Command-and-Control (C2) servers.',
        'Complements Perimeter Firewalls: Eliminates blind spots created by internal lateral movement.'
      ],
      diagram: {
        title: 'Personal Firewall Host Process Inspection Architecture',
        type: 'ascii',
        content: `
   +-----------------------------------------------------------+
   | OPERATING SYSTEM ENDPOINT (Laptop / Server)                |
   |                                                           |
   |   [ Browser: chrome.exe ]       [ Malware: backdoor.exe ]  |
   |             |                              |              |
   |             v                              v              |
   |   +---------------------------------------------------+   |
   |   | HOST PERSONAL FIREWALL RULE ENGINE                |   |
   |   | - Rule 1: Allow chrome.exe -> Outbound Port 443   |   |
   |   | - Rule 2: Block backdoor.exe (Untrusted Signature)|   |
   |   +---------------------------------------------------+   |
   |             |                              |              |
   |             v (PERMITTED)                  v (BLOCKED!)   |
   |   [ Physical Network Interface Card (NIC) ]               |
   +-----------------------------------------------------------+
        `,
        caption: 'Binding packet flows to verified binary identities on the host OS.'
      }
    },
    {
      slug: 'intrusion-detection-systems',
      title: 'Intrusion Detection & Prevention Systems (IDS / IPS)',
      shortDesc: 'Automated monitoring systems detecting adversarial behavior via signature and anomaly analytics.',
      unitId: 'unit-5',
      unitNumber: 5,
      explanation: [
        'An Intrusion Detection System (IDS) is an automated system that monitors network traffic or host activities for malicious activity or security policy violations, generating real-time security alerts for Security Operations Centers (SOC). An Intrusion Prevention System (IPS) operates inline with network traffic and possesses the capability to actively block or terminate suspicious flows in real-time (e.g., dropping packets, injecting TCP RST resets, or updating firewall ACLs).',
        'IDS/IPS are categorized by deployment location: (1) Network-Based IDS (NIDS - monitors raw traffic across an entire network segment using switch SPAN/mirror ports or network taps; e.g., Snort, Suricata, Zeek), and (2) Host-Based IDS (HIDS - monitors system call logs, file integrity, and audit events on a specific endpoint; e.g., OSSEC, Wazuh).',
        'Detection methodologies fall into two primary paradigms: (1) Signature-Based Detection (matches packet byte sequences against a database of known exploit signatures; fast and accurate with low false positives, but completely blind to novel zero-day attacks), and (2) Anomaly-Based Detection (establishes a statistical baseline of normal network activity and alerts on statistically significant deviations; capable of detecting zero-days, but prone to higher false positive rates).'
      ],
      realWorldExample: {
        title: 'Snort Rule Defeating Log4j (CVE-2021-44228)',
        description:
          'Within hours of the Log4j disclosure, network engineers deployed Snort NIDS rules matching the payload string \'${jndi:ldap://\' or \'${jndi:rmi://\'. Upstream IPS sensors dropped incoming HTTP requests matching the pattern before they reached vulnerable backend Apache servers.',
        impact: 'Shielded mission-critical enterprise services while emergency software patch cycles were executed.'
      },
      keyPoints: [
        'IDS vs IPS: IDS is passive (alerts only); IPS is active inline (drops packets and terminates sessions).',
        'NIDS vs HIDS: NIDS monitors transit packets across subnets; HIDS monitors file system integrity, process trees, and kernel audit logs.',
        'Signature Detection: Precise for known threats; blind to novel zero-days.',
        'Anomaly Detection: Establishes statistical baseline; detects novel attacks; prone to false positives.'
      ],
      diagram: {
        title: 'Passive NIDS (Out-of-band) vs Inline NIPS Deployment',
        type: 'ascii',
        content: `
PASSIVE NIDS (Out-of-band via Port Mirror):
  [ Internet ] ---> [ Switch ] -----------------------------> [ Server Farm ]
                       |
                       +---> (SPAN / Mirror Port) ---> [ Snort NIDS Sensor ] ===> (Alert SIEM)

ACTIVE INLINE NIPS (Inline Traffic Filtering):
  [ Internet ] ---> [ Network IPS (Suricata) ] ---> [ Switch ] ---> [ Server Farm ]
                           |
                     (Can DROP malicious packets in real-time!)
        `,
        caption: 'Out-of-band passive tapping vs direct inline blocking.'
      }
    },
    {
      slug: 'email-security-pgp-smime',
      title: 'Email Security: PGP & S/MIME Protocols',
      shortDesc: 'Cryptographic frameworks for secure end-to-end email confidentiality, integrity, and non-repudiation.',
      unitId: 'unit-5',
      unitNumber: 5,
      explanation: [
        'Traditional email transport protocols (SMTP, POP3, IMAP) transfer messages in cleartext across untrusted intermediary Mail Transfer Agents (MTAs). Email security protocols provide end-to-end cryptographic confidentiality, sender authentication, content integrity, and non-repudiation directly at the message payload layer.',
        'Pretty Good Privacy (PGP), created by Phil Zimmermann in 1991 and standardized as OpenPGP (RFC 4880), employs a hybrid cryptosystem: it compresses the message (ZIP), computes a SHA hash, signs the hash using the sender’s private key, encrypts the combined bundle with a random symmetric session key (AES/CAST-128), and encrypts the session key using the recipient’s public key. PGP decentralizes key management using the Web of Trust, where users sign and certify each other’s public keys directly without relying on a centralized Certificate Authority.',
        'S/MIME (Secure/Multipurpose Internet Mail Extensions, RFC 8551) delivers equivalent cryptographic functionality but integrates directly into corporate enterprise PKI architectures. S/MIME mandates X.509 digital certificates signed by trusted hierarchical Certificate Authorities, allowing seamless centralized enterprise policy enforcement across Microsoft Outlook and Apple Mail clients.'
      ],
      realWorldExample: {
        title: 'Edward Snowden NSA Leak Communication via PGP (2013)',
        description:
          'When NSA contractor Edward Snowden initiated contact with journalists Glenn Greenwald and Laura Poitras to disclose classified surveillance programs, he insisted on communicating exclusively through OpenPGP-encrypted emails to guarantee cryptographic anonymity and confidentiality.',
        impact: 'Demonstrated the real-world operational power of decentralized end-to-end asymmetric email cryptography.'
      },
      keyPoints: [
        'Hybrid Architecture: Symmetric session key encrypts message; asymmetric public key encrypts session key.',
        'PGP Web of Trust: Decentralized, grassroots key signing without central authorities.',
        'S/MIME PKI: Hierarchical X.509 digital certificates backed by formal Certificate Authorities.',
        'Radix-64 (ASCII Armor): Converts binary ciphertext into 7-bit printable ASCII strings to survive legacy SMTP gateways.'
      ],
      diagram: {
        title: 'PGP Cryptographic Transmission Processing Pipeline',
        type: 'ascii',
        content: `
   [ Sender Alice ]                                                  [ Receiver Bob ]
   Plaintext Message M                                               Recovered Message M
          |                                                                   ^
   +------+------+                                                            |
   |             v                                                            |
   |        [ SHA-256 ]                                                [ Verify Signature ]
   |             |                                                            ^
   |        [ Sign with Alice PR_A ]                                          |
   |             |                                                            |
   |             v (Signature)                                                |
   +-----> ( ⊕ Combined )                                                     |
                 |                                                            |
                 v                                                            |
           [ ZIP Compress ]                                            [ Decompress ]
                 |                                                            ^
                 v                                                            |
          [ Symmetric Encrypt with Ks ] <---+                          [ Symmetric Decrypt ]
                 |                          |                                 ^
                 v                          |                                 |
          [ Encrypted Message ]             |                                 |
                 |                    [ Session Key Ks ]                      |
                 |                          |                                 |
                 |                          v                                 |
                 |                   [ Encrypt with Bob's PU_B ]       [ Decrypt with Bob's PR_B ]
                 |                          |                                 ^
                 v                          v                                 |
          [ Final PGP Message Bundle: Transmitted via Insecure Email ] -------+
        `,
        caption: 'Hybrid composition of hashing, digital signing, compression, and dual-layer encryption.'
      }
    }
  ],
  quiz: [
    {
      id: 'q5-1',
      question: 'Which IPsec protocol provides data origin authentication and content integrity but does NOT provide confidentiality?',
      options: [
        'Encapsulating Security Payload (ESP)',
        'Authentication Header (AH)',
        'Internet Key Exchange (IKE)',
        'Transport Layer Security (TLS)'
      ],
      correctIndex: 1,
      explanation:
        'The IPsec Authentication Header (AH) protocol verifies packet origin and prevents tampering by hashing header and payload fields, but it does not encrypt payloads (no confidentiality).'
    },
    {
      id: 'q5-2',
      question: 'In the evolution of IEEE 802.11 Wi-Fi security, which key exchange mechanism in WPA3 replaces pre-shared keys to defeat offline dictionary attacks?',
      options: [
        'Temporal Key Integrity Protocol (TKIP)',
        '4-Way Handshake with PSK',
        'Simultaneous Authentication of Equals (SAE / Dragonfly)',
        'CRC-32 Checksum Verification'
      ],
      correctIndex: 2,
      explanation:
        'WPA3 introduces Simultaneous Authentication of Equals (SAE), based on the Dragonfly handshake and zero-knowledge proofs, which renders captured handshakes immune to offline dictionary cracking.'
    },
    {
      id: 'q5-3',
      question: 'What is the primary architectural difference between PGP and S/MIME key management?',
      options: [
        'PGP uses centralized X.509 CAs while S/MIME uses a decentralized Web of Trust',
        'PGP uses a decentralized Web of Trust while S/MIME uses hierarchical X.509 Certificate Authorities',
        'PGP only supports symmetric encryption while S/MIME supports asymmetric encryption',
        'PGP is strictly for file encryption whereas S/MIME is strictly for video streaming'
      ],
      correctIndex: 1,
      explanation:
        'PGP relies on the grassroots, peer-to-peer "Web of Trust" for public key signing, whereas S/MIME integrates directly with formal, hierarchical X.509 Public Key Infrastructure (PKI) Certificate Authorities.'
    }
  ]
};
