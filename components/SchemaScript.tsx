export interface SchemaScriptProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * SchemaScript Component - Renders JSON-LD Schema Markup
 * Used for SEO structured data across the website
 *
 * Usage:
 * <SchemaScript schema={organizationSchema} />
 * <SchemaScript schema={[serviceSchema1, serviceSchema2]} />
 */
export default function SchemaScript({ schema }: SchemaScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
