import type { Metadata } from 'next';
import { Section } from '@/components';
import ContactForm from '@/components/ContactForm';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with TrueView Media LLC. Request a quote for your website project. Phone: 972-339-0754, Email: contact@trueviewmediallc.com',
  openGraph: {
    title: 'Contact | TrueView Media LLC',
    description:
      'Get in touch with TrueView Media LLC. Request a quote for your website project.',
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-slate-900 mb-6">Get in Touch</h1>
            <p className="text-xl text-slate-600">
              Ready to talk about your project? Fill out the form below or reach out directly. We respond to all inquiries within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-50 text-brand-600 rounded-lg flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 mb-1">Phone</p>
                  <a
                    href="tel:972-339-0754"
                    className="text-brand-600 hover:text-brand-700"
                  >
                    972-339-0754
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-50 text-brand-600 rounded-lg flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 mb-1">Email</p>
                  <a
                    href="mailto:contact@trueviewmediallc.com"
                    className="text-brand-600 hover:text-brand-700 break-all"
                  >
                    contact@trueviewmediallc.com
                  </a>
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-50 text-brand-600 rounded-lg flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 mb-1">Response Time</p>
                  <p className="text-slate-600">Within 1 business day</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-50 text-brand-600 rounded-lg flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 mb-1">Location</p>
                  <p className="text-slate-600">
                    Based in Texas
                    <br />
                    Serving clients nationwide
                  </p>
                </div>
              </div>
            </div>

            {/* Prefer to Call */}
            <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">
                Prefer to talk?
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Sometimes a phone call is easier. Feel free to call us directly—no pressure, just a conversation about your project.
              </p>
              <a
                href="tel:972-339-0754"
                className="btn-primary w-full text-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call 972-339-0754
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Request a Quote
              </h2>
              <p className="text-slate-600 mb-6">
                Tell us about your project and we&apos;ll get back to you with a clear proposal.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Teaser */}
      <Section background="gray">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Common questions
          </h2>
          <p className="text-slate-600 mb-6">
            Before reaching out, you might find answers to common questions on our homepage.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="font-medium text-slate-900 mb-1">
                How much does a website cost?
              </p>
              <p className="text-sm text-slate-600">
                Flat fee of $1,299. Ask about our military discount.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="font-medium text-slate-900 mb-1">
                How long does it take?
              </p>
              <p className="text-sm text-slate-600">
                Most projects complete in 7–14 days.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="font-medium text-slate-900 mb-1">
                Do I own my website?
              </p>
              <p className="text-sm text-slate-600">
                Yes. Domain, hosting, and code are all yours.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="font-medium text-slate-900 mb-1">
                What happens after launch?
              </p>
              <p className="text-sm text-slate-600">
                You get full ownership and documentation. The site is yours.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
