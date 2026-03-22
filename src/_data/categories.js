/**
 * Category definitions with integrated SEO metadata.
 * Each category has display info, SEO optimization, and routing data.
 */

const slugify = require("../../eleventy/slugify");

const categoryData = [
  {
    name: "Artificial Intelligence",
    title: "Artificial Intelligence Security | Intelligence Briefs",
    description:
      "AI security vulnerabilities, machine learning risks, LLM safety issues, and artificial intelligence system threats.",
    keywords: [
      "ai security",
      "machine learning security",
      "llm security",
      "artificial intelligence risks",
      "ai vulnerabilities",
      "ml security",
      "ai threat analysis",
      "machine learning risks",
      "ai system security",
      "neural network security",
    ],
  },

  {
    name: "Architecture",
    title: "Security Architecture | Intelligence Briefs",
    description:
      "Security-first architecture patterns, secure system design principles, and infrastructure security best practices.",
    keywords: [
      "security architecture",
      "secure system design",
      "infrastructure security",
      "security patterns",
      "system architecture",
      "security design",
      "architectural security",
      "secure infrastructure",
      "system security design",
      "security engineering",
    ],
  },

  {
    name: "Attack Vectors",
    title: "Attack Vectors Analysis | Intelligence Briefs",
    description:
      "Cyber attack vectors, threat patterns, supply chain security risks, and vulnerability research.",
    keywords: [
      "attack vectors",
      "cyber attacks",
      "threat analysis",
      "supply chain security",
      "security vulnerabilities",
      "threat intelligence",
      "attack patterns",
      "cyber threats",
      "vulnerability analysis",
      "security threats",
    ],
  },

  {
    name: "Meta",
    title: "Personal Reflections on Security | Intelligence Briefs",
    description:
      "Personal reflections and insights on the cybersecurity industry, security practices, and digital privacy policy.",
    keywords: [
      "cybersecurity industry",
      "security analysis",
      "digital privacy policy",
      "security trends",
      "cybersecurity insights",
      "security professional",
      "industry analysis",
      "security thought leadership",
      "cybersecurity perspective",
      "security commentary",
    ],
  },

  {
    name: "Surveillance Society",
    title: "Surveillance Society | Intelligence Briefs",
    description:
      "Digital surveillance systems, privacy implications, data tracking, and surveillance society trends.",
    keywords: [
      "digital surveillance",
      "surveillance society",
      "privacy analysis",
      "data tracking",
      "surveillance systems",
      "privacy research",
      "digital privacy",
      "surveillance technology",
      "privacy monitoring",
      "data surveillance",
    ],
  },
];

const categories = categoryData.map((cat) => ({
  ...cat,
  slug: slugify(cat.name),
}));

module.exports = categories;
