import type { Project, SkillCategory, Achievement, EducationItem, CloudThought } from '../types';

export const PERSONAL_INFO = {
  name: "Balaji R",
  role: "Aspiring AWS Cloud Engineer",
  subroles: ["Cloud Operations", "DevOps Engineer", "Backend Engineering"],
  headline: "CLOUD ENGINEER & BACKEND BUILDER",
  location: "Coimbatore, Tamil Nadu, India",
  email: "balajicloud16@gmail.com",
  phone: "+91 6374766824",
  linkedin: "https://linkedin.com/in/balaji-r-219a65332",
  linkedinHandle: "balaji-r-219a65332",
  status: "AVAILABLE FOR OPPORTUNITIES",
  currentFocus: "Cloud Engineering + DevOps + Backend",
  educationDegree: "B.Tech Information Technology",
  university: "Dr. N.G.P. Institute of Technology",
  expectedGraduation: "2028 Expected",
  languages: ["Tamil", "English", "Telugu"],
  interests: ["Cricket", "Chess", "Puzzles"],
  heroPills: ["AWS", "KUBERNETES", "DOCKER", "LINUX", "CI/CD", "TERRAFORM", "PYTHON"]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "cloud-engineering",
    number: "01",
    category: "CLOUD ENGINEERING",
    description: "Designing scalable, resilient and well-architected cloud infrastructure with security and isolation.",
    tags: ["AWS", "EC2", "S3", "IAM", "VPC", "CloudWatch", "Cloud Infrastructure", "Cloud Security", "Identity & Access Management"],
    iconName: "Cloud",
    coreCapabilities: [
      "Virtual Private Cloud (VPC) multi-tier subnet architecture",
      "IAM least-privilege role policies and RBAC security",
      "S3 lifecycle policies and secure object storage",
      "EC2 auto-scaling configurations and compute provisioning",
      "CloudWatch metrics, alarms, and operational log monitoring"
    ]
  },
  {
    id: "devops-automation",
    number: "02",
    category: "DEVOPS & AUTOMATION",
    description: "Automating builds, declarative container lifecycles, and repeatable CI/CD deployment pipelines.",
    tags: ["Docker", "Kubernetes", "Git", "GitHub Actions", "CI/CD", "Containerization", "Deployment Automation", "Infrastructure Automation"],
    iconName: "Cpu",
    coreCapabilities: [
      "Declarative Kubernetes workloads, deployments, services and ingress",
      "Multi-stage Docker containerization with minimal footprint",
      "GitHub Actions workflows for automated test & deployment",
      "Version control branching strategies and Git discipline",
      "Automated rolling deployments and self-healing health probes"
    ]
  },
  {
    id: "cloud-operations",
    number: "03",
    category: "CLOUD OPERATIONS",
    description: "Ensuring 24/7 reliability, telemetry observability, proactive incident response and root-cause analysis.",
    tags: ["Linux", "Monitoring", "Observability", "Logging", "Troubleshooting", "Reliability", "Incident Response", "Root Cause Analysis"],
    iconName: "Terminal",
    coreCapabilities: [
      "Linux kernel fundamentals, systemd, process debugging & networking tools",
      "Real-time resource utilization alerting and log aggregation",
      "Systematic RCA (Root Cause Analysis) for infrastructure anomalies",
      "SRE principles for system health, MTTR reduction and uptime",
      "Operational runbooks and failure scenario remediation"
    ]
  },
  {
    id: "networking",
    number: "04",
    category: "NETWORKING",
    description: "Engineering secure network topology, protocol integrity, packet routing and perimeter firewall rules.",
    tags: ["TCP/IP", "DNS", "HTTP/HTTPS", "Client-Server Architecture", "Firewalls", "Ports", "Networking Fundamentals"],
    iconName: "Network",
    coreCapabilities: [
      "TCP/IP handshakes, stateful vs stateless packet inspection",
      "DNS resolution trees, record types and low-latency routing",
      "TLS/HTTPS termination and SSL handshake encryption",
      "Security Groups, Network ACLs and perimeter port hardening",
      "Client-server request/response lifecycles and reverse proxies"
    ]
  },
  {
    id: "backend",
    number: "05",
    category: "BACKEND",
    description: "Crafting structured REST APIs, resilient microservices, secure authentication, and data persistence layers.",
    tags: ["REST APIs", "Backend Architecture", "API Development", "Database Integration", "Authentication", "Authorization", "JavaScript", "HTML/CSS"],
    iconName: "Database",
    coreCapabilities: [
      "RESTful API design adhering to clean HTTP standards & contracts",
      "Token-based authentication, JWT handling and authorization guards",
      "Relational & document database querying and data modelling",
      "Server-side error handling, validation pipelines and rate limiting",
      "Full-stack integration linking frontend interfaces to cloud backends"
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "self-healing-kubernetes",
    number: "01",
    title: "SELF-HEALING KUBERNETES PLATFORM",
    category: "CLOUD / KUBERNETES / DEVOPS",
    tagline: "Autonomous Workload Reliability & Instant Remediation Engine",
    description: "A cloud-native platform focused on workload reliability, automated recovery, container orchestration and reducing manual operational intervention.",
    tags: ["Kubernetes", "Container Orchestration", "Health Monitoring", "Fault Detection", "Automated Remediation", "Self-Healing", "Observability", "Reliability", "Scalability"],
    featured: true,
    architectureFlow: [
      { step: "01", label: "APPLICATION", sublabel: "Client Traffic" },
      { step: "02", label: "CONTAINER", sublabel: "Docker Image" },
      { step: "03", label: "KUBERNETES", sublabel: "Cluster Pod" },
      { step: "04", label: "HEALTH CHECK", sublabel: "Liveness Probe" },
      { step: "05", label: "FAILURE DETECTED", sublabel: "Crash / Hang" },
      { step: "06", label: "AUTOMATED REMEDIATION", sublabel: "Controller Action" },
      { step: "07", label: "SERVICE RECOVERED", sublabel: "Zero Downtime" }
    ],
    caseStudy: {
      problem: "Traditional server workloads often suffer extended downtime during intermittent crashes, memory overflows, or deadlock states because recovery relies on manual pager alerts and human intervention.",
      goal: "Architect an autonomous cloud-native orchestration layer that detects container anomalies in sub-seconds and triggers automated self-healing without dropping active user connections.",
      architectureOverview: "Employs Kubernetes pods monitored by continuous TCP/HTTP liveness and readiness probes. When a degraded state or exit-code failure is intercepted by the kubelet, the controller schedules a fresh container replica, updates the ingress endpoint pool, and reports telemetry to the observability stack.",
      technologies: ["Kubernetes", "Docker", "Linux", "Health Probes", "Kubelet", "Observability", "YAML", "Git"],
      implementation: [
        "Configured declarative Pod specs with fine-tuned liveness and readiness probe timings (initialDelaySeconds, periodSeconds, failureThreshold).",
        "Constructed isolated namespaces and resource limits (CPU/Memory requests & limits) to prevent noisy neighbor outages.",
        "Programmed automated pod restart policies (Always / OnFailure) and replica sets for smooth rolling updates.",
        "Demonstrated automated fault simulation: killing test containers triggers instant restart and zero-downtime traffic rerouting."
      ],
      engineeringChallenges: [
        "Eliminating flapping health checks: fine-tuning thresholds so transient latency spikes don't cause cascading pod restart loops.",
        "Preserving connection draining during graceful termination signals (SIGTERM vs SIGKILL)."
      ],
      outcome: "Achieved automated recovery within seconds of container failure with zero human intervention required.",
      status: "Production Architecture Proof of Concept",
      codeAvailable: false,
      demoAvailable: false
    }
  },
  {
    id: "cloud-infrastructure-platform",
    number: "02",
    title: "CLOUD INFRASTRUCTURE PLATFORM",
    category: "AWS / INFRASTRUCTURE / DEVOPS",
    tagline: "Provisioned High-Availability Cloud Architecture with Layered Isolation",
    description: "A cloud infrastructure platform focused on repeatable provisioning, secure resource management, scalability, automation and operational visibility.",
    tags: ["AWS", "Infrastructure as Code", "Cloud Architecture", "IAM", "Networking", "Compute", "Storage", "Monitoring", "CI/CD", "Automation", "Security", "Scalability"],
    featured: true,
    architectureFlow: [
      { step: "01", label: "USER", sublabel: "HTTPS Traffic" },
      { step: "02", label: "LOAD BALANCER", sublabel: "AWS ALB / Ingress" },
      { step: "03", label: "APPLICATION", sublabel: "Routing Layer" },
      { step: "04", label: "COMPUTE", sublabel: "EC2 Multi-AZ" },
      { step: "05", label: "DATABASE / STORAGE", sublabel: "S3 & Secure Data" },
      { step: "06", label: "MONITORING", sublabel: "CloudWatch Alarms" }
    ],
    caseStudy: {
      problem: "Manual cloud resource creation in management consoles leads to configuration drift, security oversights in IAM, unpredictable networking gaps, and lack of disaster recovery visibility.",
      goal: "Design a well-architected AWS infrastructure baseline with segmented public/private subnets, least-privilege IAM policies, scalable compute nodes, and unified CloudWatch monitoring.",
      architectureOverview: "A 2-tier VPC architecture hosting public Application Load Balancers and private compute instances with NAT gateways. IAM roles govern all internal AWS API requests, with automated CloudWatch metric filters and alarm thresholds for performance telemetry.",
      technologies: ["AWS VPC", "AWS EC2", "AWS S3", "AWS IAM", "AWS CloudWatch", "Security Groups", "Linux"],
      implementation: [
        "Structured custom VPC with non-overlapping CIDR blocks across multiple availability zones for high availability.",
        "Provisioned Internet Gateway for ingress and configured route tables directing private compute traffic through NAT gateways.",
        "Engineered strict IAM role policies with principle of least privilege, eliminating hardcoded access credentials.",
        "Established CloudWatch alarm rules alerting on CPU thresholds >80% and disk I/O bottlenecks."
      ],
      engineeringChallenges: [
        "Ensuring zero public IP exposure for backend compute nodes while enabling secure outbound patching via NAT.",
        "Balancing granular IAM permission boundaries against operational workflow agility."
      ],
      outcome: "Repeatable, hardened cloud foundation with sub-minute metric visibility and zero configuration drift.",
      status: "Cloud Architecture Implementation",
      codeAvailable: false,
      demoAvailable: false
    }
  },
  {
    id: "aws-iam-security",
    number: "03",
    title: "AWS IAM SECURITY IMPLEMENTATION",
    category: "CLOUD SECURITY / AWS",
    tagline: "Zero-Trust Role-Based Access Control & Permission Boundary Hardening",
    description: "Configured AWS IAM users, roles and policies to implement secure role-based access control and manage authentication and authorization for cloud resources.",
    tags: ["AWS", "IAM", "RBAC", "Cloud Security", "Least Privilege", "Authentication", "Authorization"],
    featured: false,
    caseStudy: {
      problem: "Unrestricted wildcards in IAM policies (`Action: *`, `Resource: *`) and static long-term access keys present major attack vectors in cloud security.",
      goal: "Implement a defense-in-depth IAM model with strict Role-Based Access Control (RBAC), multi-factor authentication enforcement, and explicit deny rules for sensitive resource boundaries.",
      architectureOverview: "Decoupled users into discrete organizational groups (Dev, Ops, ReadOnly) with targeted JSON policy documents. Programmatic services assume temporary STS credentials via IAM instance profiles rather than permanent credentials.",
      technologies: ["AWS IAM", "AWS STS", "JSON Policies", "CloudTrail", "RBAC", "Security Auditing"],
      implementation: [
        "Drafted granular IAM policy documents scoping actions strictly to required S3 buckets and EC2 resource ARNs.",
        "Replaced hardcoded programmatic keys with IAM Roles attached to EC2 instances using AWS metadata service.",
        "Enforced condition blocks requiring SSL (`aws:SecureTransport`) and MFA for administrative operations.",
        "Audited IAM credentials report to identify and deactivate stale access vectors."
      ],
      engineeringChallenges: [
        "Resolving policy evaluation conflicts where explicit denies override inherited group permissions.",
        "Designing modular policies that can scale cleanly across new microservice workloads."
      ],
      outcome: "Eliminated static secrets, minimized blast radius, and enforced full compliance with AWS security best practices.",
      status: "Security Implementation",
      codeAvailable: false,
      demoAvailable: false
    }
  },
  {
    id: "smart-charging-dashboard",
    number: "04",
    title: "SMART CHARGING STATION OWNER DASHBOARD",
    category: "AI / IOT / WEB PLATFORM",
    tagline: "Real-Time Telemetry & Intelligent EV Station Operations",
    description: "An AI-powered web dashboard for EV charging station owners to monitor, control and optimize charging operations in real time.",
    tags: ["AI", "Dashboard", "Web Development", "EV", "Real-Time Monitoring"],
    featured: false,
    caseStudy: {
      problem: "EV charging station operators struggle with fragmented hardware telemetry, power distribution inefficiencies, and unexpected charging point outages that disrupt driver charging.",
      goal: "Build a centralized operator portal providing live charger state visibility, load telemetry, automated status alerts, and utilization analytics.",
      architectureOverview: "Client dashboard communicating with backend ingestion pipelines to stream charger status (Available, Charging, Fault, Offline), power consumption rates (kW), and transaction logs.",
      technologies: ["JavaScript", "HTML/CSS", "REST APIs", "Data Visualization", "AI Analytics", "Real-time Telemetry"],
      implementation: [
        "Built responsive operator dashboard with real-time station status cards and power load charts.",
        "Integrated simulated AI load optimization models suggesting off-peak power distribution.",
        "Created error logging stream alerting operators to hardware connectivity disconnects.",
        "Designed dark-mode UI optimized for control room and mobile tablet monitoring."
      ],
      engineeringChallenges: [
        "Maintaining responsive render updates when high-frequency telemetry streams multiple charger parameters.",
        "Structuring intuitive alert queues so operators can address critical station faults first."
      ],
      outcome: "Reduced operational monitoring friction and provided real-time visibility into multi-station EV utilization.",
      status: "Engineering Prototype",
      codeAvailable: false,
      demoAvailable: false
    }
  },
  {
    id: "server-performance-dashboard",
    number: "05",
    title: "SERVER PERFORMANCE MONITORING DASHBOARD",
    category: "SYSTEM MONITORING / ANALYTICS",
    tagline: "Dynamic Hardware Utilization & Capacity Forecasting Model",
    description: "An Excel-based monitoring dashboard for tracking server CPU, memory and storage performance using dynamic charts and conditional formatting.",
    tags: ["Monitoring", "Performance", "CPU", "Memory", "Storage", "Data Visualization"],
    featured: false,
    caseStudy: {
      problem: "Small-to-medium server fleets frequently lack heavy enterprise monitoring agents, leading system admins to miss critical memory leaks or disk space exhaustion.",
      goal: "Design a lightweight, highly visual server performance tracking workbook capable of processing server telemetry and flagging threshold violations instantly.",
      architectureOverview: "Structured data models ingest timeseries metrics for CPU load averages, RAM allocations, disk partition fill rates, and network I/O, driving dynamic pivot visualizations and automatic alert flags.",
      technologies: ["Performance Metrics", "Dynamic Charts", "Data Visualization", "Threshold Alerting", "Capacity Analysis"],
      implementation: [
        "Configured dynamic calculation engines evaluating peak vs baseline resource consumption across nodes.",
        "Designed conditional formatting heatmaps triggering visual warning states when CPU >85% or Disk >90%.",
        "Built trendline projection formulas for disk exhaustion forecasting.",
        "Structured clean executive summary tabs providing quick health overviews."
      ],
      engineeringChallenges: [
        "Handling dense timeseries records without workbook performance lag.",
        "Establishing normalized metric scales across servers with diverse hardware configurations."
      ],
      outcome: "Delivered rapid, zero-overhead performance visibility and enabled proactive server resource scaling.",
      status: "Analytics Project",
      codeAvailable: false,
      demoAvailable: false
    }
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "hackathon-kpriet",
    number: "01",
    title: "SPECIAL CASH PRIZE — KPRIET HACKATHON",
    category: "HACKATHON WINNER",
    organization: "KPR Institute of Engineering and Technology",
    location: "Coimbatore, Tamil Nadu",
    description: "Competed in an intensive technical hackathon at KPRIET, building and pitching an engineering solution under rapid time constraints to win a Special Cash Prize awarded by the judging panel.",
    badge: "Special Cash Prize"
  },
  {
    id: "ai-internship-cit",
    number: "02",
    title: "15-DAY AI INTERNSHIP — CIT",
    category: "ENGINEERING INTERNSHIP",
    organization: "Coimbatore Institute of Technology (CIT)",
    location: "Coimbatore, Tamil Nadu",
    description: "Completed an intensive 15-day Artificial Intelligence engineering internship at CIT Coimbatore, working hands-on with AI algorithms, machine learning workflows, dataset preprocessing, and neural network foundations.",
    badge: "15-Day AI Intern"
  },
  {
    id: "iot-workshop-mit",
    number: "03",
    title: "5-DAY IoT WORKSHOP — MIT MADRAS",
    category: "TECHNICAL WORKSHOP",
    organization: "Madras Institute of Technology (MIT)",
    location: "Chennai, Tamil Nadu",
    description: "Participated in an immersive 5-day Internet of Things workshop at MIT Madras, developing hands-on sensor-to-cloud telemetry pipelines, microcontroller programming, and protocol communications.",
    badge: "5-Day Certified"
  },
  {
    id: "paper-presentation-psg",
    number: "04",
    title: "TECHNICAL PAPER PRESENTATION",
    category: "RESEARCH & PRESENTATION",
    organization: "PSG Institute of Technology and Applied Research",
    location: "Coimbatore, Tamil Nadu",
    description: "Researched, authored, and presented a technical engineering paper before faculty evaluators and peers at PSG iTech, demonstrating technical communication and analytical depth.",
    badge: "Paper Presenter"
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    period: "2024 — 2028 (Expected)",
    degree: "B.Tech — Information Technology",
    institution: "Dr. N.G.P. Institute of Technology",
    location: "Coimbatore, Tamil Nadu",
    highlight: "Core focus on Cloud Computing, Operating Systems, Computer Networks, and Software Engineering principles."
  },
  {
    period: "2024",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Sri Vidya Mandhir Matriculation Hr. Sec. School",
    location: "Tamil Nadu",
    score: "87.5%",
    highlight: "Mathematics, Computer Science, and Science streams."
  },
  {
    period: "2022",
    degree: "Secondary School Leaving Certificate (SSLC)",
    institution: "Sri Vidya Mandhir Matriculation Hr. Sec. School",
    location: "Tamil Nadu",
    score: "89.0%",
    highlight: "Solid academic foundation in mathematics and general sciences."
  }
];

