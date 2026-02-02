export function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-white py-6 sm:py-8 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3 sm:gap-6">
            {/* Mobile: Card Layout Skeleton */}
            <div className="sm:hidden flex flex-col w-full bg-slate-50 rounded-3xl p-6 border border-slate-200">
              {/* Logout Button */}
              <div className="flex justify-end mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse"></div>
              </div>

              {/* Avatar */}
              <div className="flex justify-center mb-5">
                <div className="w-20 h-20 rounded-3xl bg-slate-300 animate-pulse"></div>
              </div>

              {/* Name */}
              <div className="h-8 bg-slate-300 rounded-lg mb-3 animate-pulse w-3/4 mx-auto"></div>

              {/* Email */}
              <div className="h-12 bg-slate-200 rounded-2xl animate-pulse"></div>
            </div>

            {/* Desktop: Horizontal Layout Skeleton */}
            <div className="hidden sm:flex items-center gap-4 flex-1">
              <div className="w-20 h-20 rounded-2xl bg-slate-300 animate-pulse flex-shrink-0"></div>
              <div className="flex-1">
                <div className="h-10 bg-slate-300 rounded-lg mb-3 animate-pulse w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded animate-pulse w-2/3"></div>
                  <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2"></div>
                </div>
              </div>
            </div>

            {/* Logout Button Desktop */}
            <div className="hidden sm:block w-32 h-12 bg-slate-300 rounded-xl animate-pulse flex-shrink-0"></div>
          </div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-6 bg-white"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-slate-200 animate-pulse"></div>
                <div className="w-3 h-3 rounded bg-slate-200 animate-pulse hidden sm:block"></div>
              </div>
              <div className="h-4 bg-slate-200 rounded animate-pulse mb-3 w-3/4"></div>
              <div className="h-6 sm:h-8 bg-slate-300 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Recent Orders Section */}
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
            <div className="flex-1">
              <div className="h-7 sm:h-8 bg-slate-300 rounded-lg animate-pulse w-1/3 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2"></div>
            </div>
            <div className="w-24 h-8 bg-slate-200 rounded animate-pulse flex-shrink-0"></div>
          </div>

          {/* Orders List Skeleton */}
          <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg sm:rounded-xl border border-gray-200 bg-white p-3 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-slate-300 animate-pulse flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <div className="h-4 sm:h-5 bg-slate-300 rounded animate-pulse mb-2 w-3/4"></div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <div className="h-3 bg-slate-200 rounded animate-pulse w-1/2 sm:w-1/3"></div>
                        <div className="h-3 bg-slate-200 rounded animate-pulse hidden sm:block w-1/4"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 justify-end">
                    <div className="h-6 bg-slate-200 rounded-full animate-pulse w-20"></div>
                    <div className="h-5 bg-slate-300 rounded animate-pulse w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section Skeleton */}
          <div className="rounded-lg sm:rounded-2xl bg-slate-200 p-4 sm:p-8">
            <div className="h-7 sm:h-8 bg-slate-300 rounded animate-pulse mb-3 w-1/3"></div>
            <div className="h-4 bg-slate-300 rounded animate-pulse mb-4 sm:mb-6 w-2/3"></div>
            <div className="w-40 h-10 bg-slate-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}