"""Derive a dark-background (reversed) lockup from a light-background logo capture.

The source is a screenshot: opaque white ground, flat-blue droplet on the left,
near-black wordmark on the right. The two regions need opposite treatments, so
they are split on the x axis and handled separately:

  droplet  - opacity is *shape coverage*, measured by chroma, not by darkness.
             The white ground and the flower inside the droplet both fall to
             alpha 0, which is what makes the flower a real knockout on dark.
  wordmark - opacity is darkness, and the ink is repainted white.

Both regions un-composite off white at partial alpha so antialiased edges stay
clean rather than picking up a pale halo.
"""

import collections
import os
import struct
import zlib

SRC = '/Users/flavor/partner-workshop/CleanShot 2026-09-01 at 11.47.43@2x.png'
DST = os.path.join(os.path.dirname(__file__), '..', 'assets',
                   'acquia-source-logo-reverse.png')


def read_png(path):
    data = open(path, 'rb').read()
    pos, idat = 8, b''
    while pos < len(data):
        ln = struct.unpack('>I', data[pos:pos + 4])[0]
        typ, chunk = data[pos + 4:pos + 8], data[pos + 8:pos + 8 + ln]
        if typ == b'IHDR':
            w, h, _depth, colour = struct.unpack('>IIBB', chunk[:10])
        elif typ == b'IDAT':
            idat += chunk
        pos += 12 + ln
    if colour != 6:
        raise SystemExit('expected 8-bit RGBA source, got colour type %d' % colour)
    raw, ch = zlib.decompress(idat), 4
    stride = w * ch

    def paeth(a, b, c):
        p = a + b - c
        pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
        return a if pa <= pb and pa <= pc else (b if pb <= pc else c)

    out, prev, i = bytearray(), bytearray(stride), 0
    for _y in range(h):
        f = raw[i]; i += 1
        line = bytearray(raw[i:i + stride]); i += stride
        for x in range(stride):
            a = line[x - ch] if x >= ch else 0
            b = prev[x]
            c = prev[x - ch] if x >= ch else 0
            if f == 1: line[x] = (line[x] + a) & 255
            elif f == 2: line[x] = (line[x] + b) & 255
            elif f == 3: line[x] = (line[x] + (a + b) // 2) & 255
            elif f == 4: line[x] = (line[x] + paeth(a, b, c)) & 255
        out += line
        prev = line
    return w, h, out


def write_png(path, w, h, rgba):
    raw = b''.join(b'\x00' + bytes(rgba[y * w * 4:(y + 1) * w * 4]) for y in range(h))

    def chunk(typ, payload):
        body = typ + payload
        return (struct.pack('>I', len(payload)) + body
                + struct.pack('>I', zlib.crc32(body) & 0xffffffff))

    open(path, 'wb').write(
        b'\x89PNG\r\n\x1a\n'
        + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0))
        + chunk(b'IDAT', zlib.compress(bytes(raw), 9))
        + chunk(b'IEND', b''))


def uncomposite(rgb, a):
    """Recover the source colour of a pixel alpha-blended onto white."""
    return [max(0, min(255, round((c - (1 - a) * 255) / a))) for c in rgb]


w, h, buf = read_png(SRC)


def px(x, y):
    o = (y * w + x) * 4
    return buf[o], buf[o + 1], buf[o + 2]


# Split the mark from the wordmark: the droplet is the only chromatic content.
chromatic = [x for x in range(w) for y in range(h)
             if (lambda p: max(p) - min(p) >= 25 and p[2] > p[0])(px(x, y))]
neutral_ink = [x for x in range(w) for y in range(h)
               if (lambda p: max(p) - min(p) < 25 and min(p) < 128)(px(x, y))]
if max(chromatic) >= min(neutral_ink):
    raise SystemExit('mark and wordmark overlap horizontally; x split is unsafe')
split = (max(chromatic) + min(neutral_ink)) // 2

# Saturate each region's solid core to full opacity.
chroma_ref = max(max(px(x, y)) - min(px(x, y))
                 for x in range(split) for y in range(h))
dark_ref = max(255 - min(px(x, y))
               for x in range(split, w) for y in range(h))

out = bytearray(w * h * 4)
for y in range(h):
    for x in range(w):
        r, g, b = px(x, y)
        o = (y * w + x) * 4
        if x < split:
            a = min(1.0, (max(r, g, b) - min(r, g, b)) / chroma_ref)
            if a <= 0.004:
                continue
            rgb = [r, g, b] if a >= 0.999 else uncomposite((r, g, b), a)
        else:
            a = min(1.0, (255 - min(r, g, b)) / dark_ref)
            if a <= 0.004:
                continue
            rgb = [255, 255, 255]
        out[o:o + 4] = bytes(rgb + [round(a * 255)])

# Trim the transparent margin so `h-8` sizes the lockup, not the padding.
xs = [x for x in range(w) for y in range(h) if out[(y * w + x) * 4 + 3] > 8]
ys = [y for y in range(h) for x in range(w) if out[(y * w + x) * 4 + 3] > 8]
x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)
nw, nh = x1 - x0 + 1, y1 - y0 + 1
crop = bytearray()
for y in range(y0, y1 + 1):
    crop += out[(y * w + x0) * 4:(y * w + x1 + 1) * 4]

write_png(DST, nw, nh, crop)


def luminance(c):
    def channel(v):
        v /= 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    return .2126 * channel(c[0]) + .7152 * channel(c[1]) + .0722 * channel(c[2])


def contrast(a, b):
    hi, lo = max(luminance(a), luminance(b)), min(luminance(a), luminance(b))
    return (hi + .05) / (lo + .05)


FOOTER = (5, 8, 10)  # the site-footer `black` variant, #05080a
opaque = [(crop[i], crop[i + 1], crop[i + 2])
          for i in range(0, len(crop), 4) if crop[i + 3] > 250]
print('  split x=%d   chroma_ref=%d   dark_ref=%d' % (split, chroma_ref, dark_ref))
print('  %dx%d  aspect %.2f:1  %d bytes' % (nw, nh, nw / nh, os.path.getsize(DST)))
print('  transparent: %.0f%%'
      % (100 * sum(1 for i in range(3, len(crop), 4) if crop[i] < 20) / (len(crop) // 4)))
print('\n  fully opaque ink on the black footer #05080a:')
for c, n in collections.Counter(opaque).most_common(4):
    print('    rgb%-18s %5d px  %5.2f:1  %s'
          % (str(c), n, contrast(c, FOOTER), 'PASS' if contrast(c, FOOTER) >= 4.5 else 'LOW'))
