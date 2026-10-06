const bcrypt = require('bcryptjs');

const seedData = {
  admin: {
    username: "shivam",
    email: "admin@nexoraa.tech",
    password: "nexoraa_admin_2026!",
    role: "SUPER_ADMIN"
  },
  projects: [
    {
      slug: "nexus",
      number: "01",
      title: "NEXUS",
      domain: "AI / INTELLIGENCE & WORKSPACE",
      shortDescription: "AI-Powered Team Collaboration & Autonomous Project Execution Platform engineered for high-velocity engineering collectives.",
      fullDescription: "NEXUS is an end-to-end autonomous engineering command center combining Kanban synchronization, real-time code collaboration, context-aware AI task delegation, automated PR review, and document intelligence. Designed to eliminate tool switching and accelerate developer velocity.",
      problem: "Engineering teams suffer from severe context fragmentation across separate project managers, communication tools, documentation hubs, and git hosting services, causing up to 40% loss in developer velocity.",
      solution: "NEXUS consolidates the entire development lifecycle into a single reactive workspace powered by custom autonomous agents that track progress, synthesize sprint goals, and perform automated code analysis.",
      features: [
        "Real-time Multi-user State Synchronization via WebSockets",
        "Autonomous Agent Project Manager with RAG memory",
        "Intelligent Kanban with automated task dependency resolution",
        "Bi-directional GitHub integration with PR synthesis",
        "Role-based workspace security with granular audit logging"
      ],
      architecture: "Microservices backend on Node.js/Express, Vector embeddings stored in pgvector/Qdrant, React frontend with optimistic UI updates and WebSockets.",
      aiDetails: "Autonomous multi-agent orchestration loop with semantic search, document ingestion via LangChain, and structured JSON output verification.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "TypeScript", "Tailwind CSS", "Framer Motion"],
      status: "LIVE PROTOTYPE",
      githubUrl: "https://github.com/shivam-upendra/nexus-ai-workspace",
      liveUrl: "https://nexus-ai.nexoraa.tech",
      previewImage: "/assets/projects/nexus.png",
      featured: true,
      priority: 1
    },
    {
      slug: "netraai",
      number: "02",
      title: "NETRAAI",
      domain: "COMPUTER VISION / CROWD SAFETY",
      shortDescription: "AI-assisted crowd-safety and real-time visual perception framework engineered for high-density public venues and national hackathons.",
      fullDescription: "NetraAI converts raw CCTV feeds into actionable spatial intelligence without violating individual privacy. By executing edge-optimized YOLO and optical flow algorithms, it predicts bottlenecks, stampede vectors, and perimeter breaches in under 120ms.",
      problem: "Standard surveillance is purely forensic; human operators cannot monitor dozens of high-density cameras simultaneously, leading to fatal crowd surges and delayed emergency response.",
      solution: "NetraAI deploys edge vision models that monitor crowd density gradients, velocity anomalies, and flow turbulence, triggering automated dispatch protocols before incidents escalate.",
      features: [
        "Real-time edge crowd density heatmapping (YOLOv8 + CSRNet)",
        "Predictive flow turbulence analysis using optical flow",
        "Privacy-preserving silhouette edge processing (no face data stored)",
        "Automated emergency dispatch uplink & multi-channel alerts",
        "Sub-150ms processing latency on edge TPU/GPU hardware"
      ],
      architecture: "Python/PyTorch edge ingestion pipeline, Fast API inference gateway, Express/Node event bus, React geospatial dashboard.",
      aiDetails: "Custom fine-tuned density estimation regression network with temporal smoothing and edge quantization.",
      techStack: ["Python", "PyTorch", "OpenCV", "FastAPI", "React", "Node.js", "WebSockets", "Tailwind CSS"],
      status: "HACKATHON WINNER",
      githubUrl: "https://github.com/shivam-upendra/netraai-vision-defense",
      liveUrl: "https://netraai.nexoraa.tech",
      previewImage: "/assets/projects/netraai.png",
      featured: true,
      priority: 2
    },
    {
      slug: "mindweave",
      number: "03",
      title: "MINDWEAVE",
      domain: "AI / SYMBOLIC & NEURAL REASONING",
      shortDescription: "Hybrid neuro-symbolic cognitive intelligence engine for verifiable algorithmic reasoning and complex logical deduction.",
      fullDescription: "MindWeave bridges the hallucination gap of large language models by intertwining transformer embeddings with deterministic symbolic knowledge graphs and formal logic verifiers.",
      problem: "Generative AI models struggle with multi-step deterministic logic, hallucinating proofs and making unfounded claims in critical domains.",
      solution: "MindWeave decomposes natural language queries into First-Order Logic constraints, resolves them against verified knowledge graphs, and synthesizes proofs with mathematical certainty.",
      features: [
        "Neuro-symbolic query compilation engine",
        "Deterministic graph constraint validation",
        "Formal mathematical proof synthesis",
        "Interactive visual reasoning graph explorer",
        "Auditable deduction step traces with certainty scores"
      ],
      architecture: "Distributed graph database engine, Python symbolic inference microservice, Express orchestration API, React graph visualization canvas.",
      aiDetails: "Custom transformer-to-symbolic translator paired with automated theorem prover (Z3 / Lean backend).",
      techStack: ["Python", "PyTorch", "Z3 Prover", "Neo4j", "Node.js", "React", "D3.js", "Tailwind CSS"],
      status: "RESEARCH PREVIEW",
      githubUrl: "https://github.com/shivam-upendra/mindweave-neurosymbolic",
      liveUrl: "https://mindweave.nexoraa.tech",
      previewImage: "/assets/projects/mindweave.png",
      featured: true,
      priority: 3
    },
    {
      slug: "briefbox",
      number: "04",
      title: "BRIEFBOX",
      domain: "KNOWLEDGE / DOCUMENT INTELLIGENCE",
      shortDescription: "High-throughput autonomous document extraction, semantic RAG vectorization, and multi-document intelligence engine.",
      fullDescription: "BriefBox ingests heterogeneous documents (PDFs, research papers, blueprints, spreadsheets) and compiles them into structured hierarchical knowledge graphs with zero-hallucination citation grounding.",
      problem: "Engineers and researchers spend up to 15 hours per week manually extracting data from 100+ page technical manuals and complex research texts.",
      solution: "BriefBox runs multi-modal OCR, layout parsing, and chunk-level vector indexing to provide instantaneous cross-document Q&A with direct bounding-box citations.",
      features: [
        "Multi-document cross-synthesis and citation mapping",
        "Context-aware chunking with layout-aware semantic splits",
        "Automatic MCQ generation and difficulty level tuning",
        "Sub-second vector retrieval with hybrid BM25 + dense search",
        "Export to structured JSON, Markdown, and API webhooks"
      ],
      architecture: "Node.js/Express API gateway, Python document pipeline, Qdrant vector database, React interface with inline PDF highlighting.",
      aiDetails: "ColBERT multi-vector reranker combined with Claude/GPT-4o structured extraction schemas.",
      techStack: ["React", "Node.js", "Express", "Python", "Qdrant", "Tailwind CSS", "Framer Motion"],
      status: "PRODUCTION READY",
      githubUrl: "https://github.com/shivam-upendra/briefbox-document-rag",
      liveUrl: "https://briefbox.nexoraa.tech",
      previewImage: "/assets/projects/briefbox.png",
      featured: true,
      priority: 4
    },
    {
      slug: "xapexx",
      number: "05",
      title: "XAPEXX",
      domain: "OFFLINE / DISTRIBUTED MESH SYSTEMS",
      shortDescription: "Resilient peer-to-peer offline synchronization protocol and local-first data runtime for disconnected computing environments.",
      fullDescription: "XAPEXX enables applications to function with zero internet connectivity, synchronizing state cryptographically over peer Bluetooth, local Wi-Fi mesh, and USB relays using conflict-free replicated data types (CRDTs).",
      problem: "Modern cloud-dependent applications completely fail in disaster zones, remote labs, and zero-connectivity environments.",
      solution: "XAPEXX provides a local-first embedded database with cryptographic signing and automated gossip reconciliation when nodes encounter each other.",
      features: [
        "Zero-dependency local-first embedded database",
        "Automatic CRDT conflict resolution (state-based & delta)",
        "Multi-transport gossip synchronization (BLE, mDNS, LAN)",
        "End-to-end encrypted packet envelopes with elliptic curve keys",
        "Sub-millisecond local query execution"
      ],
      architecture: "Rust core compiled to WebAssembly and native binaries, Node.js bindings, lightweight React dashboard.",
      aiDetails: "Local quantized SLM (Phi-3 / Gemma-2B) running entirely in browser WebGPU for offline intelligence.",
      techStack: ["Rust", "WebAssembly", "Node.js", "React", "IndexedDB", "WebGPU", "Tailwind CSS"],
      status: "ACTIVE LAB EXPERIMENT",
      githubUrl: "https://github.com/shivam-upendra/xapexx-mesh-sync",
      liveUrl: "https://xapexx.nexoraa.tech",
      previewImage: "/assets/projects/xapexx.png",
      featured: true,
      priority: 5
    }
  ],
  team: [
    {
      id: "member-1",
      name: "Shivam Upendra Yadav",
      username: "shivam",
      role: "FOUNDER / LEAD ARCHITECT",
      bio: "Core software engineer and full stack architect. Skilled in Java, C++, Python, JavaScript, and distributed engineering. Leading Nexoraa's AI research, NetraAI edge vision systems, and autonomous project execution platforms.",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      githubUrl: "https://github.com/shivam-upendra",
      linkedinUrl: "https://linkedin.com/in/shivam-yadav",
      portfolioUrl: "https://shivam.nexoraa.tech",
      skills: ["Full Stack Systems", "Core Java", "Python", "DSA & Algorithms", "System Architecture", "AI Automation"],
      featured: true,
      order: 1
    }
  ],
  research: [
    {
      id: "res-1",
      number: "01",
      title: "Artificial Intelligence & Agentic Workflows",
      domain: "AI & INTELLIGENCE",
      summary: "Autonomous agent execution loops, self-correcting code generation, and low-latency retrieval-augmented generation pipelines.",
      keyAreas: ["Multi-Agent Orchestration", "Structured LLM Verification", "Semantic Vector Search", "Task Synthesis"],
      status: "ACTIVE RESEARCH"
    },
    {
      id: "res-2",
      number: "02",
      title: "Defensive Cybersecurity & Zero-Knowledge Systems",
      domain: "CYBERSECURITY",
      summary: "Zero-knowledge ephemeral encryption protocols, tamper-evident audit logs, and automated vulnerability scanning vectors.",
      keyAreas: ["Zero-Knowledge Proofs", "Network Penetration Testing", "Tamper-Proof Protocols", "Ephemeral Key Exchange"],
      status: "ACTIVE RESEARCH"
    },
    {
      id: "res-3",
      number: "03",
      title: "High-Throughput Full Stack Systems",
      domain: "FULL STACK ARCHITECTURE",
      summary: "Scalable distributed backends, WebSocket state reconciliation, real-time collaboration engines, and resilient cloud architectures.",
      keyAreas: ["Distributed Microservices", "WebSocket Protocol", "Optimistic State Ingestion", "High-Concurrency Node.js"],
      status: "PRODUCTION SYSTEMS"
    },
    {
      id: "res-4",
      number: "04",
      title: "Edge Computer Vision & Spatial Perception",
      domain: "AUTOMATION & PERCEPTION",
      summary: "Sub-100ms inference on embedded hardware, crowd density heatmapping, and privacy-preserving silhouette optical flow.",
      keyAreas: ["YOLOv8 Edge Quantization", "Optical Flow Velocity", "Spatial Density Models", "Hardware TPU Acceleration"],
      status: "HACKATHON DEPLOYED"
    },
    {
      id: "res-5",
      number: "05",
      title: "Local-First & Offline Mesh Computing",
      domain: "EXPERIMENTAL LABS",
      summary: "Conflict-free replicated data types (CRDTs), peer-to-peer gossip topologies, and browser-embedded machine learning inference.",
      keyAreas: ["CRDT State Resolution", "Bluetooth/Wi-Fi Direct Mesh", "Local WebGPU Inference", "Fault-Tolerant Storage"],
      status: "LAB EXPERIMENT"
    }
  ],
  achievements: [
    {
      id: "ach-1",
      year: "2026",
      category: "HACKATHON",
      title: "1st Place Winner — National Hackathon 2026",
      event: "National Level Innovation Hackathon",
      result: "Grand Champion / Gold Trophy",
      description: "NetraAI won first place for real-time edge computer vision crowd safety, low-latency spatial perception, and privacy-first architecture.",
      date: "2026-03"
    },
    {
      id: "ach-2",
      year: "2026",
      category: "INNOVATION",
      title: "Best Architecture Award — AI Engineering Summit",
      event: "Global AI & Systems Conference",
      result: "Technical Excellence Citation",
      description: "NEXUS received highest honors for multi-agent autonomous engineering collaboration and zero-latency WebSocket state synchronization.",
      date: "2026-06"
    },
    {
      id: "ach-3",
      year: "2025",
      category: "CYBERSECURITY",
      title: "Top 1% Global Ranking — Cyber Defense CTF",
      event: "International Ethical Defense CTF",
      result: "Top 1% Global Ranking",
      description: "Nexoraa Security Research group demonstrated critical vulnerability detection and zero-knowledge protocol exploitation defensive analysis.",
      date: "2025-11"
    },
    {
      id: "ach-4",
      year: "2025",
      category: "COMMUNITY",
      title: "100+ Builders Milestone Reached",
      event: "Nexoraa Developer Collective",
      result: "100+ Active Contributors",
      description: "Community expanded across universities and open-source contributors, collaborating on 10+ active repositories.",
      date: "2025-08"
    }
  ],
  community: [
    {
      id: "com-1",
      name: "Devendra Patel",
      email: "devendra@example.com",
      role: "DEVELOPER",
      skills: ["React", "TypeScript", "Tailwind"],
      github: "https://github.com/devendra-p",
      status: "approved",
      joinedAt: "2026-01-15"
    },
    {
      id: "com-2",
      name: "Pooja Hegde",
      email: "pooja@example.com",
      role: "AI BUILDER",
      skills: ["PyTorch", "NLP", "LangChain"],
      github: "https://github.com/pooja-ml",
      status: "approved",
      joinedAt: "2026-02-20"
    },
    {
      id: "com-3",
      name: "Vikram Singhania",
      email: "vikram@example.com",
      role: "RESEARCHER",
      skills: ["Cybersecurity", "Zero-Knowledge", "C++"],
      github: "https://github.com/vikram-sec",
      status: "approved",
      joinedAt: "2026-03-10"
    },
    {
      id: "com-4",
      name: "Samira Sen",
      email: "samira@example.com",
      role: "DESIGNER",
      skills: ["Figma", "Design Systems", "Webflow"],
      github: "https://github.com/samira-sen",
      status: "approved",
      joinedAt: "2026-04-05"
    }
  ],
  joinRequests: [
    {
      id: "join-1",
      name: "Karan Johar",
      email: "karan.dev@gmail.com",
      github: "https://github.com/karan-dev",
      portfolio: "https://karan.dev",
      role: "FRONTEND",
      skills: "React, Next.js, Framer Motion, TypeScript",
      experience: "2 years building high-performance web applications and design systems.",
      whyNexoraa: "I am passionate about building futuristic editorial tools and want to contribute to NEXUS and BriefBox.",
      status: "pending",
      createdAt: "2026-09-28T10:00:00Z"
    },
    {
      id: "join-2",
      name: "Sneha Reddy",
      email: "sneha.ai@gmail.com",
      github: "https://github.com/sneha-reddy",
      portfolio: "https://sneha.ai",
      role: "AI / ML",
      skills: "Python, PyTorch, HuggingFace, RAG pipelines, FastAPI",
      experience: "Final year CS student with 2 published papers on edge perception models.",
      whyNexoraa: "I was deeply inspired by NetraAI's hackathon win and want to work on next-generation spatial intelligence.",
      status: "reviewed",
      createdAt: "2026-10-01T14:30:00Z"
    }
  ],
  events: [
    {
      id: "ev-1",
      title: "Nexoraa Hackathon Sprint 2026",
      category: "HACKATHON",
      date: "2026-11-15",
      location: "Hybrid / Bengaluru & Online Discord",
      mode: "hybrid",
      description: "48-hour high-intensity engineering sprint building autonomous developer tooling, AI perception, and offline mesh systems.",
      link: "https://discord.gg/nexoraa",
      status: "UPCOMING"
    },
    {
      id: "ev-2",
      title: "Decentralized Systems & RAG Architecture Workshop",
      category: "TECH TALK",
      date: "2026-10-25",
      location: "Online Live Stream",
      mode: "online",
      description: "Deep dive into building sub-100ms retrieval-augmented generation pipelines and local-first CRDT synchronization.",
      link: "https://youtube.com/live/nexoraa",
      status: "REGISTRATION OPEN"
    }
  ],
  announcements: [
    {
      id: "ann-1",
      title: "Nexoraa 2026 Engineering Roadmap Unveiled",
      content: "We are officially launching the open-source testnet for NEXUS and recruiting 5 new core builders for our AI perception team.",
      priority: "high",
      active: true,
      createdAt: "2026-10-01"
    }
  ],
  chatbotKnowledge: [
    {
      id: "kb-1",
      question: "What is Nexoraa?",
      answer: "Nexoraa is an elite technology collective and research lab focused on artificial intelligence, software engineering, cybersecurity, experimentation, and community-driven innovation. Tagline: 'BUILDING WHAT COMES NEXT.'",
      category: "ABOUT",
      keywords: ["what is", "about", "who are you", "nexoraa", "mission", "purpose", "tagline"],
      priority: 10,
      pageReference: "/about"
    },
    {
      id: "kb-2",
      question: "What projects have you built?",
      answer: "Nexoraa has engineered 5 core breakthrough projects: 1) NEXUS — AI-powered collaborative engineering command center; 2) NETRAAI — National hackathon-winning edge crowd-safety vision perception framework; 3) MINDWEAVE — Hybrid neuro-symbolic reasoning engine; 4) BRIEFBOX — High-throughput document RAG intelligence; 5) XAPEXX — Local-first offline mesh synchronization runtime.",
      category: "PROJECTS",
      keywords: ["projects", "what have you built", "work", "portfolio", "built", "apps", "systems"],
      priority: 10,
      pageReference: "/projects"
    },
    {
      id: "kb-3",
      question: "What is NEXUS?",
      answer: "NEXUS is an AI-powered team collaboration & project execution platform built by Nexoraa. It consolidates Kanban boards, real-time code collaboration, context-aware AI task delegation, automated PR review, and document intelligence into one reactive workspace to eliminate developer tool-switching.",
      category: "PROJECTS",
      keywords: ["nexus", "ai project", "collaboration", "kanban", "workspace"],
      priority: 9,
      pageReference: "/projects/nexus"
    },
    {
      id: "kb-4",
      question: "What is NETRAAI?",
      answer: "NetraAI is Nexoraa's national hackathon-winning crowd-safety vision perception platform. It processes raw CCTV feeds on edge hardware using YOLO and optical flow to detect bottlenecks, density gradients, and stampede risks in under 120ms without storing individual faces or violating privacy.",
      category: "PROJECTS",
      keywords: ["netraai", "vision", "computer vision", "crowd", "safety", "hackathon"],
      priority: 9,
      pageReference: "/projects/netraai"
    },
    {
      id: "kb-5",
      question: "Who are the team members?",
      answer: "Nexoraa is founded and led by Shivam Upendra Yadav (Founder & Lead Full Stack Architect), directing core artificial intelligence research, distributed system architectures, NetraAI edge vision systems, and autonomous project execution platforms.",
      category: "TEAM",
      keywords: ["team", "who built", "founder", "shivam", "members", "people", "builders"],
      priority: 9,
      pageReference: "/team"
    },
    {
      id: "kb-6",
      question: "How can I join Nexoraa?",
      answer: "You can apply to join Nexoraa through our /join portal. We actively recruit frontend engineers, backend systems architects, AI/ML researchers, cybersecurity specialists, DevOps pros, and UI/UX designers. Fill out the application form with your GitHub, portfolio, and vision!",
      category: "JOIN",
      keywords: ["join", "apply", "careers", "hiring", "recruitment", "contribute", "become a member"],
      priority: 9,
      pageReference: "/join"
    },
    {
      id: "kb-7",
      question: "What technologies does Nexoraa use?",
      answer: "Our core technology stack spans React, TypeScript, Tailwind CSS, Framer Motion, Node.js, Express, MongoDB, Python, PyTorch, OpenCV, Rust, WebAssembly, Qdrant/Pinecone vector databases, Docker, and WebSocket microservices.",
      category: "TECHNOLOGIES",
      keywords: ["technologies", "tech stack", "languages", "tools", "stack", "frameworks"],
      priority: 8,
      pageReference: "/about"
    },
    {
      id: "kb-8",
      question: "What research are you doing?",
      answer: "Nexoraa Labs investigates 5 core domains: 1) Agentic Cognition & Structured LLM Verification, 2) Zero-Knowledge Cryptography & Network Security, 3) High-Concurrency Distributed Full Stack Systems, 4) Edge Computer Vision & Spatial Perception, and 5) Local-First Offline Mesh Synchronization.",
      category: "RESEARCH",
      keywords: ["research", "domains", "labs", "studies", "capabilities", "experiments"],
      priority: 8,
      pageReference: "/research"
    },
    {
      id: "kb-9",
      question: "How can I contact the Nexoraa team?",
      answer: "You can establish an uplink with Nexoraa via our /contact page or email directly at contact@nexoraa.tech. You can also connect via GitHub (github.com/shivam-upendra) or join our builder community on Discord.",
      category: "CONTACT",
      keywords: ["contact", "email", "reach out", "message", "discord", "social"],
      priority: 8,
      pageReference: "/contact"
    }
  ],
  contactMessages: [
    {
      id: "msg-1",
      name: "Vikramaditya Roy",
      email: "v.roy@techlabs.in",
      subject: "Collaboration on NetraAI Edge Deployment",
      message: "Hello Nexoraa team, we would love to explore piloting NetraAI at our upcoming regional university festival.",
      read: false,
      createdAt: "2026-10-02T11:20:00Z"
    }
  ]
};

module.exports = seedData;
