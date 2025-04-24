import { Attribute } from "@/types";
import { Subtitle } from "../Subtitle";
import { toKebabCase } from "@/utils";
import { SelectedProductAttribute } from "../../types";

const Attributes = ({
  attributes,
  selectedAttributes,
  setSelectedAttributes,
}: {
  attributes: Attribute[];
  selectedAttributes: SelectedProductAttribute[];
  setSelectedAttributes: React.Dispatch<
    React.SetStateAction<SelectedProductAttribute[]>
  >;
}) => {
  const handleAttributeChange = (
    attribute: Attribute,
    item: Attribute["items"][number]
  ) => {
    setSelectedAttributes((prev) => {
      const existingAttribute = prev.find(
        (attr) => attr.attribute_id === attribute.id
      );
      if (existingAttribute) {
        return prev.map((attr) =>
          attr.attribute_id === attribute.id
            ? { ...attr, item_id: item.id }
            : attr
        );
      } else {
        return [...prev, { attribute_id: attribute.id, item_id: item.id }];
      }
    });
  };

  const isAttributeSelected = (
    attribute: Attribute,
    item: Attribute["items"][number]
  ) => {
    return selectedAttributes.some(
      (attr) => attr.attribute_id === attribute.id && attr.item_id === item.id
    );
  };

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
              data-testid={`product-attribute-${toKebabCase(
                attribute.name
              )}-${toKebabCase(item.value)}`}
              className={`px-4 py-1 border-black-primary border font-sans primary-black-btn-hover cursor-pointer ${
                isAttributeSelected(attribute, item)
                  ? "bg-black-primary text-white"
                  : "bg-white"
              }`}
            >
              <input
                type="radio"
                name={attribute.name}
                value={item.value}
                className="hidden"
                onClick={() => handleAttributeChange(attribute, item)}
              />
              {item.value}
            </label>
          ) : (
            <label
              key={item.id}
              data-testid={`product-attribute-${toKebabCase(
                attribute.name
              )}-#${toKebabCase(item.value)}`}
              className={`size-8 cursor-pointer ${
                isAttributeSelected(attribute, item)
                  ? "border-2 border-green-primary"
                  : ""
              }`}
              style={{
                backgroundColor: item.value,
              }}
            >
              <input
                type="radio"
                name={attribute.name}
                value={item.value}
                className="hidden"
                onChange={() => handleAttributeChange(attribute, item)}
              />
            </label>
          );
        })}
      </div>
    </div>
  ));
};

export default Attributes;
