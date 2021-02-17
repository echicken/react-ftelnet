import React, { useEffect, useState } from 'react';

function FTelnet(props) {

    const [ init, setInit ] = useState(false);
    const [ ft, setFT ] = useState(null);

    useEffect(() => {

        if (!init) {

            function getURL() {
                if (props.scriptSrc) return props.scriptSrc;
                if (props.refresh < 1) return _getURL(props.noRip, props.noXfer, props.refresh);
                const cache = window.localStorage.getItem('fTelnetCache');
                if (cache === null) return _getURL(props.noRip, props.noXfer, props.refresh);
                const j = JSON.parse(cache);
                if ((new Date()) - j.ts > props.refresh) return _getURL(props.noRip, props.noXfer, props.refresh);
                return j.url;
            }

            (async () => {
                const script = document.createElement('script');
                script.id = props.scriptID;
                script.src = (await getURL(props.noRip, props.noXfer, props.refresh));
                script.onload = () => {
                    const options = new window.fTelnetOptions();
                    Object.entries(props.fTelnetOptions).forEach(e => options[e[0]] = e[1]);
                    const fTelnet = new window.fTelnetClient(props.divID, options);
                    if (props.autoConnect) fTelnet.Connect();
                    setFT(fTelnet);
                }
                if (props.crossOrigin) script.crossorigin = props.crossorigin;
                document.head.appendChild(script);
            })();

            setInit(true);

        }

        if (ft) return () => ft.Disconnect(false); // Disconnect without prompt on unmount

    }, [ init, ft, props ]);

    return <div id={props.divID} className={props.divID}></div>;

}

FTelnet.defaultProps = {
    autoConnect: false,         // Connect as soon as fTelnet is finished loading
    crossOrigin: null,          // Value for 'crossorigin' attribute of the fTelnet script element, or null for none
    fTelnetOptions: {},         // Overrides for https://github.com/rickparrish/fTelnet/blob/master/source/ftelnetclient/fTelnetOptions.ts
    noRip: false,               // Disable RIP graphics
    noXfer: false,              // Disable file transfers
    refresh: 86400000,          // Fetch a new URL to the ftelnet script src every 'refresh' ms
    scriptSrc: '',              // Path/URL to ftelnet script src if you're hosting it yourself (renders noRip, noXfer, refresh invalid)
    scriptID: 'fTelnetScript',  // The 'id' attribute for the script element (not sure if necessary or safe to override if so)
    divID: 'fTelnetDiv',        // The 'id' attribute for the target div
};

async function _getURL(noRip, noXfer, cache) {
    const l = `${window.location.protocol}//embed-v2.ftelnet.ca/js/ftelnet-loader${noRip ? '' : '.rip'}${noXfer ? '' : '.xfer'}.js?v=${(new Date()).getTime()}`;
    const response = await fetch(l);
    const data = await response.text();
    const match = data.match(/^.+\ssrc="(.*)"\s.+/);
    if (match !== null) {
        if (cache > 0) {
            window.localStorage.setItem('fTelnetCache', JSON.stringify({
                ts: (new Date()).getTime(),
                url: match[1],
            }));
        }
        return match[1];
    }
    throw new Error(`Failed to fetch fTelnet URL from ${l}`);
}

export default FTelnet;