'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Reveal from './Reveal';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <Reveal
          key={index}
          delay={index * 70}
          className="border border-white/10 rounded-lg overflow-hidden bg-dark-500/30"
        >
          <button
            className="w-full flex items-center justify-between px-6 py-4 text-left bg-transparent hover:bg-white/5 transition-colors"
            onClick={() => toggleItem(index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span className="font-light tracking-wide text-white pr-4">
              {item.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-rose-gold flex-shrink-0 transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            id={`faq-answer-${index}`}
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="px-6 pb-4 text-gray-400 leading-relaxed">
              {item.answer}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export const homepageFAQs: FAQItem[] = [
  {
    question: 'How much does a website cost?',
    answer:
      "Most professionally built websites cost $2,500–$5,000 or more. We believe small businesses and entrepreneurs should have access to a fast, professional website without paying agency prices. That's why we offer a one-time flat build fee of $299. Ask about our military discount.",
  },
  {
    question: 'How long does a website take to build?',
    answer:
      'Most projects are completed in 7–14 days, depending on scope and how quickly you provide content and feedback. We move fast without cutting corners.',
  },
  {
    question: 'Who owns the domain and hosting?',
    answer:
      'You do. We help you set up or transfer your domain and hosting so you have full ownership and control. No vendor lock-in, no surprises.',
  },
  {
    question: 'Can I make changes after the site launches?',
    answer:
      'Absolutely. Post-launch edits are $49 per request—and that is per request, not per edit. Send us four changes in one message and it is still $49. You also get a clean handoff with documentation, so you or any developer you choose can make updates directly whenever you prefer.',
  },
  {
    question: 'How does payment work?',
    answer:
      'One single payment of $299 upfront to start your project—that covers the entire build through launch. After that, the only thing you would ever pay for is an edit request at $49, and only if you ask for one. For larger custom projects, payment terms are discussed before any work begins.',
  },
];
