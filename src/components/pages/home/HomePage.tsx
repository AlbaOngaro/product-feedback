import { Container } from "components/atoms/container/Container";
import { Header } from "components/organisms/header/Header";
import { Sidebar } from "components/organisms/sidebar/Sidebar";
import { Suggestion } from "components/organisms/suggestion/Suggestion";

const suggestions = [
  {
    id: "asdf",
    title: "Allow image/video upload ",
    description: "Images and screencasts can enhance comments on solutions.",
    votes: 0,
    comments: 0,
    category: "Feature",
  },
];

export function HomePage() {
  return (
    <main className="h-full w-full max-w-[1110px] m-auto grid grid-cols-12 gap-8 py-14 px-9 lg:py-24">
      <Sidebar />
      <Container className="flex flex-col gap-6">
        <Header />
        {suggestions.map((suggestion) => (
          <Suggestion key={suggestion.id} {...suggestion} />
        ))}
      </Container>
    </main>
  );
}
