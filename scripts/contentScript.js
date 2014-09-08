"use strict";
function makeTinyUrl(url)
{
    var xmlHttp = null;
    var theUrl = "http://tinyurl.com/api-create.php?url=" + url;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

! function(a, b) {
    function c(c) {
        var d = c.getBoundingClientRect();
        return {
            width: d.width || c.offsetWidth,
            height: d.height || c.offsetHeight,
            top: d.top + (a.pageYOffset || b.body.scrollTop || b.documentElement.scrollTop),
            left: d.left + (a.pageXOffset || b.body.scrollLeft || b.documentElement.scrollLeft)
        }
    }

    function d(a, b) {
        null === b ? b = {
            type: "unsupported",
            sources: []
        } : b.type = b.referer ? "html5" : "flash", b.isYoutube = e(window.location), b.frameId = r, b.id = n++, q[b.id] = a, f("videoDetected", b), p.push(b)
    }

    function e(a) {
        var b = document.createElement("a");
        return b.href = a, /(\.youtube\.com)|(\.googlevideo.com)$/i.test(b.host)
    }

    function f(a, b) {
        chrome.runtime.sendMessage({
            type: a,
            data: b
        })
    }

    function g(a) {
        return "EMBED" == a.tagName || "OBJECT" == a.tagName
    }

    function h(a, b) {
        for (; g(a);) a.style.visibility = b ? "" : "hidden", a = a.parentNode
    }

    function i(c) {
            console.log(c.url);
    		var host = "192.168.0.12";
    		var port = "8888";
    		var uri = "/ws"
    		
    		chrome.storage.sync.get({
    		  ipAddress: '',
    		  port: ''
    		}, function(items) {    
    		  host = items.ipAddress;
    		  port = items.port;
    		});

    		var ws;
    		
    		ws = new WebSocket("ws://" + host + ":" + port + uri);
    		ws.onmessage = function(evt) {
              if(evt.data == "Connected")
              {
    		      ws.send(c.url);
                  ws.close();
              }
    		};
    		
    		ws.onclose = function(evt) { };

        console.log("Playing " + c.url + " as " + c.name);
        var d = b.createElement("a");
        d.setAttribute("download", c.name || "video.mp4"), d.setAttribute("href", c.url), b.body.appendChild(d);
        var e = new MouseEvent("click", {
            view: a,
            bubbles: !0,
            cancelable: !0
        });
        // d.dispatchEvent(e), b.body.removeChild(d)
    }

    function j(b) {
        (b.frameId == r || b.forceOnTop && a.top == a) && i(b)
    }

    function k(a) {
        if (!a.frameId || a.frameId == r) {
            var d = q[a.id];
            if (a.enable) {
                if (d && b.contains(d)) {
                    var e = c(d);
                    m || (m = b.createElement("div"));
                    var f = ["vget-video-highlight"];
                    a.isUnsupported && f.push("vget-unsupported"), m.className = f.join(" "), m.style.position = "absolute", ["left", "top", "width", "height"].forEach(function(a) {
                        m.style[a] = e[a] + "px"
                    }), b.body.appendChild(m)
                }
            } else m && b.body.contains(m) && b.body.removeChild(m);
            d && h(d, !a.enable)
        }
    }

    function l(a) {
        var b = a.type,
            c = a.data;
        switch (b) {
            case "init":
                o && f("videoList", p), o = !0, f("register", r);
                break;
            case "download":
                j(c);
                break;
            case "highlight":
                k(c)
        }
    }
    if (!a.vgetInjected) {
        a.vgetInjected = !0;
        var m, n = 1,
            o = !1,
            p = [],
            q = {},
            r = Math.random().toString(36).substring(2);
        chrome.runtime.onMessage.addListener(l), a.libvget.detect(d), a.addEventListener("unload", function() {
            f("unload", r)
        })
    }
}(window, document);