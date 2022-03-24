import { JobId } from "bull";
import { scheduledEmailQueueToSend } from "./email-queue.service";

export async function emailScheduledDeleteJob ( jobId: JobId ) {
  const job = await scheduledEmailQueueToSend.getJob( jobId );
  await job?.remove();
}