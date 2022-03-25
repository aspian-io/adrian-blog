import { JobId } from "bull";
import { scheduledSMSQueueToSend } from "./sms-queue.service";

export async function smsScheduledDeleteJob ( jobId: JobId ) {
  const job = await scheduledSMSQueueToSend.getJob( jobId );
  await job?.remove();
}