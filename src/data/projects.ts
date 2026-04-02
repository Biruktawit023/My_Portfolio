export interface Project {
  id: string;
  title: string;
  description: string;
  tools: string[];
  outcome: string;
}

export const projects: Project[] = [
  {
    id: "log-analysis",
    title: "Log Analysis Project",
    description:
      "Analyzed large volumes of security logs from multiple sources using Splunk and ELK Stack. Built correlation rules and dashboards to surface suspicious authentication events and lateral movement indicators.",
    tools: ["Splunk", "ELK Stack"],
    outcome: "Identified anomalous login patterns",
  },
  {
    id: "network-traffic-monitoring",
    title: "Network Traffic Monitoring",
    description:
      "Captured and analyzed live network traffic using Wireshark and Nmap to identify reconnaissance activity, unusual port usage, and potential intrusion attempts within a lab environment.",
    tools: ["Wireshark", "Nmap"],
    outcome: "Detected port scanning activity",
  },
  {
    id: "incident-response-simulation",
    title: "Incident Response Simulation",
    description:
      "Simulated a full incident response lifecycle — from initial detection through containment, eradication, and recovery — mapping each phase to the MITRE ATT&CK framework and documenting findings in Splunk.",
    tools: ["MITRE ATT&CK", "Splunk"],
    outcome: "Documented full IR playbook",
  },
];
