"use client";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Schedule() {
  return (
    <div className="element-light min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative w-full h-96">
        <Image
          src="/team.png"
          alt="Schedule"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/60 w-[550px] h-[150px] flex items-center justify-center">
            <h1
              className="text-[44px] font-bold text-black"
              style={{ fontFamily: '"Gotham", Helvetica' }}
            >
              SCHEDULE
            </h1>
          </div>
        </div>
      </div>

      {/* Paychecks and Paystubs Section */}
      <section
        className="w-full pt-12 pb-11 px-6 flex flex-col items-center space-y-4"
        style={{ backgroundColor: "white", wordSpacing: "0.2rem" }}
      >
        <h2
          className="text-[30px] font-bold"
          style={{ color: "#A1A750", fontFamily: '"Gotham", Helvetica' }}
        >
          PAYCHECKS AND PAYSTUBS
        </h2>
        <div className="flex flex-col space-y-4 max-w-2xl w-full">
          <p
            className="text-[14px] text-left mt-0"
            style={{
              fontFamily: '"Gotham", Helvetica',
              color: "var(--primary)",
            }}
          >
            To ensure an added layer of security, the HRDC manages all paychecks and paystub
            details through a dedicated, secure portal specifically for this purpose. This keeps
            your personal information protected while allowing you easy access to your payroll
            records.
          </p>
          <div className="w-full flex justify-center mt-4">
            <a
              href="https://myapps.paychex.com/landing_remote/login.do?lang=en#?mode=employee&app=DASHBOARD_EMP&clients=004UWBZQLERWC7BO4OSM"
              target="_blank"
            >
              <button
                className="w-[225px] h-[40px] py-2 px-4 text-white text-[16px] font-bold bg-[var(--primary)] hover:bg-[var(--secondary-blue)]"
                style={{
                  fontFamily: '"Gotham", Helvetica',
                  wordSpacing: "0.2rem",
                }}
              >
                GO TO PORTAL
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section
        className="w-full py-12"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <h2
            className="text-[30px] font-bold text-center mb-5"
            style={{
              color: "#A1A750",
              fontFamily: '"Gotham", Helvetica',
              wordSpacing: "0.2rem",
            }}
          >
            HRDC EVENTS CALENDAR
          </h2>

          <div
            className="mx-auto p-4 rounded shadow-xl"
            style={{ maxWidth: "800px", backgroundColor: "#f3f3f3" }}
          >
            <iframe
              src="https://calendar.google.com/calendar/embed?src=c_7489498946eef211a15f7c5b8ee435d40fefb2b4008dc598c15186db60692295%40group.calendar.google.com&ctz=America%2FNew_York&showPrint=0&showCalendars=0&showTz=0"
              style={{ border: 'none', borderRadius: '8px' }}
              width="100%"
              height="600"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </section>

      <footer
        className="w-full text-center py-4 mt-auto"
        style={{ backgroundColor: "var(--secondary-blue)", color: "rgba(255, 255, 255, 0.8)"  }}
      >
        <p className="text-[10px]">&copy; 2025 HRDC, INC. ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  );
}