export const CLOUD_THOUGHTS: CloudThought[] = [
  {
    id: "k8s-resilience",
    title: "Kubernetes Self-Healing: Why Health Probes Matter More Than Replica Counts",
    category: "KUBERNETES",
    readTime: "3 MIN READ",
    summary: "How improperly configured liveness probes can turn temporary database connection spikes into catastrophic pod restart cascades.",
    keyPoints: [
      "Distinction between liveness, readiness, and startup probes in high-throughput microservices",
      "Avoiding the dreaded crash loop backoff when external services fail",
      "Graceful pod termination hooks and zero-downtime rolling updates"
    ]
  },
  {
    id: "iam-least-privilege",
    title: "De-risking Cloud Access: The Philosophy of Zero-Trust IAM Policies",
    category: "AWS ARCHITECTURE",
    readTime: "4 MIN READ",
    summary: "Why permission boundaries and temporary STS credentials are non-negotiable for production AWS security posture.",
    keyPoints: [
      "Replacing static IAM user access keys with short-lived instance roles",
      "Enforcing strict condition keys like aws:SecureTransport and aws:PrincipalOrgID",
      "Continuous credential auditing and automated stale access revocation"
    ]
  },
  {
    id: "iac-fundamentals",
    title: "Infrastructure as Code: Treat Your Cloud Like Software, Not Hardware",
    category: "DEVOPS & IAC",
    readTime: "3 MIN READ",
    summary: "Eliminating configuration drift and human console clicks through declarative infrastructure manifests and version control.",
    keyPoints: [
      "Repeatable multi-region environment provisioning without manual drift",
      "State locking and security isolation for shared infrastructure pipelines",
      "Validating cloud blueprints through automated linting in CI/CD"
    ]
  },
  {
    id: "linux-observability",
    title: "Linux Internals for Cloud Engineers: What Happens Under the Hood",
    category: "LINUX & SRE",
    readTime: "4 MIN READ",
    summary: "System calls, cgroups, namespaces, and networking primitives that every DevOps engineer must master to debug container failures.",
    keyPoints: [
      "How cgroups enforce memory limits and trigger OOM killer events",
      "Debugging TCP connection bottlenecks with ss, tcpdump, and netstat",
      "systemd journal logs vs container stdout aggregation in production"
    ]
  }
];

