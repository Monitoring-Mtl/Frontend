export default function Header() {
  return (
    <div id="header" style={{ height: "4rem" }}>
      <picture className="h-full">
        <img src={"/logo-pfe.png"} alt={"logo"} style={{ height: "100%" }} />
      </picture>
    </div>
  );
}
