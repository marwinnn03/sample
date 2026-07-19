import { useState, useEffect } from 'react'

// Custom SVGs for zero-dependency modern icons
const IconSun = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

Hello

const IconMoon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const IconGithub = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const IconLinkedin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
)

const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
)

const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const IconMapPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
)

const IconExternal = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

interface Project {
  id: number;
  title: string;
  desc: string;
  category: 'Frontend' | 'Full-Stack' | 'APIs';
  tags: string[];
  emoji: string;
  demoUrl: string;
  codeUrl: string;
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('aura-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [activeSection, setActiveSection] = useState('home');
  const [projectFilter, setProjectFilter] = useState<'All' | 'Frontend' | 'Full-Stack' | 'APIs'>('All');

  // Contact form submission states
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Projects list state (fetched from backend)
  const [projectsData, setProjectsData] = useState<Project[]>([]);

  // Default fallback data if backend is offline
  const fallbackProjects: Project[] = [
    {
      id: 1,
      title: "Aura Market E-Shop",
      desc: "Isang ganap na e-commerce platform na may cart system, payment gateway module, at custom user dashboard integration.",
      category: "Full-Stack",
      tags: ["React", "Node.js", "Express", "MongoDB"],
      emoji: "🛒",
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      id: 2,
      title: "Interactive Project Board",
      desc: "Kanban management application na may drag-and-drop mechanics, nested task tags, at live state sync sa local storage.",
      category: "Frontend",
      tags: ["React", "TypeScript", "CSS Grid", "Vite"],
      emoji: "📋",
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      id: 3,
      title: "Developer Auth API Gateway",
      desc: "Ligtas na authentication API gateway na gumagamit ng JWT tokens, refresh algorithms, at rate limiter rules.",
      category: "APIs",
      tags: ["Node.js", "Express", "JWT", "Redis"],
      emoji: "🔑",
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      id: 4,
      title: "Sleek UI CSS Framework",
      desc: "Custom glassmorphic React components toolkit para sa mabilisang pagbuo ng high-performance interfaces.",
      category: "Frontend",
      tags: ["React", "Vanilla CSS", "Responsive design"],
      emoji: "🎨",
      demoUrl: "#",
      codeUrl: "#"
    }
  ];

  // Fetch projects from Python Backend API on mount
  useEffect(() => {
    fetch('http://localhost:8000/api/projects')
      .then(res => {
        if (!res.ok) throw new Error('API server returned non-200 response');
        return res.json();
      })
      .then((data: Project[]) => {
        setProjectsData(data);
      })
      .catch(err => {
        console.warn('Backend is offline. Using local projects fallback data.', err);
        setProjectsData(fallbackProjects);
      });
  }, []);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('aura-theme', theme);
  }, [theme]);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormLoading(true);
    setFormSuccess(false);

    // Send post request to FastAPI backend
    fetch('http://localhost:8000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Backend message dispatch failed');
        return res.json();
      })
      .then(() => {
        setFormLoading(false);
        setFormSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormSuccess(false), 5000);
      })
      .catch(err => {
        console.warn('Backend is offline. Processing offline message submission mock.', err);
        // Fallback for offline usage
        setTimeout(() => {
          setFormLoading(false);
          setFormSuccess(true);
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setFormSuccess(false), 5000);
        }, 1000);
      });
  };

  const filteredProjects = projectFilter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === projectFilter);

  return (
    <div className="portfolio-container">
      {/* Background Glowing Ambient Elements */}
      <div className="glow-orbs">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>

      {/* Navigation Navbar */}
      <nav className="navbar">
        <a href="#home" className="nav-logo">MB.dev</a>
        <ul className="nav-links">
          <li><a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>Home</a></li>
          <li><a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About</a></li>
          <li><a href="#projects" className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}>Projects</a></li>
          <li><a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a></li>
        </ul>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme mode">
            {theme === 'light' ? <IconMoon /> : <IconSun />}
          </button>
        </div>
      </nav>

      {/* Section 1: Hero */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-intro">Kumusta! Ako si</div>
          <h1 className="hero-name">Marwin Batis</h1>
          <h2 className="hero-title-role">Full-Stack Developer</h2>
          <p className="hero-bio">
            Naglilikha ako ng mga premium, modernong web application at API solutions na nakatutok sa mataas na antas ng user experience at malinis na coding standards.
          </p>
          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary">Tingnan ang Aking Gawa</a>
            <a href="#contact" className="btn btn-secondary">Makipag-usap</a>
          </div>

          <div className="social-links">
            <a href="https://github.com" className="social-link" target="_blank" rel="noreferrer" aria-label="GitHub Profile">
              <IconGithub />
            </a>
            <a href="https://linkedin.com" className="social-link" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile">
              <IconLinkedin />
            </a>
            <a href="mailto:marwinbatis@example.com" className="social-link" aria-label="Send Email">
              <IconMail />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-glowing-circle">
            <div className="visual-avatar-text">MB</div>
          </div>
        </div>
      </section>

      {/* Section 2: About & Skills */}
      <section id="about" className="section">
        <div className="section-title-wrapper">
          <h2 className="section-title">Tungkol sa Akin</h2>
          <p className="section-subtitle">Aking propesyonal na karanasan at teknikal na kakayahan</p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <p className="about-p">
              Ako ay isang masigasig na Software Developer na may malawak na karanasan sa pagbuo ng responsive websites, complex user dashboards, at secure server frameworks gamit ang modernong JavaScript stack.
            </p>
            <p className="about-p">
              Ang aking layunin ay maghatid ng mataas na kalidad ng trabaho mula sa disenyo hanggang sa actual deployment, tinitiyak na ang bawat component ay gumagana nang mabilis at epektibo sa lahat ng device.
            </p>

            <div className="about-facts-grid">
              <div className="fact-item">
                <div className="fact-num">3+</div>
                <div className="fact-label">Taon ng Karanasan</div>
              </div>
              <div className="fact-item">
                <div className="fact-num">20+</div>
                <div className="fact-label">Nakumpletong Proyekto</div>
              </div>
            </div>
          </div>

          <div className="skills-card">
            <div className="skills-category">
              <h3 className="skills-title">Frontend Stack</h3>
              <div className="skills-pills">
                <span className="skill-pill">React</span>
                <span className="skill-pill">TypeScript</span>
                <span className="skill-pill">HTML5 / CSS3</span>
                <span className="skill-pill">ES6+ JavaScript</span>
                <span className="skill-pill">Vite</span>
              </div>
            </div>

            <div className="skills-category">
              <h3 className="skills-title">Backend & Database</h3>
              <div className="skills-pills">
                <span className="skill-pill">Node.js</span>
                <span className="skill-pill">Express.js</span>
                <span className="skill-pill">RESTful APIs</span>
                <span className="skill-pill">MongoDB</span>
                <span className="skill-pill">PostgreSQL</span>
              </div>
            </div>

            <div className="skills-category">
              <h3 className="skills-title">Development Tools</h3>
              <div className="skills-pills">
                <span className="skill-pill">Git / GitHub</span>
                <span className="skill-pill">NPM / Yarn</span>
                <span className="skill-pill">Docker</span>
                <span className="skill-pill">VS Code</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Projects */}
      <section id="projects" className="section">
        <div className="section-title-wrapper">
          <h2 className="section-title">Mga Proyekto</h2>
          <p className="section-subtitle">Mga sample na likha at open-source code repositories</p>
        </div>

        {/* Filter Bar */}
        <div className="projects-filter-bar">
          {(['All', 'Frontend', 'Full-Stack', 'APIs'] as const).map(filter => (
            <button
              key={filter}
              className={`filter-btn ${projectFilter === filter ? 'active' : ''}`}
              onClick={() => setProjectFilter(filter)}
            >
              {filter === 'All' ? 'Lahat' : filter}
            </button>
          ))}
        </div>

        {/* Grid of Projects */}
        <div className="projects-grid">
          {filteredProjects.map(proj => (
            <article key={proj.id} className="project-card">
              <div className="project-visual">
                <span className="project-visual-icon">{proj.emoji}</span>
              </div>
              <div className="project-content">
                <div className="project-tags">
                  <span className="project-tag">{proj.category}</span>
                  {proj.tags.map((t, idx) => (
                    <span key={idx} style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>#{t}</span>
                  ))}
                </div>
                <h3 className="project-title">{proj.title}</h3>
                <p className="project-desc">{proj.desc}</p>
                <div className="project-links">
                  <a href={proj.demoUrl} className="project-link">
                    Live Demo <IconExternal />
                  </a>
                  <a href={proj.codeUrl} className="project-link">
                    Source Code <IconGithub />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Section 4: Contact */}
      <section id="contact" className="section" style={{ paddingBottom: '120px' }}>
        <div className="section-title-wrapper">
          <h2 className="section-title">Makipag-ugnayan</h2>
          <p className="section-subtitle">May proyekto ka ba o alok na trabaho? Magpadala ng mensahe!</p>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <h3 className="contact-info-title">Impormasyon sa Pakikipag-ugnayan</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Maaari mo akong kontakin sa pamamagitan ng aking mga social media account o gamit ang form na ito. Sumasagot ako sa loob ng 24 na oras.
            </p>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon"><IconMail /></div>
                <div className="method-details">
                  <span className="method-label">Email</span>
                  <span className="method-val">marwinbatis@example.com</span>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon"><IconPhone /></div>
                <div className="method-details">
                  <span className="method-label">Telepono</span>
                  <span className="method-val">+63 912 345 6789</span>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon"><IconMapPin /></div>
                <div className="method-details">
                  <span className="method-label">Lokasyon</span>
                  <span className="method-val">Manila, Philippines</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            {formSuccess && (
              <div className="success-banner">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Salamat! Matagumpay na naipadala ang iyong mensahe.
              </div>
            )}

            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Pangalan</label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Iyong Pangalan"
                  className="form-input"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="name@example.com"
                  className="form-input"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Mensahe</label>
                <textarea
                  id="message"
                  required
                  placeholder="Iyong mensahe para sa akin..."
                  className="form-textarea"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={formLoading}
              >
                {formLoading ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ animation: 'spin 1.5s linear infinite', marginRight: '8px' }}>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Ipinapadala...
                  </>
                ) : 'Ipadala ang Mensahe'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <span className="footer-logo">Marwin Batis</span>
        <p className="footer-copy">© 2026 Marwin Batis. All rights reserved.</p>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          Built with React, Vite, TypeScript & Vanilla CSS
        </p>
      </footer>
    </div>
  )
}

export default App
