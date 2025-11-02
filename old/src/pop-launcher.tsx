import { ReactElement, useState } from "react";
import { List, TextAccessory } from "@project-gauntlet/api/components";
import { PopLauncherClient, SearchResult } from "./script/pop-launcher";

export default function SearchBarExample(): ReactElement {
  const pop = new PopLauncherClient()
  pop.connect();
  const [searchText, setSearchText] = useState<string | undefined>("");
  const [results, setResults] = useState<SearchResult[]>([])

  return (
    <List>
      <List.SearchBar placeholder="What knowledge do you seek...?"
        value={searchText}
        onChange={async (value) => {
          const results = await pop.search(value ?? '');
          setResults(results)

          setSearchText(value)
        }}
      />
      {results
        // .filter(value => !searchText ? true : value.toLowerCase().includes(searchText))
        .map(value => (
          <List.Item subtitle={value.description} id={value.id.toString()} title={value.name}
            accessories={[
              <TextAccessory text={
                !value.icon ? '' : 'Name' in value.icon
                  ? value.icon?.Name
                  : value.icon?.Mime
              } />
            ]}
          />
        ))
      }
    </List>
  )
}
