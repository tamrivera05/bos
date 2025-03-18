import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";

const WorkingHours = () => {
  const { data, isLoading } = useSWR("/working-hours");

  const startTime = data?.data?.start_time
    ? format(new Date(`2000-01-01T${data.data.start_time}`), "h:mm a")
    : null;
  const endTime = data?.data?.end_time
    ? format(new Date(`2000-01-01T${data.data.end_time}`), "h:mm a")
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#1F2937]">Working Hours</CardTitle>
        <CardDescription>Our current operating hours</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="border-t pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5 mt-2" />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="font-medium text-[#1F2937]">Everyday</div>
              <div className="text-[#1F2937]">
                {startTime} - {endTime}
              </div>
            </div>
            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Appointments are typically 30-60 minutes. Please arrive 10 minutes
                before your scheduled time.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkingHours;
