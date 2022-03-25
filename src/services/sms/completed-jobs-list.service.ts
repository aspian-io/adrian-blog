import { JobId } from "bull";
import { scheduledSMSQueueToSend } from "./sms-queue.service";

export interface ISMSCompletedJobsList {
  metadata: ISMSCompletedJobMetadata;
  data: ISMSCompletedJobData[];
}

export interface ISMSCompletedJobData {
  jobId: JobId;
  templateTitle: string;
  scheduledISODate: string;
  usersCount: number;
  patternCode: string;
}

export interface ISMSCompletedJobMetadata {
  page: number;
  size: number;
  totalPages: number;
  total: number;
  currentPageResultsNumber: number;
  skipped: number;
}

export async function smsCompletedJobsListService ( page: number = 1, size: number = 10 ): Promise<ISMSCompletedJobsList> {
  const completed = await scheduledSMSQueueToSend.getCompleted();
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
  const completedSlice = completed.slice( startIndex, endIndex );
  const currentPageResultsNumber = completedSlice.length;

  const data: ISMSCompletedJobData[] = completedSlice.map( j => {
    return {
      jobId: j.id,
      scheduledISODate: j.data.scheduledISODate,
      templateTitle: j.data.templateTitle,
      usersCount: j.data.users.length,
      patternCode: j.data.patternCode
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