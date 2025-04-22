"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Schedule() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative w-full h-96">
        {/* Background Image */}
        <Image
            src="/team.png"
            alt="Schedule"
            fill
            className="object-cover"
            priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/60 w-[550px] h-[150px] flex items-center justify-center">
            <h1 className="text-[44px] font-bold text-black"
                style={{fontFamily: '"Gotham", Helvetica'}}
            >
              SCHEDULE
            </h1>
          </div>
        </div>
      </div>
      
      {/* Paychecks and Paystubs Section - with gray background */}
      <section className="w-full bg-gray-100 py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            <span className="inline-block border-b-2 border-green-700 pb-1">PAYCHECKS AND PAYSTUBS</span>
          </h2>
          <p className="text-sm text-gray-600 mt-4 max-w-3xl mx-auto">
            To ensure an added layer of security, the HRDC manages all paychecks and paystub details 
            through a dedicated, secure portal specifically for this purpose. This keeps your 
            personal information protected while allowing you easy access to your payroll records. Whether 
            you need to review your latest payroll or track your payment history.
          </p>
          <a href="https://myapps.paychex.com/landing_remote/login.do?lang=en#?mode=employee&app=DASHBOARD_EMP&clients=004UWBZQLERWC7BO4OSM">
            <button className="bg-teal-700 text-white px-8 py-2 mt-6 rounded hover:bg-teal-600">
              GO TO PORTAL
            </button>
          </a>
        </div>
      </section>
      
      {/* Calendar Section - with white background */}
      <section className="w-full bg-white py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-green-700 text-center mb-8">
            <span className="inline-block border-b-2 border-green-700 pb-1">HRDC EVENTS CALENDAR</span>
          </h2>
          
          {/* Calendar Container - Fixed width to prevent horizontal compression */}
          <div className="mx-auto" style={{ maxWidth: "800px" }}>
            <iframe 
              src="https://calendar.google.com/calendar/embed?src=c_7489498946eef211a15f7c5b8ee435d40fefb2b4008dc598c15186db60692295%40group.calendar.google.com&ctz=America%2FNew_York&showPrint=0&showCalendars=0&showTz=0" 
              style={{ border: 'none', borderRadius: '8px' }}
              width="800" 
              height="600" 
              frameBorder="0" 
              scrolling="no"
              className="shadow-md mx-auto"
            ></iframe>
          </div>
        </div>
      </section>

      <footer className="w-full bg-teal-700 text-white text-center py-4 mt-auto">
        <p className="text-xs">&copy; 2025 HRDC, INC. ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  );
}