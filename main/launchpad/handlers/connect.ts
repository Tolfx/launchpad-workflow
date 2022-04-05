import Launchpad from 'launchpad-mini';
import fs from "fs";
import { IPad } from '../../interfaces/Pad.interfaces';

export default function Connect(pad: Launchpad)
{
    pad.connect().then(async e => {
        console.log(e);
        const buttons = Launchpad.Buttons.All;
        pad.col(pad.green, buttons);
        pad.col(pad.off, buttons);

        // Check all buttons and get their row and column, then check if there is a file according to that row and column.
        // If we got no file create one as IPad interface
        
        for await(const p of Launchpad.Buttons.All)
        {
            // ignore x 8 and y 8
            if(p[0] === 8 || p[1] === 8)
            {
                // @ts-ignore
                pad.col(pad.red, p);
                continue;
            }

            const row = p[0].toString();
            const column = p[1].toString();
            const file = `pad-${row}-${column}`;
            const filePath = `${__dirname}/pads/${file}.json`;

            // Check if also path /pads exists
            if(!fs.existsSync(`${__dirname}/pads`))
                fs.mkdirSync(`${__dirname}/pads`);
            // Check if file exists
            if(!fs.existsSync(filePath))
            {
                // Create file
                fs.writeFileSync(filePath, JSON.stringify(<IPad>{
                    row,
                    column,
                    method: "code",
                    action: {
                        code: "",
                        open: undefined,
                        play: undefined,
                    },
                    color: "off",
                }));
            }

            // Get file and put on color
            const fileData = JSON.parse(fs.readFileSync(filePath, "utf8"));
            const color = fileData.color;
            // @ts-ignore
            pad.col(pad[color], p);
        }

    });
}