import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown, ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, CalendarDays,
  Check, ChevronDown, Download, GraduationCap, Heart, Instagram, Linkedin, Mail,
  MapPin, Menu, MessageCircle, Music, Camera, Plane, Send, Sparkles, Star, Target,
  Trophy, UserRound, X, Phone, Globe, Quote, Compass
} from "lucide-react";
import "./styles.css";

const profile = {
  name: "Prashant Kumar",
  degree: "Bachelor of Arts (B.A.)",
  college: "[College / University Name]",
  graduation: "[Graduation Year]",
  location: "[City, State, India]",
  email: "[your.email@example.com]",
  phone: "[Your phone number]",
  linkedin: "[LinkedIn profile URL]",
  instagram: "[Instagram profile URL]",
  intro: "A curious mind, a positive outlook, and a belief that every day is a chance to learn something new.",
  about: "Hello! I'm Prashant Kumar. I have completed my Bachelor of Arts and enjoy learning, exploring new ideas, and meeting people from different backgrounds. I believe in staying grounded, working sincerely, and growing through new experiences. This website is a little introduction to who I am, what I value, and the things that inspire me."
};

const skills = [
  { title: "Communication", note: "Sharing ideas clearly and listening with care", level: 82 },
  { title: "Teamwork", note: "Working respectfully toward a shared goal", level: 85 },
  { title: "Time Management", note: "Organising tasks and keeping priorities clear", level: 76 },
  { title: "Problem Solving", note: "Thinking calmly and exploring practical options", level: 78 },
  { title: "Computer Basics", note: "Everyday digital tools and document work", level: 70 },
  { title: "Adaptability", note: "Staying open to new ideas and experiences", level: 84 }
];

const interests = [
  { name: "Reading", detail: "Discovering new ideas through books", icon: BookOpen, color: "lavender" },
  { name: "Travel", detail: "Exploring places and cultures", icon: Plane, color: "blue" },
  { name: "Photography", detail: "Capturing everyday moments", icon: Camera, color: "peach" },
  { name: "Music", detail: "Enjoying music and different sounds", icon: Music, color: "mint" },
  { name: "Learning", detail: "Building knowledge step by step", icon: Compass, color: "gold" }
];

