/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Cabins from "./components/Cabins";
import BookingCalendar from "./components/BookingCalendar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-[#050505] text-[#e0e0e0] min-h-screen relative font-sans">
      <Navbar />
      <Hero />
      <Intro />
      <Cabins />
      <BookingCalendar />
      <Footer />
    </div>
  );
}
