import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import NotFound from "@/pages/not-found";

// Layout
import Layout from "@/components/layout/Layout";
import AcademyLayout from "@/components/layout/AcademyLayout";
import AdminLayout from "@/components/layout/AdminLayout";

// Pages
import Landing from "@/pages/Landing";
import Auth from "@/pages/Auth";
import Onboarding from "@/pages/Onboarding";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import TutorProfile from "@/pages/TutorProfile";
import Booking from "@/pages/Booking";
import Sessions from "@/pages/Sessions";
import ActiveSession from "@/pages/ActiveSession";
import Messages from "@/pages/Messages";

// Tutor Pages
import ProfileBuilder from "@/pages/tutor/ProfileBuilder";
import Availability from "@/pages/tutor/Availability";
import BookingRequests from "@/pages/tutor/BookingRequests";
import Earnings from "@/pages/tutor/Earnings";
import TutorPro from "@/pages/tutor/TutorPro";
import Analytics from "@/pages/tutor/Analytics";
import UploadResource from "@/pages/tutor/resources/Upload";
import SalesDashboard from "@/pages/tutor/resources/SalesDashboard";
import BundleBuilder from "@/pages/tutor/resources/BundleBuilder";

// Resource Pages
import ResourceHub from "@/pages/resources/ResourceHub";
import ResourceDetail from "@/pages/resources/ResourceDetail";
import MyResources from "@/pages/resources/MyResources";
import ResourceBundlePage from "@/pages/resources/ResourceBundle";

// AI Pages
import DoubtBot from "@/pages/ai/DoubtBot";
import SessionDebrief from "@/pages/ai/SessionDebrief";
import MockTest from "@/pages/ai/MockTest";
import MockTestResults from "@/pages/ai/MockTestResults";
import Flashcards from "@/pages/ai/Flashcards";
import StudyPlan from "@/pages/ai/StudyPlan";
import Readiness from "@/pages/ai/Readiness";

// Consultation Pages (client-side)
import ConsultantFeed from "@/pages/consultations/ConsultantFeed";
import ConsultantProfile from "@/pages/consultations/ConsultantProfile";
import ConsultationBooking from "@/pages/consultations/ConsultationBooking";
import AsyncConsultation from "@/pages/consultations/AsyncConsultation";

// Consultant-side Pages
import ConsultantProfileBuilder from "@/pages/consultant/ProfileBuilder";
import ConsultantPackages from "@/pages/consultant/Packages";
import IntakeFormBuilder from "@/pages/consultant/IntakeFormBuilder";
import ConsultantEarnings from "@/pages/consultant/Earnings";
import ConsultantBookingRequests from "@/pages/consultant/BookingRequests";

// Monetisation Pages
import Pricing from "@/pages/monetisation/Pricing";
import Subscription from "@/pages/monetisation/Subscription";
import PaymentMethods from "@/pages/monetisation/PaymentMethods";
import FeaturedPlacement from "@/pages/monetisation/FeaturedPlacement";

// Academy Pages
import AcademyDashboard from "@/pages/academy/Dashboard";
import AcademyRoster from "@/pages/academy/Roster";
import AcademyScheduling from "@/pages/academy/Scheduling";
import AcademyPortalPreview from "@/pages/academy/PortalPreview";
import AcademyBilling from "@/pages/academy/Billing";

// Admin Pages
import VerificationQueue from "@/pages/admin/VerificationQueue";
import Disputes from "@/pages/admin/Disputes";

