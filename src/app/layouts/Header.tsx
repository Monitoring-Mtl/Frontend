import ServiceTabs from "../components/tabs/ServiceTabs";

export default function Header() {
  return (
    <div
      id="header"
      className="flex items-center justify-between"
      style={{ height: "4rem" }}
    >
      <picture className="h-full">
        <img src={"/logo-pfe.png"} alt="logo" className="h-full" />
      </picture>
      <ServiceTabs />
    </div>
  );
}
