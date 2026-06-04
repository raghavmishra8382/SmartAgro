import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#08140D] relative overflow-hidden">
      
      {/* Premium Background Effects */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Very faint grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left: Contact Info & Typography */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-5/12 flex flex-col"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-green-400 font-semibold text-xs tracking-wide uppercase mb-6 w-max">
              Get In Touch
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-[800] text-white leading-[1.1] tracking-tight mb-8">
              Let's build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">future of farming</span> together.
            </h2>
            
            <p className="text-lg text-gray-400 leading-relaxed mb-12 max-w-lg">
              Whether you're looking to upgrade your farm's technology, partner with us, or simply ask a question—our team is ready to help you optimize your operations.
            </p>

            <div className="space-y-8">
              {/* Info Item */}
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-green-500/20 group-hover:border-green-500/30 transition-colors duration-300 shrink-0">
                  <Phone className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Call Us Directly</h4>
                  <p className="text-xl font-semibold text-white tracking-wide">+91 9999999999</p>
                  <p className="text-gray-500 text-sm mt-1">Mon-Fri, 9am to 6pm IST</p>
                </div>
              </div>

              {/* Info Item */}
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-green-500/20 group-hover:border-green-500/30 transition-colors duration-300 shrink-0">
                  <Mail className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Email Our Team</h4>
                  <p className="text-xl font-semibold text-white tracking-wide">hello@smartagro.com</p>
                  <p className="text-gray-500 text-sm mt-1">We aim to respond within 24 hours.</p>
                </div>
              </div>

              {/* Info Item */}
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-green-500/20 group-hover:border-green-500/30 transition-colors duration-300 shrink-0">
                  <MapPin className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Visit Headquarters</h4>
                  <p className="text-xl font-semibold text-white tracking-wide">Cyber City, DLF Phase 2</p>
                  <p className="text-gray-500 text-sm mt-1">Gurugram, Haryana 122002</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Glassmorphic Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-7/12"
          >
            <div className="bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-8 md:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.4)] relative overflow-hidden">
              
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center text-center py-20"
                  >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                      <CheckCircle2 className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Message Received</h3>
                    <p className="text-gray-400 text-lg max-w-sm">
                      Thank you for reaching out. One of our specialists will get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6 relative z-10"
                  >
                    <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">Send a Message</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-semibold text-gray-400">Full Name</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-400">Email Address</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-semibold text-gray-400">Phone Number (Optional)</label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-semibold text-gray-400">Inquiry Type</label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all appearance-none"
                        >
                          <option value="" disabled className="text-gray-900">Select a topic...</option>
                          <option value="sales" className="text-gray-900">Sales & Pricing</option>
                          <option value="support" className="text-gray-900">Technical Support</option>
                          <option value="partnership" className="text-gray-900">Partnership</option>
                          <option value="other" className="text-gray-900">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-semibold text-gray-400">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-green-500 hover:bg-green-400 text-gray-900 font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300 mt-4"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <Send className="w-5 h-5" />
                        </span>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
