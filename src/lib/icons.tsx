import * as Icons from "@phosphor-icons/react";
import { icons as iconData, IconEntry as CoreEntry } from "@phosphor-icons/core";

export interface IconEntry extends CoreEntry {
  Icon: Icons.Icon;
}

export enum SnippetType {
  REACT = "React",
  VUE = "Vue",
  HTML = "Web",
  FLUTTER = "Flutter",
  ELM = "Elm",
}

export const icons: ReadonlyArray<IconEntry> = iconData.map((entry) => ({
  ...entry,
  Icon: Icons[entry.pascal_name as keyof typeof Icons] as Icons.Icon,
}));

if (process.env.NODE_ENV === "development") {
  console.log(`${icons.length} icons`);
}

export const iconCount = Intl.NumberFormat("en-US").format(icons.length * 6);
