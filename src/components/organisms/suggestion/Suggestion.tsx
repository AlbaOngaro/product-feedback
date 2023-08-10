import { ChatBubbleIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { Card } from "components/atoms/card/Card";
import { Tag } from "components/atoms/tag/Tag";
import Link from "next/link";

interface Props {
  id: string;
  title: string;
  description: string;
  category: string;
  votes: number;
  comments: number;
}

export function Suggestion({
  id,
  title,
  description,
  category,
  votes,
  comments,
}: Props) {
  return (
    <Link href={`/suggestions/${id}`}>
      <Card className="group grid grid-cols-[40px_minmax(0,_1fr)_44px] gap-10">
        <button className="h-fit flex flex-col items-center justify-center py-1.5 px-4	bg-alice-blue text-[#3A4374] font-semibold text-xs rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#CFD7FF] active:bg-royal-blue active:text-white">
          <ChevronUpIcon className="text-royal-blue" />
          <span className="text-sm	font-bold">{votes}</span>
        </button>
        <div>
          <h6 className="text-lg text-[#3A4374] font-bold mb-1 transition-colors duration-300 group-hover:text-royal-blue">
            {title}
          </h6>
          <p className="text-dark-blue-gray mb-3">{description}</p>
          <Tag name={category} disabled />
        </div>

        <span className="flex items-center gap-2 text-[#3A4374]">
          <ChatBubbleIcon /> <strong>{comments}</strong>
        </span>
      </Card>
    </Link>
  );
}
