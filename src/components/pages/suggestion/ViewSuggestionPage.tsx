import { CaretLeftIcon } from "@radix-ui/react-icons";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { Suggestion as SuggestionI } from "lib/types";

import { Button } from "components/atoms/button/Button";
import { Card } from "components/atoms/card/Card";
import { Suggestion } from "components/organisms/suggestion/Suggestion";
import { CommentForm } from "components/organisms/comment-form/CommentForm";
import { Comment } from "components/organisms/comment/Comment";
import { useRouter } from "next/router";

import { surreal } from "lib/surreal";
import { GET_SUGGESTION } from "lib/queries/GET_SUGGESTION";
import { useSuggestion } from "lib/hooks/useSuggestion";

interface Props {
  suggestion: SuggestionI;
}

export function ViewSuggestionPage({ suggestion: fallbackData }: Props) {
  const router = useRouter();

  const { data: suggestion } = useSuggestion(fallbackData.id, {
    fallbackData,
    revalidateOnMount: false,
  });

  if (!suggestion) {
    return null;
  }

  return (
    <main className="h-full w-full max-w-[730px] m-auto py-14 px-9 lg:py-24">
      <header className="flex flex-row justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex flex-row items-center gap-2 text-dark-blue-gray text-sm	font-bold opacity-100 transition-opacity duration-300 hover:underline hover:opacity-80"
        >
          <CaretLeftIcon /> Go Back
        </button>

        <Button
          variant="secondary"
          onClick={() => router.push(`/suggestions/${suggestion.id}/edit`)}
        >
          Edit Feedback
        </Button>
      </header>

      <section className="flex flex-col gap-6">
        <Suggestion {...suggestion} />

        <Card>
          <h6 className="text-[#3A4374] font-bold text-lg">
            {suggestion?.comments?.length || 0} Comments
          </h6>

          {suggestion?.comments
            ?.filter((comment) => !comment.parentId)
            ?.map((comment) => (
              <Comment
                key={comment.id}
                {...comment}
                comments={suggestion.comments.filter(
                  (comment) => comment.parentId,
                )}
                suggestionId={suggestion.id}
              />
            ))}
        </Card>

        <Card className="flex flex-col">
          <h6 className="text-[#3A4374] font-bold text-lg mb-6">Add Comment</h6>
          <CommentForm suggestionId={suggestion.id} parentId={null} />
        </Card>
      </section>
    </main>
  );
}

export async function getServerSideProps({
  req,
  query,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  try {
    const token = req.cookies["token"];
    await surreal.authenticate(token || "");
  } catch (error: unknown) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const [result] = await surreal.query(GET_SUGGESTION, {
    suggestion: query.id,
  });

  if (
    result.status === "ERR" ||
    !result.result ||
    !Array.isArray(result.result)
  ) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      suggestion: result.result[0] as unknown as SuggestionI,
    },
  };
}