// Settings Pages
import Settings from "@/pages/settings/Settings";
import Notifications from "@/pages/settings/Notifications";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/auth" component={Auth} />
      <Route path="/onboarding" component={Onboarding} />
      
      {/* Authenticated Routes wrapped in Layout */}
      <Route path="/home">
        <Layout><Home /></Layout>
      </Route>
      <Route path="/search">
        <Layout><Search /></Layout>
      </Route>

      {/* Tutor-side routes MUST come before /tutor/:id */}
      <Route path="/tutor/profile-builder">
        <Layout><ProfileBuilder /></Layout>
      </Route>
      <Route path="/tutor/availability">
        <Layout><Availability /></Layout>
      </Route>
      <Route path="/tutor/bookings">
        <Layout><BookingRequests /></Layout>
      </Route>
      <Route path="/tutor/earnings">
        <Layout><Earnings /></Layout>
      </Route>
      <Route path="/tutor/pro">
        <Layout><TutorPro /></Layout>
      </Route>
      <Route path="/tutor/analytics">
        <Layout><Analytics /></Layout>
      </Route>
      <Route path="/tutor/resources/upload">
        <Layout><UploadResource /></Layout>
      </Route>
      <Route path="/tutor/resources/sales">
        <Layout><SalesDashboard /></Layout>
      </Route>
      <Route path="/tutor/resources/bundle-builder">
        <Layout><BundleBuilder /></Layout>
      </Route>
      <Route path="/tutor/:id">
        <Layout><TutorProfile /></Layout>
      </Route>

      {/* Booking & Sessions */}
      <Route path="/book/:tutorId">
        <Layout><Booking /></Layout>
      </Route>
      <Route path="/sessions">
        <Layout><Sessions /></Layout>
      </Route>
      <Route path="/session/:id/active">
        <Layout><ActiveSession /></Layout>
      </Route>
      <Route path="/session/:id/debrief">
        <Layout><SessionDebrief /></Layout>
      </Route>

      {/* AI Features */}
      <Route path="/ai-chat">
        <Layout><DoubtBot /></Layout>
      </Route>
      <Route path="/mock-test/results">
        <Layout><MockTestResults /></Layout>
      </Route>
      <Route path="/mock-test">
        <Layout><MockTest /></Layout>
      </Route>
      <Route path="/flashcards">
        <Layout><Flashcards /></Layout>
      </Route>
      <Route path="/study-plan">
        <Layout><StudyPlan /></Layout>
      </Route>
      <Route path="/readiness">
        <Layout><Readiness /></Layout>
      </Route>

      <Route path="/messages">
        <Layout><Messages /></Layout>
      </Route>

      {/* Resources */}
      <Route path="/resources">
        <Layout><ResourceHub /></Layout>
      </Route>
      <Route path="/resource/:id">
        <Layout><ResourceDetail /></Layout>
      </Route>
      <Route path="/my-resources">
        <Layout><MyResources /></Layout>
      </Route>
      <Route path="/resource-bundle/:id">
        <Layout><ResourceBundlePage /></Layout>
      </Route>

      {/* Consultations — client side */}
      <Route path="/consultants">
        <Layout><ConsultantFeed /></Layout>
      </Route>
      <Route path="/async-consultation/:id">
        <Layout><AsyncConsultation /></Layout>
      </Route>
      <Route path="/book-consultation/:id">
        <Layout><ConsultationBooking /></Layout>
      </Route>

      {/* Consultant-side dashboard — specific routes BEFORE /consultant/:id */}
      <Route path="/consultant/profile-builder">
        <Layout><ConsultantProfileBuilder /></Layout>
      </Route>
      <Route path="/consultant/packages">
        <Layout><ConsultantPackages /></Layout>
      </Route>
      <Route path="/consultant/intake-form">
        <Layout><IntakeFormBuilder /></Layout>
      </Route>
      <Route path="/consultant/earnings">
        <Layout><ConsultantEarnings /></Layout>
      </Route>
      <Route path="/consultant/bookings">
        <Layout><ConsultantBookingRequests /></Layout>
      </Route>

      {/* Consultant profile — MUST be last among /consultant/* */}
      <Route path="/consultant/:id">
        <Layout><ConsultantProfile /></Layout>
      </Route>

      {/* Monetisation */}
      <Route path="/pricing">
        <Layout><Pricing /></Layout>
      </Route>
      <Route path="/subscription">
        <Layout><Subscription /></Layout>
      </Route>
      <Route path="/payment-methods">
        <Layout><PaymentMethods /></Layout>
      </Route>
      <Route path="/featured-placement">
        <Layout><FeaturedPlacement /></Layout>
      </Route>

      {/* Academy (B2B) */}
      <Route path="/academy/dashboard">
        <AcademyLayout><AcademyDashboard /></AcademyLayout>
      </Route>
      <Route path="/academy/roster">
        <AcademyLayout><AcademyRoster /></AcademyLayout>
      </Route>
      <Route path="/academy/scheduling">
        <AcademyLayout><AcademyScheduling /></AcademyLayout>
      </Route>
      <Route path="/academy/portal-preview">
        <AcademyLayout><AcademyPortalPreview /></AcademyLayout>
      </Route>
      <Route path="/academy/billing">
        <AcademyLayout><AcademyBilling /></AcademyLayout>
      </Route>

      {/* Admin */}
      <Route path="/admin/verification">
        <AdminLayout><VerificationQueue /></AdminLayout>
      </Route>
      <Route path="/admin/disputes">
        <AdminLayout><Disputes /></AdminLayout>
      </Route>

      {/* Settings */}
      <Route path="/settings">
        <Layout><Settings /></Layout>
      </Route>
      <Route path="/notifications">
        <Layout><Notifications /></Layout>
      </Route>

      <Route path="/profile">
        <Layout>
          <div className="py-20 text-center text-muted-foreground">Profile Page Placeholder</div>
        </Layout>
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
          <VercelAnalytics />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
