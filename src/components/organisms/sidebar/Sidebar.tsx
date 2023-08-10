import Link from "next/link";

import { Badge } from "components/atoms/badge/Badge";
import { Card } from "components/atoms/card/Card";
import { Tag } from "components/atoms/tag/Tag";

export function Sidebar() {
  return (
    <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
      <Card
        style={{ backgroundColor: "#ac99ff" }}
        className="bg-gradient-mesh pt-16"
      >
        <h2 className="text-white text-xl	font-bold">Frontend Mentor</h2>
        <p className="text-white ">Feedback Board</p>
      </Card>
      <Card className="flex flex-row flex-wrap gap-x-2 gap-y-4">
        <Tag defaultChecked name="All" value="all" />
        <Tag name="UX" value="ux" />
        <Tag name="UI" value="ui" />
        <Tag name="Enhancement" value="enhancement" />
      </Card>

      <Card>
        <header className="flex flex-row items-center justify-between mb-4">
          <strong className="text-lg	text-[#3A4374]">Roadmap</strong>
          <Link
            className="text-[#8397F8] text-sm	font-semibold opacity-25 underline capitalize transition-all duration-300 hover:opacity-100"
            href="/roadmap"
          >
            view
          </Link>
        </header>
        <ul className="flex flex-col gap-2">
          <li>
            <Badge variant="danger">
              Planned <strong className="ml-auto">2</strong>
            </Badge>
          </li>
          <li>
            <Badge variant="primary">
              In-Progress <strong className="ml-auto">2</strong>
            </Badge>
          </li>
          <li>
            <Badge variant="info">
              Live <strong className="ml-auto">2</strong>
            </Badge>
          </li>
        </ul>
      </Card>
    </aside>
  );
}
