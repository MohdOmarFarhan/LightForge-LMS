import PerformanceContent from "@/components/PerformanceContent";
import LMSHeader from "@/components/LMSHeader";
import LMSSidebar from "@/components/LMSSidebar";

export default function PerformancePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0D1117] transition-colors duration-200">
      <LMSHeader />
      <div className="flex">
        <LMSSidebar />
        <main className="flex-1 p-6 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">
            <PerformanceContent />
          </div>
        </main>
      </div>
    </div>
  );
}
