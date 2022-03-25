import { JobId } from "bull";
import { scheduledSMSQueueToSend } from "./sms-queue.service";

export interface ISMSDelayedJobsList {
  metadata: ISMSDelayedJobMetadata;
  data: ISMSDelayedJobData[];
}

export interface ISMSDelayedJobData {
  jobId: JobId;
  templateTitle: string;
  scheduledISODate: string;
  usersCount: number;
  patternCode: string;
}

export interface ISMSDelayedJobMetadata {
  page: number;
  size: number;
  totalPages: number;
  total: number;
  currentPageResultsNumber: number;
  skipped: number;
}

export async function smsDelayedJobsListService ( page: number = 1, size: number = 10 ): Promise<ISMSDelayedJobsList> {
  const delayed = await scheduledSMSQueueToSend.getDelayed();
  delayed.sort( ( a, b ) => parseInt( b.id.toString() ) - parseInt( a.id.toString() ) );

  const total = delayed.length;
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
  const delayedSlice = delayed.slice( startIndex, endIndex );
  const currentPageResultsNumber = delayedSlice.length;

  const data: ISMSDelayedJobData[] = delayedSlice.map( j => {
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