import { ImageResponse } from 'next/og';

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export const socialImageContentType = 'image/png';

export function createSocialImageResponse() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px',
          background: 'linear-gradient(135deg, #171717 0%, #2b2b2b 60%, #3b3b3b 100%)',
          color: '#fff',
          fontFamily: 'Montserrat, Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div
            style={{
              width: '22px',
              height: '22px',
              background: '#ec543c',
            }}
          />
          <div style={{ fontSize: '42px', fontWeight: 700, letterSpacing: '1px' }}>OfferPath</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '900px' }}>
          <div style={{ fontSize: '66px', lineHeight: 1.05, fontWeight: 800 }}>
            Track Job Applications
          </div>
          <div style={{ fontSize: '32px', lineHeight: 1.3, color: '#f1f1f1' }}>
            Organize every role, stage, and note in one place.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '24px',
            color: '#d6d6d6',
          }}
        >
          <div>offer-path-sigma.vercel.app</div>
          <div style={{ color: '#ec543c', fontWeight: 700 }}>Job Search Companion</div>
        </div>
      </div>
    ),
    socialImageSize
  );
}
