import Launchpad from 'launchpad-mini';

export default function Disconnect(pad: Launchpad)
{
    pad.on('disconnect', () => {
        console.log( 'Launchpad disconnected.' );   
    });
}