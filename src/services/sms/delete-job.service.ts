import { JobId } from "bull";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { scheduledSMSQueueToSend } from "./sms-queue.service";

export async function smsDeleteJobService ( jobId: JobId ) {
  const job = await scheduledSMSQueueToSend.getJob( jobId );
  if ( !job ) throw new NotFoundError();
  await job.remove();
  return job;
}