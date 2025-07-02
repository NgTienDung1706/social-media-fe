import MainLayout from "@/layouts/MainLayout";
import AppSidebar from "@/components/AppSidebar";
import HomeContent from "@/features/home/components/HomeContent";
import RightSidebar from "@/features/home/components/RightSidebar";

function Home() {
  return (
    <MainLayout
      sidebar={<AppSidebar />}
      // header={<HomeHeader />}
      rightbar={<RightSidebar />}
    >
      <HomeContent />
      
    </MainLayout>
  );
}

export default Home;
