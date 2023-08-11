import { Button } from "components/atoms/button/Button";
import { Card } from "components/atoms/card/Card";
import Image from "next/image";
import { useRouter } from "next/router";

export function EmptyState() {
  const router = useRouter();

  return (
    <Card className="flex flex-col justify-center items-center py-28">
      <picture className="block relative w-32	h-32">
        <Image
          fill
          src="/images/empty-state-illustration.png"
          alt="empty state"
        />
      </picture>

      <h3 className="text-[#3A4374] text-xl font-bold mt-10 mb-4">
        There is no feedback yet.
      </h3>
      <p className="text-dark-blue-gray max-w-[45ch] text-center mb-10">
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>
      <Button onClick={() => router.push("/suggestions/create")}>
        + Add Feedback
      </Button>
    </Card>
  );
}
