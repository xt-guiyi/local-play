!(function(e) {
  var t,
    n,
    o,
    c,
    i,
    l,
    d =
      '<svg><symbol id="icon-fenxiang" viewBox="0 0 1024 1024"><path d="M952.32 496.128c-11.264 0-20.48 9.216-20.48 20.48v342.016c0 39.936-32.768 72.704-72.704 72.704H164.864c-39.936 0-72.704-32.768-72.704-72.704V307.2c0-39.936 32.768-72.704 72.704-72.704H558.08c11.264 0 20.48-9.216 20.48-20.48s-9.216-20.48-20.48-20.48H164.864C102.4 193.024 51.2 244.224 51.2 307.2v551.936C51.2 921.6 102.4 972.8 164.864 972.8h693.76c62.976 0 113.664-51.2 113.664-113.664V517.12c0.512-11.776-8.704-20.992-19.968-20.992z" fill="#262435" ></path><path d="M958.464 145.408l-286.72-93.184c-10.752-3.584-22.528 2.56-26.112 13.312-3.584 10.752 2.56 22.528 13.312 26.112l234.496 76.288c-51.2 19.968-100.352 45.568-145.92 77.312-60.416 41.472-113.152 92.672-157.696 150.528-92.16 121.344-140.8 266.24-140.8 418.816 0 11.264 9.216 20.48 20.48 20.48s20.48-9.216 20.48-20.48c0-273.408 174.08-519.68 428.544-612.352L839.68 445.44c-3.584 10.752 2.56 22.528 13.312 26.112 2.048 0.512 4.096 1.024 6.144 1.024 8.704 0 16.896-5.632 19.456-14.336l89.6-275.968c3.072-4.096 5.12-9.216 4.608-14.848 1.024-9.728-4.608-18.944-14.336-22.016z" fill="#262435" ></path></symbol><symbol id="icon-shoucang" viewBox="0 0 1024 1024"><path d="M707.584 93.184c-77.312 0-148.992 38.912-196.608 102.912-47.104-64-119.296-102.912-196.608-102.912-139.264 0-252.416 123.904-252.416 275.968 0 90.624 40.448 154.624 73.216 205.824C229.888 723.968 468.48 908.8 478.72 916.48c9.728 7.68 20.992 11.264 32.256 11.264s22.528-3.584 32.256-11.264c10.24-7.68 248.32-193.024 343.552-341.504 32.768-51.2 73.216-115.2 73.216-205.824 0-152.064-113.152-275.968-252.416-275.968zM821.76 573.44c-87.552 122.88-272.896 263.168-282.112 269.824-8.704 6.656-18.944 10.24-28.672 10.24-10.24 0-19.968-3.072-28.672-10.24-9.216-6.656-190.976-148.48-282.112-274.944-29.184-46.08-75.776-103.424-75.776-184.32 0-136.192 75.776-231.936 200.192-231.936 69.12 0 144.384 66.048 186.368 123.392 42.496-57.344 117.248-123.392 186.368-123.392 124.928 0 205.824 95.744 205.824 231.936 0 80.896-51.712 143.872-81.408 189.44z" fill="" ></path></symbol></svg>',
    s = (s = document.getElementsByTagName("script"))[
      s.length - 1
    ].getAttribute("data-injectcss");
  if (s && !e.__iconfont__svg__cssinject__) {
    e.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
      );
    } catch (e) {
      console && console.log(e);
    }
  }
  function a() {
    i || ((i = !0), o());
  }
  (t = function() {
    var e, t, n, o;
    ((o = document.createElement("div")).innerHTML = d),
      (d = null),
      (n = o.getElementsByTagName("svg")[0]) &&
        (n.setAttribute("aria-hidden", "true"),
        (n.style.position = "absolute"),
        (n.style.width = 0),
        (n.style.height = 0),
        (n.style.overflow = "hidden"),
        (e = n),
        (t = document.body).firstChild
          ? ((o = e), (n = t.firstChild).parentNode.insertBefore(o, n))
          : t.appendChild(e));
  }),
    document.addEventListener
      ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
        ? setTimeout(t, 0)
        : ((n = function() {
            document.removeEventListener("DOMContentLoaded", n, !1), t();
          }),
          document.addEventListener("DOMContentLoaded", n, !1))
      : document.attachEvent &&
        ((o = t),
        (c = e.document),
        (i = !1),
        (l = function() {
          try {
            c.documentElement.doScroll("left");
          } catch (e) {
            return void setTimeout(l, 50);
          }
          a();
        })(),
        (c.onreadystatechange = function() {
          "complete" == c.readyState && ((c.onreadystatechange = null), a());
        }));
})(window);
