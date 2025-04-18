import { Attribute } from "@/types";
import { Subtitle } from "../Subtitle";
import { toKebabCase } from "@/utils";

const Attributes = ({ attributes }: { attributes: Attribute[] }) => {
  return attributes.map((attribute) => (
    <div
      key={attribute.id}
      data-testid={`product-attribute-${toKebabCase(attribute.name)}`}
    >
      <Subtitle>{attribute.name}:</Subtitle>
      <div className="flex gap-2">
        {attribute.items.map((item) => {
          return attribute.type.name === "text" ? (
            <label
              key={item.id}
              className="px-4 py-1 border border-black-primary font-sans bg-white primary-black-btn-hover cursor-pointer"
            >
              <input
                type="radio"
                name={attribute.name}
                value={item.value}
                className="hidden"
              />
              {item.display_value}
            </label>
          ) : (
            <label
              key={item.id}
              className="size-8 ring ring-green-primary cursor-pointer"
              style={{
                backgroundColor: item.value,
              }}
            >
              <input
                type="radio"
                name={attribute.name}
                value={item.value}
                className="hidden"
              />
            </label>
          );
        })}
      </div>
    </div>
  ));
};

export default Attributes;
