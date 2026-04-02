export interface Skill {
  id: string;
  name: string;
  description: string;
  proficiency: number; // 0-100
  icon: string; // Lucide icon name
}

export const skills: Skill[] = [
  {
    id: "siem-tools",
    name: "SIEM Tools",
    description: "Splunk, ELK Stack — log aggregation, correlation rules, and dashboard creation for real-time threat monitoring.",
    proficiency: 85,
    icon: "BarChart2",
  },
  {
    id: "network-analysis",
    name: "Network Analysis",
    description: "Wireshark, TCP/IP — packet capture analysis, protocol inspection, and network traffic investigation.",
    proficiency: 80,
    icon: "Network",
  },
  {
    id: "threat-detection",
    name: "Threat Detection & Incident Response",
    description: "Identifying IOCs, triaging alerts, and executing structured incident response procedures.",
    proficiency: 88,
    icon: "ShieldAlert",
  },
  {
    id: "linux-bash",
    name: "Linux & Bash",
    description: "Command-line proficiency, shell scripting, log parsing, and system administration on Linux environments.",
    proficiency: 75,
    icon: "Terminal",
  },
  {
    id: "vulnerability-assessment",
    name: "Vulnerability Assessment",
    description: "Scanning, identifying, and prioritizing vulnerabilities using industry-standard tools and frameworks.",
    proficiency: 78,
    icon: "ScanSearch",
  },
  {
    id: "mitre-attack",
    name: "MITRE ATT&CK",
    description: "Mapping adversary tactics and techniques to the MITRE ATT&CK framework for threat intelligence and detection engineering.",
    proficiency: 82,
    icon: "Crosshair",
  },
];
