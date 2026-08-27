import { ArrowRight, CheckCircle2, ClipboardCheck, FileSearch, Menu, Phone, ShieldCheck, X } from 'lucide-react';
import { useState } from 'react';
import markUrl from '../assets/images/logo/bid-tender-mark.png';

const services = [
  ['GeM Tender Bidding', 'Professional assistance for Government e-Marketplace tenders.', 'Tender requirement review', 'Eligibility assessment', 'Technical bid support', 'Online submission assistance', 'Post-submission support'],
  ['Non-GeM Tender Bidding', 'Support for government departments, PSUs, state portals and e-procurement platforms.', 'Tender document review', 'Eligibility checking', 'Required document identification', 'Online portal support', 'Compliance checking'],
  ['Tender Document Analysis', 'Turn lengthy tender documents into a clear, practical view of what is required.', 'Eligibility criteria review', 'Scope of work review', 'EMD and tender fee requirements', 'Turnover and experience requirements', 'Important dates and annexures'],
  ['Documentation Support', 'Organize the company, financial, technical and tender-specific documents your submission needs.', 'PAN, GST and registration documents', 'MSME/Udyam documents', 'Work orders and completion certificates', 'ITR, bank and technical certificates', 'Undertakings, declarations and annexures'],
  ['Bid Preparation Support', 'Build a bid that responds to requirements with a disciplined technical and financial structure.', 'Technical document checklist', 'Compliance statements', 'Product/service specifications', 'BOQ and price schedule review', 'Final bid review'],
  ['Submission & Post-Bid', 'Practical guidance for online submission, acknowledgement verification and next steps.', 'Portal login and DSC guidance', 'Document upload assistance', 'Final submission review', 'Clarification response support', 'General post-bid consultancy'],
];

const steps = [
  { number: '01', title: 'Find the right tender', text: 'We filter opportunities against your business, location and eligibility.' },
  { number: '02', title: 'Build a compliant bid', text: 'Every document, declaration and commercial detail gets checked.' },
  { number: '03', title: 'Submit with confidence', text: 'You get a clear submission plan and support right through closing.' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className="navbar">
        <a className="brand" href="#top" aria-label="Bid Tender 4 U home">
          <img src={markUrl} alt="Bid Tender 4 U mark" />
          <span><strong>Bid Tender</strong><small>4 U</small></span>
        </a>
        <button className="menu-button" type="button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Our process</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>Why us</a>
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Talk to an expert <ArrowRight size={16} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Tender intelligence for ambitious businesses</p>
            <h1>Turn complex tenders into <em>clear opportunities.</em></h1>
            <p className="hero-text">Independent GeM and Non-GeM tender consultancy for contractors, manufacturers, MSMEs and service providers across India.</p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">Review my tender <ArrowRight size={18} /></a>
              <a className="text-link" href="#process">See how it works <ArrowRight size={16} /></a>
            </div>
            <div className="trust-row"><ShieldCheck size={18} /><span>Practical guidance. Careful compliance. No false promises.</span></div>
          </div>
          <div className="hero-visual" aria-label="Tender readiness overview">
            <div className="visual-heading"><span>Bid readiness</span><b>78%</b></div>
            <div className="readiness-bar"><span /></div>
            <div className="visual-grid">
              <div className="mini-stat"><FileSearch size={18} /><span>Eligibility<small>Verified</small></span><CheckCircle2 className="check" size={18} /></div>
              <div className="mini-stat"><ClipboardCheck size={18} /><span>Documents<small>12 of 14 ready</small></span><b>86%</b></div>
              <div className="mini-stat"><ShieldCheck size={18} /><span>Compliance<small>In review</small></span><i /></div>
            </div>
            <div className="visual-footer"><span className="pulse" /> Tender review in progress <span>Updated today</span></div>
          </div>
        </section>

        <section className="metrics" id="about">
          <div><strong>GeM + Non-GeM</strong><span>tender expertise</span></div>
          <div><strong>End-to-end</strong><span>bid support</span></div>
          <div><strong>India-wide</strong><span>consultancy</span></div>
          <div><strong>One clear</strong><span>point of contact</span></div>
        </section>

        <section className="section" id="services">
          <div className="section-intro"><p className="eyebrow"><span /> What we do</p><h2>Less paperwork. More precision.</h2><p>Good bids are won before submission. We help you understand the opportunity, prepare the response and avoid preventable disqualifications.</p></div>
          <div className="service-list"><article><FileSearch size={24} /><h3>Tender analysis</h3><p>Eligibility, scope, deadlines and risks translated into plain language.</p></article><article><ClipboardCheck size={24} /><h3>Bid preparation</h3><p>A structured response with the right documents in the right order.</p></article><article><ShieldCheck size={24} /><h3>Compliance check</h3><p>A final, detail-focused review before you press submit.</p></article></div>
        </section>

        <section className="process-section" id="process">
          <div className="section-intro"><p className="eyebrow"><span /> The clear path</p><h2>A better way to bid.</h2></div>
          <div className="process-graph">{steps.map((step, index) => <div className="step" key={step.number}><div className="step-number">{step.number}</div><div><h3>{step.title}</h3><p>{step.text}</p></div>{index < steps.length - 1 && <ArrowRight className="step-arrow" size={24} />}</div>)}</div>
        </section>

        <section className="contact" id="contact"><div><p className="eyebrow"><span /> Start with the tender</p><h2>Have a bid in mind?</h2><p>Share the basics and we’ll help you see the next practical step.</p></div><a className="button dark" href="mailto:Tendergem42@gmail.com?subject=Tender%20review%20request">Request a review <ArrowRight size={18} /></a></section>
      </main>
      <footer><div className="brand footer-brand"><img src={markUrl} alt="" /><span><strong>Bid Tender</strong><small>4 U</small></span></div><span>Independent tender consultancy · Ahmedabad, Gujarat · GSTIN: 24BXWPC9423M1ZV</span><a href="tel:+919726407267"><Phone size={15} /> +91 97264 07267</a></footer>
    </div>
  );
}

export default App;
