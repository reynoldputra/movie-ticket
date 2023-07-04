import { Tab } from "@headlessui/react";
import clsxm from "@/lib/clsxm";
import { TabItem } from "@/interfaces/TabItem";

interface TabsProps {
  items : TabItem[]
}

export default function Tabs({items} : TabsProps) {
  return (
    <div className="w-full max-w-xl px-2 py-4 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-none p-1 bg-gray-50/10">
          {items.map((item, idx) => (
            <Tab
              key={idx}
              className={({ selected }) =>
                clsxm([
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-100",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-non",
                  selected
                    ? "bg-blue-600 shadow text-white"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white",
                ])
              }
            >
              {item.menu}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {items.map((item, idx) => (
            <Tab.Panel
              key={idx}
              className={clsxm([
                "rounded-xl bg-gray-200 p-3 text-black",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-none",
              ])}
            >
              {item.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
