import Launchpad from 'launchpad-mini';
import fs from "fs";
import { io } from '../../server';
import { IPad } from '../../interfaces/Pad.interfaces';
import handleSpecial from '../buttons/handleSpecial';
// import { Dir } from '../Config';

export default function Keys(pad: Launchpad)
{
    pad.on('key', data =>
    {
        if(data.pressed)
        {
            const row = (pad.pressedButtons[0][0]).toString();
            const column = (pad.pressedButtons[0][1]).toString();
            // Check if row is 8 or column is 8
            if(row === "8" || column === "8")
            {
                // Here we have special buttons
                handleSpecial({
                    row,
                    column,
                });
                return;
            }
            io.emit("on_click", { row, column, });
            // Get file and run method
            const file = `pad-${row}-${column}`;
            const filePath = `${__dirname}/pads/${file}.json`;
            const fileData: IPad<any> = JSON.parse(fs.readFileSync(filePath, "utf8"));
            const method = fileData.method;
            const action = fileData.action;
            
            switch(method)
            {
                case "code":
                    
                    break;
                case "open":
                    
                    break;
                case "play":
                    
                    break;
            }
        }
    });
}