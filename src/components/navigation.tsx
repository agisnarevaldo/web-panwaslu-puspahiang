import Logo from "./logo";
import NavLink from "./navLink";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center w-full px-12 py-1 sticky top-0 z-50 bg-gray-100 dark:bg-gray-900 bg-opacity-80 backdrop-blur-lg">
      <Logo />
      <div className="flex items-center">
        <NavLink href="/" icon="teenyicons:home-outline" text="Beranda" />
        <NavLink href="/profil" icon="bi:info-circle" text="Profil" />
        <NavLink href="/berita" icon="streamline:news-paper" text="Berita" />
        {/*<NavLink*/}
        {/*  href="/agenda"*/}
        {/*  icon="material-symbols:timeline"*/}
        {/*  text="Agenda"*/}
        {/*/>*/}
        <NavLink
          href="/pengumuman"
          icon="carbon:notification"
          text="Pengumuman"
        />

        <NavLink
            href="/login"
            icon="carbon:user-avatar-filled"
            text="Login"
        />
      </div>
    </nav>
  );
}
