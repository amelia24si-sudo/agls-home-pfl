import LandingNavbar from "../../components/landing/LandingNavbar";
import HeroSection from "../../components/landing/HeroSection";
import FeaturesSection from "../../components/landing/FeaturesSection";
import { PromoSection } from "../../components/landing/PromoSection";
import LandingFooter from "../../components/landing/LandingFooter";
import ScrollProgress from "../../components/landing/ScrollProgress";
import BackToTop from "../../components/landing/BackToTop";

export default function LandingPage() {
    return (
        <div className="bg-[#151728] text-white font-dmsans min-h-screen scroll-smooth">
            <ScrollProgress />
            <LandingNavbar />
            <main>
                <HeroSection />
                <FeaturesSection />
                <PromoSection />
            </main>
            <LandingFooter />
            <BackToTop />
        </div>
    );
}
