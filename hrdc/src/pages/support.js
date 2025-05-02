import React, { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Support() {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("/api/sendTicket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        event.target.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
      setStatus("error");
    }
  };

  return (
    <div className="element-light min-h-screen flex flex-col items-center w-full">
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-96">
        <Image
          src="/tech.png"
          alt="Support"
          fill
          className="object-cover"
          priority
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

        {/* Title content above overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-white/60 w-[550px] h-[150px] flex items-center justify-center">
            <h1
              className="text-[44px] font-bold text-black"
              style={{ fontFamily: '"Gotham", Helvetica' }}
            >
              SUPPORT
            </h1>
          </div>
        </div>
      </div>


      {/* Support Form Section */}
      <section
        className="w-full pt-12 pb-11 px-6 flex flex-col items-center space-y-6"
        style={{ backgroundColor: "white", wordSpacing: "0.2rem" }}
      >
        <h2
          className="text-[30px] font-bold text-center"
          style={{ fontFamily: '"Gotham", Helvetica', color: "#A1A750" }}
        >
          TECHNICAL DIFFICULTIES?
        </h2>

        <div className="flex flex-col text-left max-w-2xl space-y-6 w-full mb-2">
          <p
            style={{
              fontFamily: '"Gotham", Helvetica',
              color: "var(--primary)",
            }}
          >
            Need a hand? Our dedicated tech support team is here to help you with any issues—whether
            it’s accessing your paychecks, navigating or accessing the HRDC portal, or anything else.
            No problem is too big or small; we’ll work quickly and help solve your issues.
          </p>

          <form className="w-full flex flex-col space-y-6 mt-4" onSubmit={handleSubmit}>
            {/* ISSUE */}
            <div className="flex flex-col">
              <label
                htmlFor="issue"
                className="mb-1 text-sm font-semibold"
                style={{ color: "var(--secondary-blue)", fontFamily: '"Gotham", Helvetica' }}
              >
                ISSUE
              </label>
              <select
                name="issue"
                id="issue"
                className="p-2 w-full text-black focus:outline-none border-b"
                required
                style={{
                  backgroundColor: "#f5f5f5",
                  borderColor: "var(--secondary-blue)",
                  fontFamily: '"Gotham", Helvetica',
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              >
                <option value="">Select an issue</option>
                <option value="Document / link broken">Document / link broken</option>
                <option value="Issues with an announcement">Issues with an announcement</option>
                <option value="Missing file(s)">Missing file(s)</option>
                <option value="Ideas for new content">Ideas for new content</option>
                <option value="Other">Other</option>
              </select>
            </div>


            {/* EMAIL */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="mb-1 text-sm font-semibold"
                style={{ color: "var(--secondary-blue)", fontFamily: '"Gotham", Helvetica' }}
              >
                EMAIL
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="p-2 w-full text-black focus:outline-none border-b"
                required
                style={{
                  backgroundColor: "#f5f5f5",
                  borderColor: "var(--secondary-blue)",
                  fontFamily: '"Gotham", Helvetica',
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              />
            </div>

            {/* MESSAGE */}
            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="mb-1 text-sm font-semibold"
                style={{ color: "var(--secondary-blue)", fontFamily: '"Gotham", Helvetica' }}
              >
                MESSAGE
              </label>
              <textarea
                name="message"
                id="message"
                className="p-3 w-full h-32 text-black focus:outline-none"
                required
                style={{
                  backgroundColor: "#f5f5f5",
                  border: "1px solid var(--secondary-blue)",
                  fontFamily: '"Gotham", Helvetica',
                }}
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="w-full flex justify-center mt-3">
              <button
                type="submit"
                className="w-[225px] h-[40px] py-2 px-4 text-white text-[16px] font-bold bg-[var(--primary)] hover:bg-[var(--secondary-blue)]"
                style={{
                  fontFamily: '"Gotham", Helvetica',
                  wordSpacing: "0.2rem",
                }}
              >
                SEND TICKET
              </button>
            </div>
          </form>

          {status === "success" && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
              Your ticket has been sent successfully!
            </div>
          )}
          {status === "error" && (
            <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
              An error occurred while sending your ticket. Please try again.
            </div>
          )}
        </div>
      </section>

      {/* Offices Section */}
      <section
        className="w-full py-10"
        style={{ backgroundColor: "var(--secondary-gold)" }}
      >
        <h2
          className="text-[30px] font-bold text-center mb-9"
          style={{
            color: "white",
            fontFamily: '"Gotham", Helvetica',
            wordSpacing: "0.2rem",
          }}
        >
          OFFICES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto text-white mb-5">
          <div className="leading-tight">
            <h3 className="font-bold mb-2" style={{ fontFamily: '"Gotham", Helvetica' }}>BOZEMAN</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.8)" }}>32 S. Tracy Ave, Bozeman, MT 59715</p>
            <p>
              <a
                href="tel:4065874486"
                style={{ color: "rgba(255, 255, 255, 0.8)", textDecoration: "underline" }}
              >
                Phone: 406.587.4486 (Relay 711)
              </a>
            </p>
            <p>
              <a href="mailto:HELLO@THEHRDC.ORG" className="underline" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                HELLO@THEHRDC.ORG
              </a>
            </p>
          </div>
          <div className="leading-tight">
            <h3 className="font-bold mb-2" style={{ fontFamily: '"Gotham", Helvetica' }}>LIVINGSTON</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.8)" }}>121 S. 2nd St., Livingston, MT 59047</p>
            <p>
              <a
                href="tel:4063332537"
                style={{ color: "rgba(255, 255, 255, 0.8)", textDecoration: "underline" }}
              >
                Phone: 406.333.2537 (Relay 711)
              </a>
            </p>
            <p>
              <a href="mailto:HELLO.LIVINGSTON@THEHRDC.ORG" className="underline" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                HELLO.LIVINGSTON@THEHRDC.ORG
              </a>
            </p>
          </div>
          <div className="leading-tight">
            <h3 className="font-bold mb-2" style={{ fontFamily: '"Gotham", Helvetica' }}>
              WHITE SULFUR SPRINGS
            </h3>
            <p style={{ color: "rgba(255, 255, 255, 0.8)" }}>107 E. Main St./P.O. Box 327</p>
            <p style={{ color: "rgba(255, 255, 255, 0.8)" }}>White Sulphur Springs, MT 59645</p>
            <p>
              <a
                href="tel:4065473775"
                style={{ color: "rgba(255, 255, 255, 0.8)", textDecoration: "underline" }}
              >
                Phone: 406.547.3775 (Relay 711)
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="w-full text-center py-4 mt-auto"
        style={{ backgroundColor: "var(--secondary-blue)", color: "rgba(255, 255, 255, 0.8)"  }}
      >
        <p className="text-[10px]">&copy; 2025 HRDC, INC. ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  );
}
