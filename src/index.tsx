import { ActionPanel, Detail, List, Action } from "@raycast/api";
import Fuse from "fuse.js";
import { IconEntry, icons } from "./lib/icons";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const fuse = new Fuse(icons, {
  keys: [{ name: "name", weight: 4 }, "tags", "categories"],
  threshold: 0.2,
  useExtendedSearch: true,
});

export default function Command() {
  const [iconList, setIconList] = useState<readonly IconEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIconList(fuse.search(debouncedSearchTerm).map((value) => value.item));
    }
  }, [debouncedSearchTerm]);

  return (
    <List searchText={searchTerm} onSearchTextChange={setSearchTerm}>
      {!iconList.length ? (
        <List.Item
          title="Show All Icons"
          actions={
            <ActionPanel>
              <Action.SubmitForm title="Show All Icons" onSubmit={() => setIconList(icons)} />
            </ActionPanel>
          }
        />
      ) : null}
      {iconList.map((icon) => (
        <List.Item
          key={icon.name}
          icon={`https://raw.githubusercontent.com/phosphor-icons/core/main/raw/regular/${icon.name}.svg`}
          title={icon.pascal_name}
          actions={
            <ActionPanel>
              <Action.Push title="Show Details" target={<Detail markdown="# Hey! 👋" />} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
