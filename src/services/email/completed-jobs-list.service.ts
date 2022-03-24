import { JobId } from "bull";
import { scheduledEmailQueueToSend } from "./email-queue.service";

export interface IEmailCompletedJobsList {
  metadata: IEmailCompletedJobMetadata;
  data: IEmailCompletedJobData[];
}

export interface IEmailCompletedJobData {
  jobId: JobId;
  templateTitle: string;
  scheduledISODate: string;
  subject: string;
  usersCount: number;
}

export interface IEmailCompletedJobMetadata {
  page: number;
  size: number;
  totalPages: number;
  total: number;
  currentPageResultsNumber: number;
  skipped: number;
}

export async function emailCompletedJobsListService ( page: number = 1, size: number = 10 ): Promise<IEmailCompletedJobsList> {
  const completed = await scheduledEmailQueueToSend.getCompleted();
  completed.sort( ( a, b ) => parseInt( b.id.toString() ) - parseInt( a.id.toString() ) );

  const total = completed.length;
  const totalPages = Math.ceil( total / size );

  let pageVal = 1;
  if ( page < 1 ) { pageVal = 1; }
  else if ( page > totalPages ) { pageVal = totalPages > 0 ? totalPages : 1; }
  else { pageVal = page ? page : 1; }

  let sizeVal = 10;
  if ( size < 1 ) { sizeVal = 10; }
  else if ( size > 100 ) { sizeVal = 100; }
  else { sizeVal = size ? size : 10; }

  const startIndex = ( pageVal - 1 ) * sizeVal;
  const endIndex = startIndex + sizeVal;
  const delayedSlice = completed.slice( startIndex, endIndex );
  const currentPageResultsNumber = delayedSlice.length;

  const data: IEmailCompletedJobData[] = completed.map( j => {
    return {
      jobId: j.id,
      scheduledISODate: j.data.scheduledISODate,
      subject: j.data.subject,
      templateTitle: j.data.templateTitle,
      usersCount: j.data.users.length
    };
  } );

  return {
    metadata: {
      currentPageResultsNumber,
      page: pageVal,
      size: sizeVal,
      skipped: startIndex,
      total,
      totalPages
    },
    data
  };
}