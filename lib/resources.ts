export type ResourceType =
  | "Book"
  | "Paper"
  | "Documentation"
  | "Archive";

export type Resource = {
  id: string;
  title: string;
  author: string;
  year: number;
  type: ResourceType;
  era: string;
  description: string;
  availability: string;
  url: string;
};

export const resources: Resource[] = [
  {
    id: "computer-history",
    title: "Computer History",
    author: "Computer History Museum",
    year: 1940,
    type: "Archive",
    era: "1940s",
    description:
      "Historical material covering the development of early computing machines and technologies.",
    availability: "Free online archive",
    url: "https://www.computerhistory.org/",
  },

  {
    id: "bell-labs",
    title: "Bell Labs Archives",
    author: "Nokia Bell Labs",
    year: 1947,
    type: "Archive",
    era: "1940s",
    description:
      "Historical research material from Bell Labs, including developments that influenced modern semiconductor technology.",
    availability: "Online archive",
    url: "https://www.bell-labs.com/",
  },

  {
    id: "nand2tetris",
    title: "The Elements of Computing Systems",
    author: "Noam Nisan & Shimon Schocken",
    year: 2005,
    type: "Book",
    era: "2000s",
    description:
      "A practical introduction to computer systems that builds a computer from basic logic gates upward.",
    availability: "Educational resources available online",
    url: "https://www.nand2tetris.org/",
  },
];