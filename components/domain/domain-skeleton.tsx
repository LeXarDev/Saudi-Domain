"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader } from "@/components/ui/card";

export function DomainSkeleton() {
  return (
    <Card className="w-full max-w-2xl mx-auto animate-in fade-in-50 duration-500 slide-in-from-bottom-10">
      <CardHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="text-right">
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-8 w-24 mt-2" />
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-36" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-8 w-28" />
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export function DomainSkeletonList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="border-2">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
