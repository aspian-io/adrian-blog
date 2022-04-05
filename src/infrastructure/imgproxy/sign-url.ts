import createHmac from 'create-hmac';
import { hexDecode } from 'infrastructure/security/hex-decode';
import { urlSafeBase64 } from 'infrastructure/security/url-safe-base64';

export interface IImgProxyPrams {
  key: string;
  resizingType: string;          // Default: fit
  width: string;
  height: string;
  enlarge: string;               // Default: false
  gravity?: string;              // Default: ce:0:0
  quality?: string;
  dpr?: string;                  // Default: 1
  expires?: string;
  wmOpacity?: string;
  wmPosition?: string;
  wmXOffset?: string;
  wmYOffset?: string;
  wmScale?: string;
  extension?: string;
}

export function imgProxySignUrl ( params: IImgProxyPrams ) {
  const {
    key,
    resizingType,
    width,
    height,
    gravity,
    enlarge,
    quality,
    dpr,
    expires,
    wmOpacity,
    wmPosition,
    wmScale,
    wmXOffset,
    wmYOffset,
    extension
  } = params;

  const url = `${ process.env.S3_ENDPOINT }/${ process.env.S3_BUCKET }/${ key }`;
  const encoded_url = urlSafeBase64( url );

  const resizeVal = `/rs:${ resizingType }:${ width }:${ height }:${ enlarge }`;
  const gravityVal = gravity ? `/g:${ gravity }` : '';
  const qualityVal = quality ? `/q:${ quality }` : '';
  const dprVal = dpr ? `/dpr:${ dpr }` : '';
  const expiresVal = expires ? `/exp:${ expires }` : '';
  const wmOpacityVal = wmOpacity ? `:${ wmOpacity }` : '';
  const wmPositionVal = wmPosition ? `:${ wmPosition }` : '';
  const wmScaleVal = wmScale ? `:${ wmScale }` : '';
  const wmXOffsetVal = wmXOffset ? `:${ wmXOffset }` : '';
  const wmYOffsetVal = wmYOffset ? `:${ wmYOffset }` : '';
  const wmVal = wmOpacity && wmPosition && wmXOffset && wmYOffset && wmScale
    ? `/wm${ wmOpacityVal }${ wmPositionVal }${ wmXOffsetVal }${ wmYOffsetVal }${ wmScaleVal }` : '';
  const extensionVal = extension ? `.${ extension }` : '';

  const sign = ( salt: string, target: string, secret: string ) => {
    const hmac = createHmac( 'sha256', hexDecode( secret ) );
    hmac.update( hexDecode( salt ) );
    hmac.update( target );
    return hmac.digest( 'base64url' );
  };

  const path = `${ resizeVal }${ gravityVal }${ qualityVal }${ dprVal }${ expiresVal }${ wmVal }/${ encoded_url }${ extensionVal }`;

  const signature = sign( process.env.IMGPROXY_SALT!, path, process.env.IMGPROXY_KEY! );
  const result = `/${ signature }${ path }`;
  return `${ process.env.IMGPROXY_BASE_URL! }${ result }`;
}



