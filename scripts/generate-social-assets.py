"""Export the code-native hero orbit and portrait icons as SVG/PNG.

Run from any directory with Python 3 and the system librsvg/cairo libraries.
The original portrait is embedded unchanged; SVG supplies the framing.
"""
from pathlib import Path
import base64
import ctypes as C
import ctypes.util

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
portrait = 'data:image/jpeg;base64,' + base64.b64encode((PUBLIC / 'og-profile.jpg').read_bytes()).decode()

svg_start = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"'
icon = f'''{svg_start} width="128" height="128" viewBox="0 0 128 128">
<title>Nuel's portrait</title>
<defs><clipPath id="portrait"><circle cx="64" cy="64" r="62"/></clipPath></defs>
<circle cx="64" cy="64" r="64" fill="#080c12"/>
<image x="0" y="-20.48" width="128" height="192" xlink:href="{portrait}" clip-path="url(#portrait)"/>
<circle cx="64" cy="64" r="62" fill="none" stroke="#b9d6f2" stroke-width="2"/>
</svg>'''
(PUBLIC / 'favicon.svg').write_text(icon)

stars = '\n'.join(f'<circle cx="{(i * 173.37 + 11) % 1200:.2f}" cy="{(i * 137.71 + 7) % 630:.2f}" r="{1.1 if i % 9 == 0 else .6}" fill="#c7dceb" opacity="{.5 if i % 9 == 0 else .27}"/>' for i in range(90))
scene = f'''{svg_start} width="1200" height="630" viewBox="0 0 1200 630">
<title>Nuel's Observatory — my small corner of the cosmos</title>
<defs>
  <radialGradient id="atmosphere"><stop stop-color="#162636" stop-opacity=".35"/><stop offset="1" stop-color="#080c12" stop-opacity="0"/></radialGradient>
  <radialGradient id="sun" cx="35%" cy="30%"><stop stop-color="#ffe4ae"/><stop offset=".6" stop-color="#d89856"/><stop offset="1" stop-color="#995a32"/></radialGradient>
  <radialGradient id="moon" cx="28%" cy="25%"><stop stop-color="#d5dce0"/><stop offset=".65" stop-color="#94a5b1"/><stop offset="1" stop-color="#485666"/></radialGradient>
  <clipPath id="face"><circle cx="600" cy="306" r="42"/></clipPath>
</defs>
<rect width="1200" height="630" fill="#080c12"/>
{stars}
<circle cx="600" cy="306" r="285" fill="url(#atmosphere)"/>
<path d="M305 306H895M600 20V592" stroke="#8aa4bc" stroke-opacity=".12"/>
<g fill="none" stroke="#89a2ba" stroke-width="1.4">
  <ellipse cx="600" cy="306" rx="234" ry="112" transform="rotate(-34 600 306)" stroke-opacity=".38"/>
  <ellipse cx="600" cy="306" rx="277" ry="150" transform="rotate(42 600 306)" stroke-opacity=".25"/>
  <ellipse cx="600" cy="306" rx="172" ry="124" transform="rotate(90 600 306)" stroke-opacity=".3"/>
</g>
<circle cx="600" cy="306" r="46" fill="#0c1520" stroke="#a5c9e8" stroke-opacity=".6"/>
<image x="558" y="250.56" width="84" height="126" xlink:href="{portrait}" clip-path="url(#face)"/>
<circle cx="789" cy="151" r="29" fill="#efb56b" opacity=".035"/>
<circle cx="789" cy="151" r="21" fill="#efb56b" opacity=".06"/>
<circle cx="789" cy="151" r="17" fill="url(#sun)"/>
<circle cx="399" cy="476" r="15" fill="url(#moon)"/>
<g fill="#637583" opacity=".55"><circle cx="394" cy="472" r="4"/><circle cx="404" cy="480" r="3"/><circle cx="392" cy="481" r="2"/></g>
<circle cx="373" cy="356" r="2" fill="#e5c38e"/>
<circle cx="841" cy="390" r="2" fill="#b9d6f2"/>
<g stroke="#8ca1b7" stroke-opacity=".5"><path d="M344 408H356M350 402V414M808 150H820M814 144V156"/></g>
<g font-family="monospace" font-size="11" letter-spacing="3" fill="#a2b7c9">
  <text x="325" y="48">A LITTLE PERSPECTIVE</text>
  <text x="610" y="578" font-size="10">MY SMALL CORNER OF THE COSMOS</text>
</g>
<text x="42" y="587" font-family="sans-serif" font-size="18" fill="#c6d7e5">nuel.</text>
</svg>'''
(PUBLIC / 'og-observatory.svg').write_text(scene)

# Render native SVG artwork with the installed vector libraries, not a browser.
rsvg = C.CDLL(ctypes.util.find_library('rsvg-2'))
cairo = C.CDLL(ctypes.util.find_library('cairo'))
gobject = C.CDLL(ctypes.util.find_library('gobject-2.0'))
class Rectangle(C.Structure):
    _fields_ = [('x', C.c_double), ('y', C.c_double), ('width', C.c_double), ('height', C.c_double)]
rsvg.rsvg_handle_new_from_data.argtypes = [C.c_char_p, C.c_size_t, C.POINTER(C.c_void_p)]
rsvg.rsvg_handle_new_from_data.restype = C.c_void_p
rsvg.rsvg_handle_render_document.argtypes = [C.c_void_p, C.c_void_p, C.POINTER(Rectangle), C.POINTER(C.c_void_p)]
rsvg.rsvg_handle_render_document.restype = C.c_int
cairo.cairo_image_surface_create.argtypes = [C.c_int, C.c_int, C.c_int]
cairo.cairo_image_surface_create.restype = C.c_void_p
cairo.cairo_create.argtypes = [C.c_void_p]
cairo.cairo_create.restype = C.c_void_p
cairo.cairo_surface_write_to_png.argtypes = [C.c_void_p, C.c_char_p]
cairo.cairo_surface_write_to_png.restype = C.c_int
cairo.cairo_destroy.argtypes = [C.c_void_p]
cairo.cairo_surface_destroy.argtypes = [C.c_void_p]
gobject.g_object_unref.argtypes = [C.c_void_p]

def export(svg, name, width, height):
    data = svg.encode()
    error = C.c_void_p()
    handle = rsvg.rsvg_handle_new_from_data(data, len(data), C.byref(error))
    if not handle:
        raise RuntimeError(f'Cannot parse {name}')
    surface = cairo.cairo_image_surface_create(0, width, height)
    context = cairo.cairo_create(surface)
    try:
        if not rsvg.rsvg_handle_render_document(handle, context, C.byref(Rectangle(0, 0, width, height)), C.byref(error)):
            raise RuntimeError(f'Cannot render {name}')
        if cairo.cairo_surface_write_to_png(surface, str(PUBLIC / name).encode()):
            raise RuntimeError(f'Cannot save {name}')
    finally:
        cairo.cairo_destroy(context)
        cairo.cairo_surface_destroy(surface)
        gobject.g_object_unref(handle)
    print(f'Exported {name}: {width} × {height}')

export(scene, 'og-observatory.png', 1200, 630)
export(icon, 'portrait-icon-32.png', 32, 32)
export(icon, 'apple-touch-icon.png', 180, 180)
