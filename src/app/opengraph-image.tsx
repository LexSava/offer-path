import {
  createSocialImageResponse,
  socialImageContentType,
  socialImageSize,
} from '@/lib/social-image-template';

export const runtime = 'edge';

export const size = socialImageSize;

export const contentType = socialImageContentType;

export default function OpenGraphImage() {
  return createSocialImageResponse();
}
