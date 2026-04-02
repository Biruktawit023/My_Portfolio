export interface Certification {
  id: string;
  name: string;
  description: string;
  status: "completed" | "in-progress";
  progress: number; // 0-100
}

export const certifications: Certification[] = [
  {
    id: "tryhackme",
    name: "TryHackMe",
    description:
      "Hands-on cybersecurity training through guided learning paths covering SOC fundamentals, threat intelligence, and defensive security techniques.",
    status: "in-progress",
    progress: 72,
  },
  {
    id: "hackthebox",
    name: "Hack The Box",
    description:
      "Practical penetration testing labs and challenges that build offensive and defensive security skills through real-world attack and defense scenarios.",
    status: "in-progress",
    progress: 45,
  },
  {
    id: "comptia-security-plus",
    name: "Cybersecurity Coursework",
    description:
      "CompTIA Security+ exam preparation covering network security, cryptography, identity management, risk management, and incident response fundamentals.",
    status: "in-progress",
    progress: 60,
  },
];