const milestones = [
  { date: "[Year]", title: "Bachelor of Arts", text: "Completed my B.A. from [College / University Name].", icon: GraduationCap },
  { date: "[Year]", title: "Personal Growth", text: "Took part in learning opportunities and activities that helped me grow.", icon: Sparkles },
  { date: "Ongoing", title: "Looking Ahead", text: "Exploring new opportunities and continuing to develop my skills.", icon: Target }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", subject: "", message: "" });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = ["home", "about", "education", "skills", "interests", "journey", "contact"];
      let current = "home";
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) current = id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 3800);
    return () => clearTimeout(id);
  }, [toast]);

  const goTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const downloadProfile = () => {
    const text = `${profile.name}\nPersonal Profile\n\n${profile.intro}\n\nEDUCATION\n${profile.degree}\n${profile.college}\n${profile.graduation}\n\nABOUT\n${profile.about}\n\nSKILLS\n${skills.map(s => `- ${s.title}`).join("\n")}\n\nCONTACT\nEmail: ${profile.email}\nPhone: ${profile.phone}\nLocation: ${profile.location}\n\nPlease replace bracketed placeholders with accurate personal details.`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Prashant-Kumar-Profile.txt";
    a.click();
    URL.revokeObjectURL(url);
    setToast("Your profile file has been prepared.");
  };

  const submitContact = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(contact.subject || `Hello Prashant — message from ${contact.name}`);
    const body = encodeURIComponent(`Name: ${contact.name}\nEmail: ${contact.email}\n\n${contact.message}`);
    if (profile.email.includes("[") || profile.email.includes("]")) {
      setToast("Please add Prashant's real email in src/main.jsx before using the contact form.");
      return;
    }
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setToast("Opening your email app to send the message.");
  };

  const navItems = [
    ["home", "Home"], ["about", "About"], ["education", "Education"], ["skills", "Skills"],
    ["interests", "Interests"], ["journey", "My Journey"], ["contact", "Contact"]
  ];

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className={`topbar ${scrolled ? "topbar-scrolled" : ""}`}>
        <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); goTo("home"); }}>
          <span className="brand-mark">PK<span>.</span></span>
          <span>Prashant <b>Kumar</b></span>
        </a>
        <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Main navigation">
          {navItems.map(([id, label]) => <button key={id} className={active === id ? "nav-link active" : "nav-link"} onClick={() => goTo(id)}>{label}</button>)}
          <button className="nav-cta" onClick={downloadProfile}><Download size={15} /> Profile</button>
        </nav>
      </header>

      <main>
        <section className="hero section-anchor" id="home">
          <div className="hero-stars" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="hero-content">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> PERSONAL PORTFOLIO <span className="eyebrow-dot" /></div>
              <p className="hello">Hello, I'm</p>
              <h1>Prashant <span>Kumar</span><span className="title-period">.</span></h1>
              <div className="hero-script">Dream a little. Learn every day. <em>Grow always.</em></div>
              <p className="hero-description">{profile.intro}</p>
              <div className="hero-actions">
                <button className="button button-gold" onClick={() => goTo("contact")}><Send size={16} /> Let's Connect <ArrowUpRight size={16} /></button>
                <button className="button button-outline" onClick={downloadProfile}><Download size={16} /> Download Profile</button>
              </div>
              <div className="hero-proof"><span className="proof-icon"><GraduationCap size={18} /></span><span><b>{profile.degree}</b><small>Learning, growing, moving forward</small></span></div>
            </div>
            <div className="hero-visual">
              <div className="orbit orbit-a" /><div className="orbit orbit-b" />
              <div className="portrait-frame">
                <div className="portrait-placeholder">
                  <div className="portrait-initials">PK</div>
                  <UserRound size={82} strokeWidth={1.1} />
                  <span>ADD YOUR PHOTO</span>
                </div>
              </div>
              <div className="floating-note note-top"><Sparkles size={15} /> Good things take time</div>
              <div className="floating-note note-bottom"><span className="note-star">✳</span> Be your own kind of amazing</div>
              <div className="hero-sticker"><span>STAY</span><b>CURIOUS</b><span>✦ ALWAYS</span></div>
            </div>
          </div>
          <button className="scroll-cue" onClick={() => goTo("about")} aria-label="Scroll to about section"><span>SCROLL TO EXPLORE</span><ArrowDown size={16} /></button>
          <div className="hero-bottom-shape" />
        </section>

        <section className="section about-section section-anchor" id="about">
          <div className="section-heading reveal">
            <span className="section-kicker">A LITTLE ABOUT ME</span>
            <h2>More than a degree.<br /><span>A story still unfolding.</span></h2>
            <p>Every person has a story. Here's a small glimpse of mine.</p>
          </div>
          <div className="about-grid">
            <article className="about-card glass-card reveal">
              <div className="card-icon icon-lavender"><UserRound size={23} /></div>
              <span className="mini-label">WHO I AM</span>
              <h3>Nice to meet you!</h3>
              <p>{profile.about}</p>
              <div className="signature">Prashant Kumar <span>✦</span></div>
            </article>
            <div className="about-side">
              <article className="fact-card reveal"><div className="fact-icon"><GraduationCap size={21} /></div><div><small>Education</small><b>{profile.degree}</b><span>{profile.college}</span></div></article>
              <article className="fact-card reveal"><div className="fact-icon"><MapPin size={21} /></div><div><small>Based in</small><b>{profile.location}</b><span>Always open to new experiences</span></div></article>
              <article className="fact-card reveal"><div className="fact-icon"><Heart size={21} /></div><div><small>What matters</small><b>Kindness, curiosity & growth</b><span>Small steps make a difference</span></div></article>
              <blockquote className="quote-card reveal"><Quote size={25} /><p>“Be so busy improving yourself that you have no time to criticize others.”</p><span>— A reminder to keep growing</span></blockquote>
            </div>
          </div>
        </section>

        <section className="section education-section section-anchor" id="education">
          <div className="section-heading centered reveal">
            <span className="section-kicker">LEARNING & EDUCATION</span>
            <h2>Knowledge is a <span>journey.</span></h2>
            <p>Education is not only about a certificate; it's also about how we see the world.</p>
          </div>
          <div className="education-layout">
            <div className="education-art reveal">
              <div className="edu-sun" /><div className="edu-book book-one" /><div className="edu-book book-two" /><div className="edu-book book-three" />
              <div className="edu-cap"><GraduationCap size={88} strokeWidth={1.1} /></div>
              <div className="edu-art-caption">Keep learning.<br /><em>Keep becoming.</em></div>
              <span className="art-spark spark-one">✦</span><span className="art-spark spark-two">✧</span>
            </div>
            <article className="degree-card reveal">
              <div className="degree-top"><span className="degree-icon"><GraduationCap size={26} /></span><span className="degree-badge"><Check size={13} /> Graduate</span></div>
              <p className="mini-label">QUALIFICATION</p>
              <h3>{profile.degree}</h3>
              <p className="degree-school">{profile.college}</p>
              <div className="degree-details"><div><CalendarDays size={17} /><span><small>Year of passing</small><b>{profile.graduation}</b></span></div><div><MapPin size={17} /><span><small>Location</small><b>{profile.location}</b></span></div></div>
              <div className="degree-note"><Sparkles size={17} /><span>Curiosity doesn't end at graduation. Every day is another opportunity to learn.</span></div>
              <p className="placeholder-hint">Update the college, university, and year in <code>src/main.jsx</code>.</p>
            </article>
          </div>
        </section>

        <section className="section skills-section section-anchor" id="skills">
          <div className="section-heading reveal">
            <span className="section-kicker">THINGS I BRING</span>
            <h2>Skills for <span>everyday life.</span></h2>
            <p>Skills grow with practice, patience, and the willingness to keep trying.</p>
          </div>
          <div className="skills-grid">
            {skills.map((skill, index) => <article className={`skill-card reveal skill-${index % 3}`} key={skill.title} style={{ "--delay": `${index * 80}ms` }}>
              <div className="skill-card-top"><span className="skill-number">0{index + 1}</span><span className="skill-spark">✳</span></div>
              <h3>{skill.title}</h3><p>{skill.note}</p>
              <div className="skill-track"><span style={{ "--level": `${skill.level}%` }} /></div>
              <span className="skill-caption">A strength I'm always developing</span>
            </article>)}
          </div>
          <p className="small-disclaimer reveal">These are example skills. Keep only the skills that accurately describe Prashant.</p>
        </section>

        <section className="section interests-section section-anchor" id="interests">
          <div className="section-heading centered reveal">
            <span className="section-kicker">OUTSIDE THE CLASSROOM</span>
            <h2>Little things that make <span>life brighter.</span></h2>
            <p>The interests below are examples—replace them with Prashant's real hobbies.</p>
          </div>
          <div className="interest-grid">
            {interests.map((item, index) => { const Icon = item.icon; return <article className={`interest-card ${item.color} reveal`} key={item.name} style={{ "--delay": `${index * 90}ms` }}>
              <div className="interest-number">0{index + 1}</div><div className="interest-icon"><Icon size={27} /></div><h3>{item.name}</h3><p>{item.detail}</p><span className="interest-arrow"><ArrowUpRight size={18} /></span>
            </article>; })}
          </div>
          <div className="interest-banner reveal"><div className="banner-spark"><Sparkles size={22} /></div><div><b>Life is a collection of moments.</b><p>Stay curious enough to notice them, and grateful enough to remember them.</p></div><span className="banner-doodle">✳</span></div>
        </section>

        <section className="section journey-section section-anchor" id="journey">
          <div className="section-heading reveal">
            <span className="section-kicker">THE STORY SO FAR</span>
            <h2>Every chapter <span>counts.</span></h2>
            <p>A simple timeline to personalise with real milestones, experiences, and goals.</p>
          </div>
          <div className="timeline">
            {milestones.map((item, i) => { const Icon = item.icon; return <article className={`timeline-item reveal ${i % 2 ? "timeline-right" : ""}`} key={item.title}>
              <div className="timeline-node"><Icon size={18} /></div><div className="timeline-card"><span className="timeline-date">{item.date}</span><h3>{item.title}</h3><p>{item.text}</p></div>
            </article>; })}
          </div>
          <div className="future-card reveal"><div className="future-icon"><Target size={28} /></div><div><span className="section-kicker">LOOKING FORWARD</span><h3>The best is still ahead.</h3><p>I'm open to learning, meeting new people, and exploring meaningful opportunities. One step at a time.</p></div><span className="future-star">✦</span></div>
        </section>

        <section className="contact-section section-anchor" id="contact">
          <div className="contact-orb orb-left" /><div className="contact-orb orb-right" />
          <div className="contact-wrap">
            <div className="contact-copy reveal">
              <span className="section-kicker">LET'S CONNECT</span>
              <h2>Have a good feeling?<br /><span>Say hello.</span></h2>
              <p>I'd love to hear from you. Whether it's a friendly hello, a new idea, or an opportunity to connect, feel free to reach out.</p>
              <div className="contact-detail"><span><Mail size={19} /></span><div><small>Email me</small><b>{profile.email}</b></div></div>
              <div className="contact-detail"><span><MapPin size={19} /></span><div><small>Find me around</small><b>{profile.location}</b></div></div>
              <div className="social-links">
                <a href={profile.linkedin.startsWith("http") ? profile.linkedin : "#contact"} onClick={e => { if (!profile.linkedin.startsWith("http")) { e.preventDefault(); setToast("Add Prashant's real LinkedIn URL in src/main.jsx."); } }} aria-label="LinkedIn"><Linkedin size={18} /></a>
                <a href={profile.instagram.startsWith("http") ? profile.instagram : "#contact"} onClick={e => { if (!profile.instagram.startsWith("http")) { e.preventDefault(); setToast("Add Prashant's real Instagram URL in src/main.jsx."); } }} aria-label="Instagram"><Instagram size={18} /></a>
                <a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={18} /></a>
              </div>
            </div>
            <form className="contact-form reveal" onSubmit={submitContact}>
              <div className="form-heading"><span>YOUR MESSAGE</span><MessageCircle size={20} /></div>
              <label>Your name<input required value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} placeholder="What should I call you?" /></label>
              <label>Your email<input required type="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} placeholder="you@example.com" /></label>
              <label>Subject <span className="optional">(optional)</span><input value={contact.subject} onChange={e => setContact({ ...contact, subject: e.target.value })} placeholder="What's this about?" /></label>
              <label>Your message<textarea required rows="4" value={contact.message} onChange={e => setContact({ ...contact, message: e.target.value })} placeholder="Write a few words..." /></label>
              <button className="button button-gold form-submit" type="submit">Prepare Message <ArrowRight size={17} /></button>
              <p className="form-note">This opens your email app; it does not send or store messages on this website.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home" onClick={e => { e.preventDefault(); goTo("home"); }}><span className="brand-mark">PK<span>.</span></span><span>Prashant <b>Kumar</b></span></a>
        <p>Made with intention, curiosity, and a little ✦</p>
        <button onClick={() => goTo("home")} className="back-top">Back to top <ArrowUpRight size={15} /></button>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Prashant Kumar</span><span>Personal portfolio · All rights reserved</span></div>
      </footer>
      {toast && <div className="toast" role="status"><Sparkles size={17} />{toast}<button onClick={() => setToast("")} aria-label="Dismiss"><X size={15} /></button></div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
