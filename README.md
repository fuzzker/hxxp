### Firefox add-on for referrer spoofing

Adds a new protocol (hxxp://) to Firefox and spoofs the referer header
for all requests using that protocol. Any hxxp:// request will have
the referrer set to the original link. The referrer can also be set
explicitly with a ;ref:// comment. There is no user interface or
options for this addon.

Examples:

    hxxp://example.com/foo.jpg -> 
      url: http://example.com/foo.jpg
      referer: http://example.com/foo.jpg

    hxxp://example.com/foo.jpg;ref://example.org ->
      url: http://example.com/foo.jpg
      referer: http://example.org
