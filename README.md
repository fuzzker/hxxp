### Firefox add-on for referrer spoofing

Adds a new protocol (hxxp://) to Firefox and spoofs the referer header
for all requests using that protocol. Any hxxp:// request will have
the referrer set to the original link. The referrer can also be set
explicitly with a ;ref:// comment. There is no user interface or
options for this addon.

Examples:

    hxxp://foo.com/foo.jpg -> 
      url: http://foo.com/foo.jpg
      referer: http://foo.com/foo.jpg

    hxxp://foo.com/foo.jpg;ref://bar.com ->
      url: http://foo.com/foo.jpg
      referer: http://bar.com
