import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/trade-buyer-toolkit.module.css';

/* ─── Static Fallback Data (Exact match to design mockup) ─── */
const DEFAULT_DATA = {
  meta: {
    title: 'The UK Trade Buyer Toolkit for Wholesale Memorials | Stone Discover UK',
    description:
      'Checklists, templates and quick-reference sheets to help you order imported granite memorials with fewer mistakes, fewer delays and no surprises.',
  },
  hero: {
    badge: 'FREE FOR UK TRADE BUYERS',
    title: 'The UK Trade Buyer Toolkit for Wholesale Memorials',
    subtitle:
      'Checklists, templates and quick-reference sheets to help you order imported granite memorials with fewer mistakes, fewer delays and no surprises.',
    metaText: '14-page PDF  |  Printable and fillable  |  Free',
    booklet: {
      brand: 'STONE DISCOVER UK',
      title: 'UK TRADE BUYER\nTOOLKIT',
      subtitle: 'Checklists and templates for buying wholesale memorials',
      edition: '2026 Edition',
      checklistTitle: 'Pre-Order Checklist',
      checklistItems: [
        'Cemetery rules checked',
        'Size and base confirmed',
        'Granite colour chosen',
        'Quote itemised',
      ],
    },
  },
  painPointsSection: {
    heading: 'Most ordering problems start before the order is placed',
    subheading: 'This toolkit helps you avoid:',
    items: [
      { id: 1, text: 'Ordering a memorial your cemetery will not accept' },
      { id: 2, text: 'Comparing quotes that leave out freight, duty or VAT' },
      { id: 3, text: 'Spelling or date errors on finished inscriptions' },
      { id: 4, text: 'Delivery delays you did not plan for' },
      { id: 5, text: 'Damage found too late to claim' },
      { id: 6, text: 'Verbal agreements nobody can prove later' },
    ],
  },
  toolsSection: {
    heading: "What's inside the toolkit",
    subheading: 'Ten tools, one printable PDF.',
    tools: [
      {
        id: 'pre-order',
        title: 'Pre-Order Checklists',
        description: 'Specification and commercial checks to confirm before you commit.',
      },
      {
        id: 'size-ref',
        title: 'Size Quick Reference',
        description: 'Headstone, base and kerb set sizes in one sheet, metric and imperial.',
      },
      {
        id: 'supplier-vetting',
        title: 'Supplier Vetting Checklist',
        description: 'Questions to ask overseas suppliers, with a side-by-side score table.',
      },
      {
        id: 'landed-cost',
        title: 'Landed Cost Template',
        description: 'Compare quotes on the real cost per piece, including freight, duty and VAT.',
      },
      {
        id: 'shipping-import',
        title: 'Shipping and Import Checklist',
        description: 'Terms explained, documents to have ready and delivery-day steps.',
      },
      {
        id: 'approval-inspection',
        title: 'Approval and Inspection Forms',
        description: 'Sign off inscriptions and log damage on arrival.',
      },
    ],
    footnote: 'Plus a cemetery requirements tracker, trade glossary and enquiry form.',
  },
  audienceSection: {
    heading: 'Built for UK memorial trade buyers',
    buyers: [
      'Monumental masons',
      'Funeral directors',
      'Memorial retailers and showrooms',
      'Stonemasonry businesses seeking a second supplier',
      'New memorial businesses',
    ],
    preparedBy: {
      team: 'Prepared by the Stone Discover Trade Team.',
      note: 'Based on how we handle wholesale orders for UK trade customers.',
    },
  },
  form: {
    title: 'Get your free toolkit',
    subtitle: 'We will send it straight to your inbox.',
    buttonText: 'Download the Toolkit',
    privacyText: 'I agree to the Privacy Policy and to receive the toolkit and related trade information.',
    downloadUrl: '/files/SDUK-Trade-Buyer-Toolkit.pdf',
  },
  faqs: [
    {
      question: 'Is the toolkit free?',
      answer: 'Yes. No charge and no obligation to buy from us.',
    },
    {
      question: 'Can I print the pages?',
      answer: 'Yes. It prints cleanly on A4, so print only what you need.',
    },
    {
      question: 'Do I have to buy from Stone Discover?',
      answer: 'No. The toolkit works with any supplier.',
    },
    {
      question: 'Will I get marketing emails?',
      answer: 'A few helpful follow-ups. Unsubscribe at any time.',
    },
  ],
  bottomCta: {
    heading: 'Ready to order with confidence?',
    subheading: 'Download the toolkit, or send us your requirements for an itemised trade quote.',
    primaryBtnText: 'Download the Free Toolkit',
    secondaryBtnText: 'Request Trade Pricing',
  },
};

