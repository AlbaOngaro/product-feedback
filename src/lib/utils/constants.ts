import { Suggestion } from "lib/types";

export const suggestion: Suggestion = {
  id: "2de30717-276b-45bf-9849-c7f998e7de5f",
  title: "Allow image/video upload ",
  description: "Images and screencasts can enhance comments on solutions.",
  votes: 0,
  state: "In-Progress",
  comments: [
    {
      parentId: null,
      id: "d82652dc-1772-4284-8965-f1b360118b35",
      author: {
        avatar: "/images/user-images/image-elijah.jpg",
        fullName: "Elijah Moss",
        handle: "@hexagon.bestagon",
      },
      contents:
        "Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.",
    },
    {
      parentId: "d82652dc-1772-4284-8965-f1b360118b35",
      id: "f1e679c3-27e6-41a0-8f21-7d829c11a93c",
      author: {
        avatar: "/images/user-images/image-james.jpg",
        fullName: "James Skinner",
        handle: "@hummingbird1",
      },
      contents:
        "Second this! I do a lot of late night coding and reading. Adding a dark theme can be great for preventing eye strain and the headaches that result. It’s also quite a trend with modern apps and  apparently saves battery life.",
    },
    {
      parentId: "d82652dc-1772-4284-8965-f1b360118b35",
      id: "f1e679c3-27e6-41a0-8f21-7d829c11a93c",
      author: {
        avatar: "/images/user-images/image-ryan.jpg",
        fullName: "Ryan Welles",
        handle: "@voyager.344",
      },
      contents:
        "@annev1990  Good point! Using any kind of style extension is great and can be highly customizable, like the ability to change contrast and brightness. I'd prefer not to use one of such extensions, however, for security and privacy reasons.",
    },
  ],
  category: "Feature",
};

export const suggestions = [suggestion];
