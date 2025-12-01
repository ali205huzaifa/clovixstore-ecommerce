import AboutTrust from "./components/AboutTrust";
import AboutZaair from "./components/AboutClovix";
import WhatZaairDo from "./components/whatClovixDo";
import AboutCustomers from "./components/ClovixCustomers";
import ClovixFaqs from "./components/ClovixFaqs";
import ClovixContact from "./components/ClovixContact";
import ClovixSupport from "./components/ClovixSupport";

export default function Page() {
  return (
    <div className="overflow-x-hidden">
      <AboutZaair />
      <ClovixSupport />
      <WhatZaairDo />
      <div className="mt-4">
        <AboutTrust />
      </div>
      <AboutCustomers />
      <ClovixFaqs />
      <ClovixContact />
    </div>
  );
}