/* ─── Merge Helper for API vs Static Data ─── */
function mergeWithDefaults(defaults, api) {
  if (!api || typeof api !== 'object') return defaults;
  return {
    meta: { ...defaults.meta, ...(api.meta || {}) },
    hero: {
      ...defaults.hero,
      ...(api.hero || {}),
      booklet: {
        ...defaults.hero.booklet,
        ...(api.hero?.booklet || {}),
        checklistItems: api.hero?.booklet?.checklistItems || defaults.hero.booklet.checklistItems,
      },
    },
    painPointsSection: {
      ...defaults.painPointsSection,
      ...(api.painPointsSection || {}),
      items: api.painPointsSection?.items?.length ? api.painPointsSection.items : defaults.painPointsSection.items,
    },
    toolsSection: {
      ...defaults.toolsSection,
      ...(api.toolsSection || {}),
      tools: api.toolsSection?.tools?.length ? api.toolsSection.tools : defaults.toolsSection.tools,
    },
    audienceSection: {
      ...defaults.audienceSection,
      ...(api.audienceSection || {}),
      buyers: api.audienceSection?.buyers?.length ? api.audienceSection.buyers : defaults.audienceSection.buyers,
      preparedBy: {
        ...defaults.audienceSection.preparedBy,
        ...(api.audienceSection?.preparedBy || {}),
      },
    },
    form: { ...defaults.form, ...(api.form || {}) },
    faqs: api.faqs?.length ? api.faqs : defaults.faqs,
    bottomCta: { ...defaults.bottomCta, ...(api.bottomCta || {}) },
  };
}

