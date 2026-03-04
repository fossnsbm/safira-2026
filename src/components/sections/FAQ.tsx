import { useState } from 'react';

const faqData = [
  {
    question: "What is SAFIRA 2026?",
    answer: "SAFIRA 2026 is a special Women's Day event organized to celebrate and empower women in technology. The event features an inspiring talk by a woman in tech who will share her journey, experiences, challenges, and achievements."
  },
  {
    question: "Who can attend this event?",
    answer: "The event is open to all students and anyone interested in technology, inspiration, and empowering women in the tech industry."
  },
  {
    question: "When will SAFIRA 2026 take place?",
    answer: "SAFIRA 2026 will be held on International Women's Day, March 9th, 2026. The exact time and venue will be announced through our official channels."
  },
  {
    question: "Is there a registration required?",
    answer: "Yes, participants are encouraged to register in advance to secure their spot. Registration details will be provided on the event website or official announcements."
  },
  {
    question: "Is there a participation fee?",
    answer: "No. SAFIRA 2026 is a free event organized for students and the community."
  },
  {
    question: "What can I expect from the event?",
    answer: "Participants will hear an inspiring story from a successful woman in the tech industry, learn about her career journey, and gain motivation and insights to pursue their own goals in technology."
  },
  {
    question: "Will there be a Q&A session?",
    answer: "Yes. Participants will have the opportunity to ask questions and interact with the speaker during the session."
  },
  {
    question: "Why is this event focused on Women in Tech?",
    answer: "Women are still underrepresented in many areas of technology. SAFIRA 2026 aims to encourage more women to explore tech careers and highlight inspiring role models."
  },
  {
    question: "Who is organizing SAFIRA 2026?",
    answer: "SAFIRA 2026 is organized by the FOSS Community as part of its initiative to promote inclusivity and diversity in the technology field."
  },
  {
    question: "How can I stay updated about the event?",
    answer: "Follow our official announcements and social media channels for updates about the event schedule, speakers, and registration details."
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button 
        className="faq-question" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <svg 
          className={`faq-chevron ${isOpen ? 'rotated' : ''}`}
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </button>
      <div className={`faq-answer ${isOpen ? 'show' : ''}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="faq-section" id="faq">
      <div className="section-container">
        <h2 className="section-title">FAQ</h2>
        <div className="faq-list">
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