export const TERMINAL_COMMANDS = [
  {
    cmd: "whoami",
    output: "balaji@cloud-engineer :: AWS Cloud • DevOps • Backend Engineer (Coimbatore, IN)"
  },
  {
    cmd: "focus",
    output: "AWS Cloud Infrastructure • Kubernetes Orchestration • CI/CD Automation • Linux Systems • REST Backends"
  },
  {
    cmd: "experience",
    output: "15-Day AI Internship @ Coimbatore Institute of Technology (CIT) • Cloud & DevOps Architecture Projects"
  },
  {
    cmd: "status",
    output: "🟢 ONLINE — Available for internships, entry-level cloud roles & engineering collaborations"
  },
  {
    cmd: "uptime",
    output: "3rd Year B.Tech IT @ Dr. N.G.P. Institute of Technology (2024–2028 Expected)"
  },
  {
    cmd: "certifications",
    output: "AWS Certified Cloud Practitioner — In Progress (Currently Pursuing)"
  },
  {
    cmd: "skills",
    output: "Cloud: [AWS, EC2, S3, IAM, VPC, CloudWatch] | DevOps: [Docker, K8s, Git, CI/CD] | OS: [Linux] | Net: [TCP/IP, DNS, HTTP/S]"
  },
  {
    cmd: "contact",
    output: "Email: balajicloud16@gmail.com | Phone: +91 6374766824 | LinkedIn: linkedin.com/in/balaji-r-219a65332"
  }
];
