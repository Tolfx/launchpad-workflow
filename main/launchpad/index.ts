import Launchpad from 'launchpad-mini';
import Connect from './handlers/connect';
import Disconnect from './handlers/disconnect';
import Keys from './handlers/keys';
let pad = new Launchpad();

Connect(pad);
Disconnect(pad);
Keys(pad);