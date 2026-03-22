/**
 * Semantic topic taxonomy for blog posts.
 * These clear, well-defined topics help with content relationships and SEO.
 */

const slugify = require("../../eleventy/slugify");

const topics = [
  {
    name: "AI Security",
    description:
      "Security risks in artificial intelligence and machine learning systems, including LLM vulnerabilities and AI-generated code safety",
    seoKeywords: [
      "ai security",
      "machine learning security",
      "artificial intelligence risks",
      "llm security",
      "ai vulnerabilities",
    ],
  },
  {
    name: "Privacy Technology",
    description:
      "Technical approaches to protecting privacy, including VPNs, encryption, privacy-by-design, and privacy-preserving technologies",
    seoKeywords: [
      "privacy technology",
      "privacy by design",
      "privacy preserving",
      "encryption",
      "vpn privacy",
    ],
  },
  {
    name: "Surveillance Society",
    description:
      "Analysis of surveillance systems, surveillance capitalism, data collection practices, and living in a monitored world",
    seoKeywords: [
      "surveillance society",
      "digital surveillance",
      "surveillance capitalism",
      "privacy monitoring",
      "data tracking",
    ],
  },
  {
    name: "System Architecture",
    description:
      "Building secure, performant, and resilient systems including security architecture patterns and system design principles",
    seoKeywords: [
      "system architecture",
      "security architecture",
      "secure system design",
      "system performance",
      "infrastructure security",
    ],
  },
  {
    name: "Threat Analysis",
    description:
      "Understanding cyber attacks, attack vectors, vulnerability research, and supply chain security risks",
    seoKeywords: [
      "threat analysis",
      "attack vectors",
      "cyber attacks",
      "supply chain security",
      "security vulnerabilities",
    ],
  },
  {
    name: "Digital Rights",
    description:
      "Digital privacy rights, encryption policy, technology governance, and protecting civil liberties in the digital age",
    seoKeywords: [
      "digital rights",
      "privacy policy",
      "encryption policy",
      "digital civil liberties",
      "technology governance",
    ],
  },
  {
    name: "Applied Cryptography",
    description:
      "Practical cryptography implementation, cryptographic system design, and security engineering practices",
    seoKeywords: [
      "applied cryptography",
      "cryptographic implementation",
      "security implementation",
      "crypto systems",
      "cryptography practice",
    ],
  },
  {
    name: "Data Governance",
    description:
      "How personal data is collected, processed, regulated, and protected including GDPR compliance and data protection practices",
    seoKeywords: [
      "data governance",
      "data protection",
      "gdpr compliance",
      "personal data",
      "data privacy",
    ],
  },
].map((topic) => ({
  ...topic,
  slug: slugify(topic.name),
}));

module.exports = topics;
