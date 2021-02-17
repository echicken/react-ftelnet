react-ftelnet
======

[fTelnet](https://github.com/rickparrish/fTelnet) as a React component.

Install it:

```sh
npm install react-ftelnet
```

import it:

```js
import FTelnet from 'react-ftelnet';
```

use it:

```jsx
// Available props and their defaults are shown here.
// You don't need to specify all of these.
<FTelnet
  autoConnect={false}
  crossOrigin={null}
  fTelnetOptions={{}}
  noRip={false}
  noXfer={false}
  refresh={86400000}
  scriptSrc={''}
  scriptID="fTelnetScript"
  divID="fTelnetDiv"
/>
```

| Prop | Type | Description |
|------|------|-------------|
| **autoConnect** | *boolean* | Connect as soon as fTelnet is finished loading |
| **crossOrigin** | *string* or *null* | String value for *crossorigin* attribute of the fTelnet script element, or ```null``` for none |
| **fTelnetOptions** | *object* | Overrides for [fTelnetOptions](https://github.com/rickparrish/fTelnet/blob/master/source/ftelnetclient/fTelnetOptions.ts). You will at least want to set *Host* and *Port* to something other than the default. |
| **noRip** | *boolean* | Disable RIP graphics |
| **noXfer** | *boolean* | Disable file transfers |
| **refresh** | *number* | TTL in ms for the URL to the fTelnet script source (```0``` to refresh each time this component mounts) |
| **scriptSrc** | *string* | Path/URL to ftelnet script src if you're hosting it yourself (renders *noRip*, *noXfer*, *refresh* invalid) |
| **scriptID** | *string* | The *id* attribute for the script element (not sure if necessary or safe to override if so) |
| **divID** | *string* | The *id* attribute for the target div |
