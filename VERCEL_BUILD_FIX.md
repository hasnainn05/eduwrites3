# Next.js 15 Type Error Fix - Vercel Deployment

## Problem
When deploying to Vercel, the build failed with this error:

```
Type error: Type '{ params: { slug: string; }; }' does not satisfy the constraint 'LayoutProps'.
Types of property 'params' are incompatible.
Type '{ slug: string; }' is missing the following properties from type 'Promise<any>': 
then, catch, finally, [Symbol.toStringTag]
```

## Root Cause
In **Next.js 15**, the layout component props structure changed. The `params` property must be typed as `Promise<{ slug: string }>` instead of a direct object `{ slug: string }`.

## Solution Applied

### 1. Fixed `app/services/layout.tsx`
**Before:**
```tsx
export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
```

**After:**
```tsx
export default function ServicesLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  return <>{children}</>;
}
```

### 2. Cleaned up `app/services/[slug]/layout.tsx`
Removed unnecessary code that was manually resolving the Promise.

**Before:**
```tsx
export default function ServiceLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = Promise.resolve(params).then((p) => p);  // ❌ Unnecessary
  return (
    <>
      <ServiceSchemaInjector params={params}>{children}</ServiceSchemaInjector>
    </>
  );
}
```

**After:**
```tsx
export default function ServiceLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  return (
    <>
      <ServiceSchemaInjector params={params}>{children}</ServiceSchemaInjector>
    </>
  );
}
```

## Why This Works

In Next.js 15, dynamic route parameters are async by design:
- The layout receives `params` as a **Promise** that resolves to the actual parameters
- Child components and async functions can await the promise: `const { slug } = await params`
- This is already correctly implemented in the `ServiceSchemaInjector` async function

## Files Modified
- ✅ `app/services/layout.tsx` - Fixed type signature
- ✅ `app/services/[slug]/layout.tsx` - Cleaned up unnecessary code

## Next Steps

1. **Commit these changes:**
   ```bash
   git add app/services/layout.tsx app/services/[slug]/layout.tsx
   git commit -m "fix: Update layout params type for Next.js 15 compatibility"
   ```

2. **Deploy to Vercel:**
   - The build should now succeed without type errors
   - Vercel will properly handle the Promise-based params

3. **Local Verification:**
   - The dev server is running correctly
   - Navigate to `/services/essay`, `/services/thesis`, etc. to verify dynamic routes work

## Build Status
✅ Type errors fixed
✅ Code compiles locally
✅ Ready for Vercel deployment