export default function TradeBuyerToolkit({ apiData }) {
  const data = mergeWithDefaults(DEFAULT_DATA, apiData);

  // Lead Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: '',
    agreed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const scrollToForm = (e) => {
    if (e) e.preventDefault();
    const formEl = document.getElementById('toolkit-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Focus on first input
      setTimeout(() => {
        const input = formEl.querySelector('input[name="name"]');
        if (input) input.focus();
      }, 500);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert('Please agree to the Privacy Policy to receive the toolkit.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Submit lead data to CRM endpoint
      await fetch('https://mailserviceportal.onrender.com/api/form/tpl_6ae0803ed50bb4676b8d4cb0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formName: 'UK Trade Buyer Toolkit Download',
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: `Interested in buying: ${formData.interest || 'Not specified'}`,
          page_url: typeof window !== 'undefined' ? window.location.href : '',
        }),
      }).catch((err) => console.log('Lead capture logging (non-fatal):', err.message));

      setIsSuccess(true);

      // 2. Trigger automatic PDF download
      setTimeout(() => {
        const downloadLink = document.createElement('a');
        downloadLink.href = data.form.downloadUrl || '/files/Catalogue-Stonediscover.pdf';
        downloadLink.download = 'UK-Trade-Buyer-Toolkit-2026.pdf';
        downloadLink.target = '_blank';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }, 800);
    } catch (err) {
      console.error('Submission error:', err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Structured Data (Schema.org)
  const faqList = Array.isArray(data.faqs) ? data.faqs : [];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data.meta.title,
    description: data.meta.description,
    url: 'https://www.stonediscover.co.uk/trade-buyer-toolkit/',
    publisher: {
      '@type': 'Organization',
      name: 'Stone Discover UK Ltd.',
      url: 'https://www.stonediscover.co.uk/',
    },
  };

  return (
    <div className={styles.pageWrapper}>
      <Head>
        <title>{data.meta.title}</title>
        <meta name="description" content={data.meta.description} />
        <link rel="canonical" href="https://www.stonediscover.co.uk/trade-buyer-toolkit/" />
        <meta property="og:title" content={data.meta.title} />
        <meta property="og:description" content={data.meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.stonediscover.co.uk/trade-buyer-toolkit/" />
        <meta property="og:site_name" content="Stone Discover UK" />
        <meta property="og:image" content="https://www.stonediscover.co.uk/img/stone-home-o.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.meta.title} />
        <meta name="twitter:description" content={data.meta.description} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
      </Head>

      {/* ─── Hero Section ─── */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            {/* Left Content */}
            <div>
              <span className={styles.eyebrow}>{data.hero.badge}</span>
              <h1 className={styles.heroTitle}>{data.hero.title}</h1>
              <p className={styles.heroSubtitle}>{data.hero.subtitle}</p>

              <div className={styles.btnGroup}>
                <button onClick={scrollToForm} className={styles.btnPrimary}>
                  Download the Free Toolkit
                </button>
                <Link href="/get-quote-now/" className={styles.btnOutline}>
                  Request Trade Pricing
                </Link>
              </div>

              <div className={styles.heroMeta}>
                <span>14-page PDF</span>
                <span className={styles.metaDivider}>|</span>
                <span>Printable and fillable</span>
                <span className={styles.metaDivider}>|</span>
                <span>Free</span>
              </div>
            </div>

            {/* Right Visual: Booklet Mockup — exact match to design */}
            <div className={styles.visualWrapper}>
              <div className={styles.bookletMock}>
                {/* White sheets fanning behind to the right */}
                <div className={styles.fannedSheet2}></div>
                <div className={styles.fannedSheet1}></div>

                {/* Main dark booklet cover */}
                <div className={styles.bookletCover}>
                  {/* Top: brand name */}
                  <div className={styles.coverHeader}>
                    <div className={styles.coverBrand}>{data.hero.booklet.brand}</div>
                  </div>

                  {/* Middle: gold bar + title + subtitle */}
                  <div className={styles.coverBody}>
                    <div className={styles.coverGoldBar}></div>
                    <div className={styles.coverMainTitle}>
                      {data.hero.booklet.title}
                    </div>
                    <div className={styles.coverSubtitle}>
                      {data.hero.booklet.subtitle}
                    </div>
                  </div>

                  {/* Bottom: edition */}
                  <div className={styles.coverFooter}>
                    <div className={styles.coverEdition}>{data.hero.booklet.edition}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 2: Dark Problem / Avoidance Section ─── */}
      <section className={styles.darkSection}>
        <div className={styles.container}>
          <h2 className={styles.darkHeading}>{data.painPointsSection.heading}</h2>
          <p className={styles.darkSubheading}>{data.painPointsSection.subheading}</p>

          <div className={styles.painGrid}>
            {data.painPointsSection.items.map((item) => (
              <div key={item.id} className={styles.painCard}>
                <p className={styles.painText}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 3: What's Inside The Toolkit ─── */}
      <section id="whats-inside" className={styles.lightSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{data.toolsSection.heading}</h2>
          <p className={styles.sectionSubtitle}>{data.toolsSection.subheading}</p>

          <div className={styles.toolsGrid}>
            {data.toolsSection.tools.map((tool) => (
              <div key={tool.id} className={styles.toolCard}>
                <h3 className={styles.toolTitle}>{tool.title}</h3>
                <p className={styles.toolDesc}>{tool.description}</p>
              </div>
            ))}
          </div>

          <p className={styles.toolsFootnote}>{data.toolsSection.footnote}</p>
        </div>
      </section>

      {/* ─── Section 4: Split Section (Audience + Lead Capture Form) ─── */}
      <section id="toolkit-form" className={styles.audienceSection}>
        <div className={styles.container}>
          <div className={styles.audienceGrid}>
            {/* Left Column: Built for UK Trade Buyers */}
            <div>
              <h2 className={styles.audienceHeading}>{data.audienceSection.heading}</h2>

              <ul className={styles.buyerList}>
                {data.audienceSection.buyers.map((buyer, idx) => (
                  <li key={idx} className={styles.buyerItem}>
                    {buyer}
                  </li>
                ))}
              </ul>

              <div className={styles.preparedBox}>
                <div className={styles.preparedTitle}>{data.audienceSection.preparedBy.team}</div>
                <p className={styles.preparedText}>{data.audienceSection.preparedBy.note}</p>
              </div>
            </div>

            {/* Right Column: Lead Capture Form Card */}
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>{data.form.title}</h3>
              <p className={styles.formSubtitle}>{data.form.subtitle}</p>

              {isSuccess ? (
                <div className={styles.successBox}>
                  <div className={styles.successTitle}>✓ Your Toolkit is on its way!</div>
                  <p className={styles.successMsg}>
                    Your download should begin automatically
                  </p>
                  <a
                    href={data.form.downloadUrl || '/files/Catalogue-Stonediscover.pdf'}
                    download="UK-Trade-Buyer-Toolkit-2026.pdf"
                    className={styles.btnPrimary}
                    style={{ display: 'inline-block' }}
                  >
                    Click here if download did not start
                  </a>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Full name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="e.g. John Smith"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Business email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="john@masonrycompany.co.uk"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Company name *</label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="e.g. Smith Memorials Ltd"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>What do you mainly buy?</label>
                    <input
                      type="text"
                      name="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Headstones, kerb sets, benches..."
                    />
                  </div>

                  <div className={styles.checkboxRow}>
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreed"
                      required
                      checked={formData.agreed}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <label htmlFor="agreeTerms" className={styles.checkboxLabel}>
                      {data.form.privacyText}
                    </label>
                  </div>

                  <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
                    {isSubmitting ? 'Preparing your download...' : data.form.buttonText}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 5: Frequently Asked Questions ─── */}
      {faqList.length > 0 && (
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <h2 className={styles.faqTitle}>Frequently asked questions</h2>

          <div className={styles.faqGrid}>
            {faqList.map((faq, idx) => (
              <div key={idx} className={styles.faqCard}>
                <h3 className={styles.faqQuestion}>{faq.question}</h3>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ─── Section 6: Dark Bottom CTA Banner ─── */}
      <section className={styles.bottomCtaSection}>
        <div className={styles.container}>
          <h2 className={styles.bottomCtaTitle}>{data.bottomCta.heading}</h2>
          <p className={styles.bottomCtaSubtitle}>{data.bottomCta.subheading}</p>

          <div className={styles.bottomCtaButtons}>
            <button onClick={scrollToForm} className={styles.btnGold}>
              {data.bottomCta.primaryBtnText}
            </button>
            <Link href="/get-quote-now/" className={styles.btnDarkOutline}>
              {data.bottomCta.secondaryBtnText}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Data Fetching: Dynamic API with Static Fallback ─── */
export async function getStaticProps() {
  let apiData = null;

  try {
    const mainApi =
      process.env.NEXT_PUBLIC_MAIN_API_URL ||
      'https://stonediscoveruk-apibackend.onrender.com/api/frontend';
    const endpoint = `${mainApi}/trade-buyer-toolkit`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(endpoint, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && typeof json === 'object') {
        apiData = json;
      }
    }
  } catch (err) {
    // Graceful fallback to static content if backend endpoint does not exist yet
    // No error thrown, returns apiData: null
  }

  return {
    props: {
      apiData,
    },
    revalidate: 60, // Incremental Static Regeneration (ISR)
  };
}
