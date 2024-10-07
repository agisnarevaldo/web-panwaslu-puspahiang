import ButtonMode from "./btnMode";
import Logo from "./logo";
import NavLink from "./navLink";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center w-full px-12 py-4">
      <Logo />
      <div className="flex items-center">
        <NavLink href="/" icon="teenyicons:home-outline" text="Beranda" />
        <NavLink href="/profil" icon="bi:info-circle" text="Profil" />
        <NavLink href="/berita" icon="streamline:news-paper" text="Berita" />
        <NavLink
          href="/agenda"
          icon="material-symbols:timeline"
          text="Agenda"
        />
        <NavLink
          href="/pengumuman"
          icon="carbon:notification"
          text="Pengumuman"
        />

        <ButtonMode />
      </div>
    </nav>
  );
}
