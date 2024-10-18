import { Spinner } from "@/components/spinner";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="fixed inset-0"><Spinner /></div>
  }