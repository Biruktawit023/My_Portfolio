export interface Tool {
  id: string;
  name: string;
  icon: string; // Lucide icon name or image identifier
  url?: string;
}

export const tools: Tool[] = [
  {
    id: "tryhackme",
    name: "TryHackMe",
    icon: "Shield",
    url: "https://tryhackme.com",
  },
  {
    id: "hackthebox",
    name: "Hack The Box",
    icon: "Box",
    url: "https://hackthebox.com",
  },
  {
    id: "nmap",
    name: "Nmap",
    icon: "Radar",
  },
  {
    id: "wireshark",
    name: "Wireshark",
    icon: "Waves",
  },
  {
    id: "metasploit",
    name: "Metasploit",
    icon: "Zap",
  },
  {
    id: "github",
    name: "GitHub",
    icon: "Github",
    url: "https://github.com",
  },
];
