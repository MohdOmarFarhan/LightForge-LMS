import LMSSidebar from "@/components/LMSSidebar";
import LMSHeader from "@/components/LMSHeader";
import LeaderboardContent from "@/components/LeaderboardContent";

export default function LeaderboardPage() {
  return (
    <div className="flex min-h-screen bg-[#F7F9FC] dark:bg-[#121212] transition-colors duration-200">
      {/* Left Sidebar */}
      <LMSSidebar />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <LMSHeader />

        {/* Main Content Container */}
        <main className="p-4 md:p-6">
          <LeaderboardContent />
        </main>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600&display=swap');
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        
        .font-poppins {
          font-family: 'Poppins', sans-serif;
        }
        
        .font-onest {
          font-family: 'Onest', sans-serif;
        }
      `}</style>
    </div>
  );
}
