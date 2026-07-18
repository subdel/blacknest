import { useState, useEffect } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, startOfWeek, endOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { cabins } from "../data";
import { cn } from "../lib/utils";

export default function BookingCalendar() {
  const [selectedCabin, setSelectedCabin] = useState(cabins[0].id);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'available' | 'unavailable'>('idle');

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  useEffect(() => {
    const handleSelectCabin = (e: CustomEvent) => {
      setSelectedCabin(e.detail);
    };
    window.addEventListener('selectCabin', handleSelectCabin as EventListener);
    return () => window.removeEventListener('selectCabin', handleSelectCabin as EventListener);
  }, []);

  useEffect(() => {
    setBookingStatus('idle');
  }, [checkIn, checkOut, selectedCabin]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const dateFormat = "MMMM yyyy";
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const handleDateClick = (day: Date) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(day);
      setCheckOut(null);
    } else if (day > checkIn) {
      setCheckOut(day);
    } else {
      setCheckIn(day);
    }
  };

  const handleCheckAvailability = () => {
    if (!checkIn || !checkOut) return;
    
    setIsChecking(true);
    setBookingStatus('idle');
    
    // Simulate API call to check availability
    setTimeout(() => {
      setIsChecking(false);
      // Simulate 80% chance of being available
      const isAvailable = Math.random() > 0.2;
      setBookingStatus(isAvailable ? 'available' : 'unavailable');
    }, 1500);
  };

  const isSelected = (day: Date) => {
    if (checkIn && isSameDay(day, checkIn)) return true;
    if (checkOut && isSameDay(day, checkOut)) return true;
    return false;
  };

  const isInRange = (day: Date) => {
    if (checkIn && checkOut) {
      return day > checkIn && day < checkOut;
    }
    return false;
  };

  return (
    <section id="booking" className="pt-8 pb-16 md:pt-16 md:pb-32 px-6 bg-[#050505] text-[#e0e0e0]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16">
        {/* Sidebar info */}
        <div className="w-full md:w-1/3 flex flex-col justify-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 block">Reservation</span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8 text-white uppercase">
            Booking
          </h2>
          <p className="text-sm font-light leading-relaxed text-[#888] mb-12">
            Choose a cabin and dates for your unforgettable stay in the Swiss Alps.
          </p>

          <div className="space-y-4">
            <label className="text-[9px] uppercase tracking-widest text-white/30 block mb-4">
              Select House
            </label>
            <div className="flex flex-col gap-3">
              {cabins.map((cabin) => (
                <button
                  key={cabin.id}
                  onClick={() => setSelectedCabin(cabin.id)}
                  className={cn(
                    "px-6 py-5 rounded-2xl text-left transition-all border",
                    selectedCabin === cabin.id
                      ? "bg-white text-black border-white"
                      : "bg-[#121212] text-white/80 border-white/5 hover:border-white/20"
                  )}
                >
                  <div className={cn("font-medium text-sm tracking-wide uppercase", selectedCabin === cabin.id ? "text-black" : "text-white")}>{cabin.name}</div>
                  <div className={cn("text-xs mt-2 font-mono", selectedCabin === cabin.id ? "text-black/60" : "text-[#888]")}>
                    {cabin.capacity} / {cabin.size}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar UI */}
        <div className="w-full md:w-2/3 bg-white/[0.03] backdrop-blur-[24px] border border-white/10 rounded-3xl md:rounded-[40px] p-6 md:p-8 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl md:text-2xl font-light capitalize text-white">
              {format(currentDate, dateFormat)}
            </h3>
            <div className="flex gap-2 md:gap-3">
              <button onClick={prevMonth} className="p-2 md:p-3 rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button onClick={nextMonth} className="p-2 md:p-3 rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 md:gap-2 mb-6">
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
              <div key={day} className="text-center text-[8px] md:text-[9px] font-medium text-white/30 uppercase tracking-[0.2em]">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-2 gap-x-1 md:gap-x-2 flex-grow">
            {days.map((day, i) => (
              <button
                key={i}
                onClick={() => handleDateClick(day)}
                disabled={!isSameMonth(day, monthStart)}
                className={cn(
                  "h-10 w-full flex items-center justify-center rounded-xl text-xs md:text-sm transition-all font-light",
                  !isSameMonth(day, monthStart) && "opacity-0 cursor-default",
                  isSameMonth(day, monthStart) && !isSelected(day) && !isInRange(day) && "hover:bg-white/10 text-[#e0e0e0]",
                  isSelected(day) && "bg-white text-black font-medium shadow-lg",
                  isInRange(day) && "bg-white/10 text-white",
                  isToday(day) && !isSelected(day) && !isInRange(day) && "border border-white/20"
                )}
              >
                {format(day, "d")}
              </button>
            ))}
          </div>

          <div className="mt-8 md:mt-6 flex flex-col lg:flex-row justify-between items-center gap-6 md:gap-8 border-t border-white/10 pt-6">
            <div className="flex gap-6 md:gap-12 w-full lg:w-auto">
              <div className="flex-1">
                <div className="text-[8px] md:text-[9px] text-white/30 uppercase tracking-[0.3em] mb-1 md:mb-2">Check In</div>
                <div className="font-light text-sm md:text-lg text-white whitespace-nowrap">
                  {checkIn ? format(checkIn, "dd MMM, yy") : "—"}
                </div>
              </div>
              <div className="w-[1px] h-10 bg-white/10 hidden md:block"></div>
              <div className="flex-1">
                <div className="text-[8px] md:text-[9px] text-white/30 uppercase tracking-[0.3em] mb-1 md:mb-2">Check Out</div>
                <div className="font-light text-sm md:text-lg text-white whitespace-nowrap">
                  {checkOut ? format(checkOut, "dd MMM, yy") : "—"}
                </div>
              </div>
            </div>
            
            <button 
              disabled={!checkIn || !checkOut || isChecking}
              onClick={handleCheckAvailability}
              className={cn(
                "w-full lg:w-auto px-6 py-4 md:px-10 md:py-5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-2",
                bookingStatus === 'available' ? "bg-green-500/10 text-green-400 border border-green-500/30" :
                bookingStatus === 'unavailable' ? "bg-red-500/10 text-red-400 border border-red-500/30" :
                "bg-white text-black hover:bg-white/90 border border-transparent"
              )}
            >
              {isChecking && <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" />}
              {!isChecking && bookingStatus === 'idle' && "Check Availability"}
              {!isChecking && bookingStatus === 'available' && "Available - Book Now"}
              {!isChecking && bookingStatus === 'unavailable' && "Unavailable - Change Dates"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
