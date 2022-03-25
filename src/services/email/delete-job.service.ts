import { JobId } from "bull";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { scheduledEmailQueueToSend } from "./email-queue.service";

export async function emailDeleteJobService ( jobId: JobId ) {
  const job = await scheduledEmailQueueToSend.getJob( jobId );
  if ( !job ) throw new NotFoundError();
  await job.remove();
  return job;
}