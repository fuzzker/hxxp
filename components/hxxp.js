/*
hxxp://foo.com
hxxp://foo.com;ref://bar.com
*/

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cr = Components.results;

Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");

function HxxpProtocol() {}

HxxpProtocol.prototype = {
    scheme: "hxxp",
    classDescription: "hxxp protocol handler",
    classID: Components.ID("{ec8030f7-c20a-464f-9b0e-13a3a9e97384}"),
    contractID: "@mozilla.org/network/protocol;1?name=hxxp",
    protocolFlags: (Ci.nsIProtocolHandler.URI_NORELATIVE |
		    Ci.nsIProtocolHandler.URI_NOAUTH |
		    Ci.nsIProtocolHandler.URI_LOADABLE_BY_ANYONE),
    QueryInterface: XPCOMUtils.generateQI([Ci.nsIProtocolHandler, Ci.nsIObserver]),

    newURI: function(spec, charset, base) {
	var uri = Cc["@mozilla.org/network/simple-uri;1"].createInstance(Ci.nsIURI);
	uri.spec = spec;
	return uri;
    },

    newChannel: function(uri) {
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	var url = uri.spec.split(";ref://")[0].replace(/^hxxp:/, "http:");
	channel = ios.newChannel(url, null, null);
	channel.originalURI = uri;
	return channel;
    },

    observe: function(subject, topic, data)
    {
	if (topic == "http-on-modify-request") {
	    var channel = subject.QueryInterface(Ci.nsIHttpChannel);
	    if (channel.originalURI.spec.match(/^hxxp:/)) {
		var s = channel.originalURI.spec.split(";ref://");
		var ref = s[1] ? "http://" + s[1] : channel.URI.spec;
		channel.setRequestHeader("Referer", ref, false);
	    }
	}
	else if (topic == "profile-after-change") {
	    var os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
	    os.addObserver(this, "http-on-modify-request", false);
	}
    },
}

var NSGetFactory = XPCOMUtils.generateNSGetFactory([HxxpProtocol]);
