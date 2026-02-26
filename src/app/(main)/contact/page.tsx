import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-gray-500 mb-10">
        Have a question, a suggestion, or just want to talk about the latest match? We are here
        for you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <span className="text-xl">📧</span>
          </div>
          <h2 className="font-semibold text-gray-900 mb-2">Email Support</h2>
          <p className="text-sm text-gray-500 mb-3">
            For platform questions, account help, or general inquiries, reach us at:
          </p>
          <a
            href="mailto:support@kickvora.com"
            className="text-indigo-600 font-medium text-sm hover:underline"
          >
            support@kickvora.com
          </a>
          <p className="text-xs text-gray-400 mt-2">We typically respond within 24 hours.</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <span className="text-xl">📍</span>
          </div>
          <h2 className="font-semibold text-gray-900 mb-2">Our Office</h2>
          <address className="not-italic text-sm text-gray-500 leading-relaxed">
            Kickvora<br />
            G 93-94, D block, Baani Square<br />
            Sector 50, Gurugram<br />
            Haryana 122018, India
          </address>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white border border-gray-100 rounded-2xl p-8">
        <h2 className="font-semibold text-gray-900 mb-6">Send us a message</h2>
        <form
          action={`mailto:support@kickvora.com`}
          method="get"
          className="space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
            <input
              type="text"
              name="subject"
              required
              className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="How can we help?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
            <textarea
              name="body"
              required
              rows={5}
              className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Tell us more..."
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
