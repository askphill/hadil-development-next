import cn from 'classnames';
import Img from 'next/image';

import s from './image.module.scss';

const Image = ({
  src,
  alt,
  className,
  layout = 'fill',
  loading = 'lazy',
  priority = false,
  sizes = '100vw',
  quality = 75,
}) => {
  // FIX FOR APPLE MASCHINES M1
  function isAppleM1() {
    if (typeof window === 'undefined') {
      return process.arch === 'arm64' && process.platform === 'darwin';
    }
    // Detect on client-side (non-Safari)
    // https://stackoverflow.com/a/65412357/1268612
    const webGlContext = document.createElement('canvas').getContext('webgl');
    const rendererExtension = webGlContext?.getExtension('WEBGL_debug_renderer_info');
    const webGlRendererName =
      (rendererExtension &&
        webGlContext?.getParameter(rendererExtension.UNMASKED_RENDERER_WEBGL)) ||
      '';
    return webGlRendererName.match(/Apple/) && !webGlRendererName.match(/Apple GPU/);
  }

  // NOTE: when using layout='fill' the class must have css -- position: relative;
  // DOCS: https://nextjs.org/docs/api-reference/next/image

  const altText = () => {
    if (alt) {
      return alt;
    }
    if (src?.title) {
      return src?.title;
    }
    return process.env.NEXT_PUBLIC_SITENAME;
  };

  const imageDesktop = src?.desktop;
  const imageMobile = src?.mobile;

  return (
    <div className={cn(className, { [s.layoutFill]: layout === 'fill' })}>
      {(src?.baseUrl || src?.url || src?.transformedSrc) && (
        <Img
          unoptimized={process.env.NODE_ENV === 'development' && isAppleM1()}
          src={`${src?.baseUrl || src?.url || src?.transformedSrc}`}
          height={layout === 'fill' ? null : src?.height}
          width={layout === 'fill' ? null : src?.width}
          objectFit={layout === 'fill' ? 'cover' : 'fill'}
          layout={layout}
          alt={altText()}
          loading={loading}
          priority={priority}
          sizes={sizes}
          quality={quality}
        />
      )}
      {imageMobile?.baseUrl && (
        <div
          className={cn(s.mobile, {
            [s.visibleDesktop]: !imageDesktop,
          })}
        >
          <Img
            unoptimized={process.env.NODE_ENV === 'development' && isAppleM1()}
            src={`${imageMobile?.baseUrl}`}
            height={layout === 'fill' ? null : imageMobile?.height}
            width={layout === 'fill' ? null : imageMobile?.width}
            objectFit={layout === 'fill' ? 'cover' : 'fill'}
            layout={layout}
            alt={altText()}
            loading={loading}
            priority={priority}
            sizes={sizes}
            quality={quality}
          />
        </div>
      )}
      {imageDesktop?.baseUrl && (
        <div className={cn(s.desktop)}>
          <Img
            unoptimized={process.env.NODE_ENV === 'development' && isAppleM1()}
            src={`${imageDesktop?.baseUrl}`}
            height={layout === 'fill' ? null : imageDesktop?.height}
            width={layout === 'fill' ? null : imageDesktop?.width}
            objectFit={layout === 'fill' ? 'cover' : 'fill'}
            layout={layout}
            alt={altText()}
            sizes={sizes}
            quality={quality}
          />
        </div>
      )}
    </div>
  );
};

export default Image;
