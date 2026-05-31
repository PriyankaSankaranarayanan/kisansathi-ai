import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FEATURES = [
  {
    icon: '🔬',
    title: 'Disease Detection',
    desc: 'Upload crop leaf images and get disease name, confidence, and treatment advice instantly.',
  },
  {
    icon: '🌤️',
    title: 'Weather Advisory',
    desc: 'Check temperature, humidity, and get farming advisories tailored to local weather.',
  },
  {
    icon: '🤖',
    title: 'AI Assistant',
    desc: 'Chat with an intelligent farming guide for crop care, fertilizers, and best practices.',
  },
];

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col dark:bg-gray-900">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-farm-600 via-farm-700 to-farm-900 px-4 py-20 text-white sm:py-28">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-white blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-farm-300 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-4xl text-center">
            <p className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur">
              Smart Agriculture for Every Kisan
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              KisanSathi AI
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-farm-100 sm:text-xl">
              Identify crop diseases, plan with weather insights, and get AI-powered farming
              guidance — all in one dashboard built for Indian farmers.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/dashboard" className="btn-primary bg-white text-farm-800 shadow-none hover:bg-farm-50">
                Get Started Free
              </Link>
              <a href="#features" className="btn-secondary border-white text-white hover:bg-white/10">
                Explore Features
              </a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white">
              Everything You Need on the Farm
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-600 dark:text-gray-400">
              Three powerful tools designed for quick decisions in the field
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {FEATURES.map((f) => (
              <article
                key={f.title}
                className="card group text-center transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-5xl">{f.icon}</span>
                <h3 className="mt-4 font-display text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-farm-100 px-4 py-16 dark:bg-farm-900/30">
          <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-xl dark:bg-gray-800">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Ready to protect your crops?
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Open the dashboard and try disease detection, weather, and AI chat in minutes.
            </p>
            <Link to="/dashboard" className="btn-primary mt-8">
              Open Dashboard →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
