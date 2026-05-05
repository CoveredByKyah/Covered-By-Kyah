import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function CoveredByKyah() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", email: "", age: "", goal: "" });

  const handleNext = () => setStep(step + 1);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // 🔥 AUTOMATION: send data to webhook (Zapier / GoHighLevel)
  const submitLead = async () => {
    try {
      await fetch("https://hooks.zapier.com/hooks/catch/27489563/uvvfydu/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      handleNext();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Hero Section */}
      <section className="text-center py-16">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-4">
          Covered By Kyah
        </motion.h1>
        <p className="text-lg text-gray-600 mb-4">
          Family-first life insurance that builds wealth, protects your loved ones, and fits your budget.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Takes 60 seconds. No medical exam for most.
        </p>
        <Button className="text-lg px-6 py-3" onClick={() => setStep(1)}>
          Get My Free Quote
        </Button>
      </section>

      {/* Quiz Section */}
      {step > 0 && (
        <section className="max-w-xl mx-auto">
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6">
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">What’s your main goal?</h2>
                  <Button className="mb-2 w-full" onClick={() => { setForm({ ...form, goal: "Family Protection" }); handleNext(); }}>Protect My Family</Button>
                  <Button className="mb-2 w-full" onClick={() => { setForm({ ...form, goal: "Wealth Building" }); handleNext(); }}>Build Wealth</Button>
                  <Button className="w-full" onClick={() => { setForm({ ...form, goal: "Final Expenses" }); handleNext(); }}>Cover Final Expenses</Button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">How old are you?</h2>
                  <Input name="age" placeholder="Enter your age" onChange={handleChange} />
                  <Button className="mt-4 w-full" onClick={handleNext}>Next</Button>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Where should we send your quote?</h2>
                  <Input name="name" placeholder="Your Name" onChange={handleChange} className="mb-2" />
                  <Input name="phone" placeholder="Phone Number" onChange={handleChange} className="mb-2" />
                  <Input name="email" placeholder="Email Address" onChange={handleChange} />
                  <Button className="mt-4 w-full" onClick={submitLead}>Get My Quote</Button>
                </div>
              )}

              {step === 4 && (
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-4">You're Covered 🎉</h2>
                  <p className="text-gray-600">
                    We’ll text and email your personalized options shortly. No pressure, just smart coverage.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      )}

      {/* Trust Section */}
      <section className="text-center mt-16">
        <h2 className="text-2xl font-bold mb-4">Why Families Choose Covered By Kyah</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We focus on low premiums, strong coverage, and long-term wealth strategies so your family is protected today and financially secure tomorrow.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center mt-16 text-gray-500">
        <p>© {new Date().getFullYear()} Covered By Kyah. All rights reserved.</p>
      </footer>
    </div>
  );
}
