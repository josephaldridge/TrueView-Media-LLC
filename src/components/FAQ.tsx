'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
        <div
          key={index}
          className="border border-slate-200 rounded-lg overflow-hidden"
        >
          <button
            className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
            onClick={() => toggleItem(index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span className="font-medium text-slate-900 pr-4">
              {item.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-200 ${
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
            <div className="px-6 pb-4 text-slate-600 leading-relaxed">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export const homepageFAQs: FAQItem[] = [
  {
    question: 'How much does a website cost?',
    answer:
      "Most professionally built websites cost $2,500–$5,000 or more. We believe small businesses should have access to a fast, professional website without paying agency prices. That's why we offer a flat build fee of $1,299. Ask about our military discount.",
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
      'We provide a clean handoff with documentation so you or another developer can make changes after launch. Post-launch edits are not included in the project price, but the site is yours to update however you like.',
  },
  {
    question: 'Do you offer payment plans?',
    answer:
      'We require 50% deposit to start and 50% upon completion before launch. For larger projects, we can discuss milestone-based payments.',
  },
];
