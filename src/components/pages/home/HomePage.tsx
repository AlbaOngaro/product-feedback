import { Container } from "components/atoms/container/Container";
import { Header } from "components/organisms/header/Header";
import { Sidebar } from "components/organisms/sidebar/Sidebar";

export function HomePage() {
  return (
    <main className="h-full w-full max-w-[1110px] m-auto grid grid-cols-12 gap-8 py-14 px-9 lg:py-24">
      <Sidebar />
      <Container>
        <Header />
      </Container>
    </main>
  );
}
