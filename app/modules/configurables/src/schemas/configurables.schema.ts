/* START: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */
export interface FieldSchemaType {
  fieldName?: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "color"
    | "url"
    | "enum"
    | "datetime"
    | "file"
    | "files";
  required?: boolean;
  label?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
  fields?: FieldSchemaType[];
  item?: FieldSchemaType;
}
/* END: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */

export type ConfigurableSchemas = {
  formSchema: FieldSchemaType[];
};



export const configurableSchemas: ConfigurableSchemas = {
  formSchema: [
    {
      fieldName: "appName",
      type: "string",
      required: true,
      label: "App Name",
    },
    {
      fieldName: "appTagline",
      type: "string",
      required: false,
      label: "App Tagline",
    },
    {
      fieldName: "logoUrl",
      type: "url",
      required: true,
      label: "Logo URL",
    },
    {
      fieldName: "heroHeading",
      type: "string",
      required: false,
      label: "Hero Heading",
    },
    {
      fieldName: "heroSubheading",
      type: "string",
      required: false,
      label: "Hero Subheading",
    },
    {
      fieldName: "searchPlaceholder",
      type: "string",
      required: false,
      label: "Search Placeholder",
    },
    {
      fieldName: "heroCtaLabel",
      type: "string",
      required: false,
      label: "Hero CTA Button Label",
    },
    {
      fieldName: "featuredCategories",
      type: "array",
      label: "Featured Categories",
      item: { type: "string", required: true },
    },
    {
      fieldName: "supportedPlatforms",
      type: "array",
      label: "Supported Platforms",
      item: {
        type: "object",
        fields: [
          { fieldName: "name", type: "string", required: true, label: "Platform Name" },
          { fieldName: "color", type: "color", required: false, label: "Platform Color" },
        ],
      },
    },
    {
      fieldName: "footerText",
      type: "string",
      required: false,
      label: "Footer Text",
    },
    {
      fieldName: "brandColor",
      type: "object",
      required: true,
      label: "Brand Color",
      fields: [
        {
          fieldName: "primary",
          type: "color",
          required: true,
          label: "Primary",
        },
        {
          fieldName: "secondary",
          type: "color",
          required: true,
          label: "Secondary",
        },
        {
          fieldName: "accent",
          type: "color",
          required: true,
          label: "Accent",
        },
      ],
    },
  ],
};